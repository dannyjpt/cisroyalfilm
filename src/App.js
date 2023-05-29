import './App.css'
import { Posters } from './components/posters/posters'
import { Banner } from './components/banner/banner'
import { Navigation } from './components/navigation/nav'
import Register from './components/register/register'
import Login from './components/auth/auth'
import Booking from './components/booking/booking'
import Results from './components/results/results'
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
    </Routes>
  );
}

export default App;
