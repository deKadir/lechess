import style from "./square.module.scss";
import { useDrop } from "react-dnd";
import { useSelector, useDispatch } from "react-redux";
import { movePiece } from "./../../store/actions/boardActions";
import { PawnLogic } from "./../../scripts/pieceLogic";

export default function Square({ children, position }) {
  const { pieces } = useSelector((state) => state);
  const dispatch = useDispatch();

  //move piece
  const move = (item) => {
    var { id } = item;
    const draggedPiece = id.piece;
    const initialPosition = id.position;

    //get dragged element from pieces
    var element = pieces.find(
      (p) => p.type === draggedPiece && p.position.includes(initialPosition)
    );
    //get index of dragged element
    var indexOfElement = pieces.indexOf(element);
    //get position of dragged element
    var positionIndex = element.position.indexOf(initialPosition);

    const { possibleSquares, freePieces } = PawnLogic(id, pieces);

    if (possibleSquares.includes(position)) {
      pieces[indexOfElement].position[positionIndex] = position;
      dispatch(movePiece([...pieces]));
    }
    if (freePieces.includes(position)) {
      const freePiece = pieces.filter((p) => p.position.includes(position));
      const freePieceIndex = pieces.indexOf(freePiece);
      pieces[freePieceIndex].position = [
        ...pieces[freePieceIndex].position.filter((pos) => pos !== position),
      ];
      pieces[indexOfElement].position[positionIndex] = position;
      dispatch(movePiece([...pieces]));
    }
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
