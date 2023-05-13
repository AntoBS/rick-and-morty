import React  from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";



const Detail = () => {

    const {detailId} = useParams();
    const [character, setCharacter] = useState();
    
    useEffect(() => {
      
      //https://rickandmortyapi.com/api/character/${detailId}
        fetch(`http://localhost:3001/rickandmorty/character/${detailId}`)
          .then((response) => response.json())
          .then((char) => {
            if (char.name) {
              setCharacter(char);
            } else {
              window.alert("No hay personajes con ese ID");
            }
          })
          .catch((err) => {
            window.alert("No hay personajes con ese ID");
          });
        return setCharacter({});
      }, [detailId]);

    return(
      <div>
        <Link to="/home">
          Back home
        </Link>
        {character ? (
        <div>
            <h1>{character.name}</h1>
            <section>
              <h3>{character.status}</h3>
              <h3>{character.species}</h3>
              <h3>{character.gender}</h3>
              <h3>{character.origin?.name}</h3>
              <img src={character.image} alt=""/>
            </section>
        </div>
        ) : (
          <h1>Loading</h1>
        )}
      </div>
    )
}

export default Detail;