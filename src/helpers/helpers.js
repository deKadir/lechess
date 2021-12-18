//returns positions of the all pieces
export const getAllPositions = (pieces) => {
  const positions = [];
  pieces.map((piece) => positions.push(...piece.position));
  return positions;
};

//returns piece from the position
export const getPieceFromPosition = (pieces, position) => {
  return pieces.find((p) => p.position.includes(position));
};

//returns index of piece inside the list
export const getIndexOfPiece = (pieces, piece) => {
  for (var i in pieces) {
    if (JSON.stringify(pieces[i]) === JSON.stringify(piece)) {
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
