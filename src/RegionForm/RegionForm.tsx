
import * as React from 'react';
import { useHistory } from "react-router";

import './RegionForm.css';



import ReactDOM from 'react-dom';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { regionObj } from '../types/regionObj';
import RegionsList from '../RegionsList/RegionsList';
import RegionDetails from '../RegionDetails/RegionDetails';
import { ChampionElemObj } from '../types/ChampionElemObj';


interface RegionFormProps {
    editId: number | null;
    type: 'create' | 'Edit';
regions: regionObj[];
    onCreate: (newRegion: {
        name: string;
        img: string;
        description: string;
        champs: string[];
        champId:number;
    }) => void;
    onEdit: (id: number, editRegionElem: {
        name: string, img: string;
        description: string;
        champs: string[];
    }) => void;
    
championsOp:ChampionElemObj[];
}



export const RegionForm: React.FC<RegionFormProps> = ({ regions,editId, type, onCreate, onEdit,championsOp }) => {
const history = useHistory();
const editElem = regions.find((elem) => {
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
    const [description, setDescription] = React.useState(editElem?.description||' ');
    const handleDescriptionChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        setDescription(event.target.value);
    }
//estado para guardar el valor del campeon
    const [champion, setChampion] = React.useState(0);
    const handleChampionChange: React.ChangeEventHandler<HTMLSelectElement> = (event) => {
        console.log(event.target.value);
        setChampion(parseFloat(event.target.value));
    
    }

    const iscaractValid = name.length >= 2 || description.length >= 10;
    const isImgValid = img.length >= 10;

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event: any) => {
        event.preventDefault();
        //tell me if smn is missing
        setFormSubmitted(true);

        if (type ==='create' && iscaractValid && isImgValid) {
            console.log('valid');
const champString = championsOp.map(obj => obj.name);
                    onCreate({
                        img: img,
                        name: name,
                        description: description,
                        champId: champion,
                        champs: champString,
                    });
                    setName('');
                    setImg('');
                    setDescription('');
                    setChampion(0);

                    setFormSubmitted(false);
                    history.push('/regions');

        }else if(type === 'Edit'&& iscaractValid){
            const champString = championsOp.map(obj => obj.name);
            onEdit(editId!,{ img: img,
                name: name, 
                champs: champString,
                description: description});
        }else{
            console.log('invalid');
        }
    }

    
    return (


        <form className="ChampionForm"
            onSubmit={handleSubmit}>
            <h1 className ="championForm__h1"> {type === 'create' ? 'New' : 'Edit'}Region {editId}</h1>
            <label className ="champ__label">
                Regions's Name
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

            <label className= "champ__label">
                Description
                < input  className = "champ__input"
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
         
           

            <Button type ="submit" size ="medium" variant="contained"><span>{type === 'create' ? 'Create new Region' : 'Save changes'}</span></Button>

        </form>
    );

}