import React from "react";
import './Link.css';
import {NavLink} from 'react-router-dom';


interface LinkProps {
    text: string;
    url: string;
   actives?: boolean;
  color?:'light'|'dark';

}

export const Link: React.FC<LinkProps>  = (props) =>{
const {url,text, color = 'light'} = props;

    return <NavLink 
    className= {`Link Link--${color}` }
    activeClassName ="Link--active" 
    to={url}>
      {text}
    </NavLink>;
}