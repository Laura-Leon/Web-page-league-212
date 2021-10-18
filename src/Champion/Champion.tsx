import React from "react";
import { useHistory } from "react-router";
import { CodeFixAction } from "typescript";

import './Champion.css';


export interface ChampionProps {
    id: number;
    name: string;
    img: string;
    rol: string;
    dificulty: string;
    description: string;
    onDelete?: (id: number) => void;
    onEdit?: (id: number) => void;
    type:'details'| 'Edit';


}

export const Champion: React.FC<ChampionProps> = ({ img, name, rol, dificulty, description, onDelete, onEdit, id,type }) => {

    const history = useHistory();
    const handleDelete: React.MouseEventHandler<HTMLButtonElement> = () => {
        if(onDelete){
            onDelete(id) ;
        }
       ;
    }
    const handleEdit: React.MouseEventHandler<HTMLButtonElement> = () => {
        if(onEdit){
            onEdit(id) ;
        }
        
    }
    const handleView: React.MouseEventHandler<HTMLButtonElement> = () => {
        history.push(`/details/${id}`);
    }
    return <div className="Champion">
        <img className="Champion__img" alt="champ" src={img} ></img>

        <div className="Champion__container">
            {type && 
            <button onClick={handleView}>view</button> 
            { onDelete && <button onClick={handleDelete}>Delete</button> }
           {onEdit &&<button onClick={handleEdit}>Edit</button>}

            }
            
           


            <h3 className="Champion__h3">DIFICULTY:{dificulty}</h3>
            <h3 className="Champion__h3">ROL{rol}</h3>
            <h1 className="Champion__h1">{name}</h1>
            <h3 className="Champion__h3">BIOGRAPHY</h3>
            <p className="Champion__p">{description}</p>



        </div>
    </div>
}