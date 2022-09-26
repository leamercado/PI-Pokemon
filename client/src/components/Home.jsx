import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemons } from "../redux/actions";
import { SearchBar } from "./SearchBar";
import { Filtros } from "./Filtros";
import s from "./Home.module.css";
import { useNavigate } from "react-router-dom";
import { Pagination } from "./Pagination";
import Cards from "./Cards";
import logo from "../images/pokemonlogo.png";

export default function Home() {
  const dispatch = useDispatch();
  const pokemons = useSelector((state) => state.pokemons);
  const loading = useSelector((state) => state.loading);
  const [order, setOrder] = useState(""); // para hacer el renderizado
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const [pokemonsXPage] = useState(12);

  const indexLastPokemon = currentPage * pokemonsXPage;
  const indexFirstPokemon = indexLastPokemon - pokemonsXPage;
  const currentPokemons = pokemons.slice(indexFirstPokemon, indexLastPokemon);

  const paginado = (nro) => setCurrentPage(nro);

  function handleClickHome(e) {
    // para volver a cargar
    e.preventDefault();
    dispatch(getPokemons());
  }

  function handleClickCreate(e) {
    e.preventDefault();
    navigate("/create");
  }

  useEffect(() => {
   dispatch(getPokemons());
  }, []);
// a
  return (
    <div className={s.body}>
      <div className={s.header}>
        <img className={s.logo} src={logo} alt="logo"/>

        <button className={s.btnHome} onClick={handleClickHome}>
          Volver a mostrar pokemones
        </button>
      </div>

      <div className={s.contNavBar}>
        <SearchBar setCurrentPage={setCurrentPage}/>
        <Filtros setOrder={setOrder} setCurrentPage={setCurrentPage} />
      </div>
      <div className={s.bottom}>
        <button className={s.btnCreate} onClick={handleClickCreate}>
          Crear Pokemon
        </button>

        <Pagination
          totalPokemons={pokemons.length}
          pokemonsXPage={pokemonsXPage}
          paginado={paginado} //  me setea la pagina según el nro pasado
        />

        {loading ? (
          <h1>Cargando pokemones...</h1>
        ) : ( // si loading esta en true "cargando"..  efectuada la action que los carga pasa a false
          <div>
            {currentPokemons.length ? (  // si hay pokemones va a renderizarlos 
              <Cards pokemons={currentPokemons} />
            ) : (
              <h3>No se encontraron pokemones</h3>
            )}
          </div>
        )}
      </div>
    </div>
  );
}