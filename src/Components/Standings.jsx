import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import "./Stylings/Standings.css";

function Standings() {
  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get("id");
  const season = searchParams.get("season");
  const [standings, setStandings] = useState([]);

  const getStandings = async () => {
    try {
      const response = await fetch(
        `https://api-football-standings.azharimm.dev/leagues/${id}/standings?season=${season}&sort=asc`
      );
      const data = await response.json();
      setStandings(data.data.standings);
      console.log(data.data.standings[7]);
    } catch (e) {
      console.log("Error: " + e);
    }
  };

  const displayStandings = standings.map((item, index) => {
    // return <div key={index}>{item.team.name}</div>;
    return (
      <tr key={index}>
        <td>{index + 1}</td>
        <td>{item.team.name}</td>
        <td>{item.stats[2].value}</td>
      </tr>
    );
  });

  useEffect(() => {
    getStandings();
  }, []);

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Club</th>
            <th>Pts</th>
          </tr>
        </thead>

        <tbody>{displayStandings}</tbody>
      </table>
    </>
  );
}

export default Standings;
