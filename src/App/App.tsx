import React from 'react';

import './App.css';
import { Champion } from '../Champion/Champion';
import { Link } from '../Link/Link';
import { ChampionForm } from '../ChampionForm/ChampionForm';
import { ChampionProps } from '../Champion/Champion';
import { title } from 'process';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import ChampionDetails from '../ChampionDetails/ChampionDetails';
import Page404 from '../Page404/Page404';
import { ChampionElemObj } from '../types/ChampionElemObj';
import { AbilityElemObj } from '../types/AbilityElemObj';
import { SkinElemObj } from '../types/SkinElemObj';





function App() {
  const [formType, setFormType] = React.useState<'create' | 'Edit'>('create');
  const [editId, setEditId] = React.useState<number | null>(null);


  const [championElems, setChampionElems] = React.useState<ChampionElemObj[]>([

    {
      id: 0,
      img: 'https://cdnb.artstation.com/p/assets/images/images/036/132/497/large/qi-mang-10m.jpg?1616794088',
      name: 'leona',
      rol: 'tank',
      dificulty: 'Easy',
      description: 'my deardiana....',
      abilities: [
        {
          id: 0,
          name: 'Solar Punch',
          img: 'https://static.wikia.nocookie.net/leagueoflegends/images/e/eb/Leona_Shield_of_Daybreak.png/revision/latest/zoom-crop/width/360/height/360?cb=20130929123016',
          keyboard: 'Q',
          description: 'for your love immm...',
        }
      ],
     /* skins:[
        {
          id:0.1,
          name: 'Dawnbringer Leona',
          img: 'https://cdnb.artstation.com/p/assets/images/images/036/132/497/large/qi-mang-10m.jpg?1616794088',
         theme: 'Eclipse',
          description: 'In the mirror of the glass...'
        }
      ]*/
    }
  ]);

  const handleCreate = (newChampion: {
    name: string;
    img: string;
    rol: string;
    dificulty: string;
    description: string;

    //skins:[]
  }) => {
    console.log('new Champion', newChampion);
    const arrayCopy = championElems.slice(); // copia del arreglo
    arrayCopy.push({ //agrega nuevo elemento con la informacion recibida
        id:Math.random(),
        img: newChampion.img,
        name: newChampion.name,
        rol: newChampion.rol,
        dificulty: newChampion.dificulty,
        description: newChampion.description,
        abilities: [],
    });
/*
    const newArray = [
      ...championElems,
      {
        id: Math.random(),
        img: newChampion.img,
        name: newChampion.name,
        rol: newChampion.rol,
        dificulty: newChampion.dificulty,
        description: newChampion.description,
        abilities: [],

      }
    ]*/ 

    setChampionElems(arrayCopy);
  }
  const handleBeginEdit = (editId: number) => {
    setEditId(editId);
    setFormType('Edit');
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
      /*id:championElems[editIndex].id,
      img: championElems[editIndex].img,
      name:championElems[editIndex].name,
      rol:championElems[editIndex].rol,
      dificulty:championElems[editIndex].dificulty,
      description:championElems[editIndex].description,
      */
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


  return (
    <HashRouter>
      <div>
        <nav className="App__nav">
          <img className="App__img" alt=" " src="https://universe.leagueoflegends.com/images/LOL.png" />
          <div className="App__LinkGroup">
            <Link

              text="Home"
              url="/form" />
            <Link
              text="Champion"
              url="champlist"></Link>
            <Link
              text="Region"
              url=""></Link>
            <Link
              text="Skins"
              url=""></Link>
          </div>
          <img className="App__img" alt=" " src="https://www.pinclipart.com/picdir/big/73-739007_icon-profile-picture-circle-png-clipart.png" />
        </nav>
        <Switch>
          <Route path="/form">

            <ChampionForm
              editId={editId}
              type={formType}
              onCreate={handleCreate}
              onEdit={handleEdit}>
            </ChampionForm>

          </Route>

          <Route path="/champlist">
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
          </Route>
          <Route path="/details/:id">
            <ChampionDetails list={championElems}
              onCreateAbilities={handleCreateAbility}>
            </ChampionDetails>
          </Route>
          <Route path="/404">
            <Page404></Page404>
          </Route>
          <Redirect to="/404">
            <Page404></Page404>

          </Redirect>
        </Switch>



      </div>
    </HashRouter>


  )
}

export default App;
