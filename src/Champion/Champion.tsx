import React from "react";

import './Champion.css';


export interface ChampionProps {
    name: string;
    img: string;
    rol: string;
    dificulty:string;
    description:string;
   
}

export const Champion: React.FC< ChampionProps>  = (props) =>{
    return <div className ="Champion">
   <img className ="Champion__img" alt="champ" src= {props.img} ></img>



        <div className ="Champion__container">

            <h3 className = "Champion__h3">DIFICULTY:{props.dificulty}</h3>
            <h3 className = "Champion__h3">ROL{props.dificulty}</h3>
            <h1 className ="Champion__h1">{props.name}</h1>
            <h3 className ="Champion__h3">BIOGRAPHY</h3>
            <p className = "Champion__p">{props.description}</p>


       
        </div>
    </div>
}