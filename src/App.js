import './App.css'
import { Posters } from './components/posters/posters'
import { Banner } from './components/banner/banner'
import { Film } from './components/film/film'
import { FilmDetail } from './components/film_detal/film_detal'
import {Routes, Route} from 'react-router-dom'


function App() {
  return (
    <Routes>
      <Route path='/' element={
        <>
          <Banner/>
          <Posters/>
        </>
      }/>
      <Route path='/details/:id_film' element={<><FilmDetail/></>}></Route>
      <Route path='/film' element={<><Film/></>}></Route>
    </Routes>
  );
}

export default App;
