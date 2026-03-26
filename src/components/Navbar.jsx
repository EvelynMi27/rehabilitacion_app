import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

function NavbarFunction() {
  const navigate=useNavigate();

  const handleLogout=()=>{
    localStorage.removeItem('token');
    navigate('/');
  };
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#dash">Motricare</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/dash">Inicio</Nav.Link>
            <Nav.Link href="/rutinas">Rutinas</Nav.Link>
            <Nav.Link href="/ejercicios">Ejercicios</Nav.Link>
          </Nav>
          <Nav>
            <Button variant='outline-light' onClick={handleLogout}>Cerrar sesion</Button>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}
export default NavbarFunction;