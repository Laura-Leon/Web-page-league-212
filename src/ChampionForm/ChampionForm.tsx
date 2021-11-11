

import * as React from 'react';
import { useHistory } from "react-router";

import './ChampionForm.css';
import ReactDOM from 'react-dom';
import Button from '@mui/material/Button';

import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

import { regionObj } from '../types/regionObj';
import RegionsList from '../RegionsList/RegionsList';
import RegionDetails from '../RegionDetails/RegionDetails';
import { ChampionElemObj } from '../types/ChampionElemObj';



interface ChampionFormProps {
    editId: number | null;
    type: 'create' | 'Edit';
    championElems: ChampionElemObj[];
    onCreate: (newChampion: {
        name: string;
        img: string;
        rol: string;
        dificulty: string;
        description: string;
        regionId: number;
        regions: string[];

    }) => void;
    onEdit: (id: number, editChampionElem: {
        name: string, img: string;
        rol: string;
        dificulty: string;
        description: string;
        regionId: number;
        regions: string[];
    }) => void;
    regions: regionObj[];
}


export const ChampionForm: React.FC<ChampionFormProps> = ({championElems, editId, type, onCreate, onEdit, regions}) => {
    const history = useHistory();
    const editElem = championElems.find((elem) => {
        return elem.id === editId;
      });
    const [formSubmitted, setFormSubmitted] = React.useState(false);

    const [name, setName] = React.useState(editElem?.name||' ');
    const handleNameChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        setName(event.target.value);
    }
    const [img, setImg] = React.useState(editElem?.img||' ');
    const handleImgChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        setImg(event.target.value);
    }

    const [rol, setRol] = React.useState(editElem?.rol||' ');
    const handleRolChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        setRol(event.target.value);
    }
    const [dificulty, setDificulty] = React.useState(editElem?.dificulty||' ');
    const handleDificultyChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        setDificulty(event.target.value);
    }
    const [description, setDescription] = React.useState(editElem?.description||' ');
    const handleDescriptionChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        setDescription(event.target.value);
    }
    //estado para guardar el valor de la region
    const [region, setRegion] = React.useState(editElem?.regionId || 0);
    const handleRegionChange: React.ChangeEventHandler<HTMLSelectElement> = (event) => {
        console.log(event.target.value);
        setRegion(parseFloat(event.target.value));
    }
    console.log(region);

    const iscaractValid = name.length >= 2 || rol.length >= 2 || dificulty.length >= 2 || description.length >= 10;
    const isImgValid = img.length >= 10;

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event: any) => {
        event.preventDefault();
        //tell me if smn is missing
        setFormSubmitted(true);

        if (type === 'create' && iscaractValid && isImgValid) {
            console.log('valid');
            const regionString = regions.map(obj => obj.name);
            onCreate({
                img: img,
                name: name,
                rol: rol,
                dificulty: dificulty,
                description: description,
                regionId: region,
                regions: regionString,
            });
            setName('');
            setImg('');
            setDificulty('');
            setRol('');
            setDescription('');
            setRegion(0);

            setFormSubmitted(false);
            history.push('/champlist');

        } else if (type === 'Edit' && iscaractValid) {
            const regionString = regions.map(obj => obj.name);

            onEdit(editId!, {
                img: img,
                name: name,
                rol: rol,
                dificulty: dificulty,
                description: description,
                regionId: region,

                regions: regionString,

            });
            history.push('/champlist');
        } else {
            console.log('invalid');
        }
    }


    return (

        <form className="ChampionForm"
            onSubmit={handleSubmit}>

            <h1 className="championForm__h1"> {type === 'create' ? 'New' : 'Edit'} Champion {editId}</h1>


            <label className="champ__label">
                Champion's Name
                <input className="champ__input" name="name" type="text"
                    onChange={handleNameChange}
                    value={name} />
                {formSubmitted && !iscaractValid &&
                    <Alert severity="error">
                        <AlertTitle>Error</AlertTitle>
                        You need to add a name— <strong>check it out!</strong>
                    </Alert>
                }

            </label>

            <label className="champ__label">
                Img URL
                <input
                    className="champ__input"
                    name="img" type="text"
                    onChange={handleImgChange}
                    value={img} />
                {formSubmitted && !isImgValid &&
                    <Alert severity="error">
                        <AlertTitle>Error</AlertTitle>
                        Url must be at least 10 caracters long<strong>check it out!</strong>
                    </Alert>

                }

            </label>

            <label className="champ__label">
                Rol
                <input className="champ__input"
                    name="rol" type="text"
                    onChange={handleRolChange}
                    value={rol} />
                {formSubmitted && !iscaractValid &&
                    <Alert severity="error">
                        <AlertTitle>Error</AlertTitle>
                        You need add a rol<strong>check it out!</strong>
                    </Alert>

                }

            </label>
            <label className="champ__label">
                Dificulty
                <input className="champ__input" name="dificulty" type="text"
                    onChange={handleDificultyChange}
                    value={dificulty} />
                {formSubmitted && !iscaractValid &&
                    <Alert severity="error">
                        <AlertTitle>Error</AlertTitle>
                        You need add dificulty <strong>check it out!</strong>
                    </Alert>

                }

            </label>
            <label className="champ__label">
                Description
                < input className="champ__input"
                    name="description" type="text"
                    onChange={handleDescriptionChange}
                    value={description} />
                {formSubmitted && !iscaractValid &&
                    <Alert severity="error">
                        <AlertTitle>Error</AlertTitle>
                        You need add a description<strong>check it out!</strong>
                    </Alert>

                }

            </label>

            <label className="champ__label" >
                Champion Region
                <select onChange={handleRegionChange}
                    value={region}>
                    {regions.map(region => {
                        return <option
                            key={region.id}
                            value={region.id}
                        >{region.name}</option>
                    })}
                </select>

                {formSubmitted && !iscaractValid &&
                    <Alert severity="error">
                        <AlertTitle>Error</AlertTitle>
                        You need add a rol<strong>check it out!</strong>
                    </Alert>
                }
            </label>

            <Button type="submit" size="medium" variant="contained"><span>{type === 'create' ? 'Create new Champion' : 'Save changes'}</span></Button>

        </form>
    );

}