import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';

function About() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        About The Dashboard
      </Button>

      <Offcanvas show={show} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>About The Dashboard</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <p>
           This Economic Indicators Dashboard is a joint project of the BPDA Research Division
          and Office of Digital Cartography and GIS. It provides monthly data updates to
          track Boston’s economy in five areas: Labor Market, Mobility, Economic Activity,
          Real Estate Market, and Real Estate Development. In addition to citywide data for
          each of these five topic areas, the dashboard provides profiles of each of Boston’s
          four commercial hubs: Fenway/Longwood, Back Bay, Downtown, and South Boston
          Waterfront.
          </p>
          <p>
          For more economic and demographic research about Boston, please visit <a href="For more economic and demographic research about Boston, please visit https://www.bostonplans.org/research">https://www.bostonplans.org/research</a>
          </p>
          <h4>Notes on Data Sources</h4>
          <h5>Overview of the Population</h5>
          <ul>
            <li>U.S. Census Bureau, American Community Survey</li>
          </ul>
          <h5>Overview of the Economy</h5>
          <ul>
            <li>We use two sources of data for the residence and employment locations of workers:</li>
              <ul>
                <li>U.S. Census Bureau, LEHD Origin-Destination Employment Statistics (LODES)</li>
                <li>U.S. Census Bureau, American Community Survey</li>
              </ul>
              <p>The maps are based on the location of residence and employment for a person’s primary job from the LODES data.
            These data allow disaggregation of location to the Census Block level and rely on residential and employment
            establishment locations reported to the state for unemployment insurance filings. For the share of Boston jobs
            held by Boston residents we use data from the American Community Survey. This survey asks respondents questions
            about their place of work and commute. The universe includes both payroll workers (those covered under unemployment
            insurance) as well as self-employed workers, and reflects the location survey respondents reported for work in the
            week before the survey, which may be their own home.</p>
            <li>Total employment in Boston is calculated from two sources:</li>
              <ul>
                <li>U.S. Bureau of Economic Analysis, Total full-time and part-time employment by NAICS industry</li>
                <li>Massachusetts Executive Office of Labor and Workforce Development, Employment and Wages (ES-202)</li>
              </ul>
              <p>Total jobs by industry are available from the BEA for Suffolk County. These are allocated to Boston based on 
                the share of payroll jobs in that industry that are located in Boston compared to the balance of the county 
                (Chelsea, Revere, and Winthrop) from ES-202 data. Total jobs include both payroll jobs covered by unemployment 
                insurance as well as self-employment.</p>
          </ul>
          
          <h5>Labor Market</h5>
          <ul>
            <li>Massachusetts Executive Office of Labor and Workforce Development, Employment and Wages (ES-202)</li>
            <li>Massachusetts Executive Office of Labor and Workforce Development (EOLWD), Labor Force and Unemployment Data</li>
            <li>Lightcast (formerly EMSI Burning Glass) Job Postings</li>
          </ul>
          <h5>Mobility</h5>
          <ul>
            <li>Cuebiq mobility data. Cuebiq collects first-party data from anonymized users who have opted-in to provide 
              access to their location data anonymously through a GDPR-compliant framework</li>
            <li>Massachusetts Port Authority, Aviation General Management (Massport)</li>
            <li>MBTA Datablog, COVID-19 and MBTA Ridership: Part 4</li>
          </ul>
          <h5>Economic Activity</h5>
          <ul>
            <li>The Pinnacle Perspective Boston Monthly Report</li>
            <li>Mastercard Geographic Insights from Carto</li>
            <li>OpenTable: State of the Industry</li>
          </ul>
          <h5>Real Estate Market</h5>
          <ul>
            <li>CoStar. Vacant space refers to all space not currently occupied by a tenant, regardless of any lease obligation. 
              Vacant space could be space that is either available or not available. For example, vacant space includes sublease 
              space that is currently being paid for by a tenant but not occupied by that tenant and space that has been leased
               but not yet occupied because of finish work being done.</li>
            <li>Median sales prices provided by City of Boston, Mayor’s Office of Housing based on sales records provided by 
              Banker and Tradesman. The most recent quarter reflects incomplete data covering the period between the beginning 
              of the quarter and the most recent data available.</li>
          </ul>
          <h5>Real Estate Development</h5>
          <ul>
            <li>Boston Planning & Development Agency (BPDA) Development Review</li>
            <li>Boston Mayor’s Office of Housing  </li>
            <li>Boston Residents Jobs Policy Office (BRJP), Boston Jobs Policy Compliance Reports</li>
          </ul>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default About;