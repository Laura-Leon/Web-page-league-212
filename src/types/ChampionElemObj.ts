import { AbilityElemObj } from "./AbilityElemObj";

export type ChampionElemObj = {
    id: number;
    name: string;
    img: string;
    rol: string;
    dificulty: string;
    description: string;
    regions: string[];
    regionId: number;
    abilities: AbilityElemObj[];


  
  }