import "./Tablero.css";
import Celda from "./Celda.jsx";

const Tablero = ({ celdas, animacion, clickHandler }) => {
    const generarCelda = (celda, i) => {
        return (
            <Celda 
                key={`${celda.elemento}_${i}`} 
                celda={celda} 
                animacion={animacion} 
                clickHandler={clickHandler} 
            />
        );
    };

    return (
        <div className="tablero">
            {celdas.map(
                (celda, i) => generarCelda(celda, i)
            )}
        </div>
    );
};

export default Tablero;
