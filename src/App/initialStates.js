export const easyMap = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];

export const hardMap = [
  ["", "", "", ""],
  ["", "", "", ""],
  ["", "", "", ""],
  ["", "", "", ""],
];

export const initialPlayers = {
  xPlayer: { name: "player 1", score: 0 },
  oPlayer: { name: "player 2", score: 0 },
  // current: Math.random() < 0.5 ? "X" : "O",
  draws: 0,
};

export const initialWinLine = {
  angle: 0,
  top: 0,
  left: 116,
  width: 100,
};

export const initialRoot = {
  time: 1,
  level: "EASY",
  mode: "SINGLE",
  players: initialPlayers,
  gameMap: easyMap,
};
