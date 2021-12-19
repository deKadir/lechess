import {
  FREE_PIECES,
  POSSIBLE_MOVES,
  CHECK_ANIMATION,
  IS_DRAGGING,
} from "../types";
const default_state = {
  isCheck: false,
  possibleMoves: [],
  freePieces: [],
  isDragging: false,
};
const reducer = (state = default_state, action) => {
  switch (action.type) {
    case FREE_PIECES:
      state.freePieces.push(...action.payload);
      return state;
    case POSSIBLE_MOVES:
      state.possibleMoves.push(...action.payload);
      return state;
    case CHECK_ANIMATION:
      state.isCheck = action.payload;
      return state;
    case IS_DRAGGING:
      state.isDragging = action.payload;
      return state;
    default:
      return state;
  }
};
export default reducer;
