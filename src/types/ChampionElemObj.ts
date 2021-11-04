import { AbilityElemObj } from "./AbilityElemObj";
import { SkinElemObj } from "./SkinElemObj";


export type ChampionElemObj = {
    id: number;
    name: string;
    img: string;
    rol: string;
    dificulty: string;
    description: string;

    regionId: number;

    abilities: AbilityElemObj[];
   // skins:SkinElemObj[];

  
  }