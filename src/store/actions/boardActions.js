import { MOVE_PIECE, RESET_BOARD } from "./../types";
export const movePiece = (board) => {
  return {
    type: MOVE_PIECE,
    payload: board,
  };
};

export const resetBoard = () => {
  return {
    type: RESET_BOARD,
  };
};
