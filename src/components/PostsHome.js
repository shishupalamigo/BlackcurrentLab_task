import React, { useState, useEffect } from 'react';
import Posts from './Posts';
import Pagiantion from './Pagination';

function PostsHome(props) {
  const [posts, setPosts] = useState(null);
  const [error, setError] = useState('');
  const [postsCount, setPostsCount] = useState(0);
  const [postsPerPage] = useState(10);
  const [activePageIndex, setActivePageIndex] = useState(1);
  const [displayPost, setDisplayPost] = useState(null);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then((data) => {
        setPosts(data);
        setDisplayPost(data.slice(0, 10));
        setPostsCount(data.length);
      })
      .catch((err) => {
        setError('Not able to fetch Posts');
      });
  }, []);

  function updateCurrentPageIndex(index) {
    setActivePageIndex(index);
    var result = posts.reduce((acc, cv, i) => {
      const chunkIndex = Math.floor(i / postsPerPage);

      if (!acc[chunkIndex]) {
        acc[chunkIndex] = [];
      }
      acc[chunkIndex].push(cv);
      return acc;
    }, []);
    setDisplayPost(result[index - 1]);
  }
  function handleDelete(id) {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: 'DELETE',
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then(({ errors }) => {
            return Promise.reject(errors);
          });
        }
        alert("Post Deleted Sucessfully");
        setPosts(posts.filter(post => post.id !== id) )
      })
      .catch((err) => console.log(err));
  }

  return (
    <main className="px-24 py-16 w-full">
      {/* posts part */}
      <section className="flex justify-between flex-col ">
        <div className="w-full">
          <Posts posts={displayPost} error={error} handleDelete={handleDelete}/>
        </div>
        {/* Pagination */}
      </section>
      <div className="mt-10">
        <Pagiantion
          postsCount={postsCount}
          postsPerPage={postsPerPage}
          activePageIndex={activePageIndex}
          updateCurrentPageIndex={updateCurrentPageIndex}
        />
      </div>
    </main>
  );
}

export default PostsHome;
