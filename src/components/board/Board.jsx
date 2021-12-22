import Piece from "../piece/Piece";
import style from "./board.module.scss";
import Square from "./../square/Square";
import { useSelector } from "react-redux";

export default function Board() {
  const { pieces } = useSelector((state) => state);

  //board squares
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
        //set squares
        <Square key={pgn} position={pgn}>
          {pieces.map((p) => {
            //set piece positions to squares
            if (pgn.includes(p.position)) {
              return (
                <Piece
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
