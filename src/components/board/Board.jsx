import Piece from "../piece/Piece";
import style from "./board.module.scss";
import Square from "./../square/Square";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

export default function Board() {
  const castlingInfo = {
    w: ["a1", "h1"],
    b: ["a8", "h8"],
  };
  const { pieces } = useSelector((state) => state);
  const [check, setCheck] = useState("");
  const [lastMove, setLastMove] = useState([]);
  const [castling, setCastling] = useState(castlingInfo);
  //board squares
  const xAxis = ["a", "b", "c", "d", "e", "f", "g", "h"];
  const yAxis = [1, 2, 3, 4, 5, 6, 7, 8];
  let board = [];
  for (var i = 0; i < xAxis.length; i++) {
    for (var j = 0; j < yAxis.length; j++) {
      board.push(`${xAxis[i]}${yAxis[j]}`);
    }
  }
  useEffect(() => {
    console.log(castling);
  }, [castling]);

  return (
    <div className={style.board}>
      {board.map((pgn) => (
        //set squares
        <Square
          key={pgn}
          position={pgn}
          setLastMove={setLastMove}
          isLastMove={lastMove.includes(pgn)}
          setCheck={setCheck}
          setCastling={setCastling}
          castling={castling}
        >
          {pieces.map((p) => {
            //set piece positions to squares
            if (pgn.includes(p.position)) {
              return (
                <Piece
                  check={check === p.position}
                  key={pgn}
                  color={p.color}
                  piece={p.type}
                  position={p.position}
                />
              );
            }
          })}
        </Square>
      ))}
    </div>
  );
}
