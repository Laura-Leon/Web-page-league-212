import React from "react";
import { useHistory } from "react-router";
import { CodeFixAction } from "typescript";

import './Champion.css';

import ReactDOM from 'react-dom';
import Button from '@mui/material/Button';


export interface ChampionProps {
    id: number;
    name: string;
    img: string;
    rol: string;
    dificulty: string;
    description: string;
    onDelete?: (id: number) => void;
    onEdit?: (id: number) => void;
    type: 'details' | 'Edit';


}

export const Champion: React.FC<ChampionProps> = ({ img, name, rol, dificulty, description, onDelete, onEdit, id, type }) => {

    const history = useHistory();
    const handleDelete: React.MouseEventHandler<HTMLButtonElement> = () => {
        if (onDelete) {
            onDelete(id);
        }
        ;
    }
    const handleEdit: React.MouseEventHandler<HTMLButtonElement> = () => {
        if (onEdit) {
            onEdit(id);
        }

    }
    const handleView: React.MouseEventHandler<HTMLButtonElement> = () => {
        history.push(`/details/${id}`);
    }
    return <div className="champion__Wrapper">
        <div className="champion__card">

            <img className="Champion__img" alt="champ" src={img} ></img>

            <div className="champion__title">

            </div>
            <div className="Champion__info">
                <div className="champion__title">
                    <h1 className="Champion__h1">{name}</h1>
                </div>

                {type && <><Button variant="outlined" onClick={handleView}>view</Button>
                    {onDelete && <Button variant="outlined" color="error" size="small" onClick={handleDelete}>Delete</Button>}
                    {onEdit && <Button variant="outlined" onClick={handleEdit}>Edit</Button>}
                </>
                }
            </div>
        </div>
    </div>
}