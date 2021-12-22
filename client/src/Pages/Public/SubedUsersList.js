import style  from '../../Styles/Public.module.scss'
import { Link } from 'react-router-dom'
import Moment from 'react-moment';
import Cookies from 'js-cookie';
const SubedUsersList = ({ subs }) => {
	return subs.map((sub) => {
		return (
      <div className={style.outerinfo}>
          <div className={style.info}>
            <strong><Link to={`/user/${sub.id}`}>{sub.username}</Link></strong>
          </div>
        </div>
		)
	})
}

export default SubedUsersList