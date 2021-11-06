import React from "react";
import { Link } from '../Link/Link';

import { regionObj } from "../types/regionObj";
interface RegionsListProps {
  regions:regionObj[];
}
 
const RegionsList: React.FC<RegionsListProps> = ({ regions}) => {
  return (<div> 

    <section> 
{regions.map((region)=>{
  return <div
    key ={region.id}>
      <div>
      <Link 
      color="dark"
      text = {region.name}
      url={`/regions/${region.id}`} />  
      </div>
      
    
  </div>
})}
    </section>
  </div>);
}
export default RegionsList;