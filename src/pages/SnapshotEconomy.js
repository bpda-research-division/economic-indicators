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
import { AspectRatioFill } from "react-bootstrap-icons";
import {
  baseAPI,
  graphHeight,
  decimalFormatter,
  commaFormatter,
} from "../utils.js"


const SnapshotEconomy = () => {
  // set up state variables that will store g-sheet data
  const [jobs, setJobs] = useState([])
  const [industry, setIndustry] = useState([])
  const [commuterShare, setCommuterShare] = useState([])
  const [downtownJobs, setDowntownJobs] = useState([])

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
    <div>
      <div className="subHeader">
        <AspectRatioFill size={24} color={'#94D5DB'} className="subHeaderIcon" />
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
              <h4 className="indicatorSubtext">Percentage of <span className="accentSubText">Jobs in Boston located in Downtown Boston Commercial Hub in 2019</span></h4>
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
              <h4 className="indicatorSubtext">Share of workers in Boston who are Boston residents in 2021</h4>
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
              <h4 className="indicatorSubtext">Percent of <span className="accentSubText">Boston Jobs in Health Care and Social Assistance in 2021</span></h4>
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
              <h4 className="indicatorSubtext">Ratio of Boston Educational Services Job Share Compared to US in 2021</h4>
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
        <div className="row mh-20 gx-5 gy-5 graph-row">
          <div className="col-12 col-md-8">
            <h6 className="chartTitle">Total Employment in Boston</h6>
            <ResponsiveContainer width="100%" height={graphHeight}>
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
                  width={80}
                  // domain={['dataMin', 'dataMax']}
                  tickFormatter={commaFormatter}
                />
                <ReferenceLine y={0} stroke="#a3a3a3" strokeWidth="2" />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip
                  formatter={commaFormatter}
                />
                <Bar
                  dataKey="Total Jobs"
                  fill="#003c50"
                />
              </BarChart>
            </ResponsiveContainer>
            <p className="citation">Source: U.S. Bureau of Economic Analysis (BEA) and Massachusetts Executive Office of Labor and Workforce Development</p>
          </div>
          <div className="col-12 col-md-4 d-flex flex-column">
            <h6 className="chartTitle">Job Density in Boston</h6>
            <iframe src="https://boston.maps.arcgis.com/apps/instant/basic/index.html?appid=f6888321688549db927b547864d7b3c7&locale=en-US" frameborder={0} style={{ border: 0 }} allow="fullscreen" className="flex-grow-1">iFrames are not supported on this page.</iframe>
            <p className="citation">Source: U.S. Census Bureau, LEHD Origin and Destination Employment Statistics (LODES)</p>
          </div>
        </div>
        <div className="row mh-20 gx-5 gy-5">
          <div className="col-12 col-md-4 d-flex flex-column">
            <h6 className="chartTitle">Commuter Map</h6>
            <iframe src="https://boston.maps.arcgis.com/apps/instant/basic/index.html?appid=707e5cbfeb034ac3987a2751f67dddb9&locale=en-US" frameborder={0} style={{ border: 0 }} allow="fullscreen" className="flex-grow-1">iFrames are not supported on this page.</iframe>
            <p className="citation">Source: U.S. Census Bureau, LEHD Origin and Destination Employment Statistics (LODES)</p>
          </div>
          <div className="col-12 col-md-8">
            <h6 className="chartTitle">Boston Employment Shares by Industry</h6>
            <p className="subChartTitle">As Compared to Overall U.S. Employment Rate</p>
            <ResponsiveContainer width="100%" height={graphHeight}>
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
                  tick={{ fontSize: 12 }}
                  width={350}
                />
                <XAxis
                  type="number"
                  domain={[0, 0.20]}
                  tickFormatter={decimalFormatter}
                />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip formatter={decimalFormatter} />
                <Legend
                // formatter={(value, entry, index) => <span className="blackLegend">{value}</span>}
                // payload={
                //   [
                //     { id: 'US Share Item', value: 'US Share', type: 'rect', color: 'rgba(0, 0, 0, .0)', stroke: '#151515'},
                //   ]
                // }
                />
                <Bar
                  // stackId="a"
                  dataKey="Boston Share"
                  fill="#003c50"
                />
                <Bar
                  // stackId="a"
                  dataKey="US Share"
                  fill="rgba(224, 89, 38, .9)"
                // stroke="#151515"
                />
              </BarChart>
            </ResponsiveContainer>
            <p className="citation">Source: U.S. Bureau of Economic Analysis (BEA) and Massachusetts Executive Office of Labor and Workforce Development</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SnapshotEconomy;