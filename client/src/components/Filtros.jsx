import {  useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  filterByApiDb,
  filterByType,
  getTypes,
  orderByName,
  orderByHp,
} from "../redux/actions";
import s from "./Filtros.module.css";

export function Filtros({ setOrder, setCurrentPage }) {
  const dispatch = useDispatch();
  const types = useSelector((state) => state.types);

  useEffect(() => {
    dispatch(getTypes());
  }, [dispatch]);

  function handleFilterByType(e) {
    e.preventDefault();
    dispatch(filterByType(e.target.value));
    setCurrentPage(1);
  }

  function handleFilterByApiDb(e) {
    e.preventDefault();
    dispatch(filterByApiDb(e.target.value));
    setCurrentPage(1);
  }

  function handleOrderByName(e) {
    e.preventDefault();
    dispatch(orderByName(e.target.value));
    setOrder(e.target.value);
  }

  function handleOrderByHp(e) {
    e.preventDefault();
    dispatch(orderByHp(e.target.value));
    setOrder(e.target.value);
  }




  return (
    <div className={s.contFilt}>
      {/* FILTRADO POR TIPO */}
      <div className={s.filt}>
        <label className={s.labelFilt}>Filtrado Por Tipo</label>
        <select className={s.selectFilt} onChange={handleFilterByType}>
          <option disabled>Escoja Filtrado</option>
          <option value="all">Todos</option>
          {types &&
            types.map((el) => (
              <option value={el.name} key={el.id}>
                {el.name}
              </option>
            ))}
        </select>
      </div>

      {/* FILTRADO POR API / DB */}
      <div className={s.filt}>
        <label  className={s.labelFilt}>Filtrado Según API/DB</label>
        <select className={s.selectFilt} onChange={handleFilterByApiDb}>
          <option disabled>Escoja Filtrado</option>
          <option value="all">Todos</option>
          <option value="api">Desde API</option>
          <option value="db">Base de datos</option>
        </select>
      </div>


      <div className={s.filt}>
        <label  className={s.labelFilt}>Ordenamiento Alfabético</label>
        <select className={s.selectFilt} onChange={handleOrderByName}>
          <option disabled>Escoja ordenamiento</option>
          <option value="nameAsc">Ascendente</option>
          <option value="nameDesc">Descendente</option>
        </select>
      </div>

      <div className={s.filt}>
        <label  className={s.labelFilt}>Ordenamiento por Fuerza</label>
        <select className={s.selectFilt} onChange={handleOrderByHp}>
          <option disabled>Escoja ordenamiento</option>
          <option value="hpAsc">Ascendente</option>
          <option value="hpDesc">Descendente</option>
        </select>
      </div>
    </div>
  );
}
