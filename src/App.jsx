import "./App.css";
import Tablero from "./components/Tablero/Tablero.jsx";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Temporizador from "./components/Temporizador/Temporizador.jsx";

const numeros = [0, 1, 2, 3, 4, 5, 6, 7];
const animales = ['🐶', '🐱', '🐰', '🐻', '🦁', '🐯', '🐸', '🐵'];
const celebraciones = ['🎉', '🎂', '🎁', '🎈', '🎶', '🥂', '🍾', '🎤'];
const comida = ['🍕', '🍔', '🍣', '🍦', '🍩', '🍪', '🍿', '🍫'];
const deportes = ['⚽', '🏀', '🏈', '🎾', '🏐', '🏏', '🏓', '🥋'];

const App = () => {
    const [celdas, setCeldas] = useState([]);
    const [celdaElegida, setCeldaElegida] = useState(null);
    const [animacion, setAnimacion] = useState(false);
    const [paresResueltos, setParesResueltos] = useState(0);
    const [tiempo, setTiempo] = useState(0);
    const [terminado, setTerminado] = useState(false);

    useEffect(() => {
        const elementos = elegirElementoAleatorio();
        const elementosBarajados = barajarElementos([...elementos, ...elementos]);
        setCeldas(
            elementosBarajados.map(
                (elemento, i) => ({ index: i, elemento: elemento, girada: false })
            )
        );
    }, []);

    useEffect(() => {
        if (paresResueltos === 8) {
            toast.success("¡Ganaste la partida!");
            setTerminado(true);
        }
    }, [paresResueltos]);

    useEffect(() => {
        if (paresResueltos === 8) return;

        const intervalo = setInterval(() => {
            setTiempo((prevTiempo) => prevTiempo + 1);
        }, 1000);

        return () => clearInterval(intervalo);
    }, [paresResueltos]);

    const elegirElementoAleatorio = () => {
        const listas = [numeros, animales, celebraciones, comida, deportes];
        const listaAleatoria = listas[Math.floor(Math.random() * listas.length)];
        return listaAleatoria;
    };

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
        } else if (celdaElegida.elemento === celda.elemento) {
            setCeldaElegida(null);
            setParesResueltos((prev) => prev + 1);
        } else {
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
            <Temporizador tiempo={tiempo} terminado={terminado} />
            <ToastContainer />
        </div>
    );
};

export default App;
