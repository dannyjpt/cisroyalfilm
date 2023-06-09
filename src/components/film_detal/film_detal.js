import { useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./film_detail.css";
import Swal from "sweetalert2";
import Cookies from "universal-cookie";
import backButtonImage from "./back-button.png";



const cookies = new Cookies();

export function FilmDetail() {
  const playerRef = useRef(null);
  /*const localStorageTodos = localStorage.getItem('key');
    
    let URL = ""

    if (localStorageTodos) {
        console.log(localStorageTodos)
        const id_film = localStorageTodos
        URL = `http://localhost:3001/cinema/films/details/${id_film}`
    }else{
        console.log("No data")
    }*/

  const [detail, setDetail] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isCategory, setIsCategory] = useState(false);
  const [userEmail, setUserEmail] = useState(cookies.get("email"));
  const { id_film } = useParams();
  const URL = `https://www.itechpro.tech/cinema/films/details/${id_film}`;

  const getData = async () => {
    if (URL === "") {
      console.log("no Uri");
    } else {
      const response = await fetch(URL);
      const data = await response.json();
      console.log(data);
      setDetail(data);
      localStorage.setItem("title", data.title);
      localStorage.setItem("filmVideo", data.video);
      const expirationTime = new Date();
      expirationTime.setHours(expirationTime.getHours() + 1);
      cookies.set("awards_time", data.awawards_time, {
        path: "/",
        secure: true,
        expires: expirationTime,
      });
      cookies.set("awards_amount", data.awards_amount, {
        path: "/",
        secure: true,
        expires: expirationTime,
      });
    }
  };

  const alert = async () => {
    Swal.fire({
      title: "You have to login or create an account to reserve",
      text: "Select an option",
      icon: "info",
      showDenyButton: true,
      denyButtonText: "Sing In",
      confirmButtonText: "Login",
      showCancelButton: true,
      buttonsStyling: true,
    }).then((response) => {
      if (response.isConfirmed) {
        window.location.href = "/login";
      } else if (response.isDenied) {
        window.location.href = "/register";
      } else {
        //
      }
    });
  };

  const alert2 = async () => {
    //console.log("main"+detail.main_category)
    await Swal.fire({
      icon: "warning",
      title: "You are not allowed to book in this category",
      showConfirmButton: false,
      timer: 2000,
    });
  };

  const verify = () => {
    // Verificar si hay una cookie de sesión
    if (cookies.get("email")) {
      setIsLoggedIn(true);
      console.log(cookies.get("email"));
    } else {
      setIsLoggedIn(false);
      console.log("nothing");
    }

    if (cookies.get("category") != cookies.get("mainCategory")) {
      setIsCategory(true);
      console.log(isCategory);
    } else {
      setIsCategory(false);
      //console.log("nothing");
    }
  };

  useEffect(() => {
    getData();
    verify();
  }, []);
  //to={`/film`}

  return (
    <main>
      <div
        style={{ backgroundImage: `url(${detail.image})` }}
        className="PosterDetail"
      >
        <article className="ArticleDetail">
          <Link to={`/`}>
            <img src={backButtonImage}></img>
          </Link>

          <h2>{detail.title}</h2>
          <h5>
            <strong>By</strong> {detail.category}
          </h5>
          <p>{detail.description}</p>
          <br></br>
          <Link className="btn btn-danger btn-lg" to={`/film`}>
            Watch Movie
          </Link>
          <br></br>
          <br></br>
        </article>
        <div className="VideoContainer">
          <center><h2>Trailer</h2></center>
        <div
          style={{ padding: "56.25% 0 0 0", position: "relative" }}
          className="VideoWrapper"
        >
          <iframe
            src={`${detail.trailer}`}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
            }}
          ></iframe>
        </div>
      </div>
      </div>
    </main>
  );
}
