import React, { useState } from 'react';
import { Helmet } from 'react-helmet'
import { Link, useHistory } from 'react-router-dom'
import toast, { Toaster } from "react-hot-toast"
import axios from "axios"
import Cookies from 'js-cookie';
import Header from '../../Modules/Header/Header'
import Footer from '../../Modules/Footer/Footer'
import style  from '../../Styles/Register.module.scss'
import { RegisterSVG } from '../../Modules/JSX/Register'
function Register() {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("");
  const [password , setPassword] = useState("");
  const history = useHistory();
  if(Cookies.get('login') == 'true') {
    history.push('/events')
  }
  const handleClick = () => {
    const api = {
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
			data: {
        username: username,
				email: email,
				password: password,
			},
			url: `http://127.0.0.1:8000/api/auth/register`,
		}
    const register = axios.post(api.url, api.data, {
			headers: api.headers,
		})
    const promise = toast.promise(register, {
			loading: "Registration in process",
			success: (response) => {
        return response.data.message
			},
			error: (error) => {
				return error.response.data.message
			},
		})   
  }
  return (
    <div className={style.register}>
      <Helmet>
        <title>Sign Up &#8739; La Cronicas</title>
      </Helmet>
      <Header />
        <h1>Don't have account? Start working with us now!</h1>
        <div className={style.content}>
          <div className={style.inputs}>
            <input 
              type='text' 
              placeholder='Enter your username'
              name='username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              type='email' 
              placeholder='Enter your email' 
              name='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input 
              type='password' 
              placeholder='Enter your password'
              name='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              />
            <button onClick={(e) => handleClick(e.preventDefault())}>Sign Up</button>
            <span>Have an account? <Link to='/sign_in'>Log in!</Link></span>
          </div>
          <div className={style.svg}>
            <RegisterSVG />
          </div>
          <Toaster
            position='bottom-center'
            toastOptions={{
              style: {
                borderRadius: '10px',
                background: '#333',
                color: '#fff',
              },
              duration: 4000,
            }}
          />
        </div>
      <Footer />
    </div>
  );
}
export default Register;