import { useState } from 'react'

import './App.css'

/* Images */

import searchIcon from "./assets/search.png";
// import clearIcon from "./assets/clear.png";
// import cloudIcon from "./assets/cloud.png";
// import drizzleIcon from "./assets/search.png";
// import rainIcon from "./assets/rain.png";
// import windIcon from "./assets/wind.png";
// import snowIcon from "./assets/snow.png";
// import humidityIcon from "./assets/humidity.png";

function App() {


  return (
    <>
      <div className='container'>
        <div className='input-container'>
          <input type='text'
          className='cityInput'
          placeholder='Search City' />
           <div className='search-icon'>
          <img src={searchIcon} alt='Search'/>
        </div>
        </div>
      </div>
    </>
  )
}

export default App
