import './Celda.css';

const Celda = ({ celda }) => {
    return (
        <div className="celda">{celda.elemento}</div>
    );
};

export default Celda;
