import * as React from 'react'; 
import { useHistory } from 'react-router-dom';
import { AbilityElemObj } from '../types/AbilityElemObj';

interface AbilityFormProps{

    onCreate: (newAbilityElem: AbilityElemObj ) => void;
}

const AbilityForm: React.FC<AbilityFormProps>= ({ onCreate}) =>{
    const history = useHistory();
    const [name, setName] = React.useState(' ');
    const handleNameChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        setName(event.target.value);
    }
    const [keyboard, setkeyboard] = React.useState(' ');
    const handleKeyboardChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        setkeyboard(event.target.value);
    }
    const [description, setdescription] = React.useState(' ');
    const handledescriptionChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        setdescription(event.target.value);
    }
    const [img, setImg] = React.useState(' ');
    const handleimgChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        setImg(event.target.value);
    }

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event: any) => {
        event.preventDefault();
        const newAbilityElem: AbilityElemObj={
            id: Math.random(),
            name:name,
            keyboard:keyboard,
            description:description,
            img:img
        }
        onCreate(newAbilityElem);
        history.goBack();
    }

    return(<form onSubmit={handleSubmit}> 
        <input 
        type ="text"
        onChange={handleNameChange}
        value ={name}/>

         <input 
        type ="text"
        onChange={handleKeyboardChange}
        value ={keyboard}/>
        
         <input 
        type ="text"
        onChange={handledescriptionChange}
        value ={description}/>
        
         <input 
        type ="text"
        onChange={handleimgChange}
        value ={img}/>

        <button>
            add Ability
        </button>
    </form>)
}
export default AbilityForm;