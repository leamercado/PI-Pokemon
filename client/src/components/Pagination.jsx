import s from "./Pagination.module.css"

export function Pagination({ totalPokemons, pokemonsXPage, paginado }) {
  let pageNumbers = [];
  for (let i = 0; i < Math.ceil(totalPokemons / pokemonsXPage); i++) {
    pageNumbers.push(i + 1);
  }

  return (
    <div className={s.paginado}>
      <ul>
        {pageNumbers &&
          pageNumbers.map((nro) => (
            <li className={s.lista}  key={nro} >
              <a className={s.nros} href="#/" onClick={() => paginado(nro)}>{nro}</a> 
            </li>
          ))}
      </ul>
    </div>
  );
}
