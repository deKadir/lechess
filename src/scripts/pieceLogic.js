import {
  getXandYaxis,
  getPieceFromPosition,
  getPreviousLetter,
  getNextLetter,
  isValidNotation,
  getPossibleCrossAxises,
  getPossibleXandYaxises,
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
  const { possibleSquares, freePieces } = getPossibleXandYaxises(item, pieces);

  return { possibleSquares, freePieces };
}
export function knightLogic(item, pieces) {
  const { position } = item;
  const freePieces = [];
  const possibleSquares = [];
}
export function bishopLogic(item, pieces) {
  const { possibleSquares, freePieces } = getPossibleCrossAxises(item, pieces);

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
  const possibleSquares = [];
  const freePieces = [];
  possibleSquares.push(...getPossibleCrossAxises(item, pieces).possibleSquares);
  possibleSquares.push(...getPossibleXandYaxises(item, pieces).possibleSquares);
  freePieces.push(...getPossibleXandYaxises(item, pieces).freePieces);
  freePieces.push(...getPossibleCrossAxises(item, pieces).freePieces);
  console.log(freePieces);
  return { possibleSquares, freePieces };
}
