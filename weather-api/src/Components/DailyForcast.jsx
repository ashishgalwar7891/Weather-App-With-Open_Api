import React from 'react'
import { DateConverter } from '../Services/weatherServices';

const DailyForcast = ({ title, forecast, current, unit }) => {
  if (forecast === undefined) return ;
  if (current === undefined) return ;
  return (
    <div>
      <div className="flex items-center justify-start mt-6">
        <p className="font-bold text-lg uppercase">{title}</p>
      </div>
      <hr className="my-2" />

      <div className="flex flex-row items-center justify-between ">
        <div className="flex flex-col items-center justify-center bg-slate-300 rounded-md p-2 ">
          <p className="font-medium text-md">
            {DateConverter(forecast.forecastday[0].date)}
          </p>
          <img
            src={forecast.forecastday[0].day.condition.icon}
            className="w-12 my-1"
          />
          <p className="font-normal">
            Humidity :- {forecast.forecastday[0].day.avghumidity} %
          </p>
          <p className="font-normal">
            Max Temp. :-{" "}
            {unit === "metric"
              ? `${forecast.forecastday[0].day.maxtemp_c} °C`
              : `${forecast.forecastday[0].day.maxtemp_f} °F`}
          </p>
          <p className="font-normal">
            WindSpeed :- {forecast.forecastday[0].day.maxwind_kph} km/h
          </p>
        </div>
        <div className="flex flex-col items-center justify-center bg-slate-300 rounded-md p-2">
          <p className="font-medium text-md">
            {DateConverter(forecast.forecastday[1].date)}
          </p>
          <img
            src={forecast.forecastday[1].day.condition.icon}
            className="w-12 my-1"
          />
          <p className="font-normal">
            Humidity :- {forecast.forecastday[1].day.avghumidity} %
          </p>
          <p className="font-normal">
            Max Temp. :-{" "}
            {unit === "metric"
              ? `${forecast.forecastday[1].day.maxtemp_c} °C`
              : `${forecast.forecastday[1].day.maxtemp_f} °F`}
          </p>
          <p className="font-normal">
            WindSpeed :- {forecast.forecastday[1].day.maxwind_kph} km/h
          </p>
        </div>
        <div className="flex flex-col items-center justify-center bg-slate-300 rounded-md p-2">
          <p className="font-medium text-md">
            {DateConverter(forecast.forecastday[2].date)}
          </p>
          <img
            src={forecast.forecastday[2].day.condition.icon}
            className="w-12 my-1"
          />
          <p className="font-normal">
            Humidity :- {forecast.forecastday[2].day.avghumidity} %
          </p>
          <p className="font-normal">
            Max Temp. :-{" "}
            {unit === "metric"
              ? `${forecast.forecastday[2].day.maxtemp_c} °C`
              : `${forecast.forecastday[2].day.maxtemp_f} °F`}
          </p>
          <p className="font-normal">
            WindSpeed :- {forecast.forecastday[2].day.maxwind_kph} km/h
          </p>
        </div>
      </div>
    </div>
  );
};

export default DailyForcast