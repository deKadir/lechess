import style from "./square.module.scss";
import { useDrop } from "react-dnd";
import { useSelector, useDispatch } from "react-redux";
import { movePiece } from "./../../store/actions/boardActions";
import { calculateMove } from "./../../scripts/pieceLogic";
import {
  getKing,
  validateMove,
  isValidNotation,
  canCastle,
  calculateAllMoves,
} from "./../../helpers/helpers";
import { useEffect, useState } from "react";

export default function Square({
  children,
  position,
  setLastMove,
  isLastMove,
  setCheck,
  castling,
  setCastling,
}) {
  const { pieces } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [color, setColor] = useState("transparent");
  const move = (item) => {
    var piece = item.id;
    const { attackingPieces, piecesCopy } = validateMove(
      piece,
      pieces,
      position,
      castling
    );
    if (!attackingPieces.length) {
      if (piece.type === "k") {
        castling[`${piece.color}`] = [];
        setCastling({ ...castling });
      }

      dispatch(movePiece(piecesCopy));
      setLastMove([position, piece.position]);

      if (piece.type === "r") {
        castling[`${piece.color}`] = castling[`${piece.color}`].filter(
          (p) => p !== piece.position
        );
        setCastling({ ...castling });
      }
      var enemyPieces = piecesCopy.filter((p) => p.color !== piece.color);
      var enemyKing = getKing(piecesCopy, piece.color === "w" ? "b" : "w");
      let check = false;
      var myPieces = piecesCopy.filter((p) => p.color === piece.color);
      const { freePieces: free } = calculateAllMoves(myPieces, piecesCopy);
      if (free.includes(enemyKing.position)) {
        check = true;
      }
      let checkmate = true;
      for (var i in enemyPieces) {
        var { possibleSquares, freePieces } = calculateMove(
          enemyPieces[i],
          piecesCopy
        );
        var allMoves = [];
        allMoves.push(...possibleSquares);
        allMoves.push(...freePieces);
        allMoves = allMoves.filter((m) => isValidNotation(m));
        allMoves.map((possibleSquare) => {
          var { attackingPieces: attackers } = validateMove(
            enemyPieces[i],
            piecesCopy,
            possibleSquare
          );
          if (!attackers.length) {
            checkmate = false;
            return 0;
          }
        });
      }
      if (check) {
        console.log("check");
        setCheck(enemyKing.position);
      } else {
        setCheck("");
      }
      if (checkmate) {
        if (check) {
          console.log("checkmate");
        } else {
          console.log("statemate");
        }
      }
    }
  };
  //sure king doesn't expose after moving
  var canMoveEvent = (item) => {
    var piece = item.id;

    const { attackingPieces, possibleSquares, freePieces } = validateMove(
      piece,
      pieces,
      position,
      castling
    );

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
        backgroundColor: isLastMove ? "lightblue" : color,
      }}
    >
      {children}
    </div>
  );
}
