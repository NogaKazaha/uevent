import style  from '../../Styles/Events.module.scss'
import { Link, useHistory } from 'react-router-dom'
import toast, { Toaster } from "react-hot-toast"
import axios from "axios"
import Moment from 'react-moment';
import Cookies from 'js-cookie';
const EventsSubsList = ({ events }) => {
  const history = useHistory()
	return events.map((event) => {
    const handleClick = () => {
      const api = {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: 'Bearer' + Cookies.get('token'),
        },
        url: `http://127.0.0.1:8000/api/subs/delete/${event.id}`,
      }
      const remove = axios.post(api.url, api.data, {
        headers: api.headers,
      })
      const promise = toast.promise(remove, {
        loading: "Removing in process",
        success: (response) => {
          history.push('/events')
          return response.data.message
        },
        error: (error) => {
          return error.response.data.message
        },
      })   
    }
		return (
      <div className={style.event}>
        <h1>{event.title}</h1>
        <h2>{event.description}</h2>
        <h3>{event.theme}</h3>
        <div className={style.info}>
          <Moment fromNow>{event.date}</Moment>
        </div>
        <div className={style.btn}>
          <div>
            <Link to={`/event/${event.id}`}>
              Open event
            </Link>
          </div>
          <div>
            <a href='/events' onClick={(e) => handleClick(e.preventDefault())}>Remove from subscriptions</a>
          </div>  
        </div>
      </div>   
		)
	})
}

export default EventsSubsList