import React from 'react';
import { 
  Container, 
  Row, 
  Col 
} from 'react-bootstrap';
import { 
  Routes, 
  Route
} from 'react-router-dom';
import Header from "./components/Header"
import LaborMarket from './pages/LaborMarket';
import Mobility from './pages/Mobility';
import EconomicActivity from './pages/EconomicActivity';
import RealEstateMarket from './pages/RealEstateMarket';
import BackBay from './pages/BackBay';


function App() {
  return (
    <div className="App">
      <Container fluid className="g-0">
        <Row className="header-row g-0">
            <Header />
        </Row>
        <Row className="body-row g-0" >
          <Col xs={12} md={12}>
            {/* use hypenated urls for SEO optimization */}
            <Routes>
              <Route path="/" element={<LaborMarket />} />
              <Route path="/labor-market" element={<LaborMarket />} />
              <Route path="/mobility" element={<Mobility />} />
              <Route path="/economic-activity" element={<EconomicActivity />} />
              <Route path="/real-estate-market" element={<RealEstateMarket />} />
              <Route path="/back-bay" element={<BackBay />} />
            </Routes>    
          </Col>
        </Row> 
      </Container>
      
    </div>
  );

}

export default App;
