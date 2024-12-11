import "./Temporizador.css";

const Temporizador = ({ tiempo, terminado }) => {
    return (
        <div className={`temporizador ${terminado ? 'terminado' : ''}`}>
            <h3>Tiempo: {tiempo} segundos</h3>
        </div>
    );
};

export default Temporizador;
