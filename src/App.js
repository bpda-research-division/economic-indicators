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
import RealEstateDevelopment from './pages/RealEstateDevelopment';
import CommercialHub from './pages/CommercialHub';
import SnapshotEconomy from './pages/SnapshotEconomy';
import SnapshotPopulation from './pages/SnapshotPopulation';
import LayoutDummy from './pages/LayoutDummy'


function App() {
  return (
    <div className="App">
      <Container fluid className="g-0" id="AppContainer">
        <Row className="header-row g-0" id="headerRow">
            <Header />
        </Row>
        <Row className="body-row g-0" id="bodyRow">
          <Col xs={12} md={12} id="bodyColumn">
            {/* use hypenated urls for SEO optimization */}
            <Routes>
              <Route path="/" element={<LaborMarket />} />
              <Route path="/labor-market" element={<LaborMarket />} />
              <Route path="/mobility" element={<Mobility />} />
              <Route path="/economic-activity" element={<EconomicActivity />} />
              <Route path="/real-estate-market" element={<RealEstateMarket />} />
              <Route path="/real-estate-development" element={<RealEstateDevelopment />} />
              <Route path="/back-bay" element={<CommercialHub hubName={'Back Bay'} hubVar={'Backbay'} />} />
              <Route path="/fenway-longwood" element={<CommercialHub hubName={'Fenway/Longwood'} hubVar={'FenwayLongwood'} />} />
              <Route path="/greater-downtown" element={<CommercialHub hubName={'Greater Downtown'} hubVar={'Downtown'} />} />
              <Route path="/south-boston-waterfront" element={<CommercialHub hubName={'South Boston Waterfront'} hubVar={'SouthBostonWaterfront'} />} />
              <Route path="/economy" element={<SnapshotEconomy />} />
              <Route path="/population" element={<SnapshotPopulation />} />
              <Route path="/dummy" element={<LayoutDummy />} />
            </Routes>    
          </Col>
        </Row> 
      </Container>
      
    </div>
  );

}

export default App;
