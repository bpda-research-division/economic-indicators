
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route} from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import Header from "./components/Header"
import Menu from "./components/Menu"
import LaborMarket from './pages/LaborMarket';
import Mobility from './pages/Mobility';
import EconomicActivity from './pages/EconomicActivity';
import RealEstateMarket from './pages/RealEstateMarket';
import RealEstateDevelopment from './pages/RealEstateDevelopment';
import BackBay from './pages/BackBay';
// import rest of locations here
import Population from './pages/Population';
import Economy from './pages/Economy';



function App() {
  return (
    <div className="App">
      {/* Bootstrap container - fluid to whole screen width*/}
      <Container fluid className="Container vh-100">
        <Row>
          <Header />
        </Row>
        {/* Stack columns on mobile, have them side-by-side on desktop */}
        <Row className="Below-Header h-100">
          <Col xs={12} md={2}>
          <Menu />  
          </Col>
          <Col xs={12} md={10}>
            {/* use hypenated urls for SEO optimization */}
            <Routes>
              <Route path="/labor-market" element={<LaborMarket />} />
              <Route path="/mobility" element={<Mobility />} />
            </Routes>
          </Col>
        </Row>
      </Container>
      

    </div>
  );
}

export default App;
