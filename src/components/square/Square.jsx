import style from "./square.module.scss";
import { useDrop } from "react-dnd";
import { useSelector, useDispatch } from "react-redux";
import { movePiece } from "./../../store/actions/boardActions";
import { calculateMove } from "./../../scripts/pieceLogic";
import { getEnemyKing } from "./../../helpers/helpers";

export default function Square({ children, position }) {
  const { pieces } = useSelector((state) => state);
  const dispatch = useDispatch();
  const move = (item) => {
    var { id: piece } = item;
    const { type, color, position: piecePosition } = piece;

    const { possibleSquares, freePieces } = calculateMove(piece, pieces);

    if (possibleSquares.includes(position) || freePieces.includes(position)) {
      //eat free piece if exist
      if (freePieces.includes(position)) {
        for (var x in pieces) {
          var p = pieces[x].position.indexOf(position);
          if (p !== -1) {
            pieces[x].position.splice(p, 1);
          }
        }
      }
      //move

      var i = 0;
      for (i in pieces) {
        var pos = pieces[i].position.indexOf(piecePosition);
        if (pos !== -1) {
          pieces[i].position[pos] = position;
        }
      }
      dispatch(movePiece([...pieces]));
      var { possibleSquares: possible, freePieces: free } = calculateMove(
        { type, color, position },
        pieces
      );
      var enemyKing = getEnemyKing(pieces, color);
      //check
      if (free.includes(enemyKing.position[0])) {
        var kingPossible = calculateMove(
          {
            type: enemyKing.type,
            color: enemyKing.color,
            position: enemyKing.position[0],
          },
          pieces
        );

        if (type === "q" || type === "b") {
          //block if its queen or bishop
        }
        if (
          !(
            kingPossible.freePieces.length ||
            kingPossible.possibleSquares.length
          )
        ) {
          console.log("checkmate");
        }
        console.log(kingPossible);
      }
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
