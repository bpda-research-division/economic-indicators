import React, {
  useEffect,
  useState,
} from "react";
import {
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
import { AspectRatioFill, ArrowRight} from "react-bootstrap-icons";
import {
  baseAPI,
  decimalFormatter,
  oneDecimalFormatter,
  thousandFormatter,
  commaFormatter,
} from "../utils.js"
import {
  useDeviceSize
} from "../useDeviceSize"
import { Button } from "react-bootstrap";


const SnapshotEconomy = () => {
  // set up state variables that will store g-sheet data
  const [jobs, setJobs] = useState([])
  const [industry, setIndustry] = useState([])
  const [commuterShare, setCommuterShare] = useState([])
  const [downtownJobs, setDowntownJobs] = useState([])
  const [width, height, graphHeight] = useDeviceSize();

  // useEffect to load component after reciving data
  useEffect(() => {
    // promise/fetch data from g-sheet pages
    Promise.all([
      fetch(baseAPI + `AnnualSnapshot_Economy_TotalJobsByYear`),
      fetch(baseAPI + `AnnualSnapshot_Economy_IndustrySharesEmployment`),
      fetch(baseAPI + `AnnualSnapshot_Economy_CommuterShare`),
      fetch(baseAPI + `AnnualSnapshot_Economy_JobShareDowntownHub`),
    ])
      // parse json results
      .then(([resJobs, resIndustry, resCommuterShare, resDowntownJobs]) =>
        Promise.all([resJobs.json(), resIndustry.json(), resCommuterShare.json(), resDowntownJobs.json()])
      )
      // store parsed data in state
      .then(([dataJobs, dataIndustry, dataCommuterShare, dataDowntownJobs]) => {
        setJobs(dataJobs);
        setIndustry(dataIndustry);
        setCommuterShare(dataCommuterShare);
        setDowntownJobs(dataDowntownJobs);
      })
  }, []);


  return (
    <div className="dashboard">
      <div className="subHeader">
        <AspectRatioFill size={(height*0.015)+12} color={'#288BE4'} className="subHeaderIcon" />
        <h2>Annual Snapshot: Economy</h2>
      </div>
      <div className="dashBody">
        <div className="row mh-20 g-6 indicator-row">
          <div className="col-md justify-content-center text-center">
            <div className="indicatorContainer">
              <h4 className="indicatorSubtext">
                City of Boston <span className="accentSubText">Total Payroll Employment in {
                // once data is loaded, display text. otherwise, show "loading"
                  jobs.length ?
                  // @ts-ignore
                  jobs[jobs.length - 1]['Year']
                  : 'loading'
              }</span>
              </h4>
              <div className="takeawayCardImageContainer">
                <img className="takeawayCardImage" src={require("../images/takeaway_card_icons/briefcase_check.png")}/>
              </div>
              <div className="d-flex flex-row justify-content-around">

                <h4 className="accentNumber">{
                  // once data is loaded, display text. otherwise, show "loading"
                  jobs.length ?
                    ((jobs[jobs.length - 1]['Total Jobs']).toLocaleString("en-US"))
                    : 'loading'
                }
                </h4>
              </div>
            </div>
          </div>
          <div className="col-md justify-content-center text-center">
            <div className="indicatorContainer">
              <h4 className="indicatorSubtext">Percentage of <span className="accentSubText">Jobs in Boston</span> located in <span className="accentSubText">Downtown Boston Commercial Hub</span> in {
                // once data is loaded, display text. otherwise, show "loading"
                downtownJobs.length ?
                  // @ts-ignore
                  // new Intl.DateTimeFormat("en-US", options).format((new Date(downtownJobs[0]['Year'])))
                  downtownJobs[0]['Year']
                  : 'loading'
              }</h4>
              <div className="takeawayCardImageContainer">
                <img className="takeawayCardImage" src={require("../images/takeaway_card_icons/office.png")}/>
              </div>
              <div className="d-flex flex-row justify-content-around">
                <h4 className="accentNumber">{
                  // once data is loaded, display text. otherwise, show "loading"
                  downtownJobs.length ?
                    (downtownJobs[0]['Percent'] * 100).toFixed(1)
                    : 'loading'
                }%</h4>
              </div>
            </div>
          </div>
          <div className="col-md justify-content-center text-center">
            <div className="indicatorContainer">
              <h4 className="indicatorSubtext">Share of <span className="accentSubText">workers in Boston</span> who are <span className="accentSubText">Boston residents</span> in {
                // once data is loaded, display text. otherwise, show "loading"
                commuterShare.length ?
                  // @ts-ignore
                  commuterShare[commuterShare.length - 1]['Year']
                  : 'loading'
              }</h4>
              <div className="takeawayCardImageContainer">
                <img className="takeawayCardImage" src={require("../images/takeaway_card_icons/briefcase_home.png")}/>
              </div>
              <div className="d-flex flex-row justify-content-around">
                <h4 className="accentNumber">{
                  // once data is loaded, display text. otherwise, show "loading"
                  commuterShare.length ?
                    (commuterShare[0]['Boston Residents Share'] * 100).toFixed(1)
                    : 'loading'
                }%</h4>
              </div>
            </div>
          </div>
          <div className="col-md justify-content-center text-center">
            <div className="indicatorContainer">
              <h4 className="indicatorSubtext">Percent of <span className="accentSubText">Boston Jobs in Health Care and Social Assistance in {
                // once data is loaded, display text. otherwise, show "loading"
                industry.length ?
                  // @ts-ignore
                  industry[industry.length - 1]['Year']
                  : 'loading'
              }</span></h4>
              <div className="takeawayCardImageContainer">
                <img className="takeawayCardImage" src={require("../images/takeaway_card_icons/Health 2@4x.png")}/>
              </div>
              <div className="d-flex flex-row justify-content-around">
                <h4 className="accentNumber">{
                  // once data is loaded, display text. otherwise, show "loading"
                  industry.length ?

                    (industry[18]['Boston Share'] * 100).toFixed(1)
                    : 'loading'
                }%</h4>
              </div>
            </div>
          </div>
          <div className="col-md justify-content-center text-center">
            <div className="indicatorContainer">
              <h4 className="indicatorSubtext">Ratio of Boston Educational Services Job Share Compared to US in {
                // once data is loaded, display text. otherwise, show "loading"
                industry.length ?
                  // @ts-ignore
                  industry[industry.length - 1]['Year']
                  : 'loading'
              }</h4>
              <div className="takeawayCardImageContainer">
                <img className="takeawayCardImage" src={require("../images/takeaway_card_icons/Graduation Cap@4x.png")}/>
              </div>
              <div className="d-flex flex-row justify-content-around">
                <h4 className="accentNumber">{
                  // once data is loaded, display text. otherwise, show "loading"
                  industry.length ?
                    (industry[14]['Location Quotient'])
                    : 'loading'
                }</h4>
              </div>
            </div>
          </div>
        </div>
        <div className="row gx-0 econ-row">
          <div className="col-12 col-md-7 graph-column flex-column">
            <div>
              <h6 className="chartTitle">Total Payroll Employment in Boston</h6>
              <ResponsiveContainer width="98%" height={graphHeight/1.5}>
                <BarChart
                  width={500}
                  height={400}
                  data={jobs}
                  stackOffset="expand"
                >
                  <XAxis
                    dataKey="Year"
                    type="category"
                  />
                  <YAxis
                    type="number"
                    width={40}
                    domain={[500000, 750000]}
                    tickFormatter={thousandFormatter}
                    tickCount={3}
                  />
                  <ReferenceLine y={0} stroke="#a3a3a3" strokeWidth="2" />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Tooltip
                    formatter={commaFormatter}
                  />
                  <Bar
                    dataKey="Total Jobs"
                    fill="#091F2F"
                  />
                </BarChart>
              </ResponsiveContainer>
              <p className="citation">Source: Massachusetts Executive Office of Labor and Workforce Development.<br></br>Note: K is in thousands.</p>
            </div>
            <div>
              <h6 className="chartTitle">Boston Payroll Employment Shares by Industry</h6>
              <p className="subChartTitle">As Compared to Overall U.S. Employment Rate</p>
              <ResponsiveContainer width="98%" height={(graphHeight * 0.9)+(graphHeight/2.3)}>
                <BarChart
                  width={500}
                  height={400}
                  data={industry}
                  layout="vertical"
                  barGap={50}
                >
                  <YAxis
                    dataKey="Category"
                    type="category"
                    interval={0}
                    tick={{width: 500,  fontSize: 11   }}
                    width={250}
                  />
                  <XAxis
                    type="number"
                    domain={[0, 0.20]}
                    tickFormatter={decimalFormatter}
                  />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Tooltip formatter={oneDecimalFormatter} />
                  <Legend />
                  <Bar
                    // stackId="a"
                    dataKey="Boston Share"
                    fill="#091F2F"
                  />
                  <Bar
                    // stackId="a"
                    dataKey="US Share"
                    fill="rgba(224, 89, 38, .9)"
                  // stroke="#151515"
                  />
                </BarChart>
              </ResponsiveContainer>
              <p className="citation">Source: Massachusetts Executive Office of Labor and Workforce Development. Bureau of Labor Statistics QCEW.</p>
            </div>
          </div>
          <div className="col-12 col-md-5 flex-column econ-column" id="commuterMapCol">
            <div id="commuterMapDiv">
              <h6 className="chartTitle">Residence of People Working in Boston</h6>
              {/* <iframe src="https://boston.maps.arcgis.com/apps/instant/basic/index.html?appid=707e5cbfeb034ac3987a2751f67dddb9&locale=en-US" frameborder={0} style={{ border: 0 }} height={graphHeight} allow="fullscreen" className="flex-grow-1">iFrames are not supported on this page.</iframe> */}
              <iframe src="https://boston.maps.arcgis.com/apps/instant/basic/index.html?appid=707e5cbfeb034ac3987a2751f67dddb9&locale=en-US" frameborder={0} style={{ border: 0 }}  allow="fullscreen" id="commuterMap" title="Boston Commute Map">iFrames are not supported on this page.</iframe>
              <p className="citation">Source: U.S. Census Bureau, LEHD Origin and Destination Employment Statistics (LODES).</p>
              <div className="d-grid gap-2">
                <Button variant="boylstonblue" size="lg" href="https://boston.maps.arcgis.com/apps/dashboards/1af39de1500b4acfb2dd7bb32feb2dd1">
                  Explore Job Density in Boston <ArrowRight></ArrowRight>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SnapshotEconomy;