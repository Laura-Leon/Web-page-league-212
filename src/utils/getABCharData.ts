import { ChampionElemObj } from "../types/ChampionElemObj";
import { regionObj } from "../types/regionObj";

export const getABChartdata = (championElems: ChampionElemObj[]) => {
    const counters: {[key: string]: number} = {}
    championElems.forEach((me) => {
      counters[me.name]=me.abilities.length;
    });

console.log(counters);
    return {
      labels: Object.keys(counters),
      datasets: [
        {
          data: Object.values(counters),
          backgroundColor: ['rgba(54, 162, 235, 8.2)'],
          borderColor: ['rgba(54, 162, 235, 1)'],
        },
      ],
    };   
  }

