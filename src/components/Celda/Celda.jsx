import './Celda.css';

const Celda = ({ celda, animacion, clickHandler }) => {
    return (
        <div className="celda" onClick={() => (!celda.girada && !animacion) && clickHandler(celda)}>
            <div className={`celda-estado ${celda.girada && 'celda-girada'}`}>
                <div className="celda-frente">?</div>
                <div className="celda-reverso">{celda.elemento}</div>
            </div>
        </div>
    );
};

export default Celda;
