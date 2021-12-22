import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet'
import { Link, useHistory } from 'react-router-dom'
import toast, { Toaster } from "react-hot-toast"
import axios from "axios"
import Cookies from 'js-cookie';
import style  from '../../Styles/Public.module.scss'
import EventsHeader from '../../Modules/Header/EventsHeader';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import SubedUsersList from './SubedUsersList';
function SubedUsers() {
  const [users, setUsers] = useState([])
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
			url: `http://127.0.0.1:8000/api/subs/users/${params.id}`,
		}
    axios.get(api.url, api.data, {
			headers: api.headers,
		})
    .then((response) => setUsers(response.data))
  },[])
  return (
    <div>
      <Helmet>
        <title>Subed users &#8739; Uevent</title>
      </Helmet>
      <EventsHeader />
        <h1>Here you can find list of subed users</h1>
        <SubedUsersList subs={users} />
        <span>Want to go back to event? <Link to={`/event/${params.id}`}>Return</Link></span>
    </div>
  );
}
export default SubedUsers;