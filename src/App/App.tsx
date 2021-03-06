import React from 'react';

import './App.css';
import { Champion } from '../Champion/Champion';
import { Link } from '../Link/Link';
import { ChampionForm } from '../ChampionForm/ChampionForm';
import { HashRouter, Route, Switch, Redirect, useHistory } from 'react-router-dom';
import ChampionDetails from '../ChampionDetails/ChampionDetails';
import Page404 from '../Page404/Page404';
import { ChampionElemObj } from '../types/ChampionElemObj';
import { AbilityElemObj } from '../types/AbilityElemObj';
import line1 from '../images/line1.png';
import line2 from '../images/line2.png';
import valoranlogo from '../images/valoranlogo.png';
import { regionObj } from '../types/regionObj';
import RegionsList from '../RegionsList/RegionsList';
import RegionDetails from '../RegionDetails/RegionDetails';
import { ThemeProvider } from '@emotion/react';
import { theme } from '../utils/theme';
import { Bar } from 'react-chartjs-2';
import { RegionForm } from '../RegionForm/RegionForm';
import { getChartdata } from '../utils/getCharData';
import { getABChartdata } from '../utils/getABCharData';
import { useLocalStorage } from '../utils/UseLocalStorage';




function App() {
  const [formType, setFormType] = React.useState<'create' | 'Edit'>('create');
  const [editId, setEditId] = React.useState<number | null>(null);
  const history = useHistory();


  const [championElems, setChampionElems] = useLocalStorage<ChampionElemObj[]>('champ',[

    {
      id: 0,
      regions: ['Targon'],
      regionId: 0,
      img: 'https://www.pixel4k.com/wp-content/uploads/2019/11/solar-lunar-eclipse-leona-lol-league-of-legends-lol_1574105129.jpg',
      name: 'Leona',
      rol: 'Tank',
      dificulty: 'Easy',
      description: 'Embuida con el fuego del sol, Leona es una guerrera sagrada de los Solari que defiende el monte Targon con su espada cenit y el escudo del amanecer. Su piel brilla con fuego estelar mientras sus ojos arden con el poder del Aspecto celestial dentro de ella.',
      abilities: [
        {
          id: 0,
          name: 'Solar Punch',
          img: 'https://64.media.tumblr.com/2f81751c6860614fa87e03c02b965f12/b7a6a0e97b82e3c1-cd/s500x750/3261355ae4aeade51e5ae34d65cd27445c01ddeb.png',
          keyboard: 'Q',
          description: 'Leona uses her shield to perform her next basic attack, dealing bonus magic damage and stunning the target...',
        }
      ],

    },
   


    {
      id: 1,
      regionId: 1,
      regions: ['Piltover'],
      img: 'https://i.redd.it/qzbe0nz9vlw71.png',
      name: 'Caitlyn',
      rol: 'ADCarry',
      dificulty: 'Easy',
      description: 'econocida como la mejor pacificadora, Caitlyn tambi??n es la mejor oportunidad de Pilt??ver para deshacerse de los elementos criminales elusivos de su ciudad. A veces hace equipo con Vi y es un buen contrapunto para la naturaleza m??s impulsiva de su compa??era. Aunque carga un rifle hextech ??nico, el arma m??s poderosa de Caitlyn es su intelecto superior, el cual le permite tender trampas elaboradas para malhechores que son suficientemente tontos para operar en la Ciudad del Progreso',
      abilities: [
        {
          id: 0,
          name: 'Solar Punch',
          img: 'https://64.media.tumblr.com/2f81751c6860614fa87e03c02b965f12/b7a6a0e97b82e3c1-cd/s500x750/3261355ae4aeade51e5ae34d65cd27445c01ddeb.png',
          keyboard: 'Q',
          description: 'Leona uses her shield to perform her next basic attack, dealing bonus magic damage and stunning the target...',
        }
      ],

    }
  ]);

  const [regions, setRegions] = useLocalStorage<regionObj[]>('region',[
    {
      id: 0,
      name: 'Targon',
      description: 'blablalbalblab',
      img: 'https://universe-meeps.leagueoflegends.com/v1/assets/images/mttargon-once-in-a-lifetime.jpg',
      champs: ['leona'],
      champId: 0,
    },
    {
      id: 1,
      name: 'Piltover',
      description: 'blablalbalblab',
      img: 'https://mobalytics.gg/wp-content/uploads/1969/10/Piltover-splash-2-1024x575.jpg',
      champs: ['Caitlyn'],
      champId: 1,
    },
  ])
  const handleCreate = (newChampion: {
    name: string;
    img: string;
    rol: string;
    dificulty: string;
    description: string;
    regionId: number;
    regions: string[];

  }) => {
    console.log('new Champion', newChampion);
    const arrayCopy = championElems.slice(); // copia del arreglo
    arrayCopy.push({ //agrega nuevo elemento con la informacion recibida
      id: Math.random(),
      regionId: newChampion.regionId,
      img: newChampion.img,
      name: newChampion.name,
      rol: newChampion.rol,
      dificulty: newChampion.dificulty,
      description: newChampion.description,
      abilities: [],
      regions: [],
    });


    setChampionElems(arrayCopy);
  }


  const handleBeginEdit = (editId: number) => {
    setEditId(editId);
    setFormType('Edit');
    history.push('form')
  }

  const handleEdit = (editId: number, editChampionElem: { //edit champion info
    name: string;
    img: string;
    rol: string;
    dificulty: string;
    description: string;
  }) => {
    const championElemsCopy = championElems.slice();
    const editIndex = championElems.findIndex((elem) => {
      if (elem.id === editId) {
        return true;
      }
      return false;
    });
    championElemsCopy[editIndex] = {
      ...championElems[editIndex],
      ...editChampionElem,
    }
    setChampionElems(championElemsCopy);

  }

  const handleDelete = (deleteId: number) => {
    console.log("delete");

    const championElemsCopy = championElems.filter((elem) => {
      if (elem.id === deleteId) {
        return false;
      } else {
        return true;
      }
    });
    setChampionElems(championElemsCopy);
  }

 

  const handleCreateAbility = (champioinElemId: number, newAbilityElem: AbilityElemObj) => {
    const championElemsCopy = championElems.slice();
    const editIndex = championElems.findIndex((elem) => {
      if (elem.id === champioinElemId) {
        return true;
      }
      return false;
    });
    championElemsCopy[editIndex] = {
      ...championElems[editIndex],
      abilities: [
        ...championElems[editIndex].abilities,
        newAbilityElem
      ]
    }
    setChampionElems(championElemsCopy);

  }
  const handleCreateRegion = (newRegion: {
    name: string;
    img: string;
    description: string;
    champId: number;
    champs: string[];

  }) => {
    console.log('new region', newRegion);
    const arrayCopy = regions.slice(); // copia del arreglo
    arrayCopy.push({ //agrega nuevo elemento con la informacion recibida
      id: Math.random(),
      champId: newRegion.champId,
      img: newRegion.img,
      name: newRegion.name,
      description: newRegion.description,
      champs: [],
    });


    setRegions(arrayCopy);
  }
  const handleEditRegion = (editId: number, editRegionElem: { //edit Region info
    name: string;
    img: string;
    description: string;
  }) => {
    const regionsCopy = regions.slice();
    const editIndex = regions.findIndex((elem) => {
      if (elem.id === editId) {
        return true;
      }
      return false;
    });
    regionsCopy[editIndex] = {
      ...regions[editIndex],
      ...editRegionElem,
    }
    setRegions(regionsCopy);

  }

// const data = getChartdata(regions); 
 const dataAB = getABChartdata(championElems);



 console.log(regions);
  return (<ThemeProvider theme={theme}>
  
      <div className="principal">
        <nav className="App__nav">
          <img className="App__img" alt=" " src="https://universe.leagueoflegends.com/images/LOL.png" />
          <div className="App__LinkGroup">
            <Link
              color="light"
              text="Home"
              url="/form" />
            <Link color="light"
              text="Champion"
              url="champlist"></Link>
            <Link color="light"
              text="Region"
              url="regions"></Link>
            <Link color="light"
              text="Graph"
              url="Graph"></Link>

          </div>

          <img className="App__img" alt=" " src="https://www.pinclipart.com/picdir/big/73-739007_icon-profile-picture-circle-png-clipart.png" />
        </nav>
        <Switch>
          <Route path="/form">
          <section className="championForm__container">
            <RegionForm
            regions={regions}
              editId={editId}
              type={formType}
              onCreate={handleCreateRegion}
              onEdit={handleEditRegion}
              championsOp={championElems}>
            </RegionForm>

             </section>
            <section className="championForm__container">
              <ChampionForm
                editId={editId}
                type={formType}
                onCreate={handleCreate}
                onEdit={handleEdit}
                regions={regions}
                championElems={championElems}
                >

              </ChampionForm>
            </section>

           


          </Route>



          <Route path="/champlist">
            <section className="App__title">
              <img className="App__imgt" alt=" " src="https://universe.leagueoflegends.com/esimages/content_type_icon_champion__3nwJQ.png" />
              <div className="championlist__cont">
                <img className="App__line" alt=" " src={line1} />
                <h1>Champions</h1>
                <img className="App__line" alt=" " src={line2} />
              </div>
            </section>
            <section className="champlist__container">

              {championElems.map((elem) => {
                return <Champion key={elem.id}
                  name={elem.name}
                  id={elem.id}
                  rol={elem.rol}
                  dificulty={elem.dificulty}
                  description={elem.description}
                  img={elem.img}
                  type="Edit"
                  onDelete={handleDelete}
                  onEdit={handleBeginEdit} />
              })}
            </section>

            <footer>
              <section className="footer__info">
                <img className="footer__img" alt=" " src="https://ruinedking.com/assets/images/static/footer/riot.svg" />
                <p> ?? 2021 Riot Games, Inc. Todos los derechos reservados.</p>
                <img className="footer__img" alt=" " src="https://content.totalwar.com/total-war/com.totalwar.www2019/uploads/2019/04/01144512/footer-esrb-teen-violence_rome2web.jpg" />
              </section>
            </footer>


          </Route>
          <Route path="/details/:id">
            <ChampionDetails list={championElems}
              onCreateAbilities={handleCreateAbility}>
            </ChampionDetails>

            <footer>
              <section className="footer__info">
                <img className="footer__img" alt=" " src="https://ruinedking.com/assets/images/static/footer/riot.svg" />
                <p> ?? 2021 Riot Games, Inc. Todos los derechos reservados.</p>
                <img className="footer__img" alt=" " src="https://content.totalwar.com/total-war/com.totalwar.www2019/uploads/2019/04/01144512/footer-esrb-teen-violence_rome2web.jpg" />
              </section>
            </footer>

          </Route>
          <Route path="/regions" exact>
            <section className="App__title">
              <img className="valoranlogo" alt=" " src={valoranlogo} />
              <div className="championlist__cont">
                <img className="App__line" alt=" " src={line1} />
                <h1>Regions</h1>
                <img className="App__line" alt=" " src={line2} />
              </div>
            </section>
            <section>
              <RegionsList
                regions={regions}
              />
            </section>


            <footer>
              <section className="footer__info">
                <img className="footer__img" alt=" " src="https://ruinedking.com/assets/images/static/footer/riot.svg" />
                <p> ?? 2021 Riot Games, Inc. Todos los derechos reservados.</p>
                <img className="footer__img" alt=" " src="https://content.totalwar.com/total-war/com.totalwar.www2019/uploads/2019/04/01144512/footer-esrb-teen-violence_rome2web.jpg" />
              </section>
            </footer>
          </Route>
          <Route path="/regions/:id">


            <RegionDetails
              regionsList={regions}
              championElems={championElems}>

            </RegionDetails>


            <footer>
              <section className="footer__info">
                <img className="footer__img" alt=" " src="https://ruinedking.com/assets/images/static/footer/riot.svg" />
                <p> ?? 2021 Riot Games, Inc. Todos los derechos reservados.</p>
                <img className="footer__img" alt=" " src="https://content.totalwar.com/total-war/com.totalwar.www2019/uploads/2019/04/01144512/footer-esrb-teen-violence_rome2web.jpg" />
              </section>
            </footer>
          </Route>

          <Route path="/Graph">
            <section>
            <Bar  data={dataAB} options={{
              indexAxis: 'y',
              elements: {
                bar: {
                  borderWidth: 2,
                },
              },
              responsive: true,
              plugins: {
                legend: {
                  display: false,
                },
                title: {
                  display: true,
                  text: 'Champions per Region',
                },
              },
            }} />
            </section>

          </Route>


          <Route path="/404">
            <Page404></Page404>
          </Route>
          <Redirect to="/404">
          </Redirect>
        </Switch>

      </div>
  
  </ThemeProvider>


  )
}

export default App;
