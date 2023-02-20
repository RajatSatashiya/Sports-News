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
      console.log(data);
      setApidata(data.pointsTable);
    } catch (e) {
      console.log("Error: " + e.message);
    }
  };

  const displayResult = apidata.map((item, index) => {
    return (
      <table className="scorecard pointstable" key={index}>
        <thead>
          <tr>
            <th>Sr.</th>
            <th className="player">{item.groupName}</th>
            <th>M</th>
            <th>W</th>
            <th>L</th>
            <th>NRR</th>
            <th>Pts.</th>
            <th>Last 5</th>
          </tr>
        </thead>

        <tbody>
          {item.pointsTableInfo.map((row, index2) => {
            return (
              <tr key={index2}>
                <td>{index2 + 1}</td>
                <td className="player">{row.teamFullName}</td>
                <td>{row.matchesPlayed ? row.matchesPlayed : "0"}</td>
                <td>{row.matchesWon ? row.matchesWon : "0"}</td>
                <td>{row.matchesLost ? row.matchesLost : "0"}</td>
                <td>{row.nrr}</td>
                <td>{row.points ? row.points : "0"}</td>
                <td>{row.form ? row.form.join(" ") : ""}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  });

  useEffect(() => {
    getApiData();
  }, []);

  return <>{displayResult}</>;
}

export default PointsTable;
