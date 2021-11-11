import React from "react";
import { Link } from '../Link/Link';
import './RegionList.css';


import { regionObj } from "../types/regionObj";
interface RegionsListProps {
  regions: regionObj[];
}

const RegionsList: React.FC<RegionsListProps> = ({ regions }) => {
  return (<div>

    <section className ="region__Container">
      {regions.map((region) => {
        return <div
          key={region.id}>
          <div className="region__Wrapper">
            <div className="region__card">
              <img className="region__img" alt="champ" src={region.img} ></img>
             
              <div className="region__info">
                <div className="region__title">
                  <h1 className="region__h1">{region.name}</h1>
                </div>
                <div className="region__link">
                    <Link
                      color="dark"
                      text="Explore"
                      url={`/regions/${region.id}`} />
                  </div>

              </div>

            </div>
          </div>


        </div>
      })}
    </section>
  </div>);
}
export default RegionsList;