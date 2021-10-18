import { ChampionElemObj } from "./ChampionElemObj";

export type RegionElemObj = {
    id: number;
    name: string;
    img: string;
    key: string;
    description: string;
    championCount:number;
    likes:string;
  
    champion: ChampionElemObj[];
  }