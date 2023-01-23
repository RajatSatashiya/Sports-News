import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./Stylings/FootballLeague.module.css";
import { Link } from "react-router-dom";

function FootballLeague() {
  const [league, setLeague] = useState();
  const [season, setSeason] = useState([]);
  const { id } = useParams();

  const getLeagueData = async () => {
    try {
      const response = await fetch(
        `https://api-football-standings.azharimm.dev/leagues/${id}`
      );
      const data = await response.json();
      setLeague(data.data);
    } catch (e) {
      console.log("Error: " + e);
    }
  };

  const getLeagueSeasons = async () => {
    try {
      const response = await fetch(
        `https://api-football-standings.azharimm.dev/leagues/${id}/seasons`
      );
      const data = await response.json();
      setSeason(data.data.seasons);
      console.log(data.data.seasons);
    } catch (e) {
      console.log("Error: " + e);
    }
  };

  const displaySeasons = season.map((item, index) => {
    return (
      <div key={index} className={styles.panel}>
        <Link
          to={`/standings?id=${id}&season=${item.year}`}
          className={styles.links}
        >
          {item.displayName}
        </Link>
      </div>
    );
  });

  useEffect(() => {
    getLeagueData();
    getLeagueSeasons();
  }, []);
  return (
    <>
      {league && (
        <div className={styles.header}>
          <img src={league.logos.light} className={styles.leagueLogo} />
          <span className={styles.title}>{league.name}</span>
        </div>
      )}

      {season && <div className={styles.seasons}>{displaySeasons}</div>}
    </>
  );
}

export default FootballLeague;
