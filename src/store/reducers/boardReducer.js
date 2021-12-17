import { RESET_BOARD, MOVE_PIECE } from "../types";
const initial_pieces = [
  {
    type: "r",
    color: "b",
    position: ["a8", "h8"],
  },
  {
    type: "n",
    color: "b",
    position: ["b8", "g8"],
  },
  {
    type: "b",
    color: "b",
    position: ["c8", "f8"],
  },
  {
    type: "q",
    color: "b",
    position: ["e8"],
  },
  {
    type: "k",
    color: "b",
    position: ["d8"],
  },

  {
    type: "p",
    color: "b",
    position: ["a7", "b7", "c7", "d7", "e7", "f7", "g7", "h7"],
  },
  //white
  {
    type: "r",
    color: "w",
    position: ["a1", "h1"],
  },
  {
    type: "n",
    color: "w",
    position: ["b1", "g1"],
  },
  {
    type: "b",
    color: "w",
    position: ["c1", "f1"],
  },
  {
    type: "q",
    color: "w",
    position: ["e1"],
  },
  {
    type: "k",
    color: "w",
    position: ["d1"],
  },

  {
    type: "p",
    color: "w",
    position: ["a2", "b2", "c2", "d2", "e2", "f2", "g2", "h2"],
  },
];

const reducer = (state = initial_pieces, action) => {
  switch (action.type) {
    case RESET_BOARD:
      return state;
    case MOVE_PIECE:
      state = action.payload;
      return state;
    default:
      return state;
  }
};
export default reducer;
