import React, { useState } from "react";
import Square from "./Square"

const Board = (props) => {
    const [status, setStatus] = useState("Next player: X");
    const [squares, setSquares] = useState(Array(9).fill(null));
    const [xIsNext, setXIsNext] = useState(true);


    const handleClick = (i) => {
        const copySquares = squares.slice();

        // 勝敗が決まっている場合、またはすでに文字が保存されている場合は処理を終了
        if (calculateWinner(copySquares) || copySquares[i]) {
            return
        }
        // 文字を保存
        copySquares[i] = xIsNext ? "X" : "○";
        setSquares(copySquares);


        // 勝敗が決まったか？
        const winner = calculateWinner(copySquares);
        // 決まった場合、勝者を表示
        if (winner){
            setStatus("Winer: " + winner);
        } else{
            // ターンをすすめる
            setXIsNext(!xIsNext);
            setStatus("Next player: " + (xIsNext ? "○" : "X"));
        }
    }

    const renderSquare = (i) => {
        return (
            <Square
                value={squares[i]}
                onClick={() => { handleClick(i) }}>
            </Square>
        )

    }

    // 勝者判定
　　const calculateWinner = (squares) => {
        const lines = [
          [0, 1, 2],
          [3, 4, 5],
          [6, 7, 8],
          [0, 3, 6],
          [1, 4, 7],
          [2, 5, 8],
          [0, 4, 8],
          [2, 4, 6],
        ];
        for (let i = 0; i < lines.length; i++) {
          const [a, b, c] = lines[i];
          if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
          }
        }
        return null;
      }

    return (
        <div>
            <div className="status">{status}</div>
            <div className="board-row">
                {renderSquare(0)}
                {renderSquare(1)}
                {renderSquare(2)}
            </div>
            <div className="board-row">
                {renderSquare(3)}
                {renderSquare(4)}
                {renderSquare(5)}
            </div>
            <div className="board-row">
                {renderSquare(6)}
                {renderSquare(7)}
                {renderSquare(8)}

            </div>

        </div>
    )
};
export default Board;