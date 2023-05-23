import './App.css'
import { Posters } from './components/posters/posters'
import { Banner } from './components/banner/banner'
import { Navigation } from './components/navigation/nav'
import Register from './components/register/register'
import Login from './components/auth/auth'
import Booking from './components/booking/booking'
import { FilmDetail } from './components/film_detal/film_detal'
import {Routes, Route} from 'react-router-dom'


function App() {
  return (
    <Routes>
      <Route path='/' element={
        <>
          <Navigation/>
          <Banner/>
          <Posters/>
        </>
      }/>
      <Route path='/register' element={<><Navigation/><Register/></>}></Route>
      <Route path='/login' element={<><Navigation/><Login/></>}></Route>
      <Route path='/details/:id_film' element={<><Navigation/><FilmDetail/></>}></Route>
      <Route path='/booking/:id_category' element={<Booking/>}></Route>
    </Routes>
  );
}

export default App;
