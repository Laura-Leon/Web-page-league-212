import * as React from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { Champion } from '../Champion/Champion';
import { ChampionElemObj } from '../types/ChampionElemObj';

import { regionObj } from '../types/regionObj';
import './RegionDetails.css';
import line1 from '../images/line1.png';
import line2 from '../images/line2.png';


interface RegionDetailsProps {
    regionsList: regionObj[];
    championElems: ChampionElemObj[];
}
const RegionDetails: React.FC<RegionDetailsProps> = ({ regionsList, championElems }) => {

    const { id: idString } = useParams<{ id: string }>();
    const id = parseFloat(idString);

    /** usamos el método find del arreglo de autores para encontrar
* el autor que corresponde al id del parámetro de la ruta
ejemplo: /authors/3
      Entre todos los autores buscamos el que tiene id === 3**/
    const region = regionsList.find((elem) => {
        return elem.id === id;
    });

    if (!region) {
        return <Redirect to="/404" />;
    }

    const regionChampionElems = championElems.filter((elem) => {
        return elem.regionId === id;
    });
    return (<div >

        <div className="details__container">
            <img className="details__img" src={region?.img}></img>
            <section className="details__info">
                <h1 className="details___name" >{region?.name}</h1>
                <h4 className="details__h4">BIOGRAPHY</h4>
                <p className="details__p">{region?.description}</p>

            </section>
        </div>
        <div className="regionContainer" >
       
        <div className="championlist__cont">
                <img className="App__line" alt=" " src={line1}   />
              <p>  Champions in {region?.name} {regionChampionElems.length}  </p>
              
                <img className="App__line" alt=" " src={line2} />
              </div>
        </div>
        <div className="detailsChampion__container">

            {regionChampionElems.map((elem) => {
                return <Champion key={elem.id}
                    name={elem.name}
                    id={elem.id}
                    rol={elem.rol}
                    dificulty={elem.dificulty}
                    description={elem.description}
                    img={elem.img} type={'details'} />
            })}
        </div>
    </div>);

}
export default RegionDetails;