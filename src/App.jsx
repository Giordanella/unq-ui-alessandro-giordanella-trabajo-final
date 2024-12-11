import "./App.css";
import Tablero from "./components/Tablero.jsx";
import { useEffect, useState } from "react";

const App = () => {
    const numeros = [0, 1, 2, 3, 4, 5, 6, 7];

    const [celdas, setCeldas] = useState([]);

    useEffect(() => {
        const elementosBarajados = barajarElementos([...numeros, ...numeros]);
        setCeldas(
            elementosBarajados.map(
                (elemento, i) => ({ index: i, elemento: elemento })
            ));
    }, []);

    const barajarElementos = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    return (
        <div className="app">
            <Tablero celdas={celdas} />
        </div>
    );
};

export default App;
