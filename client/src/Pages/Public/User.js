import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet'
import { Link, useHistory } from 'react-router-dom'
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import toast, { Toaster } from "react-hot-toast"
import axios from "axios"
import Cookies from 'js-cookie';
import style  from '../../Styles/Public.module.scss'
import EventsHeader from '../../Modules/Header/EventsHeader';
function User() {
  const [user, setUser] = useState([])
  const history = useHistory()
  const params = useParams();
  if(Cookies.get('login') == 'false' || !Cookies.get('login')) {
    history.push('/')
  }
  useEffect(() => {
    const api = {
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
			url: `http://127.0.0.1:8000/api/users/show/${params.id}`,
		}
    axios.get(api.url, api.data, {
			headers: api.headers,
		})
    .then((response) => setUser(response.data))
  },[])
  return (
    <div>
      <Helmet>
        <title>User &#8739; Uevent</title>
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
    </div>
  );
}
export default User;