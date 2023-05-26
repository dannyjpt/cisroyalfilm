import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import "./results.css";

const cookies = new Cookies();

const Results = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [reservations, setReservations] = useState([]);
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const categoryValue = selectedCategory || "";
 
  useEffect(() => {
    if (selectedCategory) {
      axios
        .get(
          `https://www.itechpro.tech/cinema/awards/category/${selectedCategory}`
        )
        .then((response) => {
          const data = response.data;
          setReservations(data.reservations);
          setUsers(data.awardUsers);

          const filteredUsers = data.awardUsers.filter((user) => {
            return data.reservations.some(
              (reservation) =>
                reservation.ide_user === user._id && reservation.awards === true
            );
          });

          setFilteredUsers(filteredUsers);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [selectedCategory]);

  const getUserReservation = (userId) => {
    return reservations.find((reservation) => reservation.ide_user === userId);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  return (
    <div>
        <br></br>
      <center><h2>Search by Category</h2>
      <select value={categoryValue} onChange={handleCategoryChange}>
        <option key="First" value="First">
          First
        </option>
        <option key="Second" value="Second">
          Second
        </option>
        <option key="Third-Fourth-1" value="Third-Fourth-1">
          Third - Fourth Group-1
        </option>
        <option key="Third-Fourth-2" value="Third-Fourth-2">
          Third - Fourth Group-2
        </option>
        <option key="Fifth-Sixth" value="Fifth-Sixth">
          Fifth - Sixth
        </option>
      </select>
      </center>
      <br></br>
      <div className="results-container">
      <br></br><br></br>
      <table className="results-table">
        <thead>
        <tr>
        <th colSpan="5" className="table-title">Bookings by Category</th>
      </tr>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Categoría</th>
            <th>Estudiante</th>
            <th>Silla</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.user}</td>
              <td>{user.email}</td>
              <td>{user.category}</td>
              <td>{user.student}</td>
              {getUserReservation(user._id) ? (
                <>
                  <td>{getUserReservation(user._id).chair}</td>
                </>
              ) : (
                <td colSpan="1">No hay reserva</td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="space"></div>
      <table className="results-table">
        <thead>
        <tr>
        <th colSpan="4" className="table-title">Awards Ceremony</th>
      </tr>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Category</th>
            <th>Student</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user._id}>
              <td>{user.user}</td>
              <td>{user.email}</td>
              <td>{user.category}</td>
              <td>{user.student}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default Results;
