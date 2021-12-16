import style  from '../../Styles/Events.module.scss'
import { Link } from 'react-router-dom'
import Moment from 'react-moment';
import Cookies from 'js-cookie';
const EventsList = ({ events }) => {
	return events.map((event) => {
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
          {
            event.organizer_id == Cookies.get("user_id") && <div>
              <Link to={`/event/edit/${event.id}`}>
                Edit
              </Link> 
            </div>
          }    
        </div>
      </div>   
		)
	})
}

export default EventsList