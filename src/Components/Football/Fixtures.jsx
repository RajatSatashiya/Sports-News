import React, { useEffect, useState } from "react";
import "../Stylings/Football.css";
import { LeagueMap } from "./Resource/LeagueMap";

function Fixtures({ league }) {
  const [apidata, setApidata] = useState([]);
  const [results, setResults] = useState([]);

  const getResults = async () => {
    try {
      const response = await fetch(
        `https://football98.p.rapidapi.com/${LeagueMap[league]}/results`,
        {
          headers: {
            "X-RapidAPI-Key":
              "2a8016e8a9msha89647f2eb26617p1fd9d6jsn8c1a21455c46",
            "X-RapidAPI-Host": "football98.p.rapidapi.com",
          },
        }
      );
      const data = await response.json();
      // console.log(data);
      setResults(data);
    } catch (e) {
      console.log("Error: " + e.message);
    }
  };

  const getApiData = async () => {
    try {
      const response = await fetch(
        `https://football98.p.rapidapi.com/${LeagueMap[league]}/fixtures`,
        {
          headers: {
            "X-RapidAPI-Key":
              "2a8016e8a9msha89647f2eb26617p1fd9d6jsn8c1a21455c46",
            "X-RapidAPI-Host": "football98.p.rapidapi.com",
          },
        }
      );
      const data = await response.json();
      setApidata(data);
    } catch (e) {
      console.log("Error: " + e.message);
    }
  };

  const displayResults = results.map((item, index) => {
    var matchday = Object.keys(item);

    return matchday.map((matchup, index2) => (
      <div key={index2}>
        <div className="matchdaytext">{matchup}</div>
        <div className="matchday">
          {item[matchup].map((match, index3) => {
            return (
              <div className="matchfixture" key={index3}>
                <div className="fixtureTeam">
                  <h5>
                    <img src={match.homeLogo} alt={match.homeTeam + "logo"} />
                    <div>{match.homeTeam}</div>
                  </h5>
                  <h5>
                    <img src={match.awayLogo} alt={match.awayTeam + "logo"} />
                    <div>{match.awayTeam}</div>
                  </h5>
                </div>
                <div className="date">
                  {match.homeTeamScore} - {match.awayTeamScore}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    ));
  });

  const displayFixtures = apidata.map((item, index) => {
    var matchday = Object.keys(item);

    return matchday.map((matchup, index2) => (
      <div key={index2}>
        <div className="matchdaytext">{matchup}</div>
        <div className="matchday">
          {item[matchup].map((match, index3) => {
            return (
              <div className="matchfixture" key={index3}>
                <div className="fixtureTeam">
                  <h5>
                    <img src={match.homeLogo} alt={match.homeTeam + "logo"} />
                    <div>{match.homeTeam}</div>
                  </h5>
                  <h5>
                    <img src={match.awayLogo} alt={match.awayTeam + "logo"} />
                    <div>{match.awayTeam}</div>
                  </h5>
                </div>
                <div className="date">{match.MatchDay}</div>
              </div>
            );
          })}
        </div>
      </div>
    ));
  });

  useEffect(() => {
    if (LeagueMap[league]) {
      // getResults();
      // getApiData();
    }
  }, []);

  return (
    <>
      <div className="fixtures">{displayResults}</div>
      <div className="fixtures">{displayFixtures}</div>
    </>
  );
}

export default Fixtures;
