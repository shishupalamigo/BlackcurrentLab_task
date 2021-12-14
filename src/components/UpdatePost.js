import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from './Loader';

function UpdatePost(props) {
  const [state, setState] = useState({
    post: '',
    title: '',
    body: '',
    error: '',
  });
  const navigate = useNavigate();

  let { id } = useParams();
  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then((data) => {
        let { title, body } = data;
        setState((state) => {
          return {
            ...state,
            post: data,
            title: title,
            body: body,
          };
        });
      })
      .catch((err) => {
        console.log(err);
      });
    return () => {};
  }, [id]);

  function handleChange({ target }) {
    let { name, value } = target;
    setState({ ...state, [name]: value });
  }

  function handleSubmit(event) {
    let { title, body } = state;
    event.preventDefault();
    if (title && body) {
      fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
          post: {
            title,
            body,
          },
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((res) => {
          if (!res.ok) {
            return res.json().then(({ errors }) => {
              return Promise.reject(errors);
            });
          }
          return res.json();
        })
        .then((data) => {
          console.log(data);
          navigate('/');
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setState({ ...state, error: 'Enter all fields' });
    }
  }

  let { title, body, post, error } = state;
  if (!post) {
    return <Loader />;
  }
  return (
    <main>
      <section className="pt-20">
        <form
          className="w-1/2 mx-auto p-8 border border-gray-400 rounded-md"
          onSubmit={handleSubmit}
        >
          <legend className="text-3xl text-center font-bold my-3 text-indigo-900">
            Edit Post
          </legend>
          <fieldset className="flex flex-col">
            <span className="text-red-500 my-1">{error}</span>
            <input
              type="text"
              value={title}
              placeholder="Title"
              name="title"
              onChange={handleChange}
              className="my-2 p-2 rounded-md outline-none border-2 border-gray-300 focus:border-blue-500"
            />
            <textarea
              rows="6"
              value={body}
              name="body"
              placeholder="Articles's Body"
              onChange={handleChange}
              className="my-2 p-2 rounded-md outline-none border-2 border-gray-300 focus:border-blue-500"
            ></textarea>
            <input
              type="submit"
              value="Update Post"
              className="p-2 rounded self-end bg-blue-500 hover:bg-blue-400 text-white "
            />
          </fieldset>
        </form>
      </section>
    </main>
  );
}

export default UpdatePost;
