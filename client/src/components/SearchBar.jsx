import { useState } from "react";
import { useDispatch } from "react-redux";
import {  getPokemonByName } from "../redux/actions";
import s from "./SearchBar.module.css";

export function SearchBar({setCurrentPage}) {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  function handleChange(e) {
    e.preventDefault();
    setName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    // setTimeout(() => dispatch(cleanPokemons(dispatch)), 500);
    dispatch(getPokemonByName(name));  // cuando busque al poke segun nombre, seteo el loading en true, si SE encuentra lo seteo en false, SI NO muestro
    setCurrentPage(1)
    setName("");
  }

  return (
    <div className={s.contSearch}>
      <label className={s.labelSearch}>
        <input
          className={s.inputSearch}
          type="text"
          value={name}
          placeholder="Ingrese Pokemon..."
          onChange={handleChange}
        />
      </label>
      <button className={s.btnSearch} onClick={handleSubmit}>
        Buscar
      </button>
    </div>
  );
}
