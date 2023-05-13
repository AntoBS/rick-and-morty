import style from "./Card.module.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux"
import { addFavorite, removeFavorite } from "../../redux/action";
import { useState, useEffect } from "react";

//import backCard from "../../assets/backCard.jpg"

function Card({ id, name, species, gender, image, onClose, addFavorite, removeFavorite, myFavorites }) {

  const [isFav, setIsFav] = useState(false);

  const handleFavorite = () =>{
    if(isFav){
      setIsFav(false);
      removeFavorite(id);
    } else{
      setIsFav(true);
      addFavorite({
        id, 
        name, 
        species, 
        gender, 
        image, 
        onClose, 
        addFavorite, 
        removeFavorite
      })
    }
  }

  useEffect(() => {
    myFavorites.forEach((fav) => {
       if (fav.id === id) {
          setIsFav(true);
       }
    });
 }, [myFavorites])

  return (
    <div className={style.container}>
      <div className={style.card}>
      {
   isFav ? (<button onClick={handleFavorite}>❤️</button>) : 
      (<button onClick={handleFavorite}>🤍</button>)
      }
        <img src={image} alt="" className={style.cardImg} />
        
          <div className={style.cardBody}>
            <Link to={`/detail/${id}`}>
              <h2 className={style.name}>{name}</h2>
            </Link>
            <h4 className={style.species}>{species}</h4>
            <h4 className={style.gender}>{gender}</h4>
          </div>
        
        
          <button onClick={() => onClose(id)} className={style.closeButton}>
            X
          </button>
        
      </div>
      <br></br>
    </div>
  );
}

const mapDispatchtoProprs = (dispatch) =>{
  return{
    addFavorite: (character)=>{dispatch(addFavorite(character))},
    removeFavorite: (id)=>{dispatch(removeFavorite(id))}
  }
}

const mapStateToProps = (state) =>{
  return{
    myFavorites: state.myFavorites,
  }
}

export default connect(mapStateToProps, mapDispatchtoProprs)(Card);