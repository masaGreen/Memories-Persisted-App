import { useRef } from "react";
import loginStyles from "./login.module.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../../context/appContext";
import { useState } from "react";
const Login = () => {
  const navigate = useNavigate();
  const username = useRef("");
  const password = useRef("");
  const [error, setError] = useState(null);
  const { setUser,setShow } = useContext(Context);
  const handleLogin = async (e) => {
    e.preventDefault();
    const data = {
      username: username.current.value,
      password: password.current.value,
    };

    try {
      const response = await axios.post("http://localhost:8080/auth", data);
      if (response.data.username) setUser(true);

      navigate("/");
      setUser(true)
      setShow(true)
      e.target.reset();
    } catch (error) {
      setError(error.response.data.msg);
      e.target.reset();
    }
  };
  return (
    <div className={loginStyles.loginWrapper}>
      <h2 className={loginStyles.loginTitle}>Login</h2>
      {error && (
        <div style={{ margin: "3px auto" }}>
          <h5 style={{ color: "red" }}>{error} try again</h5>
          <span style={{ color: "green" }}>
            click on{" "}
            <Link to="/register">
              <span style={{ color: "blue" }}>here</span>
            </Link>{" "}
            to sign up
          </span>
        </div>
      )}
      <form className={loginStyles.loginForm} onSubmit={handleLogin}>
        <label>Username</label>
        <input type="username" placeholder="username" ref={username} />
        <label>Password</label>
        <input type="password" ref={password} />
        <button type="submit" className={loginStyles.loginButton}>
          Login
        </button>
        <Link to="/register">
          <button className={loginStyles.registerButton}>Register</button>
        </Link>
      </form>
    </div>
  );
};
export default Login;
