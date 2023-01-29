import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import "../Stylings/F1.css";

function F1() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [apidata, setApidata] = useState([]);
  const [year, setYear] = useState(
    searchParams.get("year")
      ? searchParams.get("year")
      : new Date().getFullYear()
  );

  let seasons = [];
  for (var i = new Date().getFullYear(); i >= 1950; i--) {
    seasons.push(i);
  }

  const getApiData = async (val) => {
    try {
      const response = await fetch(`https://ergast.com/api/f1/${val}.json`);
      const data = await response.json();
      setApidata(data.MRData.RaceTable.Races);
    } catch (e) {
      console.log("Error: " + e.message);
    }
  };

  const displayResult = apidata.map((item, index) => {
    return (
      <div className="prix" key={index}>
        <Link to={`/f1/${year}/${item.round}`}>
          {item.round}. {item.raceName}
        </Link>
      </div>
    );
  });

  const displayDropdown = seasons.map((item, index) => {
    return (
      <option key={index} value={item} selected={item == year}>
        {item}
      </option>
    );
  });

  useEffect(() => {
    getApiData(
      searchParams.get("year")
        ? searchParams.get("year")
        : new Date().getFullYear()
    );
  }, []);

  return (
    <>
      <div className="calendar">
        <h1>F1 Calendar - {year}</h1>

        <select
          onChange={(e) => {
            const theseason = e.target.value;
            getApiData(theseason);
            setYear(theseason);
            setSearchParams({ year: theseason });
          }}
          className="f1select"
        >
          {displayDropdown}
        </select>

        <div className="grandPrix">{displayResult}</div>
      </div>
    </>
  );
}

export default F1;
