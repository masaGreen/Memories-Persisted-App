import { useRef } from "react";
import registerStyles from "./register.module.css";
import axios from "axios"
import {Link} from "react-router-dom"
import {useNavigate} from "react-router-dom"
import { useState } from "react";
const Register = () => {
  const navigate = useNavigate()
  
  const username = useRef("")
  const email =useRef("")
  const password = useRef("")
  const [error, setError] = useState()
  
  const handleRegister = async(e)=>{
    e.preventDefault()
    
    const user = {
      username:username.current.value,
      email:email.current.value,
      password:password.current.value,
    }
    try {
      await axios.post("http://localhost:8080/register", user)
      navigate("/login")
      e.target.reset()
    } catch (error) {
      setError(error)
      console.log(error)
    } 

  }
  return (
    <div className={registerStyles.registerWrapper}>
      <h2 className={registerStyles.registerTitle}>Register</h2>
      <form className={registerStyles.registerForm} onSubmit={handleRegister}>
        <label>Username</label>
        <input type="text" placeholder="username" ref={username}/>
        <label>Email</label>
        <input type="email" placeholder="email@youremail.com" ref={email} />
        <label>Password</label>
        <input type="password" ref={password} />
        <Link to="/login"><button  className={registerStyles.registerButton}>
          Login
        </button></Link>
        <button className={registerStyles.loginButton} type="submit">Register</button>
      </form>
    </div>
  );
};
export default Register;