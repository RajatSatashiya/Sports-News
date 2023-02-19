import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useParams } from "react-router-dom";

function Race() {
  const [apidata, setApidata] = useState([]);
  const [results, setResults] = useState([]);
  const [title, setTitle] = useState("");
  const { year, round } = useParams();

  const getApiData = async () => {
    try {
      const response = await fetch(
        `https://ergast.com/api/f1/${year}/${round}.json`
      );
      const data = await response.json();
      setTitle(data.MRData.RaceTable.Races[0].raceName);
      setApidata(data.MRData.RaceTable.Races);
    } catch (e) {
      console.log("Error: " + e.message);
    }
  };

  const getResults = async () => {
    try {
      const response = await fetch(
        `https://ergast.com/api/f1/${year}/${round}/results.json`
      );
      const data = await response.json();
      if (data.MRData.RaceTable.Races.length != 0) {
        setResults(data.MRData.RaceTable.Races[0].Results);
      }
    } catch (e) {
      console.log("Error: " + e.message);
    }
  };

  const displayResults = results.map((item, index) => {
    return (
      <tr key={index}>
        <td>{item.positionText}</td>
        <td>
          {item.Driver.givenName} {item.Driver.familyName}
        </td>
        <td>{item.Constructor.name}</td>
        <td>{item.grid}</td>
        <td>{item.points}</td>
        <td>{item.status}</td>
      </tr>
    );
  });

  useEffect(() => {
    getApiData();
    getResults();
  }, []);

  return (
    <>
      <h3 className="RaceTitle">
        {title} - {year}
      </h3>

      {apidata[0] && (
        <div className="raceDetails">
          <h4>Circuit</h4>
          <div>
            {apidata[0].Circuit.circuitName},{" "}
            {apidata[0].Circuit.Location.locality}
          </div>

          <h4>Session</h4>
          <div>Race: {apidata[0].date} </div>
        </div>
      )}

      {results.length != 0 && (
        <table className="raceTable">
          <thead>
            <tr>
              <th>Pos</th>
              <th>Driver</th>
              <th>Constructor</th>
              <th>Grid</th>
              <th>Pts.</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>{displayResults}</tbody>
        </table>
      )}
    </>
  );
}

export default Race;
