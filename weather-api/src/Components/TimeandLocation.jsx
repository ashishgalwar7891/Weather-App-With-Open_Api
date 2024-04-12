import React from 'react'
import { DateTimeConverter } from '../Services/weatherServices';

const TimeandLocation = ({ location }) => {
  if (location === undefined) return ;
  console.log(location);
  return (
    <>
      <div className="flex items-center justify-center my-6">
        <p className="text-xl font-normal ">
          {DateTimeConverter(location.localtime)}
        </p>
      </div>

      <div className="flex items-center justify-center my-3">
        <p className="text-3xl font-medium">
          {location.name}, {location.region}, {location.country}
        </p>
      </div>
    </>
  );
};

export default TimeandLocation