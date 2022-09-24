import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const handleClick = () => {
    logout();
    navigate("/");
  };

  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>iScsc</h1>
        </Link>
        <nav>
          {user && (
            <div className="nav-logged-in">
              <span>{user.username}</span>
              <button onClick={handleClick} className="nav-logout">
                Log Out
              </button>
            </div>
          )}
          {!user && (
            <div>
              <Link to="/login" className="nav-login">
                Log In
              </Link>
              <Link to="/signup" className="nav-signup">
                Sign Up
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
