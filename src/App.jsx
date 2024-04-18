import "./App.css";

const App = () => {
  return (
    <>
      <h1>UNQ UI Vite + React + Bootstrap template</h1>
      <button
        type="button"
        className="btn btn-primary"
        onClick={() =>
          window.open("https://getbootstrap.com/docs/5.3/", "_blank")
        }
      >
        Abrir Documentacion de Bootstrap
      </button>
      <div>Cambiame en App.jsx</div>
    </>
  );
};

export default App;
