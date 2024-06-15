import { useEffect, useState } from "react";
import searchIcon from "./images/search.png";
import humidityImage from "./images/humidity.png";
import cloudImage from "./images/cloud.png";
import windSpeedImage from "./images/wind.png";
import loaderGIF from "./images/loading.gif"
import notFound from './images/not-found.png'
import "./App.css";
import { MdDarkMode, MdLightMode } from "react-icons/md";

let  API_KEY = "d1845658f92b31c64bd94f06f7188c9c"
function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [city, setCity] = useState("");
  const [data, setData] = useState('')
  const [frontPageStatus, setFrontPageStatus] = useState(true)
  const [isDarkMode, setIsDarkMode] = useState(false)

  // fetch data function (calling API )
  async function fetchData(city) {
    setIsLoading(true)
    if (city.length == 0) setFrontPageStatus(true)
    else setFrontPageStatus(false)
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`) ;
    const data = await response.json() ;
    if(response.status != 200) {   // checking failure or success
      setData("")
    }
    else
      setData(data);
    console.log(data)
  
    
    setIsLoading(false)
  }

  const submitForm = (e) => {
    e.preventDefault();
    fetchData(city);
  }

  return (
    <div className={isDarkMode ? "wrapper-dark" : "wrapper-normal"}>
      {/* maintains dark mode functionality */}
      <div className="dark-container-status" onClick={() => setIsDarkMode(!isDarkMode)}>   
        <h1>Weather App</h1>
        {!isDarkMode ? <MdDarkMode size={30}/> : <MdLightMode size={30}/>}
      </div>

      {/* first page */}
      <form className="form-container" onSubmit={(e) => submitForm(e)}>
        <input placeholder="Search for City...." type="text" value={city} onChange={(e) => setCity(e.target.value)} />
        <button className="btn">
          <img src={searchIcon} alt="" width="20" height="20" />
        </button>
      </form>

      {/* maintains first page view */}
      {frontPageStatus && <h1>Search For City</h1>} 

      {/* maintainss error/not-found, success and loading view */}
      { !frontPageStatus && 
        (
          <>
            {data.length == 0 ? (
        <>
            {/* not found view */}
          <div className="not-found-container">
            <img className="not-found" src={notFound} />
            <h2>City Not Found. Please check the city name.</h2>
          </div>
          
        </>
      ):(!isLoading ? (
        <>
        {/* success view */}
          <div className="sub-container user-info-container">
            <div className="name">
              <p id="cityName">{data?.name}</p>
              <img src={`https://flagcdn.com/144x108/${data?.sys?.country.toLowerCase()}.png`} alt=""/>
            </div>

            <p>{data?.weather[0]?.description}</p>

            <img src={`http://openweathermap.org/img/w/${data?.weather[0]?.icon}.png`} />

            <p>{data?.main?.temp} °C</p>

            <div className="parameter-container">
              <div className="parameter">
                <img src={windSpeedImage} alt="" />
                <p>Wind Speed</p>
                <p>{data?.wind.speed} m/s</p>
              </div>

              <div className="parameter">
                <img src={humidityImage} alt="" />
                <p>Humidity</p>
                <p>{data?.main.humidity} %</p>
              </div>

              <div className="parameter">
                <img src={cloudImage} alt="" />
                <p>Clouds</p>
                <p>{data?.clouds.all} %</p>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
        {/* loder view */}
          <div className="sub-container loading-container">
              <img src={loaderGIF} alt="" width="150" height="150"/>
              <p>loading</p>
          </div>
        </>
      ))} 
          </>
        )
      }
           

      
    </div>
  );
}

export default App;
