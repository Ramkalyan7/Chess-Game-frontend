import React, { useState } from "react";
import { Chess, Square } from "chess.js";

import Chessboard from "chessboardjsx";

type chessPieceMove = {
  sourceSquare: string;
  targetSquare: string;
  piece: string;
};

const ChessBoardComponent: React.FC = () => {
  const [game, setGame] = useState(new Chess());
  const [stylesOfSqures, setStylesOfSquares] = useState({});
  const [sytlesOfMovedSquares, setStylesOfMovedSquares] = useState({});
  const [chessPiecesOrientation, setChessPiecesOrientation] = useState<
    "white" | "black" | undefined
  >("black");

  const handleMove = (move: chessPieceMove) => {
    // Check if the move is valid
    try {
      if (game.move({ from: move.sourceSquare, to: move.targetSquare })) {
        // Update the game state and force a re-render
        setGame(new Chess(game.fen()));
        setStylesOfMovedSquares({
          [move.sourceSquare.toString()]: { backgroundColor: "yellow" },
          [move.targetSquare.toString()]: { backgroundColor: "yellow" },
        });

        // if (chessPiecesOrientation === "black")
        //   setChessPiecesOrientation("white");
        // else setChessPiecesOrientation("black");

        if (game.inCheck()) {
          alert("you are in check ");
        }

        if (game.isCheckmate()) {
          alert("check mate");
          setGame(new Chess());
          setStylesOfSquares({});
          setStylesOfMovedSquares({});
        }
      }
    } catch (error) {}
  };

  const onMouseOverSquare = (square: Square | undefined) => {
    const validMoves = game.moves({
      square: square,
      verbose: true,
    });
    const styleOfValidMoves: any = {};
    validMoves.forEach((validMove) => {
      styleOfValidMoves[validMove.to.toString()] = {
        borderWidth: "2px",
        borderColor: "green",
      };
    });

    setStylesOfSquares({
      ...styleOfValidMoves,
      ...sytlesOfMovedSquares,
    });
  };

  return (
    <div className=" grid grid-cols-8 gap-0 sm:w-full md:max-w-xl pt-10  m-auto">
      <Chessboard
        position={game.fen()}
        onDrop={handleMove}
        onMouseOverSquare={onMouseOverSquare}
        squareStyles={stylesOfSqures}
        orientation={chessPiecesOrientation}
      />
    </div>
  );
};

export default ChessBoardComponent;
