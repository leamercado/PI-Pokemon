import { Card } from "./Card";
import s from "./Cards.module.css"

export default function Cards ( {pokemons} )  {

  return (
    <div className={s.gridCards}>
      {pokemons &&
        pokemons.map((el) => (
          <Card
            image={el.image}
            name={el.name.toUpperCase()}
            types={el.types}
            id={el.id}
            createdInDb={el.createdInDb}
            key={el.id}
          />
        ))}
    </div>
  );
};
