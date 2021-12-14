import React from 'react';
import { Link } from 'react-router-dom';
import Loader from './Loader';

function Posts(props) {
  let { posts, error, handleDelete } = props;


  if (error) {
    return <h2 className="text-red-500 text-center text-xl mt-8">{error}</h2>;
  }

  if (!posts) {
    return <Loader />;
  }
  if (posts.length === 0) {
    return (
      <h2 className="text-red-500 text-center text-xl mt-8">No posts found</h2>
    );
  }
  return (
    <article>
      {posts.map((post) => {
        return (
          <div
            key={post.id}
            className="bg-gray-200 flex justify-between flex-col mb-10 w-full p-4 rounded-md shadow-md"
          >
            <h2 className="text-2xl font-bold mb-5 mt-5 text-gray-700">
              {post.title}
            </h2>
            <p className="text-gray-500 mb-5 w-full overflow-hidden">
              {post.body}
            </p>
            <div className="flex justify-between">
              <Link to={`/updatePost/${post.id}`}>Edit</Link>
              <span onClick={() => handleDelete(post.id)}>Delete</span> 
            </div>
          </div>
        );
      })}
    </article>
  );
}

export default Posts;
