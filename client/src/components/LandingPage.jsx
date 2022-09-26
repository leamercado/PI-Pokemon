import { Link  } from "react-router-dom";
import s from "./LandingPage.module.css";
import landing from "../images/landing.jpg";

export function LandingPage() {
  return (
    <div className={s.cont}>
      <span className={s.texto}>Bienvenidos a la app de Pokemons</span>
        <img className={s.img} src={landing} alt="BienvenidaPokemons"/>
      <Link to="/home">
        <button className={s.btn}>Ingresar</button>
      </Link>
    </div>
  );
}
