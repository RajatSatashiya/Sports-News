import React from "react";
import { Link } from "react-router-dom";

function Card({ sport, image }) {
  return (
    <div className="card">
      <Link to={sport}>
        <img src={image} alt="sports illustration" className="sportsImage" />
        <div className="sport">{sport}</div>
      </Link>
    </div>
  );
}

export default Card;
