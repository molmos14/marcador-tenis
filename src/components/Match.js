// Traducir puntos a marcador de tenis
export const calculateScore = (points) => {
  if (points === "Advantage") return "ADV";
  const scores = ["0", "15", "30", "40"];
  return scores[points] || "0";
};

// Verifica si alguien ganó el set
export const checkWinner = (gamesA, gamesB) => {
  if (gamesA >= 6 && gamesA - gamesB >= 2) {
    return "¡Jugador A gana el set!";
  }
  if (gamesB >= 6 && gamesB - gamesA >= 2) {
    return "¡Jugador B gana el set!";
  }
  return null;
};

// Actualiza puntaje normal (fuera del tiebreak)
export const updateGameScore = (
  pointsA,
  pointsB,
  gamesA,
  gamesB,
  setsA,
  setsB,
  scorer
) => {
  setsA = setsA || 0;
  setsB = setsB || 0;

  let isAdvA = pointsA === "Advantage";
  let isAdvB = pointsB === "Advantage";

  if (!isAdvA) pointsA = parseInt(pointsA, 10);
  if (!isAdvB) pointsB = parseInt(pointsB, 10);

  // Incrementa el punto al jugador que anotó
  if (scorer === "A") {
    if (isAdvA) {
      // Jugador A gana el juego
      const newGamesA = gamesA + 1;
      if (newGamesA >= 6 && newGamesA - gamesB >= 2) {
        return {
          setsA: setsA + 1,
          setsB,
          gamesA: 0,
          gamesB: 0,
          pointsA: 0,
          pointsB: 0,
        };
      }
      return {
        gamesA: newGamesA,
        gamesB,
        pointsA: 0,
        pointsB: 0,
        setsA,
        setsB,
      };
    }
    if (isAdvB) {
      return { gamesA, gamesB, pointsA: 3, pointsB: 3, setsA, setsB };
    }
    pointsA++;
  }

  if (scorer === "B") {
    if (isAdvB) {
      const newGamesB = gamesB + 1;
      if (newGamesB >= 6 && newGamesB - gamesA >= 2) {
        return {
          setsA,
          setsB: setsB + 1,
          gamesA: 0,
          gamesB: 0,
          pointsA: 0,
          pointsB: 0,
        };
      }
      return {
        gamesA,
        gamesB: newGamesB,
        pointsA: 0,
        pointsB: 0,
        setsA,
        setsB,
      };
    }
    if (isAdvA) {
      return { gamesA, gamesB, pointsA: 3, pointsB: 3, setsA, setsB };
    }
    pointsB++;
  }

  // Lógica de deuce
  if (pointsA >= 3 && pointsB >= 3) {
    if (pointsA === pointsB + 1) {
      return { gamesA, gamesB, pointsA: "Advantage", pointsB, setsA, setsB };
    }
    if (pointsB === pointsA + 1) {
      return { gamesA, gamesB, pointsA, pointsB: "Advantage", setsA, setsB };
    }
    if (pointsA === pointsB) {
      return { gamesA, gamesB, pointsA: 3, pointsB: 3, setsA, setsB };
    }
  }

  // Check si alguno gana
  if (pointsA >= 4 && pointsA - pointsB >= 2) {
    const newGamesA = gamesA + 1;
    if (newGamesA >= 6 && newGamesA - gamesB >= 2) {
      return {
        setsA: setsA + 1,
        setsB,
        gamesA: 0,
        gamesB: 0,
        pointsA: 0,
        pointsB: 0,
      };
    }
    return { gamesA: newGamesA, gamesB, pointsA: 0, pointsB: 0, setsA, setsB };
  }

  if (pointsB >= 4 && pointsB - pointsA >= 2) {
    const newGamesB = gamesB + 1;
    if (newGamesB >= 6 && newGamesB - gamesA >= 2) {
      return {
        setsA,
        setsB: setsB + 1,
        gamesA: 0,
        gamesB: 0,
        pointsA: 0,
        pointsB: 0,
      };
    }
    return { gamesA, gamesB: newGamesB, pointsA: 0, pointsB: 0, setsA, setsB };
  }

  return { gamesA, gamesB, pointsA, pointsB, setsA, setsB };
};

// Tiebreak de 7 puntos con diferencia de 2
// Esto es para el caso de que el set esté empatado 6-6
// En este caso, el jugador A gana si tiene 7 puntos y 2 de diferencia
// El jugador B gana si tiene 7 puntos y 2 de diferencia
export const handleTieBreak = (pointsA, pointsB, setsA, setsB, scorer) => {
  pointsA = parseInt(pointsA, 10);
  pointsB = parseInt(pointsB, 10);

  if (scorer === "A") pointsA++;
  else if (scorer === "B") pointsB++;

  if (pointsA >= 7 && pointsA - pointsB >= 2) {
    return {
      setsA: setsA + 1,
      setsB,
      gamesA: 0,
      gamesB: 0,
      pointsA: 0,
      pointsB: 0,
    };
  }

  if (pointsB >= 7 && pointsB - pointsA >= 2) {
    return {
      setsA,
      setsB: setsB + 1,
      gamesA: 0,
      gamesB: 0,
      pointsA: 0,
      pointsB: 0,
    };
  }

  // Continuar tiebreak
  return {
    setsA,
    setsB,
    gamesA: 6,
    gamesB: 6,
    pointsA,
    pointsB,
  };
};
