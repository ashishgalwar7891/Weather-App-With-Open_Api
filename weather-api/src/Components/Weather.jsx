import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SearchInput from './SearchInput';
import TemperatureAndDetails from './TemperatureAndDetails';
import TimeandLocation from './TimeandLocation';
import { useParams } from "react-router-dom";
import DailyForcast from './DailyForcast';
import HourlyForcast from './HourlyForcast';


const Weather = () => {
  const [weatherData, setWeatherData] = useState([]);
  const [unit1, setUnit1] = useState("metric");

  
  let { cityName } = useParams();
  const [city, setCity] = useState(cityName);
  
  useEffect(() => {
    searchedCity(city);
  }, [city]);

  
const searchedCity = (cityName) => {
  setCity(cityName);
  getWeatherData(cityName);
}

const setUnit = (unit) => {
  setUnit1(unit);
};

  const getWeatherData = async (cityName) => {
    const options = {
      method: "GET",
      url: "https://weatherapi-com.p.rapidapi.com/forecast.json",
      params: {
        q: `${cityName}`,
        days: "3",
      },
      headers: {
        "X-RapidAPI-Key": "fb94364203mshf42cc4318bbc897p1ba0f6jsn248a242ca0a2",
        "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      console.log(response.data);
      setWeatherData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="mx-auto max-w-screen-lg mt-4 py-8 px-auto shadow-xl bg-gradient-to-r from-sky-300  to-blue-300 shadow-gray-400">
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-center mb-4">
        SkyView Forecast Tracker
      </h1>

      <hr className="my-4" />

      <SearchInput sendDataToParent={searchedCity} sendUnitToParent={setUnit} />
      <TimeandLocation location={weatherData.location} />
      <TemperatureAndDetails
        current={weatherData.current}
        forecast={weatherData.forecast}
        unit={unit1}
      />
      <DailyForcast
        title="daily Forecast"
        forecast={weatherData.forecast}
        current={weatherData.current}
        unit={unit1}
      />
      <HourlyForcast
        title="hourly Forecast"
        forecast={weatherData.forecast}
        current={weatherData.current}
        unit={unit1}
      />
    </div>
  );
};

export default Weather