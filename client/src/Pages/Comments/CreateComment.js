import React, { useEffect, useState, Component } from 'react';
import GoogleMapReact from 'google-map-react';
import { Helmet } from 'react-helmet'
import { Link, useHistory } from 'react-router-dom'
import toast, { Toaster } from "react-hot-toast"
import DateTimePicker from 'react-datetime-picker';
import Select from 'react-select'
import axios from "axios"
import Cookies from 'js-cookie';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import style  from '../../Styles/CreateEvent.module.scss'
import EventsHeader from '../../Modules/Header/EventsHeader';
import SimpleMap from '../../Modules/Map/GoogleMap';
function CreateComment() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const history = useHistory()
  const params = useParams();
  if(Cookies.get('login') == 'false' || !Cookies.get('login')) {
    history.push('/')
  }
  const handleClick = () => {
    if(title == "" || description == "") {
      toast.error("You need to fill in all fields")
    }
    else {
      const api = {
        	headers: {
        		"Content-Type": "application/json",
        		Accept: "application/json",
            Authorization: 'Bearer' + Cookies.get('token'),
        	},
        	data: {
        		title: title,
        		description: description,
        	},
        	url: ` http://127.0.0.1:8000/api/comments/create/${params.id}`,
        }
        const event = axios.post(api.url, api.data, {
        	headers: api.headers,
        })
        const promise = toast.promise(event, {
          loading: "Creating comment",
          success: (response) => {
            history.push(`/event/${params.id}`)
            return response.data.message
          },
          error: (error) => {
            return error.response.data.message
          },
        })    
    } 
  }
  return (
    <div>
      <Helmet>
        <title>Create new comment &#8739; Uevent</title>
      </Helmet>
      <EventsHeader />
        <h1>Make new event to participate</h1>
        <div className={style.inputs}>
          <input 
            type="text" 
            placeholder="Enter comment title"
            name='title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <input 
            type="text" 
            placeholder="Enter comment description"
            name='description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <button onClick={(e) => handleClick(e.preventDefault())}>Submit</button>
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
        </div>
    </div>
  );
}
export default CreateComment;