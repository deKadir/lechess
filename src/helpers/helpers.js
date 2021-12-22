import { calculateMove } from "../scripts/pieceLogic";
//returns positions of the all pieces
export const getAllPositions = (pieces) => {
  const positions = [];
  pieces.map((piece) => positions.push(...piece.position));
  return positions;
};

//returns piece from the position
export const getPieceFromPosition = (pieces, position) => {
  if (isValidNotation(position)) {
    return pieces.find((p) => p.position.includes(position));
  }
  return undefined;
};

//returns index of piece inside the list
export const getIndexOfPiece = (pieces, piece) => {
  for (var i in pieces) {
    if (pieces[i].position.includes(piece.position)) {
      return i;
    }
  }
  return -1;
};

//parse position into x and y
export const getXandYaxis = (position) => {
  return { positionX: position[0], positionY: parseInt(position[1]) };
};

export const getPreviousLetter = (position) => {
  return String.fromCharCode(position.charCodeAt(0) - 1);
};
export const getNextLetter = (position) => {
  return String.fromCharCode(position.charCodeAt(0) + 1);
};
export const isValidNotation = (position) => {
  const xAxis = ["a", "b", "c", "d", "e", "f", "g", "h"];
  const yAxis = [1, 2, 3, 4, 5, 6, 7, 8];
  let board = [];
  for (var i = 0; i < xAxis.length; i++) {
    for (var j = 0; j < yAxis.length; j++) {
      board.push(`${xAxis[i]}${yAxis[j]}`);
    }
  }
  return board.includes(position);
};
export const getPossibleCrossAxises = (item, pieces) => {
  const possibleSquares = [];
  const freePieces = [];
  const protecteds = [];
  const { position, color } = item;
  const { positionX, positionY } = getXandYaxis(position);
  var x = positionX;
  var y = positionY;
  while (true) {
    x = getNextLetter(x);
    y++;
    if (!isValidNotation(`${x}${y}`)) {
      break;
    }
    const piece = getPieceFromPosition(pieces, `${x}${y}`);
    if (piece) {
      if (piece.color !== color) {
        freePieces.push(`${x}${y}`);
      } else {
        protecteds.push(`${x}${y}`);
      }
      break;
    }
    possibleSquares.push(`${x}${y}`);
  }
  x = positionX;
  y = positionY;

  while (true) {
    x = getPreviousLetter(x);
    y--;
    if (!isValidNotation(`${x}${y}`)) {
      break;
    }
    const piece = getPieceFromPosition(pieces, `${x}${y}`);
    if (piece) {
      if (piece.color !== color) {
        freePieces.push(`${x}${y}`);
      } else {
        protecteds.push(`${x}${y}`);
      }
      break;
    }
    possibleSquares.push(`${x}${y}`);
  }
  x = positionX;
  y = positionY;
  while (true) {
    x = getPreviousLetter(x);
    y++;
    if (!isValidNotation(`${x}${y}`)) {
      break;
    }
    const piece = getPieceFromPosition(pieces, `${x}${y}`);
    if (piece) {
      if (piece.color !== color) {
        freePieces.push(`${x}${y}`);
      } else {
        protecteds.push(`${x}${y}`);
      }

      break;
    }
    possibleSquares.push(`${x}${y}`);
  }
  x = positionX;
  y = positionY;
  while (true) {
    x = getNextLetter(x);
    y--;
    if (!isValidNotation(`${x}${y}`)) {
      break;
    }
    const piece = getPieceFromPosition(pieces, `${x}${y}`);
    if (piece) {
      if (piece.color !== color) {
        freePieces.push(`${x}${y}`);
      } else {
        protecteds.push(`${x}${y}`);
      }

      break;
    }

    possibleSquares.push(`${x}${y}`);
  }
  return { possibleSquares, freePieces, protecteds };
};
export const getPossibleXandYaxises = (item, pieces) => {
  const { position, color } = item;
  const possibleSquares = [];
  const freePieces = [];
  const protecteds = [];
  const { positionX, positionY } = getXandYaxis(position);

  var x = positionX;
  var y = positionY;
  while (true) {
    x = getPreviousLetter(x);
    const piece = getPieceFromPosition(pieces, `${x}${positionY}`);
    if (piece || x.toUpperCase() === x.toLowerCase()) {
      if (piece && piece.color !== color) {
        freePieces.push(`${x}${positionY}`);
      } else {
        protecteds.push(`${x}${positionY}`);
      }
      x = positionX;
      break;
    }
    possibleSquares.push(`${x}${positionY}`);
  }
  while (true) {
    x = getNextLetter(x);
    const piece = getPieceFromPosition(pieces, `${x}${positionY}`);
    if (piece || x === "i") {
      if (piece && piece.color !== color) {
        freePieces.push(`${x}${positionY}`);
      } else {
        protecteds.push(`${x}${positionY}`);
      }
      x = positionX;
      break;
    }
    possibleSquares.push(`${x}${positionY}`);
  }

  while (true) {
    y++;
    const piece = getPieceFromPosition(pieces, `${positionX}${y}`);
    if (piece || y > 8) {
      if (piece && piece.color !== color) {
        freePieces.push(`${positionX}${y}`);
      } else {
        protecteds.push(`${positionX}${y}`);
      }
      y = positionY;
      break;
    }
    possibleSquares.push(`${positionX}${y}`);
  }
  while (true) {
    y--;
    const piece = getPieceFromPosition(pieces, `${positionX}${y}`);
    if (piece || y < 1) {
      if (piece && piece.color !== color) {
        freePieces.push(`${positionX}${y}`);
      } else {
        protecteds.push(`${positionX}${y}`);
      }
      y = positionY;
      break;
    }
    possibleSquares.push(`${positionX}${y}`);
  }
  return { possibleSquares, freePieces, protecteds };
};
export const kingMoves = (position) => {
  const { positionX, positionY } = getXandYaxis(position);
  const possibilities = [
    `${getNextLetter(positionX)}${positionY + 1}`,
    `${getNextLetter(positionX)}${positionY - 1}`,
    `${getNextLetter(positionX)}${positionY}`,
    `${getPreviousLetter(positionX)}${positionY + 1}`,
    `${getPreviousLetter(positionX)}${positionY - 1}`,
    `${getPreviousLetter(positionX)}${positionY}`,
    `${positionX}${positionY + 1}`,
    `${positionX}${positionY - 1}`,
  ];
  return possibilities;
};

