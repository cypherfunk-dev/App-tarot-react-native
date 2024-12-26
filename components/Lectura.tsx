import React from "react";

interface LecturaProps {
  numbers: number[];
}
const Lectura: React.FC<LecturaProps> = ({ numbers }) => {
  return (
    <div>
      <h1>Cartas seleccionadas:</h1>
      <ul>
        {numbers.map((number) => (
          <li key={number}>{number}</li>
        ))}
      </ul>
    </div>
  );
};
export default Lectura;
