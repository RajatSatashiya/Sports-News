import React from "react";
import styles from "../Stylings/Competitions.module.css";
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
        <Link
          to={`/league/${item.id}?name=${item.name}`}
          className={styles.links}
        >
          <div>{item.name}</div>
        </Link>
      </div>
    );
  });

  useEffect(() => {
    getLeagues();
  }, []);
  return (
    <>
      <div className={styles.competitions}>
        <div className={styles.panel}>
          <img
            src={
              "https://assets.b365api.com/images/wp/o/2dbac37c1fbf72845c8eaa325f2efe98.webp"
            }
            alt="saudiprofessionalleague"
            className={(styles.leagueLogo, styles.saudiLogo)}
          />
          <Link
            to={`/league/saudi?name=saudiprofessionalleague`}
            className={styles.links}
          >
            <div>Saudi Professional League</div>
          </Link>
        </div>

        {displayItems}
      </div>
    </>
  );
}

export default Competitions;

// other working football api -> https://football98.p.rapidapi.com/competitions
// tipsscore.com
// football web pages
