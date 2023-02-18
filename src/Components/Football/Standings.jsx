import React, { useEffect, useState } from "react";
import "../Stylings/Standings.css";
import { saudiTable } from "./Resource/LeagueMap";
import Fixtures from "./Fixtures";

function Standings({ id, season, leagues, league }) {
  const [standings, setStandings] = useState([]);
  const [saudiStandings, setSaudiStandings] = useState([]);
  const [isNote, setIsNote] = useState(false);

  const getStandings = async (id_value, season_value) => {
    try {
      const response = await fetch(
        `https://api-football-standings.azharimm.dev/leagues/${id_value}/standings?season=${season_value}&sort=asc`
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

  const getSaudiStandings = async () => {
    try {
      const response = await fetch(
        "https://football98.p.rapidapi.com/saudiprofessionalleague/table",
        {
          headers: {
            "X-RapidAPI-Key":
              "2a8016e8a9msha89647f2eb26617p1fd9d6jsn8c1a21455c46",
            "X-RapidAPI-Host": "football98.p.rapidapi.com",
          },
        }
      );
      const data = await response.json();
      setSaudiStandings(data);
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

  const displaySaudiStandings = saudiStandings.map((item, index) => {
    return (
      <tr key={index}>
        <td
        // style={{ borderLeft: "5px solid " + checkLeagueQualification(item) }}
        >
          {index + 1}
        </td>
        <td className="teamTitle">
          <img src={item.SquadLogo} className="standingsLogo" />
          <span>{item.Name}</span>
        </td>
        <td>{item.Played}</td>
        <td>{item.Winned}</td>
        <td>{item.Tie}</td>
        <td>{item.Loosed}</td>
        <td>{item.Points}</td>
      </tr>
    );
  });

  const displayDropdown = leagues.map((item, index) => {
    const leagueYear = item.displayName.split(" ")[0];
    return (
      <option key={index} value={item.year}>
        {leagueYear}
      </option>
    );
  });

  useEffect(() => {
    if (id === "saudi") {
      getSaudiStandings();
    } else {
      getStandings(id, season);
    }
  }, []);

  return (
    <>
      {id != "saudi" ? (
        <>
          <h2 className="seasonTitle">Season</h2>
          <select
            onChange={(e) => {
              getStandings(id, e.target.value);
            }}
            className="footballSelect"
          >
            {displayDropdown}
          </select>
        </>
      ) : (
        ""
      )}

      <div className="stanFixt">
        <div className="standingTable">
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

            <tbody>
              {id === "saudi" ? displaySaudiStandings : displayStandings}
            </tbody>
          </table>

          {isNote ? (
            <div className="qualification">
              <h4>Qualification / Relegations</h4>

              <div>
                <div className="championsleague">
                  {standings[0].note && standings[0].note.description}
                </div>
                <div className="europa">
                  {standings[4].note && standings[4].note.description}
                </div>
                <div className="relegation">
                  {standings[standings.length - 1].note &&
                    standings[standings.length - 1].note.description}
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>

        <div>
          <Fixtures league={league} />
        </div>
      </div>

      {/* <Results /> */}
    </>
  );
}

export default Standings;
