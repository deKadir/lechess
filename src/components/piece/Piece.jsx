import style from "./piece.module.scss";
import { useDrag } from "react-dnd";

export default function Tile({ piece, position, color }) {
  let img;

  if (piece && color) {
    img = require(`../../assets/images/${piece}_${color}.svg`).default;
  }

  //dragged piece
  const [{ isDragging }, drag] = useDrag({
    type: "piece",
    item: {
      type: "piece",
      id: { color, piece, position },
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <img
      className={style.piece}
      ref={drag}
      key={position}
      src={img}
      style={{ opacity: isDragging ? 0 : 1 }}
    />
  );
}
