export const getAllPositions = (pieces) => {
  const positions = [];
  pieces.map((piece) => positions.push(...piece.position));
  return positions;
};
export const getPieceFromPosition = (pieces, position) => {
  return pieces.filter((p) => p.position.includes(position));
};
export const getIndexOfPiece = (pieces, piece) => {
  for (var i in pieces) {
    if (JSON.stringify(pieces[i]) == JSON.stringify(piece)) {
      return i;
    }
  }
  return -1;
};
