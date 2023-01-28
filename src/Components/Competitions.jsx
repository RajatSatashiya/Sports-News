import React from "react";
import styles from "./Stylings/Competitions.module.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Competitions() {
  const [competitions, setCompetitions] = useState([]);

  const getLeagues = async () => {
    try {
      const response = await fetch(
        "https://api-football-standings.azharimm.dev/leagues"
      );
      const data = await response.json();
      setCompetitions(data.data);

      const res = await fetch(
        "https://cricbuzz-cricket.p.rapidapi.com/series/v1/international",
        {
          method: "GET",
          headers: {
            "X-RapidAPI-Key":
              "2a8016e8a9msha89647f2eb26617p1fd9d6jsn8c1a21455c46",
            "X-RapidAPI-Host": "cricbuzz-cricket.p.rapidapi.com",
          },
        }
      );
      const d = await res.json();
      console.log(d);
    } catch (e) {
      console.log("Error: " + e);
    }
  };

  const displayItems = competitions.map((item, index) => {
    return (
      <div className={styles.panel} key={index}>
        <img
          src={item.logos.light}
          alt={item.slug}
          className={styles.leagueLogo}
        />
        <Link to={`/league/${item.id}`} className={styles.links}>
          <div>{item.name}</div>
        </Link>
      </div>
    );
  });

  useEffect(() => {
    getLeagues();
  }, []);
  return <div className={styles.competitions}>{displayItems}</div>;
}

export default Competitions;

// other working football api -> https://football98.p.rapidapi.com/competitions
