import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet'
import { Link, useHistory } from 'react-router-dom'
import toast, { Toaster } from "react-hot-toast"
import axios from "axios"
import Cookies from 'js-cookie';
import style  from '../../Styles/Events.module.scss'
import EventsHeader from '../../Modules/Header/EventsHeader';
import EventsSubsList from './EventsSubsList';
import ScrollButton from '../../Modules/Buttons/ScrollUp';
function EventsSubs() {
  const [events, setEvents] = useState([])
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
			url: `http://127.0.0.1:8000/api/subs/my`,
		}
    axios.post(api.url, api.data, {
			headers: api.headers,
		})
    .then((response) => setEvents(response.data))
  },[])
  return (
    <div className={style.events}>
      <Helmet>
        <title>Events subs &#8739; Uevent</title>
      </Helmet>
      <EventsHeader />
      <h1>Subscribed events</h1>
      <div className={style.eventsList}>
        <EventsSubsList events={events}/>
      </div>
      <ScrollButton />
    </div>
  );
}
export default EventsSubs;