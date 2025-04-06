// Function to calculate the score based on the points
export const calculateScore = (points) => {
  const scores = ["0", "15", "30", "40"];
  if (points === "Advantage") {
    return "Advantage";
  }
  if (points < 4) {
    return scores[points];
  }
  return scores[points=3]; // Default to "40" for deuce or higher
};

// Function to check if a player has won the set
export function checkWinner(gamesA, gamesB) {
  if (gamesA >= 6 && gamesA - gamesB >= 2) {
    return "Jugador A es el ganador!";
  }
  if (gamesB >= 6 && gamesB - gamesA >= 2) {
    return "Jugador B es el ganador!";
  }
  return ""; // Return an empty string when there is no winner
}

// Function to update the game score based on the current points and games
export const updateGameScore = (pointsA, pointsB, gamesA, gamesB, setsA, setsB) => {
  // Ensure setsA and setsB are initialized
  setsA = setsA || 0;
  setsB = setsB || 0;

  // Check if both players are at deuce (40-40 or higher)
  if (pointsA >= 3 && pointsB >= 3) {
    if (pointsA === pointsB + 1) {
      return { gamesA, gamesB, pointsA: "Advantage", pointsB, setsA, setsB };
    }
    if (pointsB === pointsA + 1) {
      return { gamesA, gamesB, pointsA, pointsB: "Advantage", setsA, setsB };
    }
    if (pointsA === pointsB) {
      return { gamesA, gamesB, pointsA: 3, pointsB: 3, setsA, setsB }; // Reset to deuce
    }
  }

  // Check if Player A wins the game
  if (pointsA >= 4 && pointsA - pointsB >= 2) {
    const newGamesA = gamesA + 1;

    // Check if Player A wins the set
    if (newGamesA >= 6 && newGamesA - gamesB >= 2) {
      return { setsA: setsA + 1, setsB, gamesA: 0, gamesB: 0, pointsA: 0, pointsB: 0 };
    }

    return { gamesA: newGamesA, gamesB, pointsA: 0, pointsB: 0, setsA, setsB };
  }

  // Check if Player B wins the game
  if (pointsB >= 4 && pointsB - pointsA >= 2) {
    const newGamesB = gamesB + 1;

    // Check if Player B wins the set
    if (newGamesB >= 6 && newGamesB - gamesA >= 2) {
      return { setsA, setsB: setsB + 1, gamesA: 0, gamesB: 0, pointsA: 0, pointsB: 0 };
    }

    return { gamesA, gamesB: newGamesB, pointsA: 0, pointsB: 0, setsA, setsB };
  }

  // Default case: Increment points
  return { gamesA, gamesB, pointsA, pointsB, setsA, setsB };
};

// Function to handle the tie-break scenario
export const handleTieBreak = (pointsA, pointsB, setsA, setsB) => {
  if (pointsA >= 7 && pointsA - pointsB >= 2) {
    return { setsA: setsA + 1, setsB, pointsA: 0, pointsB: 0 };
  }
  if (pointsB >= 7 && pointsB - pointsA >= 2) {
    return { setsA, setsB: setsB + 1, pointsA: 0, pointsB: 0 };
  }
  return { setsA, setsB, pointsA, pointsB };
};