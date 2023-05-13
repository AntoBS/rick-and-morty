import { useState } from "react";
import validation from "./validation";

const Form = ({Login}) =>{

    const [userData, setUserData] = useState({ 
        username: "",
        password: "",
     });

     const [errors, setErrors] = useState({
        username: "",
        password: "",
     })

     //a esta funcion le lleva el evento automaticamente y extraemos el name
     const handleImputChange = (event) =>{
        //guardamos en propertty el name, ej. username
        const property = event.target.name;
        //de aca sacamos el valor
        const value = event.target.value;

        //guarda todo lo que ya tiene el estado y modificamos property
        setUserData({ ...userData,[property]: value });
        validation({ ...userData,[property]: value }, errors, setErrors)
     }

     const submitHandler = (event) =>{
        event.preventDefault();
        Login(userData);
     }

    return(
        <form onSubmit={submitHandler}>
            <div>
                <label htmlFor="username">Username </label>
                <input
                    type="text" 
                    name="username" 
                    value={userData.username}
                    //cuando yo escribo se dispara handlerImputChange
                    onChange={handleImputChange}
                 />
                 <p>{errors.username}</p>
            </div>
            <div>
                <label htmlFor="password">Password </label>
                <input 
                    type="text" 
                    name="password" 
                    value={userData.password}
                    onChange={handleImputChange}
                />
            </div>
            <button type="submit" >LOGIN</button>
        </form>
    );
} 

export default Form;