import * as React from 'react';
import { Redirect, useHistory, useParams } from 'react-router';
import { Champion } from '../Champion/Champion';
import AbilityForm from '../AbilityForm/AbilityForm';
import { ChampionElemObj } from '../types/ChampionElemObj';
import { AbilityElemObj } from '../types/AbilityElemObj';

interface ChampionDetailsProps {
    list: ChampionElemObj[];
    onCreateAbilities: (champioinElemId: number, newAbilityElem: AbilityElemObj) => void;
}


const ChampionDetails: React.FC<ChampionDetailsProps> = ({ list, onCreateAbilities }) => {

    const { id: idString } = useParams<{ id: string }>();
    const id = parseFloat(idString);
    const elem = list.find((elem) => {
        /*funciona igual que un if else */
        return elem.id === id;
    })
    console.log(elem);
    if (!elem) {
        return <Redirect to="/404"></Redirect>
    }



    const { name, img, dificulty, description, rol, abilities } = elem;

    const handleCreateAbilityElem = (newAbilityElem: AbilityElemObj) => {
        onCreateAbilities(id, newAbilityElem);
    }
    return (<div>
      <img src ={img}></img>
   
            <h3 className="Champion__h3">DIFICULTY:{dificulty}</h3>
            
            <h3 className="Champion__h3">ROL{rol}</h3>
           
            <h3 className="Champion__h3">BIOGRAPHY</h3>
            <p className="Champion__p">{description}</p>
        <div>
            <h2>Total abilities: {abilities.length}</h2>
            <ol>{abilities.map(abilityElem => {
                return <li key={abilityElem.id} >{abilityElem.name} - {abilityElem.img}</li>
            })} </ol>
            <AbilityForm onCreate={handleCreateAbilityElem} />
        </div>
    </div>);
}
export default ChampionDetails;
