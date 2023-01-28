import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import "./Stylings/Standings.css";

function Standings() {
  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get("id");
  const season = searchParams.get("season");
  const [standings, setStandings] = useState([]);
  const [isNote, setIsNote] = useState(false);

  const getStandings = async () => {
    try {
      const response = await fetch(
        `https://api-football-standings.azharimm.dev/leagues/${id}/standings?season=${season}&sort=asc`
      );
      const data = await response.json();
      setStandings(data.data.standings);
      if ("note" in data.data.standings[0]) {
        setIsNote(true);
      }
    } catch (e) {
      console.log("Error: " + e);
    }
  };

  const checkLeagueQualification = (item) => {
    if (item.note) {
      return item.note.color;
    }
    return "#EEEFB2";
  };

  const displayStandings = standings.map((item, index) => {
    return (
      <tr key={index}>
        <td
          style={{ borderLeft: "5px solid " + checkLeagueQualification(item) }}
        >
          {index + 1}
        </td>
        <td className="teamTitle">
          <img
            src={item.team.logos && item.team.logos[0].href}
            className="standingsLogo"
          />
          <span>{item.team.name}</span>
        </td>
        <td>{item.stats[0].value}</td>
        <td>{item.stats[6].value}</td>
        <td>{item.stats[5].value}</td>
        <td>{item.stats[1].value}</td>
        <td>{item.stats[2].value}</td>
      </tr>
    );
  });

  useEffect(() => {
    getStandings();
  }, []);

  return (
    <>
      <h2 className="seasonTitle">
        Season {season}-{(Number(season) + 1).toString().substring(2)}
      </h2>
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th className="club">Club</th>
            <th>MP</th>
            <th>W</th>
            <th>D</th>
            <th>L</th>
            <th>Pts</th>
          </tr>
        </thead>

        <tbody>{displayStandings}</tbody>
      </table>

      {isNote ? (
        <div className="qualification">
          <h4>Qualification / Relegations</h4>

          <div>
            <div className="championsleague">
              {standings[0].note.description}
            </div>
            <div className="europa">
              {standings[4].note && standings[4].note.description}
            </div>
            <div className="relegation">
              {standings[standings.length - 1].note.description}
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default Standings;
