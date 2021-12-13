import style from "./piece.module.scss";
import { useDrag } from "react-dnd";
import { useRef } from "react";

export default function Tile({ piece, position, color }) {
  let img;
  const pieceRef = useRef();
  if (piece && color) {
    img = require(`../../assets/images/${piece}_${color}.svg`).default;
  }
  const [{ isDragging }, drag] = useDrag({
    type: "piece",
    item: {
      type: "piece",
      id: `${piece}_${position}`,
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });
  const onMouseDown = (e) => {
    /* //center of the piece
    e.target.style.position = "absolute";
    e.target.style.left = `${e.clientX - 33}px`;
    e.target.style.top = `${e.clientY - 33}px`; */
  };
  const onMouseMove = (e) => {
    /*  e.target.style.left = `${e.clientX - 33}px`;
    e.target.style.top = `${e.clientY - 33}px`; */
  };
  return (
    <img
      className={style.piece}
      ref={drag}
      /* onMouseDown={onMouseDown}
      onDrag={onMouseMove}
  
      onDragEnd={(e) => {
        e.target.style.left = `${e.clientX - 33}px`;
        e.target.style.top = `${e.clientY - 33}px`;
      }}
       */ key={position}
      src={img}
      style={{ opacity: isDragging ? 0 : 1 }}
    />
  );
}
