import * as React from 'react';
import { Redirect, useHistory, useParams } from 'react-router';
import { Champion } from '../Champion/Champion';
import AbilityForm from '../AbilityForm/AbilityForm';
import { ChampionElemObj } from '../types/ChampionElemObj';
import { AbilityElemObj } from '../types/AbilityElemObj';
import './ChampionDetails.css';


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
        <div className="details__container">
            <img className="details__img" src={img}></img>
            <section className="details__info">
                <h1 className="details___name" >{name}</h1>
                <h4 className="details__h4">DIFICULTY</h4>
                <h2 className="details__h2">{dificulty}</h2>

                <h4 className="details__h4">ROL</h4>
                <h2 className="details__h2">{rol}</h2>


                <h4 className="details__h4">BIOGRAPHY</h4>
                <p className="details__p">{description}</p>
            </section>
        </div>

        <section className="habilities__section">
            <div className="habilities__container">
                <h2 className="habilities__h2">Total abilities: {abilities.length}</h2>
                <section>{abilities.map(abilityElem => {
                    return <div className ="habilities__view">  
                <img className="habilities__img" src={abilityElem.img}></img>
                <div className ="habilities__info"> 
                <h6 className="habilities__title">{abilityElem.keyboard}</h6>

                <h4 className="habilities__title">{abilityElem.name}</h4>
                <p className="habilities__p">{abilityElem.description}</p>
                
                  </div> 
                         </div>
                        
                    
                  //  li key={abilityElem.id} >{abilityElem.name} - {abilityElem.img}</li>
                })} </section>
                <AbilityForm onCreate={handleCreateAbilityElem} />

             
            </div>
        </section>

    </div>);
}
export default ChampionDetails;
