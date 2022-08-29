import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>iScsc</h1>
        </Link>
        <nav>
          <div>
            <Link to="/login" className="nav-login">Log In</Link>
            <Link to="/signup" className="nav-signup">Sign Up</Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
