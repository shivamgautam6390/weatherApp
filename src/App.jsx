import {useState} from "react";
import axios from "axios";
// import {useEffect} from "react";
import "./app.css";
function App(){
  const [city,setCity]=useState("");
  const [weather,setWeather]=useState(null);
  const [error,setError]=useState(" ");
  const API_KEY ="420281da767f8475286698c0321de44f"
  const API_URL = `https://api.openweathermap.org/data/2.5/weather`;
  const fetchWeather=async()=>{
    if(!city){
      setError("Please enter a city name");
      setWeather(null);
      return;
    }
    setError("");
    try{
      const response = await axios.get(API_URL,{
        params:{
          q:city,
          appid:API_KEY,
          units:"metric", // get temprature in celsius
        },
      });
      setWeather(response.data);
  }
  catch(error){
    if(error.response && error.response.status === 404){
      setError("City not found");
    } else{
      setError("failed to fetch weather data");
    }
    setWeather(null);
  }
  };


  return(
    <>
    <div className="container"> 
      <h1>Weather App</h1>
      <div className="inputbtn">
        <input type="text" value={city} onChange={(e)=>setCity(e.target.value)}/>
        <button onClick={fetchWeather}>Get Weather</button>
      </div>
        {error && <p >{error}</p>}
        {weather && (
          <div className="weather">
            <h2>Weather in {weather.name}</h2>
            <p>Temperature: {weather.main.temp}°C</p>
            <p>Humidity: {weather.main.humidity}%</p>
            <p>Weather Condition: {weather.weather[0].description}</p>
            <p>wind speed:{weather.wind.speed} m/s</p>
            <p>date:{new Date().toLocaleTimeString()}</p>
          </div>
        )}
    </div>
    </>
  );
};
export default App;