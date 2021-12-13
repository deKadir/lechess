import React, { useRef } from "react";
import style from "./square.module.scss";
import { useDrop } from "react-dnd";
export default function Square({ children, position, movePiece, pieces }) {
  const move = (item) => {
    var { id } = item;

    var [pi, pos] = id.split("_");
    var element = pieces.find((p) => p.type === pi && p.position.includes(pos));

    var indexOfElement = pieces.indexOf(element);
    var positionIndex = element.position.indexOf(pos);
    console.log(indexOfElement);
    console.log(positionIndex);
    movePiece([
      ...pieces,
      (pieces[indexOfElement].position[positionIndex] = position),
    ]);
    console.log(pieces);
  };
  const [{ isOver }, drop] = useDrop({
    accept: "piece",
    drop: (item, monitor) => {
      move(item);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });
  return (
    <div
      ref={drop}
      style={{ backgroundColor: isOver ? "gray" : "" }}
      className={style.square}
    >
      {children}
    </div>
  );
}
