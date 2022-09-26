import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import s from "./CreateForm.module.css";

import { resetPokemonCreated, getPokemons, getTypes, postPokemon } from "../redux/actions";

export function validate(input) {
  let errors = {};
  const nameRegex= /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/
  if (!nameRegex.test(input.name)) { // evalua esta regex, si input.name no cumple el test.
    errors.name = "requiere un nombre";
  }
  if (!input.hp || isNaN(input.hp) || input.hp < 0 || input.hp > 100) {
    errors.hp = "requiere un numero entre 1 y 100";
  }
  if (
    !input.attack ||
    isNaN(input.attack) ||
    input.attack < 0 ||
    input.attack > 100
  ) {
    errors.attack = "requiere un numero entre 1 y 100";
  }
  if (
    !input.defense ||
    isNaN(input.defense) ||
    input.defense < 0 ||
    input.defense > 100
  ) {
    errors.defense = "requiere un numero entre 1 y 100";
  }
  if (
    !input.speed ||
    isNaN(input.speed) ||
    input.speed < 0 ||
    input.speed > 100
  ) {
    errors.speed = "requiere un numero entre 1 y 100";
  }
  if (
    !input.height ||
    isNaN(input.height) ||
    input.height < 5 ||
    input.height > 50
  ) {
    errors.height = "requiere un numero entre 5 y 50";
  }
  if (
    !input.weight ||
    isNaN(input.weight) ||
    input.weight < 10 ||
    input.weight > 1000
  ) {
    errors.weight = "requiere un numero entre 10 y 1000";
  }

  const imgRegex = /(https?:\/\/.*\.(?:png|jpg))/i;
  if (!input.image || !imgRegex.test(input.image)) {
    errors.image = "Debe ingresar un link de imagen";
  }
  if (!input.image || !isNaN(input.image)) {
    errors.image = "requiere un enlace";
  }

  if (input.types.length === 0 || input.types.length >3) {
    errors.types = "Requiere entre 1 y 3 tipos";
  }
  return errors;
}


export function CreateForm() {
  const [input, setInput] = useState({
    name: "",
    hp: "",
    
    attack: "",
    defense: "",
    speed: "",
    height: "",
    weight: "",
    image: "",
    types: [],
  });

  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();
  const types = useSelector((state) => state.types);
  const pokemonCreated = useSelector((state) => state.pokemonCreated);

  useEffect(() => {
    dispatch(getTypes());
    return () => {
      dispatch(getPokemons())
      dispatch(resetPokemonCreated())
    }
  }, [dispatch]);
  console.log(types);

  function handleChange(e) {
    e.preventDefault();
    setInput({
      ...input,
      [e.target.name]: e.target.value, 
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  function handleSelect(e) {
    e.preventDefault();
    setInput({
      ...input,
      types: [...input.types, e.target.value],
    });
    setErrors(
      validate({
        ...input,
        types: [...input.types, e.target.value],
      })
    );
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(input);
    dispatch (resetPokemonCreated())
    dispatch(postPokemon(input));
    setInput({
      name: "",
      hp: "",
      attack: "",
      defense: "",
      speed: "",
      height: "",
      weight: "",
      image: "",
      types: [],
    });
  }
  

  const isEnabled = 
    !errors.name && 
    !isNaN(input.hp) &&
    input.hp > 0 &&
    input.hp - 101 &&
    input.attack > 0 &&
    input.attack < 101 &&
    input.defense > 0 &&
    input.defense < 101 &&
    input.speed > 0 &&
    input.speed < 101 &&
    input.height > 4 &&
    input.height < 51 &&
    input.weight > 9 &&
    input.weight < 1001 &&
    !errors.image &&
    input.types.length && input.types.length <4


  function handleDelete(el) {
    setInput({
      ...input,
      types: input.types.filter((type) => type !== el),
    });
    setErrors(
      validate({
        ...input,
        types: input.types.filter(type => type !== el) 
      })
    )
  }


  return (
    <div className={s.contenedor}>
      <h2>Creación de Pokemon </h2>
      <form onSubmit={handleSubmit}>
        <label>
          <em>Nombre: </em>
          <input
            type="text"
            name="name"
            value={input.name}
            onChange={handleChange}
          />
        </label>
        {errors.name}
        <br />
        <label>
          <em>Fuerza: </em>
          <input
            type="text"
            name="hp"
            value={input.hp}
            onChange={handleChange}
          />
        </label>
        {errors.hp}
        <br />
        <label>
          <em>Ataque: </em>
          <input
            type="text"
            name="attack"
            value={input.attack}
            onChange={handleChange}
          />
        </label>
        {errors.attack}
        <br />
        <label>
          <em>Defensa: </em>
          <input
            type="text"
            name="defense"
            value={input.defense}
            onChange={handleChange}
          />
        </label>
        {errors.defense}
        <br />
        <label>
          <em>Velocidad: </em>
          <input
            type="text"
            name="speed"
            value={input.speed}
            onChange={handleChange}
          />
        </label>
        {errors.speed}
        <br />
        <label>
          <em>Altura: </em>
          <input
            type="text"
            name="height"
            value={input.height}
            onChange={handleChange}
          />
        </label>
        {errors.height}
        <br />
        <label>
          <em>Peso: </em>
          <input
            type="text"
            name="weight"
            value={input.weight}
            onChange={handleChange}
          />
        </label>
        {errors.weight}
        <br />
        <label>
          <em>URL Imagen: </em>
          <input
            type="text"
            name="image"
            value={input.image}
            onChange={handleChange}
          />
        </label>
        {errors.image}
        <br />

        <label>
          <em>Tipo: </em>
          <select onChange={handleSelect}>
            {types.map((el) => (
              <option name="types" value={el.name} key={el.id}>
                {el.name}
              </option>
            ))}
          </select>
          {console.log("input.types: ", input.types)}
        </label>
        {errors.types}
        <br />

        <button type="submit" className={s.btnSubmit} disabled={!isEnabled}>
          Crear pokemon
        </button>
      </form>
      

      {input.types.map((el ) => (
        <div className={s.types} key={el}>
          <button onClick={() => handleDelete(el)}> X </button>
          <span>{el}</span>
        </div>
      ))}
      {!pokemonCreated ? (
        <h4 style={{color:"PaleGoldenrod"}}>Aquí se confirmará la creación del Pokemon. Espere por favor.</h4>
      ) : (
        <h4 style={{color:"LawnGreen"}}>¡Pokemon creado correctamente! Puede crear otro</h4>
      )}
      <Link to="/home">
        <button className={s.btnVolver}>Volver a Home</button>
      </Link>
    </div>
  );
}
