import * as React from 'react'; 
import { Redirect, useParams } from 'react-router';
import { Champion } from '../Champion/Champion';
import { ChampionElemObj } from '../types/ChampionElemObj';

interface ChampionDetailsProps{
list: ChampionElemObj[];
}


const ChampionDetails: React.FC<ChampionDetailsProps>= ({ list }) =>{
const { id: idString } = useParams<{id:string}>();
const id = parseInt(idString);
const elem = list.find((elem)=>{
/*funciona igual que un if else */ 
    return elem.id === id;
})
console.log(elem);
if(!elem){
    return<Redirect to="/404"></Redirect>
}
const {name,img,dificulty,description,rol} = elem;
    return(<div>
        <Champion
        name ={name}
        img ={img}
        description ={description}
        rol ={rol}
        dificulty ={dificulty}
        id={id}
        type = "details"
        >
        </Champion>
        
        </div>);
}
export default ChampionDetails;
