import {
  CHECK_ANIMATION,
  POSSIBLE_MOVES,
  FREE_PIECES,
  IS_DRAGGING,
} from "./../types";
export const setCheck = (check) => {
  return {
    type: CHECK_ANIMATION,
    payload: check,
  };
};
export const setPossibleMoves = (possibleMoves) => {
  return {
    type: POSSIBLE_MOVES,
    payload: possibleMoves,
  };
};
export const setFreePieces = (freePieces) => {
  return {
    type: FREE_PIECES,
    payload: freePieces,
  };
};
export const setIsDragging = (isDragging) => {
  return {
    type: IS_DRAGGING,
    payload: isDragging,
  };
};
