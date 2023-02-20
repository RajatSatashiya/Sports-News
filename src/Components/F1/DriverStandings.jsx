import React from "react";
import { constructorLogo, countryFlag } from "./Resource/F1Resource";

function DriverStandings({ standings }) {
  const displayDriversStandings = standings.map((item, index) => {
    return (
      <tr key={index} className="tableRow">
        <td>{item.positionText}</td>
        <td>
          <div className="constructorColumn">
            <img
              src={`${countryFlag[item.Driver.nationality]}`}
              className="constructorLogo"
            />
            {item.Driver.givenName} {item.Driver.familyName}
          </div>
        </td>
        <td>
          <div className="constructorColumn">
            {item.Constructors[0] && (
              <img
                src={`${
                  item.Constructors[0].name in constructorLogo
                    ? constructorLogo[item.Constructors[0].name]
                    : "https://cdn-icons-png.flaticon.com/512/16/16096.png"
                }`}
                className="constructorLogo"
              />
            )}{" "}
            {item.Constructors[0] ? item.Constructors[0].name : ""}
          </div>
        </td>
        <td>{item.points}</td>
        <td>{item.wins}</td>
      </tr>
    );
  });
  return (
      <>
        <table>
          <thead>
            <tr>
              <th>Pos</th>
              <th>Driver</th>
              <th>Constructor</th>
              <th>Pts.</th>
              <th>Wins</th>
            </tr>
          </thead>
          <tbody className="f1-tbody">{displayDriversStandings}</tbody>
        </table>
      </>
  );
}

export default DriverStandings;
