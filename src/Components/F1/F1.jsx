import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../Stylings/F1.css";

function F1() {
  const [apidata, setApidata] = useState([]);
  const [year, setYear] = useState(new Date().getFullYear());

  let seasons = [];
  for (var i = new Date().getFullYear(); i >= 1950; i--) {
    seasons.push(i);
  }

  const getApiData = async (val) => {
    try {
      const response = await fetch(`http://ergast.com/api/f1/${val}.json`);
      const data = await response.json();
      setApidata(data.MRData.RaceTable.Races);
    } catch (e) {
      console.log("Error: " + e.message);
    }
  };

  const displayResult = apidata.map((item, index) => {
    return (
      <Link to={`/f1/${year}/${item.round}`} key={index}>
        <div>
          {item.round}. {item.raceName}
        </div>
      </Link>
    );
  });

  const displayDropdown = seasons.map((item, index) => {
    return <option key={index}>{item}</option>;
  });

  useEffect(() => {
    getApiData(new Date().getFullYear());
  }, []);

  return (
    <>
      <div className="calendar">
        <h1>F1 Calendar - {year}</h1>

        <select
          onChange={(e) => {
            getApiData(e.target.value);
            setYear(e.target.value);
          }}
        >
          {displayDropdown}
        </select>

        <div>{displayResult}</div>
      </div>
    </>
  );
}

export default F1;
