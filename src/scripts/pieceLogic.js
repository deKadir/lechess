import {
  getAllPositions,
  getXandYaxis,
  getCrossLeftAndRight,
  getPieceFromPosition,
} from "./../helpers/helpers";

export default function calculateMove(item, pieces) {
  switch (item.piece) {
    case "p":
      return PawnLogic(item, pieces);

    default:
      return { possibleSquares: [], freePieces: [] };
  }
}

export function PawnLogic(item, pieces) {
  const possibleSquares = [];
  const freePieces = [];
  const { color, position } = item;
  const { positionX, positionY } = getXandYaxis(position);
  const { crossRight, crossLeft } = getCrossLeftAndRight(position);
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

    //if any piece across the pawn, it can take the pieces
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
