import "./App.css";
import Tablero from "./components/Tablero.jsx";
import { useEffect, useState } from "react";

const numeros = [0, 1, 2, 3, 4, 5, 6, 7];

const App = () => {
    const [celdas, setCeldas] = useState([]);
    const [celdaElegida, setCeldaElegida] = useState(null);
    const [animacion, setAnimacion] = useState(false);

    useEffect(() => {
        const elementosBarajados = barajarElementos([...numeros, ...numeros]);
        setCeldas(
            elementosBarajados.map(
                (elemento, i) => ({ index: i, elemento: elemento, girada: false })
            ));
    }, []);

    const barajarElementos = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    const clickHandler = (celda) => {
        const celdaGirada = { ...celda, girada: true };
        let celdasCopia = [...celdas];
        celdasCopia.splice(celda.index, 1, celdaGirada);
        setCeldas(celdasCopia);
    
        if (celdaElegida === null) {
            setCeldaElegida(celda);
        }
        else if (celdaElegida.elemento === celda.elemento) {
            setCeldaElegida(null);
        }
        else {
            setAnimacion(true);
            setTimeout(() => {
                restaurarCeldasTrasAnimacion(celdasCopia, celda, celdaElegida);
            }, 1000);
        }
    };

    const restaurarCeldasTrasAnimacion = (modificadas, original, elegida) => {
        modificadas.splice(original.index, 1, original);
        modificadas.splice(elegida.index, 1, elegida);
        setCeldas(modificadas);
        setCeldaElegida(null);
        setAnimacion(false);
    };

    return (
        <div className="app">
            <Tablero celdas={celdas} animacion={animacion} clickHandler={clickHandler} />
        </div>
    );
};

export default App;
