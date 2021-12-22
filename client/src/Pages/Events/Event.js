import React, { useEffect, useState, Suspense } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import toast, { Toaster } from "react-hot-toast"
import scss from '../../Styles/Event.module.scss';
import Cookies from 'js-cookie';
const EventsHeader = React.lazy(() => import('../../Modules/Header/EventsHeader'));
const Event = () => {
  const [event, setEvent] = useState([]);
  const [organizer, setOrganizer] = useState([]);
  const [comments, setComments] = useState([]);
  const params = useParams();

  useEffect(() => {
    const setEventAsync = async () => {
      const request = {
        url: `http://127.0.0.1:8000/api/events/show/${params.id}`,
      }
      const response = await axios.get(request.url);
      setEvent(response.data);
    }
    const setOrganizerAsync = async () => {
      const request = {
        url: `http://127.0.0.1:8000/api/users/show/organizer/${params.id}`,
      }
      const response = await axios.get(request.url);
      setOrganizer(response.data);
    }
    const setCommentsAsync = async () => {
      const request = {
        url: `http://127.0.0.1:8000/api/comments/event/${params.id}`,
      }
      const response = await axios.get(request.url);
      setComments(response.data);
    }
    setEventAsync();
    setOrganizerAsync();
    setCommentsAsync();
  }, [])

  const handleClick = () => {
    const api = {
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
        Authorization: 'Bearer' + Cookies.get('token'),
			},
			data: {
        status: 'true'
			},
			url: `http://127.0.0.1:8000/api/subs/subscribe/event/${params.id}`,
		}
    const register = axios.post(api.url, api.data, {
			headers: api.headers,
		})
    const promise = toast.promise(register, {
			loading: "Subscribing in process",
			success: (response) => {
        return response.data.message
			},
			error: (error) => {
				return error.response.data.message
			},
		})   
  }
  return (
    <Suspense fallback={'Loading...'}>
      <EventsHeader />
      <main className={scss.main}>
        <ul className={scss.organizer}>
          <h2>Organizer Info</h2>
          {Object.entries(organizer).map((field) => {
            if(field[0] != 'id' && field[0] != 'organizer_id' && field[0] != 'created_at' && field[0] != 'updated_at') {
              return (
                <li key={field[0]} className={scss.field}>
                  <strong>{field[0]}</strong><br/>
                  {field[1]}
                </li>
              );
            }
          })}
        </ul>
        <ul className={scss.event}>
          <h2>Event Info</h2>
          {Object.entries(event).map((field) => {
            if(field[0] != 'id' && field[0] != 'organizer_id' && field[0] != 'created_at' && field[0] != 'updated_at') {
              return (
                <li key={field[0]} className={scss.field}>
                  <strong>{field[0]}</strong><br/>
                  {field[1]}
                </li>
              );
            }
            
          })}
          {
            event.organizer_id == Cookies.get("user_id") && <>
              <a href={`/event/edit/${params.id}`} className={scss.edit_link}>Edit</a>
            </>
          } 
          <>
            <a href={`/event/edit/${params.id}`} onClick={(e) => handleClick(e.preventDefault())} className={scss.edit_link}>Subscribe to event</a>
          </>
          <>
            <a href={`/users/list/${params.id}`} className={scss.edit_link}>Subscribe users</a>
          </>
        </ul>
        <ul className={scss.comments}>
          <h2>Comments</h2>
          <a href={`/comments/create/${params.id}`} className={scss.create_link}>Create comment</a>
          {comments.map((comment) =>
            <ul className={scss.comment}>
              {Object.entries(comment).map((field) =>
                <li key={field[0]} className={scss.comment_field}>
                  {field[0] === 'username' ? 
                    <strong>{field[1]}</strong> :
                    field[1]
                  }
                </li>)}
            </ul>)}
        </ul>
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
      </main>
    </Suspense>
  );
}

export default Event;