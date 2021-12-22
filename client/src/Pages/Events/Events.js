import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet'
import { Link, useHistory } from 'react-router-dom'
import toast, { Toaster } from "react-hot-toast"
import axios from "axios"
import Cookies from 'js-cookie';
import style  from '../../Styles/Events.module.scss'
import EventsHeader from '../../Modules/Header/EventsHeader';
import EventsList from './EventsList';
import ScrollButton from '../../Modules/Buttons/ScrollUp';
function Events() {
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
			},
			url: `http://127.0.0.1:8000/api/events/show_all`,
		}
    axios.get(api.url, api.data, {
			headers: api.headers,
		})
    .then((response) => setEvents(response.data))
  },[])
  return (
    <div className={style.events}>
      <Helmet>
        <title>Events &#8739; Uevent</title>
      </Helmet>
      <EventsHeader />
      <h1>All events</h1>
      <div className={style.outerEvents}>
          <div className={style.addButton}>
            <Link to='/event/create'>
              Create new event
            </Link>
          </div>
      </div>
      <div className={style.eventsList}>
        <EventsList events={events}/>
      </div>
      <ScrollButton />
    </div>
    
  );
}
export default Events;