import { useNavigate } from "react-router-dom";
import { useSignup } from "../hooks/useSignup";
const { useState } = require("react");

const Signup = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { signup, isLoading, error, ok } = useSignup();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(email, username, password);
    if (ok) {
      navigate("/");
    }
  };

  return (
    <form className="signup" onSubmit={handleSubmit}>
      <h3>Sign up</h3>

      <label>Email:</label>
      <input
        type="email"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        value={email}
      />

      <label>Username:</label>
      <input
        type="text"
        onChange={(e) => {
          setUsername(e.target.value);
        }}
        value={username}
      />

      <label>Password:</label>
      <input
        type="password"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        value={password}
      />

      <button disabled={isLoading}>Sign up</button>
      {error && <div className="signup-error">{error}</div>}
    </form>
  );
};

export default Signup;
