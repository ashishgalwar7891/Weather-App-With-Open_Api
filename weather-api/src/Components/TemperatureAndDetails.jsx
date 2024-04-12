import React from 'react'
import { FaTemperatureHigh } from "react-icons/fa6";
import { FaWind } from "react-icons/fa";
import { FaDroplet } from "react-icons/fa6";
import { IoSunny } from "react-icons/io5";
import { TbSunset2 } from "react-icons/tb";
import { FaArrowDownLong } from "react-icons/fa6";
import { FaArrowUpLong } from "react-icons/fa6";

function TemperatureAndDetails({ forecast, current, unit }) {
  if (current === undefined) return ;
  if (forecast === undefined) return ;
  return (
    <div>
      <div className="flex items-center justify-center py-6 text-xl text-red-700">
        <p>{current.condition.text}</p>
      </div>

      <div className="flex flex-row items-center justify-around py-3">
        <img src={current.condition.icon} className="w-20" />
        <p className="text-2xl">{unit === "metric" ? `${current.temp_c} °C` : `${current.temp_f} °F`}</p>
        <div className="flex flex-col space-y-2">
          <div className="flex font-medium text-sm items-center justify-left">
            <FaTemperatureHigh size={18} className="mr-1" />
            Real fell :
            <span className="font-medium ml-1">{unit === "metric" ? `${current.temp_c} °C` : `${current.temp_f} °F`}</span>
          </div>
          <div className="flex font-medium text-sm items-center justify-left">
            <FaDroplet size={18} className="mr-1" />
            Humidity :
            <span className="font-medium ml-1">{current.humidity} %</span>
          </div>
          <div className="flex font-medium text-sm items-center justify-left">
            <FaWind size={18} className="mr-1" />
            Wind speed :
            <span className="font-medium ml-1">{current.wind_kph} km/h</span>
          </div>
        </div>
      </div>

      <div className="flex flex-row items-center justify-center py-3 text-sm space-x-2">
        <IoSunny size={25} />
        <p className="font-medium">
          Rise : <span className="font-medium ml-1">{forecast.forecastday[0].astro.sunrise}</span>
        </p>
        <p className="font-medium">|</p>
        <TbSunset2 size={25} />
        <p className="font-medium">
          Set : <span className="font-medium ml-1">{forecast.forecastday[0].astro.sunset}</span>
        </p>
        <p className="font-medium">|</p>
        <FaArrowUpLong size={18} />
        <p className="font-medium">
          High : <span className="font-medium ml-1">{unit === "metric" ? `${forecast.forecastday[0].day.maxtemp_c} °C` : `${forecast.forecastday[0].day.maxtemp_f} °F`}</span>
        </p>
        <p className="font-medium">|</p>
        <FaArrowDownLong size={18} />
        <p className="font-medium">
          Low : <span className="font-medium ml-1">{unit === "metric" ? `${forecast.forecastday[0].day.mintemp_c} °C` : `${forecast.forecastday[0].day.mintemp_f} °F`}</span>
        </p>
      </div>
    </div>
  );
}

export default TemperatureAndDetails