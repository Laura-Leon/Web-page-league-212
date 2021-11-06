import * as React from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { Champion } from '../Champion/Champion';
import { ChampionElemObj } from '../types/ChampionElemObj';
import { RegionElemObj } from '../types/RegionElemObj';
import { regionObj } from '../types/regionObj';

interface RegionDetailsProps {
    regions:regionObj[];
    championElems: ChampionElemObj[];
}
const RegionDetails: React.FC<RegionDetailsProps> = ({ regions,championElems}) => { 
  
    const { id: idString } =  useParams<{ id: string }>(); 
    const id = parseFloat(idString);
     
    /** usamos el método find del arreglo de autores para encontrar
* el autor que corresponde al id del parámetro de la ruta
ejemplo: /authors/3
      Entre todos los autores buscamos el que tiene id === 3**/
const region = regions.find ((elem) => {
return elem.id === id;
});

if(!region) {
    return <Redirect to="/404" />;
}  

const regionChampionElems = championElems.filter((elem) => {
   return elem.regionId ===id;
});
    return (<div>
                <h2> {region?.name} </h2>
                <p>Champions in this region {regionChampionElems.length}</p>
                {regionChampionElems.map((elem) => {
                return <Champion key={elem.id}
                name={elem.name}
                id={elem.id}
                rol={elem.rol}
                dificulty={elem.dificulty}
                description={elem.description}
                img={elem.img} type={'details'}                   />
              })}
       </div>); 
      
}
export default RegionDetails;