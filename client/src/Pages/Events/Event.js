import React, { useEffect, useState, Suspense } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import scss from '../../Styles/Event.module.scss';
const EventsHeader = React.lazy(() => import('../../Modules/Header/EventsHeader'));

const tempEvent = {
  title: 'lol'
}

const tempOrganizer = {
  login: 'lol'
}

const tempComments = [
  {
    author: 'lolka',
    description: 'asdnhskjadsadb'
  },
]

const Event = () => {
  const [event, setEvent] = useState(tempEvent);
  const [organizer, setOrganizer] = useState(tempOrganizer);
  const [comments, setComments] = useState(tempComments);
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
        url: `http://127.0.0.1:8000/api/users/show/${event.organizer_id}`,
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

  return (
    <Suspense fallback={'Loading...'}>
      <EventsHeader />
      <main className={scss.main}>
        <ul className={scss.organizer}>
          <h2>Organizer Info</h2>
          {Object.entries(organizer).map((field) => {
            return (
              <li key={field[0]} className={scss.field}>
                <strong>{field[0]}</strong><br/>
                {field[1]}
              </li>
            );
          })}
        </ul>
        <ul className={scss.event}>
          <h2>Event Info</h2>
          {Object.entries(event).map((field) => {
            return (
              <li key={field[0]} className={scss.field}>
                <strong>{field[0]}</strong><br/>
                {field[1]}
              </li>
            );
          })}
          {/* 
            I dont know if we need this button.
            If so, the logic to check if the logged-in user is owner
            should be added to avoid editing others events ofc.
          */}
          <a href={`/event/edit/${params.id}`} className={scss.edit_link}>Edit</a>
        </ul>

        <ul className={scss.comments}>
          <h2>Comments</h2>
          {comments.map((comment) =>
            <ul className={scss.comment}>
              {Object.entries(comment).map((field) =>
                <li key={field[0]} className={scss.comment_field}>
                  {field[0] === 'author' ? 
                    <strong>{field[1]}</strong> :
                    field[1]
                  }
                </li>)}
            </ul>)}
        </ul>
      </main>
    </Suspense>
  );
}

export default Event;