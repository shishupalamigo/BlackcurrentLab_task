import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import PostsHome from './components/PostsHome';
import NewPost from './components/NewPost';
import UpdatePost from './components/UpdatePost';
function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route exact path="/" element={<PostsHome />}></Route>
          <Route exact path="/newPost" element={<NewPost />}></Route>
          <Route exact path="/updatePost/:id" element={<UpdatePost />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
