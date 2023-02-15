import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function PointsTable() {
  const { id } = useParams();
  const [apidata, setApidata] = useState([]);

  const getApiData = async () => {
    try {
      const response = await fetch(
        `https://cricbuzz-cricket.p.rapidapi.com/stats/v1/series/${id}/points-table`,
        {
          headers: {
            "X-RapidAPI-Key":
              "2a8016e8a9msha89647f2eb26617p1fd9d6jsn8c1a21455c46",
            "X-RapidAPI-Host": "cricbuzz-cricket.p.rapidapi.com",
          },
        }
      );
      const data = await response.json();
      setApidata(data.pointsTable[0].pointsTableInfo);
    } catch (e) {
      console.log("Error: " + e.message);
    }
  };

  const displayResult = apidata.map((item, index) => {
    return (
      <tr key={index}>
        <td>{index + 1}</td>
        <td className="player">{item.teamFullName}</td>
        <td>{item.matchesPlayed ? item.matchesPlayed : "0"}</td>
        <td>{item.matchesWon ? item.matchesWon : "0"}</td>
        <td>{item.matchesLost ? item.matchesLost : "0"}</td>
        <td>{item.nrr}</td>
        <td>{item.points ? item.points : "0"}</td>
        <td>{item.form.join(" ")}</td>
      </tr>
    );
  });

  useEffect(() => {
    getApiData();
  }, []);

  return (
    <>
      <table className="scorecard">
        <thead>
          <tr>
            <th>Sr.</th>
            <th className="player">Team</th>
            <th>M</th>
            <th>W</th>
            <th>L</th>
            <th>NRR</th>
            <th>Pts.</th>
            <th>Last 5</th>
          </tr>
        </thead>

        <tbody>{displayResult}</tbody>
      </table>
    </>
  );
}

export default PointsTable;
