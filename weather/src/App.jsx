import { useState } from 'react'

import './App.css'

/* Images */

import searchIcon from "./assets/search.png";
import clearIcon from "./assets/clear.png";
import snowIcon from "./assets/snow.png";
import cloudIcon from "./assets/cloud.png";
import drizzleIcon from "./assets/search.png";
import rainIcon from "./assets/rain.png";
import windIcon from "./assets/wind.png";
// import snowIcon from "./assets/snow.png";
import humidityIcon from "./assets/humidity.png";


//weatherDetails components
const WeatherDetails =({icon, temp, city,country,lat,log ,humidity,wind})=>{
  return (
    <>
    <div className='image'>
      <img src={icon} alt='image'>
      </img>
    </div>
    <div className='temp'>{temp}°C</div>
    <div className='location'>{city}</div>
    <div className='country'>{country}</div>

    <div className='cord'>
      <div>
        <span className='lat'>Latitude</span>
        <span>{lat}</span>
      </div> 
      <div>
        <span className='log'>Longitude</span>
        <span>{log}</span>
      </div>
    </div>

    <div className='data-container'>
      <div className='element'>
        <img src={humidityIcon} alt='humidity' className='icon'/>
        <div className='data'>
          <div className='humidity-percent'>{humidity}%</div>
          <div className='text'>Humidity</div>
        </div>
      </div>
      <div className='element'>
        <img src={windIcon} alt='wind' className='icon'/>
        <div className='data'>
          <div className='wind-percent'>{wind} km/h</div>
          <div className='text'>Wind Speed</div>
        </div>
      </div>
    </div>



    </>
  )
}






function App() {

  let api_key ="d70ff4328d8e39418198f9b8246bab9f";
  const [text,setText] = useState("Chennai");

   const [icon,setIcon] = useState(snowIcon);
   const [temp,setTemp] = useState(0);
   const [city,setCity] = useState("Chennai");
   const [country,setCountry] = useState("IN");
   const [lat,setLat] = useState(0);
   const [log,setLog] = useState(0);
   const [humidity,setHumidity] = useState(0);
   const [wind,setWind] = useState(0);
   
   const [cityNotFound,setCityNotFound] = useState(false);
   const [loading,setLoading] = useState(false);

   const weatherIconMap = {
    "01d":clearIcon,
    "01n":clearIcon,
    "02d":cloudIcon,
    "02n":cloudIcon,
    "03d":drizzleIcon,
    "03n":drizzleIcon,
    "04d":drizzleIcon,
    "04n":drizzleIcon,
    "09d":rainIcon,
    "09n":rainIcon,
    "10d":rainIcon,
    "10n":rainIcon,
    "13d":snowIcon,
    "13n":snowIcon,
   }


  //fetch weather API
   const search = async ()=>
   
    {
      setLoading(true);
      // let url = `https://api.openweathermap.org/data/
      // 2.5/weather?q=${text}&appid=${api_key}&units=Metric`;

      let url = `https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${api_key}&units=Metric`

      try{
          let res = await fetch(url);
          let data = await res.json();

          if(data.cod === "404")
          {
            console.error("City not found")
            setCityNotFound(true);
            setLoading(false);
            return;
          }
         
          setHumidity(data.main.humidity);
          setWind(data.wind.speed);
          setTemp(Math.floor(data.main.temp));
          setCity(data.name);
          setCountry(data.sys.country);
          setLat(data.coord.lat);
          setLog(data.coord.lon);

      }catch(error)
      {
          console.log("An error occurred:", error.message);
      }finally{
          setLoading(false);
      }
    };

    //Get the input value and set to the text
    const handleCity = (e)=>{
       setText(e.target.value);
    }

    const handleKeyDown = (e)=>
    {
        if(e.key === "Enter")
        {
          search();
        }
    }


  return (
    <>
      <div className='container'>
        <div className='input-container'>
            <input type='text'
            className='cityInput'
            placeholder='Search City' 
            onChange={handleCity} 
            value={text}
            onKeyDown={handleKeyDown}/>
            <div className='search-icon' onClick={()=> search()}>
                <img src={searchIcon} alt='Search'/>
              </div>
        </div>
        <WeatherDetails icon={icon} temp={temp} city={city} country={country} lat={lat} log={log} humidity={humidity} wind={wind} />

        <p className='copyright'>
          Designed by <span>Naveen</span>
        </p>
      </div>
    </>
  )
}

export default App
