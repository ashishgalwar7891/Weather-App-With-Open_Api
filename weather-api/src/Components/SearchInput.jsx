import React from "react";
import { FaSearch } from "react-icons/fa";
import { SlLocationPin } from "react-icons/sl";
import axios from "axios";

const SearchInput = ({ sendDataToParent, sendUnitToParent }) => {
  const [city, setCity] = React.useState("");
  const [unit, setUnit] = React.useState("metric");


  const handleSearchClick = () => {
    if (city === "") {
      alert("Please enter a city name");
    } else {
      sendData(city);
    }
  };

  const handleLocationClick = async () => {
    let lat, lon;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        lat = position.coords.latitude;
        lon = position.coords.longitude;
        console.log(lat, lon);
        getWeatherDatawithLocation(lat, lon);
      });
    }
  };

  const getWeatherDatawithLocation = async (lat, lon) =>{
        const options = {
          method: "GET",
          url: "https://weatherapi-com.p.rapidapi.com/current.json",
          params: { q: `${lat},${lon}` },
          headers: {
            "X-RapidAPI-Key": "fb94364203mshf42cc4318bbc897p1ba0f6jsn248a242ca0a2",
            "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
          },
        };

    try {
      const response = await axios.request(options);
      sendData(response.data.location.name);
    } catch (error) {
      console.error(error);
    }
  }
  

  const handleUnitChange = (e) => {
    setUnit(e.target.name);
    sendUnitToParent(e.target.name);
  };

  const sendData = (data) => {
    setCity(data);
    sendDataToParent(data);
  };
  return (
    <div className="flex flex-row justify-center my-6">
      <div className="flex flex-row w-3/4 items-center justify-center space-x-4">
        <input
          type="text"
          value={city}
          placeholder="Search for city..."
          onChange={(e) => sendData(e.target.value)}
          className="text-xl font-light p-2 w-full shadow-xl shadow-gray-400 rounded-xl focus:outline-none capitalize placeholder:lowercase"
        />
        <FaSearch
          size={25}
          onClick={handleSearchClick}
          className="cursor-pointer transition ease-out hover:scale-125"
        />
        <SlLocationPin
          size={25}
          onClick={handleLocationClick}
          className="cursor-pointer transition ease-out hover:scale-125"
        />
        <div className="flex flex-row w-1/4 items-center justify-center">
          <button
            className="text-xl font-semibold"
            onClick={handleUnitChange}
            name="metric"
          >
            °C
          </button>
          <p className="text-xl mx-1">|</p>
          <button
            className="text-xl font-semibold"
            onClick={handleUnitChange}
            name="imperial"
          >
            °F
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchInput;
