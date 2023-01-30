import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "../Stylings/FootballLeague.module.css";
import Standings from "../Standings";

function FootballLeague() {
  const [league, setLeague] = useState();
  const [currentseason, setCurrentseason] = useState(0);
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
      setCurrentseason(data.data.seasons[0].year);
    } catch (e) {
      console.log("Error: " + e);
    }
  };

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

      <Standings id={id} season={currentseason} leagues={season} />
    </>
  );
}

export default FootballLeague;
