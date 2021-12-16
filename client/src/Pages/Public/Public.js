import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet'
import { Link, useHistory } from 'react-router-dom'
import toast, { Toaster } from "react-hot-toast"
import axios from "axios"
import Cookies from 'js-cookie';
import style  from '../../Styles/Public.module.scss'
import EventsHeader from '../../Modules/Header/EventsHeader';
function Public() {
  const [user, setUser] = useState([])
  const history = useHistory()
  if(Cookies.get('login') == 'false' || !Cookies.get('login')) {
    history.push('/')
  }
  useEffect(() => {
    const api = {
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
			url: `http://127.0.0.1:8000/api/users/show/${Cookies.get('user_id')}`,
		}
    axios.get(api.url, api.data, {
			headers: api.headers,
		})
    .then((response) => setUser(response.data))
  },[])
  return (
    <div>
      <Helmet>
        <title>Public Account &#8739; La Cronicas</title>
      </Helmet>
      <EventsHeader />
        <h1>Here you can check your public information</h1>
        <div className={style.outerinfo}>
          <div className={style.info}>
            <span>Username: {user.username}</span>
            <span>Email: {user.email}</span>
            <span>Status: {user.status}</span>
          </div>
        </div>
        <span>Want to chage your info? <Link to='/me'>Go to settings</Link></span>
    </div>
  );
}
export default Public;