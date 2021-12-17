import { useSelector } from "react-redux";
import { getAllPositions } from "./../helpers/helpers";

export function PawnLogic(item, pieces) {
  const possibleSquares = [];
  const freePieces = [];
  const { color, position, piece } = item;
  const allPositions = getAllPositions(pieces);
  const positionY = parseInt(position[1]);
  const positionX = position[0];
  const crossLeft = String.fromCharCode(positionX.charCodeAt(0) + 1);
  const crossRight = String.fromCharCode(positionX.charCodeAt(0) - 1);

  if (color === "b") {
    //possible moves
    if (!allPositions.includes(`${positionX}${positionY - 1}`)) {
      possibleSquares.push(`${positionX}${positionY - 1}`);
      if (
        positionY === 7 &&
        !allPositions.includes(`${positionX}${positionY - 2}`)
      ) {
        possibleSquares.push(`${positionX}${positionY - 2}`);
      }
    }
    if (allPositions.includes(`${crossLeft}${positionY - 1}`)) {
      const freePiece = pieces.find(
        (p) =>
          p.position.includes(`${crossLeft}${positionY - 1}`) &&
          p.color === "w" &&
          p.type !== "k"
      );
      if (freePiece) {
        freePieces.push(`${crossLeft}${positionY - 1}`);
      }
    }

    if (allPositions.includes(`${crossRight}${positionY - 1}`)) {
      const freePiece = pieces.find(
        (p) =>
          p.position.includes(`${crossRight}${positionY - 1}`) &&
          p.color === "w" &&
          p.type !== "k"
      );
      if (freePiece) {
        freePieces.push(`${crossRight}${positionY - 1}`);
      }
    }
  } else {
    if (!allPositions.includes(`${positionX}${positionY + 1}`)) {
      possibleSquares.push(`${positionX}${positionY + 1}`);
      if (
        positionY === 2 &&
        !allPositions.includes(`${positionX}${positionY + 2}`)
      ) {
        possibleSquares.push(`${positionX}${positionY + 2}`);
      }
    }
    //free piece
    if (allPositions.includes(`${crossLeft}${positionY + 1}`)) {
      const freePiece = pieces.find(
        (p) =>
          p.position.includes(`${crossLeft}${positionY + 1}`) &&
          p.color === "b" &&
          p.type !== "k"
      );
      if (freePiece) {
        freePieces.push(`${crossLeft}${positionY + 1}`);
      }
    }

    if (allPositions.includes(`${crossRight}${positionY + 1}`)) {
      const freePiece = pieces.find(
        (p) =>
          p.position.includes(`${crossRight}${positionY + 1}`) &&
          p.color === "b" &&
          p.type !== "k"
      );
      if (freePiece) {
        freePieces.push(`${crossRight}${positionY + 1}`);
      }
    }
  }
  return { possibleSquares, freePieces };
}
