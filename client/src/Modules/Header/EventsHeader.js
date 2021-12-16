import React from 'react';
import { Link, useHistory } from 'react-router-dom'
import toast, { Toaster } from "react-hot-toast"
import axios from "axios"
import Cookies from 'js-cookie';
import { Logo } from '../JSX/Logo'
import style from '../../Styles/EventsHeader.module.scss'

function EventsHeader() {
  const history = useHistory();
  const handleClick = () => {
    const api = {
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
        Authorization: 'Bearer' + Cookies.get('token'),
			},
			url: `http://127.0.0.1:8000/api/auth/logout`,
		}
    const logout = axios.post(api.url, null, {
			headers: api.headers,
		})
    const promise = toast.promise(logout, {
			loading: "Logging out process",
			success: () => {
        Cookies.remove('login')
        Cookies.remove('token')
        Cookies.remove('user_id')
        history.push('/')
			},
			error: (error) => {
				return error.response.data.message
			},
		})   
  }
  return(
    <div className={style.header}>
      <Link to="/events">
        <div className={style.logoDiv}>
          <Logo />
          <span>Uevents</span>
        </div>
      </Link>
      <div>
        <Link to="/events">Calendars</Link>
        <Link to="/account">Public Account</Link>
        <Link to="/me">Settings</Link>
      </div> 
      <div>
        <Link onClick={(e) => handleClick(e.preventDefault())}>Log out</Link>
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
  );
}
export default EventsHeader;