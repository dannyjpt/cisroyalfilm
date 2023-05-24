import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Cinema from "../cinema/cinema";
import "./booking.css";
import Cookies from "universal-cookie";
import axios from "axios";
import Swal from "sweetalert2";

const cookies = new Cookies();

const Booking = ({ location }) => {
  const navigate = useNavigate();
  const [reservas, setReservas] = useState([]);
  const { id_category } = useParams();
  const localStorageTitle = localStorage.getItem("title");
  const [isChecked, setIsChecked] = useState(false);

  //console.log(localStorageTodos)
  const actualizarReservas = async () => {
    fetch(`www.itechpro.tech/cinema/booking/category/${id_category}`)
      .then((response) => response.json())
      .then((data) => {
        setReservas(data);
        
        const userReserva = data.find(
          (reserva) => reserva.ide_user === cookies.get("id")
        );
        if (userReserva) {
          cookies.set("hasReserva", true, { path: "/", secure: true });
          cookies.set("nomenclatura", userReserva.chair, {
            path: "/",
            secure: true,
          });
          console.log("yes");
          
          if (userReserva.awards) {
            setIsChecked(true);
            cookies.set("hasAwards", true, { path: "/", secure: true });

          } else {
            setIsChecked(false);
            cookies.set("hasAwards", false, { path: "/", secure: true });
          }

          console.log("ok "+cookies.get("hasReserva"));
          console.log(cookies.get("nomenclatura"));
        } else {
          //cookies.set("hasReserva", false);
          //cookies.set("hasAwards", false, { path: "/", secure: true });
          //console.log(cookies.get("hasReserva"));
        }
      })
      .catch((error) => console.error(error));
  };
  useEffect(() => {
    actualizarReservas();
  }, []);

  const handleReserveClick = (seat) => {
    // Do something with the selected seat
    navigate("/confirmation", { state: { seat } });
  };

  const estilo1 = {
    backgroundColor: "green",
  };
  const estilo2 = {
    backgroundColor: "black",
  };
  const estilo3 = {
    backgroundColor: "purple",
  };

  const handleCheckboxChange = (event) => {
    if (cookies.get("hasReserva")) {
      const isChecked = event.target.checked;
      setIsChecked(isChecked);
      if (isChecked) {
        // Realizar la solicitud a la API para guardar el estado en la base de datos
        Swal.fire({
          icon: 'success',
          title: 'Successful Reservation',
          showConfirmButton: false,
          timer: 1500
        })
        cookies.set("hasAwards", true, { path: "/", secure: true });
        //actualizarReservas();
        console.log("id: "+cookies.get("id"));
        axios
        .put('www.itechpro.tech/cinema/actualizar/booking', { id: cookies.get("id"), data: isChecked })
          .then((response) => {
            console.log(response.data);
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        // Realizar la solicitud a la API para guardar el estado en la base de datos
        Swal.fire({
          icon: 'success',
          title: 'reservation canceled',
          showConfirmButton: false,
          timer: 1500
        })
        //actualizarReservas();
        console.log("id: "+cookies.get("id"));
        cookies.set("hasAwards",false, { path: "/", secure: true });
        axios
          .put('www.itechpro.tech/cinema/actualizar/booking', { id: cookies.get("id"), data: isChecked })
          .then((response) => {
            console.log(response.data);
          })
          .catch((error) => {
            console.error(error);
          });
      }
    } else {
      console.log("primero debes reservar un puesto");
    }
  };
  

  return (
    <div className="Booking">
      <center>
        <h1 className="glitch" id="glitch-title">
          {localStorageTitle}
        </h1>
      </center>
      <center>
        <br></br>
        <div className="Book">
          <div className="options">
            <h5>
              Available <button style={estilo1}></button>
            </h5>
            <h5>
              Taken <button style={estilo2}></button>
            </h5>
            <h5>
              Selected <button style={estilo3}></button>
            </h5>
          </div>
          <div className="awards">
            <label>
            Stay for Awards Ceremony
            <br></br>
              <input className="boxl"
                type="checkbox"
                checked={isChecked}
                onChange={handleCheckboxChange}
              />
            </label>
          </div>
        </div>
        <br></br>
      </center>
      <center>
        <h2>SCREEN</h2>
      </center>
      <div className="screenLine"></div>
      <br></br>
      <Cinema
        reserva={reservas}
        reservarPuesto={handleReserveClick}
        actualizarReservas={actualizarReservas}
      />
      <br></br>
      <br></br>
    </div>
  );
};

export default Booking;
