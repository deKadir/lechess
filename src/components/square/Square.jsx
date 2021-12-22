import style from "./square.module.scss";
import { useDrop } from "react-dnd";
import { useSelector, useDispatch } from "react-redux";
import { movePiece } from "./../../store/actions/boardActions";
import { calculateMove } from "./../../scripts/pieceLogic";
import {
  isCheck,
  calculateAllMoves,
  getEnemyKing,
  getKing,
} from "./../../helpers/helpers";

export default function Square({ children, position }) {
  const { pieces } = useSelector((state) => state);
  const dispatch = useDispatch();
  const move = (item) => {
    var { id: piece } = item;
    const { type, color, position: piecePosition } = piece;
    var isIllegalMove = false;
    const { possibleSquares, freePieces } = calculateMove(piece, pieces);
    const myPieces = pieces.filter((p) => p.color === color && p.type !== "k");
    const enemyPieces = pieces.filter(
      (p) => p.color !== color && p.type !== "k"
    );
    const piecesCopy = JSON.parse(JSON.stringify(pieces));

    if (possibleSquares.includes(position) || freePieces.includes(position)) {
      //eat free piece if exist
      if (freePieces.includes(position)) {
        for (var x in piecesCopy) {
          var p = piecesCopy[x].position.indexOf(position);
          if (p !== -1) {
            piecesCopy[x].position.splice(p, 1);
          }
        }
      }

      //move

      var i = 0;
      for (i in piecesCopy) {
        var pos = piecesCopy[i].position.indexOf(piecePosition);
        if (pos !== -1) {
          piecesCopy[i].position[pos] = position;
        }
      }
      const king = getKing(piecesCopy, color);
      var { attackingPieces: attacking } = isCheck(
        enemyPieces,
        piecesCopy,
        king
      );
      if (attacking.length) {
        console.log("illegal");
        dispatch(movePiece([...pieces]));
      } else {
        console.log("legal");
        dispatch(movePiece([...piecesCopy]));
      }
      console.log(piecesCopy);
      //check if check or checkmate
      var enemyKing = getEnemyKing(pieces, color);

      const defenders = pieces.filter((p) => p.color !== color);
      var { attackingPieces } = isCheck(myPieces, pieces, enemyKing);
      const { possibleSquares: kingPossible, freePieces: kingFree } =
        calculateMove(
          {
            type: "k",
            color: enemyKing.color,
            position: enemyKing.position[0],
          },
          pieces
        );
      var check = false;
      var checkMate = false;

      if (attackingPieces.length == 2) {
        check = true;
        const { freePieces: freeP } = calculateAllMoves(defenders, pieces);
        if (!kingPossible.length && !kingFree.length) {
          checkMate = true;
        }
      } else if (attackingPieces.length == 1) {
        check = true;
        const { freePieces: freeP, possibleSquares: possibleS } =
          calculateAllMoves(defenders, pieces);

        if (
          attackingPieces[0].type === "q" ||
          attackingPieces[0].type === "b" ||
          attackingPieces[0].type === "r"
        ) {
          const { possibleSquares: attackingPossible } = calculateMove(
            attackingPieces[0],
            pieces
          );
          const blockingChances = possibleS.filter((p) =>
            attackingPossible.includes(p)
          );

          piecesCopy.push({
            type: "test",
            color: "any",
            position: [...blockingChances],
          });
          const { attackingPieces: attck } = isCheck(
            myPieces,
            piecesCopy,
            enemyKing
          );
          if (attck.length && !kingPossible.length && !kingFree.length) {
            checkMate = true;
          }
        }
      }
      console.log(`check:${check} checkmate:${checkMate}`);
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
