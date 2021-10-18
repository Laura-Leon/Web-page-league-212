
import React from "react";
import { useHistory } from "react-router";
import { ChampionProps } from '../Champion/Champion';
import './ChampionForm.css';


interface ChampionFormProps {
    editId: number | null;
    type: 'create' | 'Edit';
    onCreate: (newChampion: {
        name: string;
        img: string;
        rol: string;
        dificulty: string;
        description: string;
    }) => void;
    onEdit: (id: number, editChampionElem: {
        name: string, img: string;
        rol: string;
        dificulty: string;
        description: string;
    }) => void;

}

export const ChampionForm: React.FC<ChampionFormProps> = ({ editId, type, onCreate, onEdit }) => {
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
    const iscaractValid = name.length >= 1 || rol.length >= 1 || dificulty.length >= 1 || description.length >= 1;
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

                    });
                    setName('');
                    setImg('');
                    setDificulty('');
                    setRol('');
                    setDescription('');
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

            <h2> {type === 'create' ? 'New' : 'Edit'}ChampElem {editId}</h2>


            <label>
                Champion's Name
                <input name="name" type="text"
                    onChange={handleNameChange}
                    value={name} />
                {formSubmitted && !iscaractValid &&
                    <p className="ChampionForm__error">Add a Name</p>
                }

            </label>

            <label>
                Img URL
                <input name="img" type="text"
                    onChange={handleImgChange}
                    value={img} />
                {formSubmitted && !isImgValid &&
                    <p className="ChampionForm__error">Url must be at least 10 caracters long</p>
                }

            </label>

            <label>
                Rol
                <input name="rol" type="text"
                    onChange={handleRolChange}
                    value={rol} />
                {formSubmitted && !iscaractValid &&
                    <p className="ChampionForm__error">Add a rol</p>
                }

            </label>
            <label>
                Dificulty
                <input name="dificulty" type="text"
                    onChange={handleDificultyChange}
                    value={dificulty} />
                {formSubmitted && !iscaractValid &&
                    <p className="ChampionForm__error">Add a dificulty</p>
                }

            </label>
            <label>
                Description
                <input name="description" type="text"
                    onChange={handleDescriptionChange}
                    value={description} />
                {formSubmitted && !iscaractValid &&
                    <p className="ChampionForm__error">Add a description</p>
                }

            </label>
            <button>{type === 'create' ? 'Create new Champion' : 'Save changes'}</button>

        </form>
    );

}