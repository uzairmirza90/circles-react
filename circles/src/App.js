import "./App.css";
import { useState } from "react";

function App() {
  // State variables
  const [circles, setCircles] = useState([]);
  const [poppedCircles, setPoppedCircles] = useState([]);

  // Add circle on screen anywhere we clicked
  function addCircles(e) {
    const createRandomColor = Math.floor(Math.random() * 16777215).toString(16);
    // Get values of x-axix and y-axis from event object
    // and store into circles array
    setCircles([
      ...circles,
      { x: e.clientX, y: e.clientY, color: `#${createRandomColor}` },
    ]);
    console.log(`#${createRandomColor}`)
  }

  // Undo the last circle
  function undoCircle() {
    if (!circles.length) return;

    // Get All circles and store it into new variableow
    // Undo last circle and store it into variable
    // Update circles state variable by removing last circle
    // Push the popped circle into new state variabale
    const newCircles = [...circles];
    const poppedCircle = newCircles.pop();
    setCircles(newCircles);
    setPoppedCircles([...poppedCircles, poppedCircle]);
  }

  // Redo the last circle
  function redoCircle() {
    if (!poppedCircles.length) return;
    // Push last popped circle into circles array
    setCircles([...circles, poppedCircles.pop()]);
  }

  // Clear all circles. Empty all arrays
  function clearAllCircles() {
    setCircles([]);
    setPoppedCircles([]);
  }

  return (
    <>
      <div className="buttons">
        <button
          className="button"
          disabled={!circles.length}
          onClick={() => undoCircle()}
        >
          Undo
        </button>
        <button
          className="button"
          disabled={!poppedCircles.length}
          onClick={() => redoCircle()}
        >
          Redo
        </button>
        <button
          className="button"
          disabled={!circles.length && !poppedCircles.length}
          onClick={() => clearAllCircles()}
        >
          Clear
        </button>
      </div>
      <div className="App" onClick={(e) => addCircles(e)}>
        {circles.map((circle, _id) => {
          return (
            <div
              key={_id}
              className="circle"
              style={{
                backgroundColor: circle.color,
                position: "absolute",
                top: circle.y,
                left: circle.x,
                marginLeft: -8,
                marginTop: -8,
              }}
            ></div>
          );
        })}
      </div>
    </>
  );
}

export default App;
