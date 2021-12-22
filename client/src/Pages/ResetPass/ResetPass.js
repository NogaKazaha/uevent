import React, { useState } from 'react';
import { Helmet } from 'react-helmet'
import { Link, useHistory } from 'react-router-dom'
import toast, { Toaster } from "react-hot-toast"
import axios from "axios"
import Cookies from 'js-cookie';
import Header from '../../Modules/Header/Header'
import Footer from '../../Modules/Footer/Footer'
import style  from '../../Styles/Reset.module.scss'
import { ResetSVG } from '../../Modules/JSX/Reset'
function ResetPassword() {
  const [email, setEmail] = useState("");
  const history = useHistory();
  if(Cookies.get('login') == 'true') {
    history.push('/events')
  }
  const handleClick = () => {
    const api = {
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
        Authorization: 'Bearer' + Cookies.get('token'),
			},
			data: {
				email: email,
			},
			url: `http://127.0.0.1:8000/api/auth/reset_password`,
		}
    const reset = axios.post(api.url, api.data, {
			headers: api.headers,
		})
    const promise = toast.promise(reset, {
			loading: "Sending email in process",
			success: (response) => {
        Cookies.set('reset_token', response.data.reset_token)
        return response.data.message
			},
			error: (error) => {
				return error.response.data.message
			},
		})   
  }
  return (
    <div className={style.reset}>
      <Helmet>
        <title>Reset Password &#8739; Uevent</title>
      </Helmet>
      <Header />
        <h1>Forgot your password? We will help you!</h1>
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
            <button onClick={(e) => handleClick(e.preventDefault())}>Send email</button>
            <span>Remembered password? <Link to='/sign_in'>Go back</Link></span>
          </div>
          <div className={style.svg}>
            <ResetSVG />
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
export default ResetPassword;