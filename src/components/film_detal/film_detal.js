import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./film_detail.css";
import Swal from "sweetalert2";
import Cookies from "universal-cookie";
import backButtonImage from "./back-button.png";

const cookies = new Cookies();

export function FilmDetail() {
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
      const expirationTime = new Date();
            expirationTime.setHours(expirationTime.getHours() + 1);
            cookies.set("awards_time", data.awards_time, {
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
  //<Link className="btn btn-danger btn-lg" to={`/booking/${detail.main_category}, film:{}`}>Reserve</Link>

  return (
    <main>

      <div
        style={{ backgroundImage: `url(${detail.image})` }}
        className="PosterDetail"
      >
        <article className="ArticleDetail">
          <Link to={`/`}>
            <img  src={backButtonImage}></img>
          </Link>
          
          <h2>{detail.title}</h2>
          <h5>
            <strong>By</strong> {detail.category}
          </h5>
          <p>
            {detail.description}
          </p>
          <h5>Hour: {detail.Time}</h5>
          <br></br>
          {isLoggedIn ? (
            isCategory ? (
              <Link className="btn btn-danger btn-lg" onClick={alert2}>
                Reserve
              </Link>
            ) : (
              <Link
                className="btn btn-danger btn-lg"
                to={{
                  pathname: `/booking/${detail.main_category}`,
                  state: `${detail}`,
                }}
              >
                Reserve
              </Link>
            )
          ) : (
            <Link className="btn btn-danger btn-lg" onClick={alert}>
              Reserve
            </Link>
          )}
          <br></br>
          <br></br>
        </article>
      </div>
    </main>
  );
}
