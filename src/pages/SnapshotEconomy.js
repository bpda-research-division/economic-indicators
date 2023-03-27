import React, { 
  useEffect,
  useState, 
} from "react";
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  Legend, 
  Tooltip, 
  YAxis,
  XAxis, 
  ResponsiveContainer, 
  CartesianGrid, 
  ReferenceLine, 
} from 'recharts';
import { AspectRatioFill } from "react-bootstrap-icons";
import { 
  baseAPI,
  graphHeight,
  dateFormatter,
  decimalFormatter,
  dollarFormatter,
  commaFormatter,
  options,
  ordinal,
  quarterlyFormatter,
} from "../utils.js"

const SnapshotEconomy = () => {
  const [jobs, setJobs] = useState([])
  const [industry, setIndustry] = useState([])
  const [commuterShare, setCommuterShare] = useState([])
  const [downtownJobs, setDowntownJobs] = useState([])


  useEffect(() => {
    Promise.all([
      fetch(baseAPI + `AnnualSnapshot_Economy_TotalJobsByYear`),
      fetch(baseAPI + `AnnualSnapshot_Economy_IndustrySharesEmployment`),
      fetch(baseAPI + `AnnualSnapshot_Economy_CommuterShare`),
      fetch(baseAPI + `AnnualSnapshot_Economy_JobShareDowntownHub`),

    ])
      .then(([resJobs, resIndustry, resCommuterShare, resDowntownJobs]) =>
        Promise.all([resJobs.json(), resIndustry.json(), resCommuterShare.json(), resDowntownJobs.json()])
      )
      .then(([dataJobs, dataIndustry, dataCommuterShare, dataDowntownJobs]) => {
        setJobs(dataJobs);
        setIndustry(dataIndustry);
        setCommuterShare(dataCommuterShare);
        setDowntownJobs(dataDowntownJobs);
      })

  }, []);


  return (
    <div>
      <div className="subHeader">
        <AspectRatioFill size={24} color={'#94D5DB'} className="subHeaderIcon"/>
        <h2>Annual Snapshot: Economy</h2>
      </div>
      <div className="dashBody">
        <div className="row mh-20 g-6 indicator-row">
          <div className="col-md justify-content-center text-center">
            <div className="indicatorContainer">
              <h4 className="indicatorSubtext"> 
                City of Boston <span className="accentSubText">Total Employment in 2021</span>
              </h4>
              <div className="d-flex flex-row justify-content-around">
                
                <h4 className="accentNumber">{
                  jobs.length ?
                  ((jobs[jobs.length - 1]['Total Jobs']).toLocaleString("en-US"))
                    : 'loading'
                }%
                </h4>
              </div>
            </div>
          </div>
          <div className="col-md justify-content-center text-center">
            <div className="indicatorContainer">
              <h4 className="indicatorSubtext">Percentage of <span className="accentSubText">Jobs in Boston located in Downtown Boston Commercial Hub in 2019</span></h4>
              <div className="d-flex flex-row justify-content-around">
                <h4 className="accentNumber">{
                  downtownJobs.length ?
                    (downtownJobs[0]['Percent'])
                    : 'loading'
                }%</h4>
              </div>
            </div>
          </div>
          <div className="col-md justify-content-center text-center">
            <div className="indicatorContainer">
              <h4 className="indicatorSubtext">Share of workers in Boston who are Boston residents in 2021</h4>
              <div className="d-flex flex-row justify-content-around">
                <h4 className="accentNumber">{
                  commuterShare.length ?
                    (commuterShare[0]['Boston Residents Share'])
                    : 'loading'
                }%</h4>
              </div>
            </div>
          </div>
          <div className="col-md justify-content-center text-center">
            <div className="indicatorContainer">
              <h4 className="indicatorSubtext">Percent of <span className="accentSubText">Boston Jobs in Health Care and Social Assistance in 2021</span></h4>
              <div className="d-flex flex-row justify-content-around">
                <h4 className="accentNumber">{
                  industry.length ?

                    (industry[18]['Boston Share'])
                    : 'loading'
                }%</h4>
              </div>
            </div>
          </div>
          <div className="col-md justify-content-center text-center">
            <div className="indicatorContainer">
              <h4 className="indicatorSubtext">Ratio of Boston Educational Services Job Shae Compared to US in 2021</h4>
              <div className="d-flex flex-row justify-content-around">
                <h4 className="accentNumber">{
                  industry.length ?
                    (industry[14]['Location Quotient'])
                    : 'loading'
                }%</h4>
              </div>
            </div>
          </div>
        </div>
        <div className="row mh-20 gx-5 gy-5 graph-row">
          <div className="col-12 col-md-10">
              <h6 className="chartTitle">Total Employment in Boston</h6>
              <ResponsiveContainer width="90%" height={graphHeight}>
                <BarChart
                  width={500}
                  height={400}
                  data={jobs}
                  stackOffset="expand"
                >
                  <XAxis
                    dataKey="Year"
                    // scale="time"
                    type="number"
                    domain={['dataMin', 'dataMax']}
                    // tickFormatter={dateFormatter}
                  />
                  <YAxis
                    type="number"
                    domain={['dataMin', 'dataMax']}
                    // ticksCount={5}
                    // interval={0}
                    tickFormatter={commaFormatter}
                  />
                  <ReferenceLine y={0} stroke="#a3a3a3" strokeWidth="2"/>
                  <CartesianGrid strokeDasharray="3 3" />
                  <Tooltip 
                    // labelFormatter={dateFormatter} 
                    formatter={commaFormatter} 
                  />
                  <Legend iconType="plainline" />
                  <Bar
                    dataKey="Total Jobs"
                    fill="#003c50"
                  />
                
                </BarChart>
              </ResponsiveContainer>
            <p className="citation">Source: U.S. Bureau of Economic Analysis (BEA) and Massachusetts Executive Office of Labor and Workforce Development</p>
          </div>
          <div className="col-12 col-md-2">
            <img src={require("../images/JobDensity.png")} alt="Static map showing job density Boston" className="img-fluid" />  
                <p className="citation">Source: U.S. Census Bureau, LEHD Origin and Destination Employment Statistics (LODES)</p>
          </div>
        </div>
        <div className="row mh-20 gx-5 gy-5">
          <div className="col-12 col-md-2">
            <img src={require("../images/Commuter.png")} alt="Static msap showing where people working in Boston actually live" className="img-fluid" />
            <p className="citation">Source: U.S. Census Bureau, LEHD Origin and Destination Employment Statistics (LODES)</p>
          </div>
          <div className="col-12 col-md-10">
              <h6 className="chartTitle">Monthly Construction Hours</h6>
              <ResponsiveContainer width="90%" height={graphHeight}>
              <BarChart
                  width={500}
                  height={400}
                  data={jobs}
                  stackOffset="expand"
                >
                  <XAxis
                    dataKey="Year"
                    // scale="time"
                    type="number"
                    domain={['dataMin', 'dataMax']}
                    // tickFormatter={dateFormatter}
                  />
                  <YAxis
                    type="number"
                    domain={['dataMin', 'dataMax']}
                    // ticksCount={5}
                    // interval={0}
                    tickFormatter={commaFormatter}
                  />
                  <ReferenceLine y={0} stroke="#a3a3a3" strokeWidth="2"/>
                  <CartesianGrid strokeDasharray="3 3" />
                  <Tooltip 
                    // labelFormatter={dateFormatter} 
                    formatter={commaFormatter} 
                  />
                  <Legend iconType="plainline" />
                  <Bar
                    dataKey="Total Jobs"
                    fill="#003c50"
                  />
                
                </BarChart>
              </ResponsiveContainer>
              <p className="citation">Source: Boston Residents Jobs Policy Office (BRJP), Boston Jobs Policy Compliance Reports</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SnapshotEconomy;