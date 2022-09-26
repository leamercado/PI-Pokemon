import { Link } from "react-router-dom";
import s from "./Card.module.css";

export function Card({ image, name,  types, id, createdInDb }) {
  return (
    <div className={s.cont}>
      <Link to={`/detail/${id}`} className={s.linkCont}>
        <img src={image} width="200px" alt={name} />
        <h3 className={s.name}>{name}</h3>
        <h4 className={s.types}>
          {!createdInDb
            ? types?.join(" - ").toUpperCase()
            : types?.map((el, i) =>
                i !== types.length - 1
                  ? el.name.toUpperCase() + " - "
                  : el.name.toUpperCase()
              )}
        </h4>
      </Link>
    </div>
  );
}
