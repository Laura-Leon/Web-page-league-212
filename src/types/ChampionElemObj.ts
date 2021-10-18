import { HabilityElemObj } from "./HabilityElemObj";
import { SkinElemElemObj } from "./SkinElemObj";


export type ChampionElemObj = {
    id: number;
    name: string;
    img: string;
    rol: string;
    dificulty: string;
    description: string;

    habilities: HabilityElemObj[];
    skins:SkinElemElemObj[];
  
  }