import { Link } from 'react-router-dom';
function Header() {
  return (
    <ul className="flex justify-end p-5 text-green-600 text-xl">
      <li className="mr-10">
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/newpost">New Post</Link>
      </li>
    </ul>
  );
}
export default Header;
