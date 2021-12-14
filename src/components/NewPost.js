import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function NewPost(props) {
  const [state, setState] = useState({
    title: '',
    body: '',
    error: '',
  });
  const navigate = useNavigate();
  function handleChange({ target }) {
    let { name, value } = target;
    setState({ ...state, [name]: value });
  }

  function handleSubmit(event) {
    let { title, body } = state;
    event.preventDefault();
    if (title && body) {
      fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          post: { title, body },
        }),
      })
        .then((res) => {
          if (!res.ok) {
            return res.json().then(({ errors }) => {
              return Promise.reject(errors);
            });
          }
          console.log(res.json());
          return res.json();
        })
        .then((data) => {
          console.log(data, 'Post published');
        })
        .then(navigate('/'))
        .catch((err) => {
          // console.log(err);
          setState({
            ...state,
            error: 'Enter all fields',
          });
        });
    } else {
      setState({
        title: '',
        body: '',
        error: '',
      });
    }
  }

  return (
    <main>
      <section>
        <form className="w-2/4 mx-auto mt-10" onSubmit={handleSubmit}>
          <input
            className="block w-full my-3 py-2 px-3 border border-gray-400 rounded-md"
            type="text"
            placeholder="Enter Title"
            value={state.title}
            name="title"
            onChange={(e) => handleChange(e)}
          ></input>
          {state.error && <span className="text-red-500">{state.error}</span>}
          <textarea
            placeholder="Enter Body"
            name="body"
            className="block w-full my-3 py-2 px-3 border border-gray-400 rounded-md"
            onChange={(e) => handleChange(e)}
            defaultValue={state.body}
          />
          <input
            type="submit"
            value="Publish Post"
            className="block float-right p-2 bg-green-500 text-white font-bold cursor-pointer mt-10 rounded"
          />
        </form>
      </section>
    </main>
  );
}
export default NewPost;
