import { RESET_BOARD, MOVE_PIECE } from "../types";
const initial_pieces = [
  {
    type: "r",
    color: "b",
    position: "h8",
  },
  {
    type: "r",
    color: "b",
    position: "a8",
  },

  {
    type: "n",
    color: "b",
    position: "b8",
  },
  {
    type: "n",
    color: "b",
    position: "g8",
  },
  {
    type: "b",
    color: "b",
    position: "f8",
  },
  {
    type: "b",
    color: "b",
    position: "c8",
  },
  {
    type: "q",
    color: "b",
    position: "d8",
  },
  {
    type: "k",
    color: "b",
    position: "e8",
  },

  {
    type: "p",
    color: "b",
    position: "a7",
  },
  {
    type: "p",
    color: "b",
    position: "b7",
  },
  {
    type: "p",
    color: "b",
    position: "c7",
  },
  {
    type: "p",
    color: "b",
    position: "d7",
  },
  {
    type: "p",
    color: "b",
    position: "e7",
  },
  {
    type: "p",
    color: "b",
    position: "f7",
  },
  {
    type: "p",
    color: "b",
    position: "g7",
  },
  {
    type: "p",
    color: "b",
    position: "h7",
  },
  //white
  {
    type: "r",
    color: "w",
    position: "a1",
  },
  {
    type: "r",
    color: "w",
    position: "h1",
  },
  {
    type: "n",
    color: "w",
    position: "b1",
  },
  {
    type: "n",
    color: "w",
    position: "g1",
  },
  {
    type: "b",
    color: "w",
    position: "c1",
  },
  {
    type: "b",
    color: "w",
    position: "f1",
  },
  {
    type: "q",
    color: "w",
    position: "d1",
  },
  {
    type: "k",
    color: "w",
    position: "e1",
  },

  {
    type: "p",
    color: "w",
    position: "a2",
  },
  {
    type: "p",
    color: "w",
    position: "b2",
  },
  {
    type: "p",
    color: "w",
    position: "c2",
  },
  {
    type: "p",
    color: "w",
    position: "d2",
  },
  {
    type: "p",
    color: "w",
    position: "e2",
  },
  {
    type: "p",
    color: "w",
    position: "f2",
  },
  {
    type: "p",
    color: "w",
    position: "g2",
  },
  {
    type: "p",
    color: "w",
    position: "h2",
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
