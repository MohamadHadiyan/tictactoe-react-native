export const getCoords = (row, cell, level) => {
  const easy = level === "EASY";
  const top =
    row === 0 ? 31 : row === 1 ? 116 : row === 2 ? 201 : row === 3 ? 286 : 0;

  const left =
    cell === 0 && easy
      ? -85
      : cell === 0
      ? -125
      : cell === 1 && easy
      ? 0
      : cell === 1
      ? -40
      : cell === 2 && easy
      ? 85
      : cell === 2
      ? 46
      : cell === 3
      ? 128
      : 0;

  return { top, left };
};

export const checkIsWon = (turnProps) => {
  const { newMap, row, player, winLine, coords } = turnProps;
  const [map, current] = [newMap, player];
  // const { map, row, current, winLine, coords } = turnProps;
  const { top, left } = coords;

  let isWon = false;
  let wonLine = winLine;

  // Row Check
  if (map[row].every((item) => item === current)) {
    isWon = true;
    wonLine = {
      ...winLine,
      angle: 0,
      top,
      left: 0,
      width: 100,
    };
  }

  // Diagonal Check
  const first = map[0][0];
  const end = map[0][map.length - 1];
  const isHard = map.length > 3;

  const f_hardCheck = isHard ? first === map[3][3] : true;
  let e_hardCheck = end === map[1][1] && end === map[2][0];
  const fCheck = first !== "" && first === map[1][1];

  if (fCheck && first === map[2][2] && f_hardCheck) {
    isWon = true;
    wonLine = {
      ...winLine,
      angle: 45,
      top: 0,
      left: 0,
      width: 140,
    };
  }

  // If is Hard level
  if (isHard) {
    const check = end === map[1][2] && end === map[2][1];
    e_hardCheck = check && end === map[3][0];
  }

  if (end !== "" && e_hardCheck) {
    isWon = true;
    wonLine = {
      ...winLine,
      angle: -45,
      top: 0,
      left: 0,
      width: 140,
    };
  }

  // Column Check
  for (let c = 0; c < map.length; c++) {
    //
    const cell = map[0][c];
    const hardCheck = isHard ? cell === map[3][c] : true;
    const fCheck = cell !== "" && cell === map[1][c];

    if (fCheck && cell === map[2][c] && hardCheck) {
      //
      isWon = true;
      wonLine = {
        ...winLine,
        angle: 90,
        top: 0,
        left,
        width: 100,
      };
      //
    }
  }

  return { isWon, wonLine };
};

export const findWinner = (findProps) => {
  const { newMap, isWon, players, player } = findProps;
  let newPlayers = players;
  let result = player;

  const isFull = newMap.every((row) => row.every((cell) => cell !== ""));
  const xPlayer = players.xPlayer;
  const oPlayer = players.oPlayer;

  if (isFull && !isWon) {
    //
    newPlayers = {
      ...players,
      draws: players.draws + 1,
    };
    result = "draws";
    //
  } else if (player === "X" && isWon) {
    //
    newPlayers = {
      ...players,
      xPlayer: {
        ...xPlayer,
        score: xPlayer.score + 1,
      },
    };
    //
  } else if (isWon) {
    //
    newPlayers = {
      ...players,
      oPlayer: {
        ...oPlayer,
        score: oPlayer.score + 1,
      },
    };
    //
  }

  return { newPlayers, result };
};

export const getupdatedMap = (mapProps) => {
  const { currentMap, row, cell, player } = mapProps;

  return currentMap.map((r, r_id) =>
    r.map((c, c_id) => (r_id === row && c_id === cell ? player : c))
  );
};

export const botPlayer = (currentMap) => {
  /* === On The Easy level === */

  // Find Empty cells index
  const e_indexes = currentMap.map((rows) =>
    rows
      .map((cell, id) => (cell === "" ? id : -1))
      .filter((index) => index > -1)
  );

  // Select index
  const getRandom = (indexes) => {
    return indexes[Math.floor(Math.random() * indexes.length)];
  };

  // Get rows that include cell
  let rowIndexs = e_indexes
    .map((row, i) => (row.length ? i : -1))
    .filter((num) => num > -1);

  const row = getRandom(rowIndexs);
  const cell = getRandom(e_indexes[row]);

  /* On The Hard Level */

  return { row, cell };
};
