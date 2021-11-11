import { ChampionElemObj } from "../types/ChampionElemObj";
import { regionObj } from "../types/regionObj";

export const getChartdata = (regionElems: regionObj[]) => {
    const counters: {[key: string]: number} = {}
    regionElems.forEach((me) => {
      counters[me.name]=me.champs.length;
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

