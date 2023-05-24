import React from 'react';
import { Chair } from '../chair/chair';
import './cinema.css'


const Cinema = ({ reserva, reservarPuesto, actualizarReservas }) => {
  const filas = 15;
  const columnas = 6;
  const puestosPorBloque = filas * columnas;
  const nomenclaturas = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O'];
  
  const puestosa = [];
  const puestosb = [];
  let nomenclaturaActual = 0;

  for (let fila = 0; fila < filas; fila++) {
    const nomenclaturaActual = nomenclaturas[fila];
    for (let columna = 1; columna <= columnas; columna++) {
      const numero = fila * columnas + columna;
      const nomenclatura = nomenclaturaActual + columna;
      const bloque = 'a'
      puestosa.push({ numero, nomenclatura,bloque });
    }
  }
  
  // Generar puestos del segundo bloque
  for (let fila = 0; fila < filas; fila++) {
    const nomenclaturaActual = nomenclaturas[fila];
    for (let columna = 7; columna <= 12; columna++) {
      const numero = puestosPorBloque + fila * columnas + (columna - 6);
      const nomenclatura = nomenclaturaActual + columna;
      const bloque = 'b'
      puestosb.push({ numero, nomenclatura, bloque});
    }
  }
  
   

  return (
    <div className="sala row">
      <div className='bloquea'>
        {puestosa.map((puesto) => {
            const reserv = reserva.find((r) => r.chair === puesto.nomenclatura);
            let reservId = "";
            let reserv_Id = "";
            if(reserv){reservId=reserv.ide_user; reserv_Id=reserv._id}
            
            return (
                <Chair
                    key={puesto.numero}
                    numero={reservId}
                    idChair={reserv_Id}
                    nomenclatura={puesto.nomenclatura}
                    reservado={reserv}
                    actualizarReservas={actualizarReservas}
                />
            );
        })}
      </div>
      <div className='bloqueb'>
        {puestosb.map((puesto) => {
            const reserv = reserva.find((r) => r.chair === puesto.nomenclatura);
            let reservId = "";
            let reserv_Id = "";
            if(reserv){reservId=reserv.ide_user; reserv_Id=reserv._id}
            return (
                <Chair
                    key={puesto.numero}
                    numero={reservId}
                    idChair={reserv_Id}
                    nomenclatura={puesto.nomenclatura}
                    reservado={reserv}
                    actualizarReservas={actualizarReservas}
                />
            );
        })}
      </div>
    </div>
  );
};

export default Cinema;
