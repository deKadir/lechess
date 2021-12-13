import React from "react";
import { DndProvider } from "react-dnd";
import Board from "./components/board/Board";
import { HTML5Backend } from "react-dnd-html5-backend";

export default function App() {
  return (
    <div>
      <DndProvider backend={HTML5Backend}>
        <Board />
      </DndProvider>
    </div>
  );
}
