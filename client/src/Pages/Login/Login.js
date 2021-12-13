import React, { useState } from 'react';
import { Helmet } from 'react-helmet'
import { Link, useHistory } from 'react-router-dom'
import toast, { Toaster } from "react-hot-toast"
import axios from "axios"
import Header from '../../Modules/Header/Header'
import Footer from '../../Modules/Footer/Footer'
import style  from '../../Styles/Login.module.scss'
import { LoginSVG } from '../../Modules/JSX/Login'
import Cookies from 'js-cookie';
function Login() {
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
				email: email,
				password: password,
			},
			url: `http://127.0.0.1:8000/api/auth/login`,
		}
    const login = axios.post(api.url, api.data, {
			headers: api.headers,
		})
    const promise = toast.promise(login, {
			loading: "Logging in process",
			success: (response) => {
        history.push('/events')
        Cookies.set('login', true)
        Cookies.set('token', response.data.token)
        Cookies.set('user_id', response.data.user_id)
        return response.data.message
			},
			error: (error) => {
				return error.response.data.message
			},
		})   
  }

  return (
    <div className={style.login}>
      <Helmet>
        <title>Sign In &#8739; La Cronicas</title>
      </Helmet>
      <Header />
        <h1>Have an account? Login and continue using our app</h1>
        <div className={style.content}>
          <div className={style.inputs}>
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
            <button onClick={(e) => handleClick(e.preventDefault())}>Sign In</button>
            <span>Don't have an account? <Link to='/sign_up'>Join us!</Link></span>
            <span>Forgot your password? <Link to='/reset_pass'>Reset it!</Link></span>
          </div>
          <div className={style.svg}>
            <LoginSVG />
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
export default Login;