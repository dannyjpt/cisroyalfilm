import Nav from 'react-bootstrap/Nav';
import { useEffect, useState } from 'react';
import './nav.css'
import {Link} from 'react-router-dom'
import Cookies from "universal-cookie";

const cookies = new Cookies();
//<Nav.Link eventKey="link-1">Link</Nav.Link> onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
export function Navigation(){

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Verificar si hay una cookie de sesión
    if(cookies.get('email')){
      setIsLoggedIn(true);
      console.log(cookies.get('email'))
    }else{
      setIsLoggedIn(false);
      console.log('nothing')
    }
  }, []);

  const handleLogout = () => {
    // Eliminar todas las cookies de sesión
    cookies.remove("id");
    cookies.remove("name");
    cookies.remove("email");
    cookies.remove("category");
    cookies.remove("mainCategory");
    cookies.remove("nomenclatura");
    cookies.remove("student");
    cookies.remove("hasAwards");
    cookies.remove("hasReserva"); // Agregar esta línea para eliminar la cookie 'hasReserva'
    setIsLoggedIn(false);
  };

  return (
    <Nav className="navi justify-content-center bg-dark">
      <Nav.Item>
        <Link to="/">Home</Link>
      </Nav.Item>
      <Nav.Item>
        <Link to="/">CIS Film Festival</Link>
      </Nav.Item>
      {isLoggedIn ? (
        <Nav.Item>
          <Link to="/" onClick={handleLogout}>Logout</Link>
        </Nav.Item>
      ) : (
        <>
          <Nav.Item>
            <Link to="/login">Login</Link>
          </Nav.Item>
          <Nav.Item>
            <Link to="/register">Sing In</Link> 
          </Nav.Item>
        </>
      )}
    </Nav>
  );
}