# React Tic Tac Toe

## Problem Statement
Build a game that:
- Lets user input **board size (≥3)**.
- Alternates **X/O** turns.
- Detects win (row/col/diag) or draw.

---

## Features
- **Size picker** (`inputRef`) → initializes board + counters.
- **Click-to-play**: parent `.box-container` handles clicks; cells are plain `<div>`s.
- **Win check O(1)**: `resultObj.current` keeps `row[]`, `col[]`, `diag[2]` with **+1/-1** deltas.
- **Status text** via state + minimal class toggles (`statusTextRef` adds `green/red`).
- **Move count** via `movesCount` ref.

---

## To run the project 
Node 20.19+ recommended 
git clone 
cd tic-tac-toe
npm i 
npm run dev
