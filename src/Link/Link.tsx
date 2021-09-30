import React from "react";
import './Link.css';


interface LinkProps {
    text: string;
    url: string;

    actives?: boolean;
}

export const Link: React.FC<LinkProps>  = (props) =>{
   let className = 'Link';
    if (props.actives) {
        className += ' Link--active';
        
    }
    
    return <a className={className} href={props.url}>
      {props.text}
    </a>;
}