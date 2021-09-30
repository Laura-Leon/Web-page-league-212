import React from 'react';

import './App.css';
import { Champion} from '../Champion/Champion';
import { Link } from '../Link/Link';
import { ChampionForm} from '../ChampionForm/ChampionForm';
import {ChampionProps} from '../Champion/Champion';


type ChampionElemObj = ChampionProps & {
  id:number;
}


function App() {

  const[championElems,setChampionElems] = React.useState<ChampionElemObj[]>([]);

  const handleCreate = (newChampion:ChampionProps ) =>{
    console.log('new Champion', newChampion);

    const newArray =[
      ...championElems,
      {
        id:Math.random(),
        img: newChampion.img,
        name:newChampion.name,
        rol:newChampion.rol,
        dificulty:newChampion.dificulty,
        description:newChampion.description

      }
    ]
    setChampionElems(newArray)
  }


  return (
    <div>
       <nav className="App__nav">
    <img className="App__img" src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Youtube_Music_icon.svg/2048px-Youtube_Music_icon.svg.png" />
    <div className="App__LinkGroup">
      <Link
      actives
        text="Home"
        url="https://www.youtube.com/watch?v=fmOEKOjyDxU" />
      <Link
        text="Champion"
        url="https://www.youtube.com/watch?v=fmOEKOjyDxU"></Link>
      <Link
        text="Region"
        url="https://www.youtube.com/watch?v=fmOEKOjyDxU"></Link>
         <Link
        text="Skins"
        url="https://www.youtube.com/watch?v=fmOEKOjyDxU"></Link>
    </div>
    <img className="App__img" src="https://www.pinclipart.com/picdir/big/73-739007_icon-profile-picture-circle-png-clipart.png" />
  </nav>
  <ChampionForm onCreate={handleCreate}> </ChampionForm>

  {championElems.map((elem)=>{
    return <Champion key={elem.id} name={elem.name} rol={elem.rol} dificulty={elem.dificulty} description={elem.description} img= {elem.img}/> 
  })}
    </div>
   
  )
}

export default App;
