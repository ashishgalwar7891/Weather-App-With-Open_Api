import React from "react";

const HourlyForcast = ({ title, forecast, current, unit }) => {
  if (forecast === undefined) return;
  if (current === undefined) return;
  return (
    <div>
      <div className="flex items-center justify-start mt-6">
        <p className="font-bold text-lg uppercase">{title}</p>
      </div>
      <hr className="my-2" />

      <div className="flex flex-wrap items-start justify-center my-3" >
        {forecast.forecastday[0].hour.map((item, index) => {
          return (
            <div className="flex flex-col items-center justify-center bg-slate-300 rounded-md p-1 m-1 w-16" key={index}>
              <p className="font-light text-sm">
                {forecast.forecastday[0].hour[index].time.slice(11, 16)}
              </p>
              <img
                src={forecast.forecastday[0].hour[index].condition.icon}
                className="w-12 my-1"
              />
              <p className="font-medium">
                {unit === "metric"
                  ? `${forecast.forecastday[0].hour[index].temp_c} °C`
                  : `${forecast.forecastday[0].hour[index].temp_f} °F`}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HourlyForcast;
