import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import "../Stylings/F1.css";
import {
  standings2022,
  rounds2022,
  constructorLogo,
} from "./Resource/F1Resource";

function F1() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [apidata, setApidata] = useState([]);
  // const [apidata, setApidata] = useState(rounds2022);
  const [standings, setStandings] = useState([]);
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

  const getStandings = async (val) => {
    try {
      const response = await fetch(
        `https://ergast.com/api/f1/${val}/driverStandings.json`
      );
      const data = await response.json();
      setStandings(
        data.MRData.StandingsTable.StandingsLists[0].DriverStandings
      );
    } catch (e) {
      console.log("Error: " + e);
    }
  };

  const displayDriversStandings = standings.map((item, index) => {
    return (
      <tr key={index} className="tableRow">
        <td>{item.positionText}</td>
        <td>
          {item.Driver.givenName} {item.Driver.familyName}
        </td>
        <td className="constructorColumn">
          {item.Constructors[0] && (
            <img
              src={`${
                item.Constructors[0].name in constructorLogo
                  ? constructorLogo[item.Constructors[0].name]
                  : "https://cdn-icons-png.flaticon.com/512/16/16096.png"
              }`}
              className="constructorLogo"
            />
          )}{" "}
          {item.Constructors[0] ? item.Constructors[0].name : "Nil"}
        </td>
        <td>{item.points}</td>
        <td>{item.wins}</td>
      </tr>
    );
  });

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
    getStandings(
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
            getStandings(theseason);
            setYear(theseason);
            setSearchParams({ year: theseason });
          }}
          className="f1select"
        >
          {displayDropdown}
        </select>

        <div className="f1Standings-container">
          <div className="grandPrix">{displayResult}</div>

          <div className="f1Table">
            <table>
              <thead>
                <tr>
                  <th>Pos</th>
                  <th>Driver</th>
                  <th>Constructor</th>
                  <th>Pts.</th>
                  <th>Wins</th>
                </tr>
              </thead>
              <tbody className="f1-tbody">{displayDriversStandings}</tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default F1;
