import Cards from "./components/Cards/Cards.jsx";
import Nav from "./components/Nav/Nav.jsx";
import About from "./components/About/About.jsx";
import Detail from "./components/Detail/Detail.jsx";
import Form from "./components/Form/Form.jsx";
import Favorites from "./components/Favorite/favorites.jsx";
import { useEffect, useState } from "react";
import style from "./App.module.css";
//import backGround from "./assets/backGroundApp.png";
import axios from 'axios';
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";


// ! CRED. FAKE
//const username = "anto@gmail.com";
//const password = "mipass123";

const URL = 'http://localhost:3001/rickandmorty/login/';

function App() {

  // ! HOOKS
  const [characters, setCharacters] = useState([]);
  //destructuring porque location es un obj que tiene la propiedad pathname
  const { pathname} = useLocation();
  const [access, setAccess] = useState(false);
  const navigate = useNavigate ();

  useEffect(() => {
    !access && navigate('/');
 }, [access]);



  // ! EVENT HANDLES
  const onSearch = async (id) => {
    if (characters.find((char) => char.id === id)) {
      return alert("Personaje repetido");
    }

    //https://rickandmortyapi.com/api/character/${id}

    try {
      const { data } = await axios(`http://localhost:3001/rickandmorty/character/${id}`);
        
          if(data.name) {
            setCharacters((oldChars) => [...oldChars, data]);
          }
        
        
      } catch (error) {
        alert("Algo salio mal");
    }

  };

  const onClose = (id) => {
    setCharacters(characters.filter((char) => char.id !== id));
  };

  const login =  async (userData) => {
    try {
      const { username, password } = userData;
      const { data } = await axios(URL + `?email=${username}&password=${password}`)
      const { access } = data;  
         
         setAccess(access);
         access && navigate('/home');
      
      
    } catch (error) {
      console.log(error.message);
    }
 }

  // ! RENDER
  return (
    <div className="App" style={{ padding: "25px" }}>
      <div className={style.nav}>
       {pathname !== "/"  && <Nav onSearch={onSearch} /> }
      </div>
      <Routes>
        <Route path="/" element={<Form Login={login}/>}/>
        <Route path="/home" element={<Cards characters={characters} onClose={onClose} />}/>
        <Route path="/about" element={<About />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path='/detail/:detailId' element={<Detail/>} />
      </Routes>
    </div>
  );
}

export default App;
