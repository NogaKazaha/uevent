import React from 'react';
import { Helmet } from 'react-helmet'
import Cookies from 'js-cookie';
import { Link, useHistory } from 'react-router-dom'
import Header from '../../Modules/Header/Header'
import Footer from '../../Modules/Footer/Footer'
import style from '../../Styles/Welcome.module.scss'
import { Event } from '../../Modules/JSX/Event'
function WelcomePage() {
  const history = useHistory();
  if(Cookies.get('login') == 'true') {
    history.push('/events')
  }
  return (
    <div className={style.welcome}>
      <Helmet>
        <title>Welcome &#8739; Uevents</title>
      </Helmet>
      <Header />
        <div className={style.content}>
          <h1>Find events for yourself with Uevents</h1>
          <Event />
          <span>Here you can find any event you are interested in</span> 
          <Link to='/sign_up' className={style.button}>Join us</Link>
        </div>
      <Footer />
    </div>
  );
}
export default WelcomePage;