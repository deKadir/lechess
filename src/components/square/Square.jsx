import style from "./square.module.scss";
import { useDrop } from "react-dnd";
import { useSelector, useDispatch } from "react-redux";
import { movePiece } from "./../../store/actions/boardActions";

export default function Square({ children, position }) {
  const { pieces } = useSelector((state) => state);
  const dispatch = useDispatch();

  //move piece
  const move = (item) => {
    var { id } = item;
    var [pieceColor, draggedPiece, initialPosition] = id.split("_");

    //get dragged element from pieces
    var element = pieces.find(
      (p) => p.type === draggedPiece && p.position.includes(initialPosition)
    );
    //get index of dragged element
    var indexOfElement = pieces.indexOf(element);
    //get position of dragged element
    var positionIndex = element.position.indexOf(initialPosition);
    pieces[indexOfElement].position[positionIndex] = position;
    dispatch(movePiece([...pieces]));
  };

  //drop event
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
