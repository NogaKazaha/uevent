import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet'
import { Link, useHistory } from 'react-router-dom'
import toast, { Toaster } from "react-hot-toast"
import axios from "axios"
import Cookies from 'js-cookie';
import style  from '../../Styles/Public.module.scss'
import EventsHeader from '../../Modules/Header/EventsHeader';
import OrganizersSubsList from './OrganizersSubsList';
import ScrollButton from '../../Modules/Buttons/ScrollUp';
function OrganizersSubs() {
  const [orgs, setOrgs] = useState([])
  const history = useHistory()
  useEffect(() => {
    if(Cookies.get('login') == 'false' || !Cookies.get('login')) {
      history.push('/')
    }
    const api = {
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
        Authorization: 'Bearer' + Cookies.get('token'),
			},
			url: `http://127.0.0.1:8000/api/subs/organizers/show`,
		}
    axios.post(api.url, api.data, {
			headers: api.headers,
		})
    .then((response) => setOrgs(response.data))
  },[])
  return (
    <div className={style.events}>
      <Helmet>
        <title>Organizer subs &#8739; Uevent</title>
      </Helmet>
      <EventsHeader />
      <h1>Subscribed organizers</h1>
      <div className={style.eventsList}>
        <OrganizersSubsList orgs={orgs}/>
      </div>
      <ScrollButton />
    </div>
  );
}
export default OrganizersSubs;