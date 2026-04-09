import React, { useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { InfoLg } from "react-bootstrap-icons";
import {
  useDeviceSize
} from "../useDeviceSize"


function About() {
  const [show, setShow] = useState(false);
  const [width, height] = useDeviceSize();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="aboutComp">
      <a onClick={handleShow} className="underlineButton">
        <InfoLg size={(height * 0.025) + 15} id="infoI" />
      </a>

      <Offcanvas show={show} onHide={handleClose} placement="end" id="aboutCanvas" >
        <Offcanvas.Header className="d-flex flex-row align-items-start p-4" closeButton>
        {/* <Offcanvas.Header className="" closeButton> */}
          {/* <Offcanvas.Title><h4>About The Dashboard</h4></Offcanvas.Title> */}
          <div className="invisibleObject"></div>
          <img src={require("../images/Planning Department-CoB_Wordmark-COLOR.png")} alt="City of Boston Planning Department Logo" id="aboutLogo" className=""/>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <p>
            This Economic Indicators Dashboard is a joint project of the City of Boston Planning Department's Research & GIS Divisions.
            It provides monthly and quarterly data updates to
            track Boston’s economy in five areas: <b>Labor Market, Mobility, Economic Activity,
              Real Estate Market, and Real Estate Development</b>. In addition to citywide data for
            each of these five topic areas, the dashboard provides profiles of each of Boston’s
            four commercial hubs: <b>Fenway/Longwood, Back Bay, Downtown, and South Boston
              Waterfront</b>.
          </p>
          <iframe src="https://boston.maps.arcgis.com/apps/instant/basic/index.html?appid=f811f63ac00f48d4ba6ac4f7d40121d9" frameborder={0} style={{ border: 0 }} height="400" allow="fullscreen" id="commercialHub" title="Map of Commercial Hubs">iFrames are not supported on this page.</iframe>
          <p>
            For more economic and demographic research about Boston, please visit <a href="For more economic and demographic research about Boston, please visit https://www.bostonplans.org/research">https://www.bostonplans.org/research</a>
          </p>
          <h4>Notes on Data Sources</h4>
          <h5>Overview of the Population</h5>
          <ul>
            <li>U.S. Census Bureau, 1900-2010 Decennial Census.</li>
            <li>City of Boston Planning Department Research Division Estimates, 2020 - 2025. 
              <ul>
              <li>The Research Division creates annual population estimates for Boston to provide alternative estimates to those produced by the US Census Bureau, which continue to underestimate Boston's population following the disrupted 2020 Census.</li> 
              <li>A detailed explanation of the evidence for the need for revised population estimates can be found <a href="https://www.bostonplans.org/documents/research-other/rationale-for-creating-alternatives-to-census-esti" target="_blank">here</a>. A presentation overview of the undercount of Boston's population can be found <a href="https://www.bostonplans.org/documents/research-other/undercount-of-boston-s-population-presentation" target="_blank">here</a>. A detailed explanation of the population estimate methodology can be found <a href="https://www.bostonplans.org/documents/research-other/summary-population-adjustment-and-projection-metho" target="_blank">here</a>.</li>
              </ul>
            </li>
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
            <li>Total payroll employment in Boston:</li>
            <ul>
              <li>Massachusetts Executive Office of Labor and Workforce Development, Employment and Wages (ES-202)</li>
            </ul>
          </ul>

          <h5>Labor Market</h5>
          <ul>
            <li>Massachusetts Executive Office of Labor and Workforce Development, Employment and Wages (ES-202)</li>
            <li>Massachusetts Executive Office of Labor and Workforce Development (EOLWD), Labor Force and Unemployment Data</li>
            <li>Lightcast (formerly EMSI Burning Glass) Job Postings</li>
          </ul>
          <h5>Mobility</h5>
          <ul>
            <li>Citydata.ai mobility data. Citydata provides modeled estimates of visitation rates to custom geographies based on 
              robust samples of anonymized opt-in user location data through a GDPR and CPRA-compliant framework. 
              Visits are defined as crossings from outside to inside the geography boundaries. 
              Visits exclude event-related visitation spikes and reflect typical daily visitation rates. Please note that revisions between monthly updates may create slight differences month to month.</li>
            <li>Massachusetts Port Authority, Aviation General Management (Massport)</li>
            <li>MBTA, Gated Station Validations by Station.</li>
            <li>Bluebikes System Data.</li>
          </ul>
          <h5>Economic Activity</h5>
          <ul>
            <li>The Pinnacle Perspective Boston Monthly Report</li>
            <li>Mastercard Geographic Insights.</li>
            <li>OpenTable: State of the Industry</li>
          </ul>
          <h5>Real Estate Market</h5>
          <ul>
            <li>CoStar Real Estate Analytics. Vacant space refers to all space not currently occupied by a tenant, regardless of any lease obligation.
              Vacant space could be space that is either available or not available. For example, vacant space includes sublease
              space that is currently being paid for by a tenant but not occupied by that tenant and space that has been leased
              but not yet occupied because of finish work being done.</li>
            <li>Median sales prices provided by City of Boston, Mayor’s Office of Housing based on sales records provided by
              Banker and Tradesman. The most recent quarter reflects incomplete data covering the period between the beginning
              of the quarter and the most recent data available.</li>
          </ul>
          <h5>Real Estate Development</h5>
          <ul>
            <li>City of Boston Planning Department Division of Development Review</li>
            <li>Boston Mayor’s Office of Housing  </li>
            <li>Boston Residents Jobs Policy Office (BRJP), Boston Jobs Policy Compliance Reports</li>
            <li>Non-residential permitted square footage is pulled directly from the City of Boston Mayor's Office of Housing from Q1 2019 to Q4 2023. The following months, Q1 2024 to present, are derived from the City of Boston Planning Department Division of Development Review.</li>
          </ul>
          <h5>Inflation</h5>
          About the data source:
          <ul>
            <li>U.S. Bureau of Labor Statistics (BLS), Consumer Price Index (CPI-U) (not seasonally adjusted). 
              Explore additional data, download historical series, or related detailed item indexes though the BLS website <a href='https://www.bls.gov/data/' target="_blank">here</a>.</li>
            <li>The BLS collects prices each month for goods and services purchased by urban households to calculate the CPI-U. 
              The CPI covers a wide range of consumer expenditures, including food and beverages, housing, apparel, transportation, 
              medical care, recreation, education and communications, and other goods and services. Prices are gathered in 75 urban areas 
              from approximately 23,000 retail and service establishments and from approximately 50,000 landlords or tenants for rent data. 
              Weights for items in the CPI are based on reported expenditures from the Consumer Expenditure Survey.</li>
            <li>A detailed explanation of CPI methodology can be found <a href="https://www.bls.gov/opub/hom/cpi/concepts.htm" target="_blank">here</a>. A fact sheet for each of the CPI item categories can be found <a href='https://www.bls.gov/cpi/factsheets/' target='_blank'>here</a>.</li>
            <li>Base period: CPI index values are expressed to a reference base period set to 100. For the United States and Boston-Cambridge-Newton, MA-NH, 
              the base period is 1982-84 = 100.</li>
              <li>Boston metropolitan area data is available bi-monthly. Months between data months are labeled ‘N/A’.</li>
              <li>Please note government shutdowns created gaps in the available data for the following periods:</li>
              <ul><li>October 2025</li></ul>
          </ul>
          About the data displayed on the Inflation page:
          <ul>
            <li>The takeaway cards display cumulative inflation, which is the percent change in the CPI-U since 2019, showing how much consumer prices have increased over time for the Boston metropolitan area (Boston-Cambridge-Newton, MA-NH).</li>
            <li>The charts show inflation measured as the 12-month percent change in the CPI-U for the United States, New England, and Boston-Cambridge-Newton, MA-NH.</li>
            <li>For the Boston metropolitan area (Boston-Cambridge-Newton, MA-NH), the dashboard displays the change over time of key CPI components: </li>
                <ul>
                  <li>Food: Food, composed of: Food at Home, Food Away from Home</li>
                  <li>Energy: Energy, composed of: <a href='https://www.bls.gov/cpi/factsheets/household-energy.htm' target='_blank'>Household energy</a> (incl. fuel oils, propane, kerosene,
                  firewood, electricity, and utility (piped) gas service) as well as <a href='https://www.bls.gov/cpi/factsheets/motor-fuel.htm' target='_blank'>Motor fuel</a> (incl. Gasoline (all types) and Other motor fuels). Compositions not shown due to data discontinuation since 2025.</li>
                  <li>Shelter: Shelter, composed of: <a href='https://www.bls.gov/cpi/factsheets/owners-equivalent-rent-and-rent.htm' target="_blank"> Rent of Primary Residence, Owners’ Equivalent Rent of Residences</a></li>
                </ul>
          </ul>
          <br /><br />
          <p className="text-center">Data curated and managed by City of Boston Planning Department Research Division</p>
          <p className="text-center">Application developed by the City of Boston Planning Department GIS Division</p>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}

export default About;