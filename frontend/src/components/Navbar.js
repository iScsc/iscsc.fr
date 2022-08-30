import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";

const Navbar = () => {
  const { logout } = useLogout();
  const handleClick = () => {
    logout();
  };

  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>iScsc</h1>
        </Link>
        <nav>
          <div>
            <button onClick={handleClick} className="nav-logout">Log Out</button>
          </div>
          <div>
            <Link to="/login" className="nav-login">
              Log In
            </Link>
            <Link to="/signup" className="nav-signup">
              Sign Up
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
