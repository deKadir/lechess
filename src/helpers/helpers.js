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
    if (JSON.stringify(pieces[i]) == JSON.stringify(piece)) {
      return i;
    }
  }
  return -1;
};

//parse position into x and y
export const getXandYaxis = (position) => {
  return { positionX: position[0], positionY: parseInt(position[1]) };
};

//finds next and previous letters
export const getCrossLeftAndRight = (position) => {
  const { positionX } = getXandYaxis(position);
  return {
    crossLeft: String.fromCharCode(positionX.charCodeAt(0) + 1),
    crossRight: String.fromCharCode(positionX.charCodeAt(0) - 1),
  };
};
