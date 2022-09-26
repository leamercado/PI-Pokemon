import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { cleanDetail, getDetail } from "../redux/actions";
import loading from "../images/loading.jpg";
import s from "./Detail.module.css";

export function Detail() {
  const { id } = useParams();

  const dispatch = useDispatch();
  const detail = useSelector((state) => state.detail);

  const {
    image,
    name,
    hp,
    attack,
    defense,
    speed,
    height,
    weight,
    types,
    createdInDb,
  } = detail;

  useEffect(() => {
    dispatch(getDetail(id));
    return () => {
      dispatch(cleanDetail());
    };
  }, [dispatch, id]);

  return (
    <div className={s.cont}>
      <Link to="/home">
        <button className={s.btnVolver}>Volver a Home</button>
      </Link>

      {detail.length !== 0 ? (
        <>
          <h2>Pokemon {id.length > 3 ? "creado desde DB" : `n° ${id}`}</h2>
          <div key={id} className={s.detail}>
            <div className={s.pokemon}>
              <img className={s.imagePoke} src={image} alt={name} />
              <h2>{name.toUpperCase()}</h2>
              <h3>
                TIPO:{" "}
                
                  {!createdInDb
                    ? types?.join(" - ").toUpperCase()
                    : types.map((el) => el.name.toUpperCase())?.join(" - ")}
              </h3>
            </div>
            <div className={s.estadisticas}>
              <h4>Estadísticas: </h4>
              <h5>Fuerza: {hp}</h5>
              <h5>Ataque: {attack}</h5>
              <h5>Defensa: {defense}</h5>
              <h5>Velocidad: {speed}</h5>
              <br />
              <h5>Altura: {height} </h5>
              <h5>Peso: {weight}</h5>
            </div>
            {console.log(types)}
          </div>
        </>
      ) : (
        <div className={s.loading}>
          <h1>Cargando...</h1>
          <img src={loading} alt="loading" />
        </div>
      )}
    </div>
  );
}
