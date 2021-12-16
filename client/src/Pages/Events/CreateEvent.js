import React, { useEffect, useState, Component } from 'react';
import GoogleMapReact from 'google-map-react';
import { Helmet } from 'react-helmet'
import { Link, useHistory } from 'react-router-dom'
import toast, { Toaster } from "react-hot-toast"
import DateTimePicker from 'react-datetime-picker';
import Select from 'react-select'
import axios from "axios"
import Cookies from 'js-cookie';
import style  from '../../Styles/CreateEvent.module.scss'
import EventsHeader from '../../Modules/Header/EventsHeader';
import SimpleMap from '../../Modules/Map/GoogleMap';
function CreateEvent() {
  const [value, onChange] = useState(new Date());
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [theme, setTheme] = useState("")
  const [price, setPrice] = useState()
  const [selectedOptions, setSelectedOptions] = useState();
  const options = [
    { value: 'conference', label: 'Conference' },
    { value: 'lectures', label: 'Lectures' },
    { value: 'fest', label: 'Fest' },
    { value: 'workshop', label: 'Workshop' }
  ]
  const handleChange = (option) => {
    setSelectedOptions(option.value);
  }
  function handleClick() {

  }
  return (
    <div>
      <Helmet>
        <title>Create new event &#8739; La Cronicas</title>
      </Helmet>
      <EventsHeader />
        <h1>Make new event to participate</h1>
        <div className={style.inputs}>
          <input 
            type="text" 
            placeholder="Enter event title"
            name='title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <input 
            type="text" 
            placeholder="Enter event description"
            name='description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <input 
            type="number" 
            placeholder="Enter event price"
            name='title'
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
          <span className={style.warnign}>If you want to create free event, just put 0</span>
          <input 
            type="text" 
            placeholder="Enter event theme"
            name='title'
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            required
          />
          <div style={{width: '600px'}}>
            <Select
              className={style.select}
              options={options}
              onChange={handleChange} 
            />
          </div >
          <div style={{width: '600px'}}>
            <DateTimePicker
              className={style.datepicker}
              onChange={onChange}
              value={value}
            />
          </div>
          <SimpleMap />
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
export default CreateEvent;