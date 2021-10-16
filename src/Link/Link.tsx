import React from "react";
import './Link.css';
import {NavLink} from 'react-router-dom';


interface LinkProps {
    text: string;
    url: string;

    actives?: boolean;
}

export const Link: React.FC<LinkProps>  = (props) =>{
    return <NavLink className= "Link" activeClassName ="Link--active" to={props.url}>
      {props.text}
    </NavLink>;
}