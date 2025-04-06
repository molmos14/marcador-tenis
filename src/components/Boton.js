import "../styles/Boton.css";

const Boton = (props) => {
  return (
    <button className="boton-tenis" onClick={props.onClick}>
      {props.texto}
    </button>
  );
};
export default Boton;