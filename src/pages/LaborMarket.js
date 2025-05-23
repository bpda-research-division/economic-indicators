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
  Label,
} from 'recharts';
import { Clipboard2DataFill } from "react-bootstrap-icons";
import {
  baseAPI,
  dateFormatter,
  decimalFormatter,
  oneDecimalFormatter,
  commaFormatter,
  thousandFormatter,
  options,
  secondOptions,
  GraphContainer
} from "../utils.js"
import {
  useDeviceSize
} from "../useDeviceSize"



const LaborMarket = () => {
  // set up state variables that will store g-sheet data
  const [payroll, setPayroll] = useState([])
  const [postings, setPostings] = useState([])
  const [unemployment, setUnemployment] = useState([])
  const [laborforce, setLaborforce] = useState([])
  const [width, height, graphHeight] = useDeviceSize();

  // useEffect to load component after reciving data
  useEffect(() => {
    // promise/fetch data from g-sheet pages
    Promise.all([
      fetch(baseAPI + 'LaborMarket_NewPayroll'),
      fetch(baseAPI + 'LaborMarket_NewJobPostings'),
      fetch(baseAPI + 'LaborMarket_UnemploymentRate'),
      fetch(baseAPI + 'LaborMarket_ResLaborForce'),
    ])
     // parse json results
      .then(([resPayroll, resPostings, resUnemployment, resLaborforce]) =>
        Promise.all([resPayroll.json(), resPostings.json(), resUnemployment.json(), resLaborforce.json()])
      )
      // store parsed data in state
      .then(([dataPayroll, dataPostings, dataUnemployment, dataLaborforce]) => {
        setPayroll(dataPayroll);
        setPostings(dataPostings);
        setUnemployment(dataUnemployment);
        setLaborforce(dataLaborforce);
      })
      
  }, []);

  return (
    <div className="dashboard">
      <div className="subHeader">
        <Clipboard2DataFill size={(height*0.015)+12} color={'#288BE4'} className="subHeaderIcon" />
        <h2>Labor Market Trends</h2>
      </div>
      <div className="dashBody">
        <div className="row mh-20 g-6 indicator-row">
          <div className="col-md justify-content-center text-center">
            <div className="indicatorContainer">
              <h4 className="indicatorSubtext">
                Change in Boston <span className="accentSubText">Payroll Employment</span> from {payroll.length ?
                    // @ts-ignore
                    new Intl.DateTimeFormat("en-US", secondOptions).format((new Date(payroll[payroll.length - 1]['Month'])))
                    : ''} 2019
              </h4>
              <div className="takeawayCardImageContainer">
                <img className="takeawayCardImage" src={require("../images/takeaway_card_icons/briefcase_check_larger.png")}/>
              </div>
              <div className="d-flex flex-row justify-content-around">
                <h4 className="date">{
                  // once data is loaded, display text. otherwise, show "loading"
                  payroll.length ?
                    // @ts-ignore
                    new Intl.DateTimeFormat("en-US", options).format((new Date(payroll[payroll.length - 1]['Month'])))
                    : 'loading'
                }
                </h4>
                <h4 className="accentNumber">{
                  // once data is loaded, display text. otherwise, show "loading"
                  payroll.length ?
                    // format number to expplicitly show positive/negtaive sign
                    new Intl.NumberFormat("en-US", { signDisplay: "exceptZero" }).format(((payroll[payroll.length - 1]['Total Nonfarm Payroll Jobs']) * 100).toFixed(1))
                    : 'loading'
                }%</h4>
              </div>
            </div>
          </div>
          <div className="col-md justify-content-center text-center">
            <div className="indicatorContainer">
              <h4 className="indicatorSubtext">
                  Change in Boston <span className="accentSubText">Job Postings</span> from {payroll.length ?
                    // @ts-ignore
                    new Intl.DateTimeFormat("en-US", secondOptions).format((new Date(postings[postings.length - 1]['Month'])))
                    : ''} 2019
              </h4>
              <div className="takeawayCardImageContainer">
                <img className="takeawayCardImage" src={require("../images/takeaway_card_icons/briefcase_searching.png")}/>
              </div>
              <div className="d-flex flex-row justify-content-around">
                <h4 className="date">{
                  // once data is loaded, display text. otherwise, show "loading"
                  postings.length ?
                  // format number to expplicitly show positive/negtaive sign
                    // @ts-ignore
                    new Intl.DateTimeFormat("en-US", options).format((new Date(postings[postings.length - 1]['Month'])))
                    : 'loading'
                }
                </h4>
                <h4 className="accentNumber">{
                  // once data is loaded, display text. otherwise, show "loading"
                  postings.length ?
                    // format number to expplicitly show positive/negtaive sign
                    new Intl.NumberFormat("en-US", { signDisplay: "exceptZero" }).format(((postings[postings.length - 1]['Total Nonfarm Payroll Jobs']) * 100).toFixed(1))
                    : 'loading'
                }%</h4>
              </div>
            </div>
          </div>
          <div className="col-md justify-content-center text-center">
            <div className="indicatorContainer">
              <h4 className="indicatorSubtext">Boston <span className="accentSubText">Resident Unemployment</span> Rate</h4>
              <div className="takeawayCardImageContainer">
                <img className="takeawayCardImage" src={require("../images/takeaway_card_icons/briefcase_cross.png")}/>
              </div>
              <div className="d-flex flex-row justify-content-around">
                <h4 className="date">{
                  // once data is loaded, display text. otherwise, show "loading"
                  unemployment.length ?
                    // format number to expplicitly show positive/negtaive sign
                    // @ts-ignore
                    new Intl.DateTimeFormat("en-US", options).format((new Date(unemployment[unemployment.length - 1]['Month'])))
                    : 'loading'
                }
                </h4>
                <h4 className="accentNumber">{
                  // once data is loaded, display text. otherwise, show "loading"
                  unemployment.length ?
                    ((unemployment[unemployment.length - 1]['Boston Unemployment Rate']) * 100).toFixed(1)
                    : 'loading'
                }%</h4>
              </div>
            </div>
          </div>
          <div className="col-md justify-content-center text-center">
            <div className="indicatorContainer">
              <h4 className="indicatorSubtext">Change in Boston <span className="accentSubText">Resident Labor Force</span> from {
                // once data is loaded, display text. otherwise, show "loading"
                laborforce.length ?
                  // @ts-ignore
                  new Intl.DateTimeFormat("en-US", options).format((new Date(laborforce[1]['Month'])))
                  : 'loading'
              }</h4>
              <div className="takeawayCardImageContainer">
                <img className="takeawayCardImage" src={require("../images/takeaway_card_icons/briefcase_home.png")}/>
              </div>
              <div className="d-flex flex-row justify-content-around">
                <h4>{
                  // once data is loaded, display text. otherwise, show "loading"
                  laborforce.length ?
                    // @ts-ignore
                    new Intl.DateTimeFormat("en-US", options).format((new Date(laborforce[laborforce.length - 1]['Month'])))
                    : 'loading'
                }
                </h4>
                <h4 className="accentNumber">{
                  // once data is loaded, display text. otherwise, show "loading"
                  laborforce.length ?
                    // format number to expplicitly show positive/negtaive sign
                    new Intl.NumberFormat("en-US", { signDisplay: "exceptZero" }).format(((laborforce[laborforce.length - 1]['Change From Previous Year']) * 100).toFixed(1))
                    : 'loading'
                }%</h4>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="row mh-20 gx-5 gy-5 graph-row"> */}
        <div className="row mh-20 gx-0 gy-0 graph-row">
          <div className="col-12 col-md-6 graph-column">
            <h6 className="chartTitle">Change in Payroll Employment in Boston from Same Month in 2019</h6>
            <GraphContainer data={payroll} height={graphHeight} width="98%">
              <LineChart
                width={500}
                height={400}
                data={payroll}
                stackOffset="expand"
              >
                <XAxis
                  dataKey="Epoch Miliseconds"
                  scale="time"
                  type="number"
                  domain={['dataMin', 'dataMax']}
                  tickFormatter={dateFormatter}
                />
                <YAxis
                  type="number"
                  domain={[-0.5, .25]}
                  tickFormatter={decimalFormatter}
                  tickCount={4}
                  interval="equidistantPreserveStart"
                />
                <ReferenceLine y={0} stroke="#a3a3a3" strokeWidth="2" />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip labelFormatter={dateFormatter} formatter={oneDecimalFormatter} />
                <Legend iconType="plainline" />
                <Line
                  type="monotone"
                  dataKey="Total Nonfarm Payroll Jobs"
                  stroke="#091F2F"
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="Production Construction Logistics"
                  stroke="#1871bd"
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="Professional and Financial Services"
                  stroke="#FB4D42"
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="Healthcare and Education"
                  stroke="#7d972a"
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="In Person and Support Services"
                  stroke="#ce1b46"
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="Government"
                  stroke="#7a3a86"
                  dot={false}
                />
              </LineChart>
            </GraphContainer>
            <p className="citation">Source: Massachusetts Executive Office of Labor and Workforce Development (EOLWD).</p>
          </div>
          <div className="col-12 col-md-6 graph-column">
            <h6 className="chartTitle">Boston Resident Labor Force Unemployment Rate</h6>
            <GraphContainer data={unemployment} height={graphHeight} width="98%">
              <LineChart
                width={500}
                height={400}
                data={unemployment}
              >
                <XAxis
                  dataKey="Epoch Miliseconds"
                  scale="time"
                  type="number"
                  domain={['dataMin', 'dataMax']}
                  tickFormatter={dateFormatter}
                />
                <YAxis
                  type="number"
                  domain={[0, .2]}
                  tickFormatter={decimalFormatter}
                />

                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip labelFormatter={dateFormatter} formatter={oneDecimalFormatter} />
                <Legend iconType="plainline" />
                <Line
                  type="monotone"
                  dataKey="Boston Unemployment Rate"
                  stroke="#091F2F"
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="Massachusetts Unemployment Rate"
                  stroke="#1871bd"
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="US Unemployment Rate"
                  stroke="#FB4D42"
                  dot={false}
                />
              </LineChart>
            </GraphContainer>
            <p className="citation">Source: Massachusetts Executive Office of Labor and Workforce Development (EOLWD).</p>
          </div>
        </div>
        <div className="row mh-20 gx-0 gy-0 graph-row">
          <div className="col-12 col-md-6 graph-column">
            <h6 className="chartTitle">Change in Job Postings in Boston from Same Month in 2019</h6>
            <GraphContainer data={postings} height={graphHeight} width="98%">
              <LineChart
                width={500}
                height={400}
                data={postings}
              >
                <XAxis
                  dataKey="Epoch Miliseconds"
                  scale="time"
                  type="number"
                  domain={['dataMin', 'dataMax']}
                  tickFormatter={dateFormatter}
                  height={60}
                >
                  <Label value="see legend above" offset={0} position="insideBottom" fill="#151515"/>
                </XAxis>
                <YAxis
                  type="number"
                  domain={[-0.70, 0.70]}
                  tickFormatter={decimalFormatter}
                  tickCount={5}
                  interval="equidistantPreserveStart"
                />
                <ReferenceLine y={0} stroke="#a3a3a3" strokeWidth="2" />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip labelFormatter={dateFormatter} formatter={oneDecimalFormatter} />
                {/* <Legend iconType="plainline" /> */}
                <Line
                  type="monotone"
                  dataKey="Total Nonfarm Payroll Jobs"
                  stroke="#091F2F"
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="Production Construction Logistics"
                  stroke="#1871bd"
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="Professional and Financial Services"
                  stroke="#FB4D42"
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="Healthcare and Education"
                  stroke="#7d972a"
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="In Person and Support Services"
                  stroke="#ce1b46"
                  dot={false}
                />
                <Line type="monotone" dataKey="Government" stroke="#7a3a86" dot={false} />
              </LineChart>
            </GraphContainer>
            <p className="citation">Source: Lightcast, Labor Insight.</p>

          </div>
          <div className="col-12 col-md-6 graph-column">
            <h6 className="chartTitle">Boston Resident Labor Force</h6>
            <GraphContainer data={laborforce} height={graphHeight} width="98%">
              <BarChart
                width={500}
                height={400}
                data={laborforce}
              >
                <XAxis
                  dataKey="Epoch Miliseconds"
                  scale="time"
                  type="number"
                  domain={['dataMin', 'dataMax']}
                  tickFormatter={dateFormatter}
                  padding={{ left: 15, right: 15 }}
                />
                <YAxis tickFormatter={thousandFormatter} />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip labelFormatter={dateFormatter} formatter={commaFormatter} />
                <Legend />
                <Bar
                  stackId="a"
                  dataKey="Boston Resident Employment"
                  fill="#091F2F"
                  name="Employed Residents"
                />
                <Bar
                  stackId="a"
                  dataKey="Boston Resident Unemployment"
                  fill="#FB4D42"
                  name="Unemployed Residents"
                />
              </BarChart>
            </GraphContainer>
            <p className="citation">Source: Massachusetts Executive Office of Labor and Workforce Development (EOLWD.) Note: K is in thousands.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LaborMarket;