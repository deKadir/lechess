import {
  getXandYaxis,
  getPieceFromPosition,
  getPreviousLetter,
  getNextLetter,
  isValidNotation,
} from "./../helpers/helpers";

export default function calculateMove(item, pieces) {
  switch (item.piece) {
    case "p":
      return pawnLogic(item, pieces);
    case "r":
      return rookLogic(item, pieces);
    case "n":
      return knightLogic(item, pieces);
    case "b":
      return bishopLogic(item, pieces);
    case "q":
      return queenLogic(item, pieces);
    case "k":
      return kingLogic(item, pieces);
    default:
      return { possibleSquares: [], freePieces: [] };
  }
}

export function pawnLogic(item, pieces) {
  const possibleSquares = [];
  const freePieces = [];
  const { color, position } = item;
  const { positionX, positionY } = getXandYaxis(position);
  const crossLeft = getPreviousLetter(positionX);
  const crossRight = getNextLetter(positionX);
  //pawn is black
  if (color === "b") {
    //there is no piece in front of pawn
    if (!getPieceFromPosition(pieces, `${positionX}${positionY - 1}`)) {
      possibleSquares.push(`${positionX}${positionY - 1}`);
      //pawn on starting position so pawn can move two square
      if (
        positionY === 7 &&
        !getPieceFromPosition(pieces, `${positionX}${positionY - 2}`)
      ) {
        possibleSquares.push(`${positionX}${positionY - 2}`);
      }
    }

    //if any piece across the pawn, it can taken
    if (getPieceFromPosition(pieces, `${crossLeft}${positionY - 1}`)) {
      const { color, type } = getPieceFromPosition(
        pieces,
        `${crossLeft}${positionY - 1}`
      );
      if (color === "w" && type !== "k") {
        freePieces.push(`${crossLeft}${positionY - 1}`);
      }
    }
    if (getPieceFromPosition(pieces, `${crossRight}${positionY - 1}`)) {
      const { color, type } = getPieceFromPosition(
        pieces,
        `${crossRight}${positionY - 1}`
      );
      if (color === "w" && type !== "k") {
        freePieces.push(`${crossRight}${positionY - 1}`);
      }
    }
  }
  //pawn is white
  else {
    if (!getPieceFromPosition(pieces, `${positionX}${positionY + 1}`)) {
      possibleSquares.push(`${positionX}${positionY + 1}`);
      if (
        positionY === 2 &&
        !getPieceFromPosition(pieces, `${positionX}${positionY + 2}`)
      ) {
        possibleSquares.push(`${positionX}${positionY + 2}`);
      }
    }
    //free piece
    if (getPieceFromPosition(pieces, `${crossLeft}${positionY + 1}`)) {
      const { color, type } = getPieceFromPosition(
        pieces,
        `${crossLeft}${positionY + 1}`
      );
      if (color === "b" && type !== "k") {
        freePieces.push(`${crossLeft}${positionY + 1}`);
      }
    }
    if (getPieceFromPosition(pieces, `${crossRight}${positionY + 1}`)) {
      const { color, type } = getPieceFromPosition(
        pieces,
        `${crossRight}${positionY + 1}`
      );
      if (color === "b" && type !== "k") {
        freePieces.push(`${crossRight}${positionY + 1}`);
      }
    }
  }
  return { possibleSquares, freePieces };
}
export function rookLogic(item, pieces) {
  const { position, color } = item;
  const possibleSquares = [];
  const freePieces = [];
  const { positionX, positionY } = getXandYaxis(position);

  var x = positionX;
  var y = positionY;

  while (true) {
    x = getPreviousLetter(x);
    const piece = getPieceFromPosition(pieces, `${x}${positionY}`);
    if (piece || x.toUpperCase() === x.toLowerCase()) {
      if (piece && piece.color !== color && piece.type !== "k") {
        freePieces.push(`${x}${positionY}`);
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
      if (piece && piece.color !== color && piece.type !== "k") {
        freePieces.push(`${x}${positionY}`);
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
      if (piece && piece.color !== color && piece.type !== "k") {
        freePieces.push(`${positionX}${y}`);
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
      if (piece && piece.color !== color && piece.type !== "k") {
        freePieces.push(`${positionX}${y}`);
      }
      y = positionY;
      break;
    }
    possibleSquares.push(`${positionX}${y}`);
  }
  return { possibleSquares, freePieces };
}
export function knightLogic(item, pieces) {
  const { position } = item;
  const freePieces = [];
  const possibleSquares = [];
}
export function bishopLogic(item, pieces) {
  const { position, color } = item;
  const freePieces = [];
  const possibleSquares = [];
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
      if (piece.color !== color && piece.type !== "k") {
        freePieces.push(`${x}${y}`);
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
    console.log(x);
    const piece = getPieceFromPosition(pieces, `${x}${y}`);
    if (piece) {
      if (piece.color !== color && piece.type !== "k") {
        freePieces.push(`${x}${y}`);
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
      if (piece.color !== color && piece.type !== "k") {
        freePieces.push(`${x}${y}`);
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
      if (piece.color !== color && piece.type !== "k") {
        freePieces.push(`${x}${y}`);
      }

      break;
    }
    possibleSquares.push(`${x}${y}`);
  }
  x = positionX;
  y = positionY;
  console.log(possibleSquares);
  return { possibleSquares, freePieces };
}
export function kingLogic(item, pieces) {
  const { position, color } = item;
  const possibleSquares = [];
  const freePieces = [];
  const { positionX, positionY } = getXandYaxis(position);
  var x = positionX;
  var y = positionY;
}
export function queenLogic(item, pieces) {
  const { position, color } = item;
  const possibleSquares = [];
  const freePieces = [];
  const { positionX, positionY } = getXandYaxis(position);
  var x = positionX;
  var y = positionY;
}