export const getEnemyKing = (pieces, color) => {
  return pieces.find((p) => p.type === "k" && p.color !== color);
};
export const getKing = (pieces, color) => {
  return pieces.find((p) => p.type === "k" && p.color === color);
};
export const isCheck = (pieces, allPieces, enemyKing) => {
  var attackingPieces = [];

  for (var j in pieces) {
    var piece = pieces[j];
    for (var k in piece.position) {
      var { freePieces: free } = calculateMove(
        {
          color: piece.color,
          type: piece.type,
          position: piece.position[k],
        },
        allPieces
      );
      if (free.includes(enemyKing.position[0])) {
        attackingPieces.push({
          color: piece.color,
          type: piece.type,
          position: piece.position[k],
        });
      }
    }
  }

  return { attackingPieces };
};
export const calculateAllMoves = (pieceSet, pieces) => {
  var possibleSquares = [];
  var freePieces = [];
  for (var j in pieceSet) {
    var piece = pieceSet[j];
    for (var k in piece.position) {
      var { freePieces: free, possibleSquares: possible } = calculateMove(
        {
          color: piece.color,
          type: piece.type,
          position: piece.position[k],
        },
        pieces
      );
      freePieces.push(...free);
      possibleSquares.push(...possible);
    }
  }
  return { freePieces, possibleSquares };
};
