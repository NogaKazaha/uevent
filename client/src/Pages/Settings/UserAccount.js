import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet'
import { Link, useHistory } from 'react-router-dom'
import toast, { Toaster } from "react-hot-toast"
import axios from "axios"
import Cookies from 'js-cookie';
import style  from '../../Styles/Settings.module.scss'
import EventsHeader from '../../Modules/Header/EventsHeader';
function Settings() {
  const [username, setUsername] = useState("")
  const history = useHistory()
  if(Cookies.get('login') == 'false' || !Cookies.get('login')) {
    history.push('/')
  }
  const handleClick = () => {
    if(username == "") {
      toast.error("Please enter non empty string")
    }
    else {
      const api = {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: 'Bearer' + Cookies.get('token'),
        },
        data: {
          username: username,
        },
        url: `http://127.0.0.1:8000/api/users/update/${Cookies.get('user_id')}`,
      }
      const update = axios.patch(api.url, api.data, {
        headers: api.headers,
      })
      const promise = toast.promise(update, {
        loading: "Updating your info",
        success: (response) => {
          return response.data.message
        },
        error: (error) => {
          return error.response.data.message
        },
      })
    }  
  }
  return (
    <div>
      <Helmet>
        <title>Settings &#8739; La Cronicas</title>
      </Helmet>
      <EventsHeader />
        <h1>Make new you</h1>
        <div className={style.inputs}>
          <input 
            type="text" 
            placeholder="Enter new username"
            name='username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <button onClick={(e) => handleClick(e.preventDefault())}>Submit</button>
        </div>
    </div>
  );
}
export default Settings;