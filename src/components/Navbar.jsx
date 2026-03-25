import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function NavbarFunction() {
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">Motricare</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/dash">Inicio</Nav.Link>
            <Nav.Link href="/rutinas">Rutinas</Nav.Link>
            <Nav.Link href="/ejercicios">Ejercicios</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}
export default NavbarFunction;