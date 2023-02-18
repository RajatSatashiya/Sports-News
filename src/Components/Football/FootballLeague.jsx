import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "../Stylings/FootballLeague.module.css";
import { useSearchParams } from "react-router-dom";
import Standings from "./Standings";

function FootballLeague() {
  const [searchParams, setSearchParams] = useSearchParams();
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
    if (id != "saudi") {
      getLeagueData();
      getLeagueSeasons();
    } else {
      setLeague({
        logos: {
          light:
            "https://assets.b365api.com/images/wp/o/2dbac37c1fbf72845c8eaa325f2efe98.webp",
        },
        name: "Saudi Pro League",
      });
    }
  }, []);
  return (
    <>
      {league && (
        <div className={styles.header}>
          <img src={league.logos.light} className={styles.leagueLogo} />
          <span className={styles.title}>{league.name}</span>
        </div>
      )}

      <Standings
        id={id}
        season={currentseason}
        leagues={season}
        league={searchParams.get("name")}
      />
    </>
  );
}

export default FootballLeague;
