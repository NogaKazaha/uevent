import style  from '../../Styles/Public.module.scss'
import { Link, useHistory } from 'react-router-dom'
import toast, { Toaster } from "react-hot-toast"
import axios from "axios"
import Moment from 'react-moment';
import Cookies from 'js-cookie';
const OrganizersSubsList = ({ orgs }) => {
  const history = useHistory()
	return orgs.map((org) => {
    const handleClick = () => {
      const api = {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: 'Bearer' + Cookies.get('token'),
        },
        url: `http://127.0.0.1:8000/api/subs/delete/org/${org.id}`,
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
      <div>
        <div className={style.outerinfo}>
          <div className={style.info}>
            <span>Username: {org.username}</span>
            <span>Email: {org.email}</span>
            <span>Status: {org.status}</span>
            <div>
              <a href='/events' onClick={(e) => handleClick(e.preventDefault())}>Remove from subscriptions</a>
            </div>
          </div>
        </div>  
      </div>
		)
	})
}

export default OrganizersSubsList