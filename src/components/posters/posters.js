import { useState,useEffect } from 'react';
import './posters.css'
import {Link} from 'react-router-dom'
import Cookies from "universal-cookie";

const cookies = new Cookies();

export function Posters() {
    
  const [films,setFilms] = useState([])
  

    const URL = 'http://159.203.166.142/cinema/films'

    const getData = async()=>{
        const response = await fetch(URL)
        const data = await response.json()
        console.log(data)
        setFilms(data)
    }

    const handleReserveClick = (mainCategory) => {
      cookies.set('mainCategory', mainCategory, { path: '/', secure: true });
    };

    useEffect( () =>{
        getData()
    },[])
    //<center><BtnAuth key={film.id}/></center>

  return (
    <main>
      <center><h1>Coming Soon</h1></center>
      <br></br>
      <div className='poster-content'>
        {
          films.map((film) => (
            <article className='posters-card' key={film.id}>
                <br></br>
                <center><img src={film.image }/></center>
                <h3>{film.title}</h3>
                <h5><strong>By</strong> {film.category}</h5>
                <br></br>
                <br></br>
                <center><Link className="btn btn-success btn-lg"  to={`/details/${film.id}`} onClick={() => handleReserveClick(film.main_category)}>Details</Link></center>
                <input type="hidden" value={film.id}></input>
                <br></br>
            </article>
          ))
        }
      </div>  
    </main>
  );
}