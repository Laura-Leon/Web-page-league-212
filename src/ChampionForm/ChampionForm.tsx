

import * as React from 'react';
import { useHistory } from "react-router";
import { ChampionProps } from '../Champion/Champion';
import './ChampionForm.css';
import ReactDOM from 'react-dom';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { makeStyles } from '@mui/material/styles';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';
import { regionObj } from '../types/regionObj';
import RegionsList from '../RegionsList/RegionsList';
import RegionDetails from '../RegionDetails/RegionDetails';
import Select, { SelectChangeEvent } from '@mui/material/Select';


interface ChampionFormProps {
    editId: number | null;
    type: 'create' | 'Edit';
    onCreate: (newChampion: {
        name: string;
        img: string;
        rol: string;
        dificulty: string;
        description: string;
        regionId:number;
      
    }) => void;
    onEdit: (id: number, editChampionElem: {
        name: string, img: string;
        rol: string;
        dificulty: string;
        description: string;
    }) => void;
regions:regionObj[];
}



export const ChampionForm: React.FC<ChampionFormProps> = ({ editId, type, onCreate, onEdit,regions }) => {
const history = useHistory();
    const [formSubmitted, setFormSubmitted] = React.useState(false);

    const [name, setName] = React.useState(' ');
    const handleNameChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        setName(event.target.value);
    }
    const [img, setImg] = React.useState(' ');
    const handleImgChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        setImg(event.target.value);
    }

    const [rol, setRol] = React.useState(' ');
    const handleRolChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        setRol(event.target.value);
    }
    const [dificulty, setDificulty] = React.useState(' ');
    const handleDificultyChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        setDificulty(event.target.value);
    }
    const [description, setDescription] = React.useState(' ');
    const handleDescriptionChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        setDescription(event.target.value);
    }
//estado para guardar el valor de la region
    const [region, setRegion] = React.useState(0);
    const handleRegionChange: React.ChangeEventHandler<HTMLSelectElement> = (event) => {
        console.log(event.target.value);
        setRegion(parseFloat(event.target.value));
    
    }

    const iscaractValid = name.length >= 2 || rol.length >= 2 || dificulty.length >= 2 || description.length >= 10;
    const isImgValid = img.length >= 10;

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event: any) => {
        event.preventDefault();
        //tell me if smn is missing
        setFormSubmitted(true);

        if (type ==='create' && iscaractValid && isImgValid) {
            console.log('valid');

                    onCreate({
                        img: img,
                        name: name,
                        rol: rol,
                        dificulty: dificulty,
                        description: description,
                        regionId: region,

                    });
                    setName('');
                    setImg('');
                    setDificulty('');
                    setRol('');
                    setDescription('');
                    setRegion(0);

                    setFormSubmitted(false);
                    history.push('/champlist');




        }else if(type === 'Edit'&& iscaractValid){
            onEdit(editId!,{ img: img,
                name: name,
                rol: rol,
                dificulty: dificulty,
                description: description});
        }else{
            console.log('invalid');
        }
    }

    
    return (


        <form className="ChampionForm"
            onSubmit={handleSubmit}>

            <h1 className ="championForm__h1"> {type === 'create' ? 'New' : 'Edit'} Champion {editId}</h1>


            <label className ="champ__label">
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
            
            <label className ="champ__label" >
                Champion Region
              <select onChange={handleRegionChange}
              value= {region}> 
                  {regions.map(region =>{
                      return <option 
                      key={region.id}
                      value = {region.id}
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



            <Button type ="submit" size ="medium" variant="contained"><span>{type === 'create' ? 'Create new Champion' : 'Save changes'}</span></Button>

        </form>
    );

}