import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import "../Stylings/F1.css";
import ConstructorStandings from "./ConstructorStandings";
import DriverStandings from "./DriverStandings";

function F1() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [apidata, setApidata] = useState([]);
  const [driverStandings, setDriverStandings] = useState([]);
  const [constructorStandings, setconstructorStandings] = useState([]);
  const [rankCategory, setRankCategory] = useState("driver");
  const [year, setYear] = useState(
    searchParams.get("year")
      ? searchParams.get("year")
      : new Date().getFullYear()
  );

  let seasons = [];
  for (var i = new Date().getFullYear(); i >= 1950; i--) {
    seasons.push(i);
  }

  const getSchedule = async (val) => {
    try {
      const response = await fetch(`https://ergast.com/api/f1/${val}.json`);
      const data = await response.json();
      setApidata(data.MRData.RaceTable.Races);
    } catch (e) {
      console.log("Error: " + e.message);
    }
  };

  const getDriverStandings = async (val) => {
    try {
      const response = await fetch(
        `https://ergast.com/api/f1/${val}/driverStandings.json`
      );
      const data = await response.json();
      setDriverStandings(
        data.MRData.StandingsTable.StandingsLists[0].DriverStandings
      );
    } catch (e) {
      console.log("Error: " + e);
    }
  };

  const getConstructorStandings = async (val) => {
    try {
      const response = await fetch(
        `http://ergast.com/api/f1/${val}/constructorStandings.json`
      );
      const data = await response.json();
      setconstructorStandings(
        data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings
      );
    } catch (e) {
      console.log("Error: " + e);
    }
  };

  const displaySchedule = apidata.map((item, index) => {
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
    getSchedule(
      searchParams.get("year")
        ? searchParams.get("year")
        : new Date().getFullYear()
    );
    getDriverStandings(
      searchParams.get("year")
        ? searchParams.get("year")
        : new Date().getFullYear()
    );

    getConstructorStandings(
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
            getSchedule(theseason);
            getDriverStandings(theseason);
            getConstructorStandings(theseason);
            setYear(theseason);
            setSearchParams({ year: theseason });
          }}
          className="f1select"
        >
          {displayDropdown}
        </select>

        <div className="f1Standings-container">
          <div className="grandPrix">{displaySchedule}</div>

          <div className="f1Table">
            <div className="standingsButton">
              <button onClick={() => setRankCategory("driver")}>
                Driver Standings
              </button>
              <button onClick={() => setRankCategory("constructor")}>
                Constructors Standings
              </button>
            </div>

            {rankCategory === "driver" ? (
              <DriverStandings standings={driverStandings} />
            ) : (
              <ConstructorStandings standings={constructorStandings} />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default F1;
