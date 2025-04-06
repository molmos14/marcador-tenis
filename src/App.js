import "./App.css";
import Titulo from "./components/Titulo";
import Puntos from "./components/Puntos";
import Boton from "./components/Boton";
import { useState } from "react";
import {
  calculateScore,
  checkWinner,
  updateGameScore,
  handleTieBreak,
} from "./components/Match";

function App() {
  // ESTADO
  const [pointsA, setPointsA] = useState(0);
  const [pointsB, setPointsB] = useState(0);
  const [gamesA, setGamesA] = useState(0);
  const [gamesB, setGamesB] = useState(0);
  const [setsA, setSetsA] = useState(0);
  const [setsB, setSetsB] = useState(0);

  // METODOS
  const onClickA = () => {
    console.log("Button A clicked");
    console.log("Current state:", { pointsA, pointsB, gamesA, gamesB, setsA, setsB });

    let updatedScore;
    if (gamesA === 6 && gamesB === 6) {
      updatedScore = handleTieBreak(pointsA + 1, pointsB, setsA, setsB);
    } else {
      updatedScore = updateGameScore(pointsA + 1, pointsB, gamesA, gamesB, setsA, setsB);
    }

    console.log("Updated score:", updatedScore);

    setPointsA(updatedScore.pointsA);
    setPointsB(updatedScore.pointsB);
    setGamesA(updatedScore.gamesA);
    setGamesB(updatedScore.gamesB);
    setSetsA(updatedScore.setsA);
    setSetsB(updatedScore.setsB);
  };

  const onClickB = () => {
    let updatedScore;
    if (gamesA === 6 && gamesB === 6) {
      // Handle tie-break
      updatedScore = handleTieBreak(pointsA, pointsB + 1, setsA, setsB);
    } else {
      // Regular game logic
      updatedScore = updateGameScore(pointsA, pointsB + 1, gamesA, gamesB, setsA, setsB);
    }

    setPointsA(updatedScore.pointsA);
    setPointsB(updatedScore.pointsB);
    setGamesA(updatedScore.gamesA);
    setGamesB(updatedScore.gamesB);
    setSetsA(updatedScore.setsA);
    setSetsB(updatedScore.setsB);
  };

  const onClickReset = () => {
    setPointsA(0);
    setPointsB(0);
    setGamesA(0);
    setGamesB(0);
    setSetsA(0);
    setSetsB(0);
  };

  const winner = checkWinner(gamesA, gamesB);
  const isWinner = Boolean(winner);

  return (
    <div className="App">
      <div className="scorecard" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "20px", textAlign: "center" }}>
        <Titulo texto="Jugador A" style={{ gridColumn: "1 / 2", fontWeight: "bold", fontSize: "1.5rem" }} />
        <Titulo texto="Marcador" style={{ gridColumn: "2 / 3", fontWeight: "bold", fontSize: "1.5rem" }} />
        <Titulo texto="Jugador B" style={{ gridColumn: "3 / 4", fontWeight: "bold", fontSize: "1.5rem" }} />

        <Puntos valor={`${setsA}`} style={{ gridColumn: "1 / 2", fontSize: "1.2rem" }} />
        <Puntos valor="Sets" style={{ gridColumn: "2 / 3", fontSize: "1.2rem" }} />
        <Puntos valor={`${setsB}`} style={{ gridColumn: "3 / 4", fontSize: "1.2rem" }} />

        <Puntos valor={`${gamesA}`} style={{ gridColumn: "1 / 2", fontSize: "1.2rem" }} />
        <Puntos valor="Juegos" style={{ gridColumn: "2 / 3", fontSize: "1.2rem" }} />
        <Puntos valor={`${gamesB}`} style={{ gridColumn: "3 / 4", fontSize: "1.2rem" }} />

        <Puntos valor={`${calculateScore(pointsA)}`} style={{ gridColumn: "1 / 2", fontSize: "1.2rem" }} />
        <Puntos valor="Puntos" style={{ gridColumn: "2 / 3", fontSize: "1.2rem" }} />
        <Puntos valor={`${calculateScore(pointsB)}`} style={{ gridColumn: "3 / 4", fontSize: "1.2rem" }} />
      </div>

      {winner && <h2 style={{ marginTop: "20px", color: "green" }}>{winner}</h2>}

      {!isWinner && (
        <div style={{ marginTop: "20px", display: "flex", justifyContent: "center", gap: "10px" }}>
          <Boton texto="Punto de A" onClick={onClickA} />
          <Boton texto="Punto de B" onClick={onClickB} />
        </div>
      )}
      <div style={{ marginTop: "20px", display: "flex", justifyContent: "center" }}>
        <Boton texto="Reiniciar" onClick={onClickReset} />
      </div>
    </div>
  );
}

export default App;