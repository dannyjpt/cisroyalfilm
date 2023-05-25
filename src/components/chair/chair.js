import React from "react";
import "./chair.css";
import Cookies from "universal-cookie";
import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const cookies = new Cookies();

export const Chair = ({ id, numero, idChair, nomenclatura, reservado, actualizarReservas }) => {
  const [data, setData] = useState([]);
  const [hasReserva, setHasReserva] = useState(
    cookies.get("hasReserva") === "true"
  );
  const [userColor, setUserColor] = useState('puestogreen');

  let texto = nomenclatura;
    
  

  const handleReserva = async () => {
    const hasReservaCookie = cookies.get("hasReserva") === "true";
    const cookieUserReserva = cookies.get("nomenclatura");
    console.log("user reserva " + cookieUserReserva);
    
    if (!hasReservaCookie) {
      setData({
        category: cookies.get("category"),
        chair: nomenclatura,
        ide_user: cookies.get("pass"),
        awards: false,
      });
      // Hacer reserva
      try {
        const response = await axios.post(
          "https://www.itechpro.tech/cinema/register/booking",
          data
        );
        if (response.status === 200) {
          setData(response.data);
          setHasReserva(true);
          cookies.set("hasReserva", "true", { path: '/', secure: true });
          alert()
          actualizarReservas();
          //window.location.href = `./${data.category}`;
        } else {
          alert("Error al intentar reservar");
        }
      } catch (error) {
        console.error(error);
        alert("Ha ocurrido un error al registrar el usuario");
      }
    }
    changeColor()
  };

  alert = async() =>{
    await Swal.fire({
      icon: 'success',
      title: 'Successful Reservation',
      showConfirmButton: false,
      timer: 1500
    })
  }

  const changeColor = ()=>{
    if (reservado) {
      if (cookies.get("pass") === numero) {
        setUserColor("puestopurple");
      }else{
        setUserColor("puestogray");
      }
    } else {
      setUserColor("puestogreen");
    }
  }

  useEffect(() => {
    setData({
      category: cookies.get("category"),
      chair: nomenclatura,
      ide_user: cookies.get("pass"),
      awards: cookies.get("hasAwards"),
    });
  }, [nomenclatura]);

  useEffect(() => {
    changeColor();
  }, [reservado, numero]);

  return (
    <button
      className={`${userColor}`}
      disabled={reservado && reservado !== "student"}
      onClick={() => handleReserva()}
    >
      {texto}
    </button>
  );
};
