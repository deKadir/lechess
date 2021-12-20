import {
  getXandYaxis,
  getPieceFromPosition,
  getPreviousLetter,
  getNextLetter,
  getPossibleCrossAxises,
  getPossibleXandYaxises,
  kingMoves,
} from "./../helpers/helpers";

export default function calculateMove(item, pieces) {
  switch (item.type) {
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
  var isCheck = false;
  const protecteds = [];
  //pawn is black
  if (color === "b") {
    protecteds.push(`${crossLeft}${positionY - 1}`);
    protecteds.push(`${crossRight}${positionY - 1}`);
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
    const p1 = getPieceFromPosition(pieces, `${crossLeft}${positionY - 1}`);
    if (p1) {
      const { color, type } = getPieceFromPosition(
        pieces,
        `${crossLeft}${positionY - 1}`
      );
      if (color === "w") {
        freePieces.push(`${crossLeft}${positionY - 1}`);
      } else {
        protecteds.push(`${crossLeft}${positionY - 1}`);
      }
    }
    const p2 = getPieceFromPosition(pieces, `${crossRight}${positionY - 1}`);
    if (p2) {
      const { color } = getPieceFromPosition(
        pieces,
        `${crossRight}${positionY - 1}`
      );
      if (color === "w") {
        freePieces.push(`${crossRight}${positionY - 1}`);
      } else {
        protecteds.push(`${crossRight}${positionY - 1}`);
      }
    }
  }
  //pawn is white
  else {
    protecteds.push(`${crossLeft}${positionY + 1}`);
    protecteds.push(`${crossRight}${positionY + 1}`);
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
    const p1 = getPieceFromPosition(pieces, `${crossLeft}${positionY + 1}`);
    if (p1) {
      const { color } = getPieceFromPosition(
        pieces,
        `${crossLeft}${positionY + 1}`
      );
      if (color === "b") {
        freePieces.push(`${crossLeft}${positionY + 1}`);
      } else {
        protecteds.push(`${crossLeft}${positionY + 1}`);
      }
    }
    const p2 = getPieceFromPosition(pieces, `${crossRight}${positionY + 1}`);
    if (p2) {
      const { color } = getPieceFromPosition(
        pieces,
        `${crossRight}${positionY + 1}`
      );
      if (color === "b") {
        freePieces.push(`${crossRight}${positionY + 1}`);
      } else {
        protecteds.push(`${crossRight}${positionY + 1}`);
      }
    }
  }

  return { possibleSquares, freePieces, protecteds };
}
export function rookLogic(item, pieces) {
  const { possibleSquares, freePieces, protecteds } = getPossibleXandYaxises(
    item,
    pieces
  );

  return { possibleSquares, freePieces, protecteds };
}
export function knightLogic(item, pieces) {
  const { position, color } = item;
  const freePieces = [];
  const possibleSquares = [];
  const { positionX, positionY } = getXandYaxis(position);
  const protecteds = [];
  var possibilities = [
    `${getNextLetter(positionX)}${positionY - 2}`,
    `${getPreviousLetter(positionX)}${positionY - 2}`,
    `${getNextLetter(getNextLetter(positionX))}${positionY - 1}`,
    `${getPreviousLetter(getPreviousLetter(positionX))}${positionY - 1}`,
    `${getPreviousLetter(getPreviousLetter(positionX))}${positionY + 1}`,
    `${getNextLetter(getNextLetter(positionX))}${positionY + 1}`,
    `${getPreviousLetter(positionX)}${positionY + 2}`,
    `${getNextLetter(positionX)}${positionY + 2}`,
  ];
  for (var i in possibilities) {
    var piece = getPieceFromPosition(pieces, possibilities[i]);
    if (piece) {
      if (piece.color !== color) {
        freePieces.push(possibilities[i]);
      } else {
        protecteds.push(possibilities[i]);
      }
    } else {
      possibleSquares.push(possibilities[i]);
    }
  }

  return { possibleSquares, freePieces, protecteds };
}
export function bishopLogic(item, pieces) {
  const { possibleSquares, freePieces, protecteds } = getPossibleCrossAxises(
    item,
    pieces
  );

  return { possibleSquares, freePieces, protecteds };
}
export function kingLogic(item, pieces) {
  const { position, color } = item;
  var possibleSquares = [];
  var freePieces = [];
  var illegalMoves = [];
  const possibilities = kingMoves(position);
  const enemyKing = pieces.find((p) => p.type === "k" && p.color !== color);
  illegalMoves.push(...kingMoves(enemyKing.position[0]));
  for (var i in possibilities) {
    var existingPiece = getPieceFromPosition(pieces, possibilities[i]);
    if (existingPiece) {
      if (existingPiece.color !== color) {
        freePieces.push(possibilities[i]);
      } else {
        illegalMoves.push(possibilities[i]);
      }
    } else {
      possibleSquares.push(possibilities[i]);
    }
  }
  var enemyPieces = pieces.filter((p) => p.color !== color && p.type !== "k");

  for (var j in enemyPieces) {
    var enemy = enemyPieces[j];
    for (var k in enemy.position) {
      var { possibleSquares: possible, protecteds } = calculateMove(
        {
          color: enemy.color,
          type: enemy.type,
          position: enemy.position[k],
        },
        pieces
      );
      if (protecteds) {
        illegalMoves.push(...protecteds);
      }
      if (enemy.type !== "p") {
        illegalMoves.push(...possible);
      }
    }
  }
  illegalMoves = [...new Set(illegalMoves)];
  possibleSquares = possibleSquares.filter(
    (square) => !illegalMoves.includes(square)
  );
  freePieces = freePieces.filter((square) => !illegalMoves.includes(square));

  return { possibleSquares, freePieces };
}
export function queenLogic(item, pieces) {
  const possibleSquares = [];
  const freePieces = [];
  const protecteds = [];
  possibleSquares.push(...getPossibleCrossAxises(item, pieces).possibleSquares);
  possibleSquares.push(...getPossibleXandYaxises(item, pieces).possibleSquares);
  freePieces.push(...getPossibleXandYaxises(item, pieces).freePieces);
  freePieces.push(...getPossibleCrossAxises(item, pieces).freePieces);
  protecteds.push(...getPossibleCrossAxises(item, pieces).protecteds);
  protecteds.push(...getPossibleXandYaxises(item, pieces).protecteds);
  return { possibleSquares, freePieces, protecteds };
}
