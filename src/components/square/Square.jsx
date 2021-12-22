import style from "./square.module.scss";
import { useDrop } from "react-dnd";
import { useSelector, useDispatch } from "react-redux";
import { movePiece } from "./../../store/actions/boardActions";
import { calculateMove } from "./../../scripts/pieceLogic";
import { isCheck, calculateAllMoves, getKing } from "./../../helpers/helpers";
import { useEffect, useState } from "react";

export default function Square({ children, position }) {
  const { pieces } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [color, setColor] = useState("transparent");
  const move = (item) => {
    var piece = item.id;
    var piecesCopy = JSON.parse(JSON.stringify(pieces));

    const { possibleSquares, freePieces } = calculateMove(piece, pieces);
    if (possibleSquares.includes(position)) {
      piecesCopy = piecesCopy.map((p) => {
        if (p.position === piece.position) {
          p.position = position;
          return p;
        } else {
          return p;
        }
      });
    }
    if (freePieces.includes(position)) {
      piecesCopy = piecesCopy.filter((p) => p.position !== position);
      piecesCopy = piecesCopy.map((p) => {
        if (p.position === piece.position) {
          p.position = position;
        }
        return p;
      });
    }
    var enemyPieces = piecesCopy.filter((p) => p.color !== color);
    var myKing = getKing(piecesCopy, piece.color);
    const { attackingPieces } = isCheck(enemyPieces, piecesCopy, myKing);
    if (attackingPieces.length) {
    } else {
      dispatch(movePiece(piecesCopy));
    }
  };
  var canMoveEvent = (item) => {
    var piece = item.id;
    var piecesCopy = JSON.parse(JSON.stringify(pieces));

    const { possibleSquares, freePieces } = calculateMove(piece, pieces);
    if (possibleSquares.includes(position)) {
      piecesCopy = piecesCopy.map((p) => {
        if (p.position === piece.position) {
          p.position = position;
          return p;
        } else {
          return p;
        }
      });
    }
    if (freePieces.includes(position)) {
      piecesCopy = piecesCopy.filter((p) => p.position !== position);
      piecesCopy = piecesCopy.map((p) => {
        if (p.position === piece.position) {
          p.position = position;
        }
        return p;
      });
    }
    var enemyPieces = piecesCopy.filter((p) => p.color !== color);
    var myKing = getKing(piecesCopy, piece.color);
    const { attackingPieces } = isCheck(enemyPieces, piecesCopy, myKing);
    if (attackingPieces.length) {
      return false;
    }
    return possibleSquares.includes(position) || freePieces.includes(position);
  };
  //drop event
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: "piece",
    drop: (item, monitor) => {
      move(item);
    },
    canDrop: (item) => canMoveEvent(item),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  });
  useEffect(() => {
    if (!isOver && canDrop) {
      setColor("rgba(255, 165,0,1)");
    } else if (isOver && canDrop) {
      setColor("rgba(255, 165,0,0.3)");
    } else {
      setColor("transparent");
    }
  }, [isOver, canDrop]);
  return (
    <div
      ref={drop}
      className={style.square}
      style={{
        backgroundColor: color,
      }}
    >
      {children}
    </div>
  );
}
