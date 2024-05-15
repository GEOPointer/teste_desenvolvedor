import {Navbar,Container,Row,Col} from 'react-bootstrap';
import logo from "../../assets/geopointer.png";

function Footer() {
    return (
      <div expand="lg"  className="custom-footer">
        <Container>
            <Row>
                <Col className='col-12 text-center'>
                  <Navbar.Brand href="#home"><img className="img-fluid footer-logo" src={logo}></img></Navbar.Brand>
                </Col>
                <Col className='text-white text-center col-12'>
                    <h5>Desenvolvido por : Albert Fonseca</h5>
                </Col>
            </Row>
            <Row>
              
            </Row>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
        </Container>
      </div>
    );
  }
  export default Footer;