import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import CitiesTable from "./Components/CitiesTable";
import Weather from "./Components/Weather";

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<CitiesTable />} />
        <Route path="/weather/:cityName" element={<Weather />} />
      </Routes>
    </>
  );
}

export default App;
