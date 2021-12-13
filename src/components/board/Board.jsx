import React, { useState, useEffect } from "react";
import Piece from "../piece/Piece";
import style from "./board.module.scss";
import Square from "./../square/Square";
const pieces = [
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
export default function Board() {
  const [piece, movePiece] = useState(pieces);
  useEffect(() => {
    console.log(piece);
  }, []);
  const xAxis = ["a", "b", "c", "d", "e", "f", "g", "h"];
  const yAxis = [1, 2, 3, 4, 5, 6, 7, 8];
  let board = [];
  for (var i = 0; i < xAxis.length; i++) {
    for (var j = 0; j < yAxis.length; j++) {
      board.push(`${xAxis[i]}${yAxis[j]}`);
    }
  }

  return (
    <div className={style.board}>
      {board.map((pgn) => (
        <Square key={pgn} position={pgn} movePiece={movePiece} pieces={piece}>
          {pieces.map((p) => {
            if (p.position.includes(pgn)) {
              return <Piece color={p.color} piece={p.type} position={pgn} />;
            }
          })}
        </Square>
      ))}
    </div>
  );
}
