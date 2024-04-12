import React, { useState, useEffect } from "react";
import axios from "axios";

const CitiesTable = ({ sendCityNameToParent }) => {
  const [cities, setCities] = useState([]);
  const [filteredCities, setFilteredCities] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [serialNumber, setSerialNumber] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    fetchCityData();
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const fetchCityData = async () => {
    try {
      const response = await axios.get(
        "https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?limit=100"
      );
      console.log(response.data.results[0]);
      setCities(response.data.results);
      setFilteredCities(response.data.results);
    } catch (error) {
      console.error("Error fetching city data:", error);
    }
  };

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearchTerm(searchTerm);
    const filteredCities = cities.filter(
      (city) =>
        city.name.toLowerCase().includes(searchTerm) ||
        city.cou_name_en.toLowerCase().includes(searchTerm) ||
        city.timezone.toLowerCase().includes(searchTerm)
    );
    setFilteredCities(filteredCities);
  };

  const handleCityClick = (cityName) => {
    window.location.href = `weather/${cityName}`;
  };

  const handleCityRightClick = (e, cityName) => {
    e.preventDefault();
    window.open(`weather/${cityName}`, "_blank");
  };

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
    const sortedCities = filteredCities.sort((a, b) => {
      console.log(a);
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });
    setFilteredCities(sortedCities);
    setIsOpen(false);
  };

  return (
    <>
      <div className="mx-auto max-w-screen-lg mt-4 py-5 px-32 h-fit shadow-xl shadow-gray-400">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-4 mr-2">
            <input
              type="text"
              className="block w-full px-4 py-2 mb-4 mr-8 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              placeholder="Search cities..."
              value={searchTerm}
              onChange={handleSearch}
            />

            <div className="relative inline-block text-left mb-4">
              <button
                type="button"
                className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
                onClick={toggleDropdown}
              >
                Sorting
                <svg
                  className="-mr-1 ml-2 h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 12a1 1 0 0 1-.7-.29l-4-4a1 1 0 1 1 1.41-1.42L10 9.59l3.3-3.3a1 1 0 1 1 1.4 1.42l-4 4a1 1 0 0 1-.7.29z"
                  />
                </svg>
              </button>

              {isOpen && (
                <ul className="absolute left-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <li>
                    <a
                      onClick={() => handleSort("name")}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 cursor-pointer"
                    >
                      By Name
                    </a>
                  </li>
                  <li>
                    <a
                      onClick={() => handleSort("cou_name_en")}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 cursor-pointer"
                    >
                      By Country
                    </a>
                  </li>
                  <li>
                    <a
                      onClick={() => handleSort("country_code")}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 cursor-pointer"
                    >
                      By Country Code
                    </a>
                  </li>
                  <li>
                    <a
                      onClick={() => handleSort("timezone")}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 cursor-pointer"
                    >
                      By Timezone
                    </a>
                  </li>
                </ul>
              )}
            </div>
          </div>

          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="border px-4 py-2">S.No.</th>
                <th
                  className="border px-4 py-2 cursor-pointer"
                  onClick={() => handleSort("name")}
                >
                  City Name
                </th>
                <th
                  className="border px-4 py-2 cursor-pointer"
                  onClick={() => handleSort("cou_name_en")}
                >
                  Country
                </th>
                <th
                  className="border px-4 py-2 cursor-pointer"
                  onClick={() => handleSort("country_code")}
                >
                  Country Code
                </th>
                <th
                  className="border px-4 py-2 cursor-pointer"
                  onClick={() => handleSort("timezone")}
                >
                  Timezone
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredCities.map((city, index) => (
                <tr key={city.name} className="hover:bg-gray-100">
                  <td className="border px-4 py-2">{serialNumber + index}</td>
                  <td
                    className="border px-4 py-2 cursor-pointer"
                    onClick={() => handleCityClick(city.name)}
                    onContextMenu={(e) => handleCityRightClick(e, city.name)}
                  >
                    {city.name}
                  </td>
                  <td className="border px-4 py-2">{city.cou_name_en}</td>
                  <td className="border px-4 py-2">{city.country_code}</td>
                  <td className="border px-4 py-2">{city.timezone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="text-center text-red-700 font-bold p-24 m-auto">
        NoTE :- The Open API that you provided for the CityTable only gives details for
        a random selection of 100 cities. So, if we want more cities, we need to subscribe and pay some amount.
        So, As of Now we are not able to fetch more than 100 cities.
      </div>
    </>
  );
};

export default CitiesTable;
