import React, { useState } from "react";
import Plot from "react-plotly.js";
import { evaluate } from "mathjs";

const App = () => {
  const [expression, setExpression] = useState("tan(t)");
  const [graphData, setGraphData] = useState([]);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    setExpression(e.target.value);
    setError(""); // Limpiar el mensaje de error al cambiar la expresión
  };

  const handleGraph = () => {
    try {
      const xValues = Array.from({ length: 200 }, (_, i) => (i - 100) * (Math.PI / 50));
      const yValues = xValues.map((x) =>
        evaluate(expression, {
          t: x,
          r: (t) => (t >= 0 ? t : 0),
          m: (t) => (t >= 0 ? 1 : 0),
        })
      );

      const data = [
        {
          x: xValues,
          y: yValues,
          mode: "lines",
          type: "scatter",
          name: "Expresión",
        },
      ];
      setGraphData(data);
    } catch (error) {
      console.error("Error evaluating expression:", error);
      setGraphData([]); // Limpiar los datos del gráfico en caso de error
      setError("Error: La expresión no es válida."); // Mostrar mensaje de error
    }
  };

  return (
    <div>
      <h1>Expresiones Unitarias</h1>
      <input
        type="text"
        placeholder="Ingrese la expresión (ej. tan(t))"
        value={expression}
        onChange={handleInputChange}
      />
      <button onClick={handleGraph}>Graficar</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <Plot
        data={graphData}
        layout={{ width: 800, height: 500, title: "Expresiones unitarias" }}
      />
    </div>
  );
};

export default App;
