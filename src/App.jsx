import { useState, useRef } from "react";
import "./index.css";

export default function App() {
  return (
    <div className="App">
      <TicTacToe />
    </div>
  );
}

function TicTacToe() {
  const [boardSize, setBoardSize] = useState();
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [statusText, setStatusText] = useState("");
  const resultObj = useRef();
  const inputRef = useRef();
  const movesCount = useRef(0);
  const statusTextRef = useRef();
  const blockBoardUpdates = useRef(false);

  const resetGame = () => {
    setBoardSize(null);
    setCurrentPlayer("X");
    movesCount.current = 0;
    blockBoardUpdates.current = false;
  };

  const updateBoard = (e) => {
    // check if clicked on already filled box
    if (e.target.innerText || blockBoardUpdates.current) return;

    let targetRow = +e.target.getAttribute("data-row");
    let targetCol = +e.target.getAttribute("data-col");
    // update UI
    e.target.innerText = currentPlayer; // "X" or "O";
    movesCount.current += 1;

    // calulate win
    if (checkForWin(targetRow, targetCol)) declareWin();
    else {
      // draw scenario
      if (movesCount.current === boardSize * boardSize) {
        statusTextRef.current?.classList.add("red");
        setStatusText(`That's a draw`);
        blockBoardUpdates.current = true;
      } else {
        // update for next player turn
        setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
        setStatusText(`Player ${currentPlayer === "X" ? "O" : "X"} turn`);
      }
    }
  };

  const checkForWin = (targetRow, targetCol) => {
    resultObj.current.row[targetRow] += currentPlayer === "X" ? 1 : -1;
    if (
      resultObj.current.row[targetRow] ===
      (currentPlayer === "X" ? boardSize : -1 * boardSize)
    ) {
      return true;
    }

    resultObj.current.col[targetCol] += currentPlayer === "X" ? 1 : -1;
    if (
      resultObj.current.col[targetCol] ===
      (currentPlayer === "X" ? boardSize : -1 * boardSize)
    ) {
      return true;
    }

    if (targetCol === targetRow) {
      resultObj.current.diag[0] += currentPlayer === "X" ? 1 : -1;
      if (
        resultObj.current.diag[0] ===
        (currentPlayer === "X" ? boardSize : -1 * boardSize)
      ) {
        return true;
      }
    }
    if (targetCol + targetRow + 1 === boardSize) {
      resultObj.current.diag[1] += currentPlayer === "X" ? 1 : -1;

      if (
        resultObj.current.diag[1] ===
        (currentPlayer === "X" ? boardSize : -1 * boardSize)
      ) {
        return true;
      }
    }
    return false;
  };

  const declareWin = () => {
    setStatusText(`Player ${currentPlayer} wins`);
    statusTextRef.current?.classList.add("green");
    blockBoardUpdates.current = true;
  };

  const updateBoardSize = () => {
    let boardSizeInput = inputRef.current.value;
    if (+boardSizeInput >= 3) {
      setBoardSize(+boardSizeInput);
      resultObj.current = {
        row: Array(+boardSizeInput).fill(0),
        col: Array(+boardSizeInput).fill(0),
        diag: [0, 0],
      };
      setStatusText("Player X turn");
    }
  };

  return (
    <div className="board-container">
      <p>TIC TAC TOE</p>
      {boardSize > 0 ? (
        <>
          <p ref={statusTextRef} className="status-text">
            {statusText}
          </p>
          <div
            style={{ width: `${boardSize * 100}px` }}
            className="box-container"
            onClick={updateBoard}
          >
            {Array(boardSize * boardSize)
              .fill(0)
              .map((val, idx) => (
                <div
                  className="box"
                  key={idx}
                  data-row={Math.floor(idx / boardSize)}
                  data-col={idx % boardSize}
                ></div>
              ))}
          </div>
          <button className="reset-btn" onClick={resetGame}>
            Reset
          </button>
        </>
      ) : (
        <div className="board-size-container">
          <p>Enter board size</p>
          <input ref={inputRef} type="number" min={3} max={7} />
          <button onClick={updateBoardSize}>Submit</button>
        </div>
      )}
    </div>
  );
}
