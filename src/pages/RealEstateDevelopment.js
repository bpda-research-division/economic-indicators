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
import { Clipboard2DataFill } from "react-bootstrap-icons";
import {
  baseAPI,
  dateFormatter,
  commaFormatter,
  millionFormatter,
  thousandFormatter,
  options,
  secondOptions,
  quarterlyFormatter,
  CustomTooltip,
} from "../utils.js"
import {
  useDeviceSize
} from "../useDeviceSize"

const RealEstateDevelopment = () => {
  // set up state variables that will store g-sheet data
  const [netUnits, setNetUnits] = useState([])
  const [upcomingDev, setUpcomingDev] = useState([])
  const [bjrp, setBjrp] = useState([])
  const [startsDemos, setStartsDemos] = useState([])
  const [width, height, graphHeight] = useDeviceSize();


    // useEffect to load component after reciving data
  useEffect(() => {
    Promise.all([
      // promise/fetch data from g-sheet pages
      fetch(baseAPI + `RealEstateDev_NetUnits`),
      fetch(baseAPI + `RealEstateDev_RecentUpcomingDevelopments`),
      fetch(baseAPI + `RealEstateDev_BJRPConstructionHours`),
      fetch(baseAPI + `RealEstateDev_CommercialInstitutionalStartsAndDemos`),
    ])
      // parse json results
      .then(([resNetUnits, resUpcomingDev, resBjrp, resStartsDemo]) =>
        Promise.all([resNetUnits.json(), resUpcomingDev.json(), resBjrp.json(), resStartsDemo.json()])
      )
      // store parsed data in state
      .then(([dataNetUnits, dataUpcomingDev, dataBjrp, dataStartsDemo]) => {
        setNetUnits(dataNetUnits);
        setUpcomingDev(dataUpcomingDev);
        setBjrp(dataBjrp);
        setStartsDemos(dataStartsDemo);
      })

  }, []);


  return (
    <div className="dashboard">
      <div className="subHeader">
        <Clipboard2DataFill size={(height*0.015)+12} color={'#288BE4'} className="subHeaderIcon" />
        <h2>Real Estate Development</h2>
      </div>
      <div className="dashBody">
        <div className="row mh-20 g-6 indicator-row">
          <div className="col-md justify-content-center text-center">
            <div className="indicatorContainer">
              <h4 className="indicatorSubtext">
              Net<span className="accentSubText"> Non-Residential Permitted </span>Square Feet
              </h4>
              <div className="d-flex flex-row justify-content-around">
                <h4 className="date">{
                  // once data is loaded, display text. otherwise, show "loading"
                  startsDemos.length ?
                    // @ts-ignore
                    (startsDemos[startsDemos.length - 1]['Year and Quater'])
                    : 'loading'
                }
                </h4>
                <h4 className="accentNumber">{
                  // once data is loaded, display text. otherwise, show "loading"
                  startsDemos.length ?
                    // format number with comma-based thousands seperator
                    ((startsDemos[startsDemos.length - 1]['New or Redeveloped SF']).toLocaleString("en-US"))
                    : 'loading'
                }&nbsp; SF
                </h4>
              </div>
            </div>
          </div>
          <div className="col-md justify-content-center text-center">
            <div className="indicatorContainer">
              <h4 className="indicatorSubtext">Net<span className="accentSubText"> Permitted Housing </span>Units</h4>
              <div className="d-flex flex-row justify-content-around">
                <h4 className="date">{
                  // once data is loaded, display text. otherwise, show "loading"
                  netUnits.length ?
                    // @ts-ignore
                    (netUnits[netUnits.length - 1]['Year and Quater'])
                    : 'loading'
                }
                </h4>
                <h4 className="accentNumber">{
                  // once data is loaded, display text. otherwise, show "loading"
                  netUnits.length ?
                    // format number with comma-based thousands seperator
                    (netUnits[netUnits.length - 1]['Permitted Housing Units']).toLocaleString("en-US")
                    : 'loading'
                }</h4>
              </div>
            </div>
          </div>
          <div className="col-md justify-content-center text-center">
            <div className="indicatorContainer">
              <h4 className="indicatorSubtext">Net<span className="accentSubText"> Permitted Income-Restricted </span>Units</h4>
              <div className="d-flex flex-row justify-content-around">
                <h4 className="date">{
                  // once data is loaded, display text. otherwise, show "loading"
                  netUnits.length ?
                    // @ts-ignore
                    (netUnits[netUnits.length - 1]['Year and Quater'])
                    : 'loading'
                }
                </h4>
                <h4 className="accentNumber">{
                  // once data is loaded, display text. otherwise, show "loading"
                  netUnits.length ?
                    // format number with comma-based thousands seperator
                    (netUnits[netUnits.length - 1]['Net Income-restricted Units']).toLocaleString("en-US")
                    : 'loading'
                }</h4>
              </div>
            </div>
          </div>
          <div className="col-md justify-content-center text-center">
            <div className="indicatorContainer">
              <h4 className="indicatorSubtext"><span className="accentSubText">Projects Under Review </span>Square Feet</h4>
              <div className="d-flex flex-row justify-content-around">
                <h4>{
                  // once data is loaded, display text. otherwise, show "loading"
                  upcomingDev.length ?
                    // @ts-ignore
                    new Intl.DateTimeFormat("en-US", options).format((new Date(upcomingDev[0]['Month'])))
                    : 'loading'
                }
                </h4>
                <h4 className="accentNumber">{
                  // once data is loaded, display text. otherwise, show "loading"
                  upcomingDev.length ?
                    // format number with comma-based thousands seperator
                    ((upcomingDev[0]['Total']).toLocaleString("en-US"))
                    : 'loading'
                } SF</h4>
              </div>
            </div>
          </div>
          <div className="col-md justify-content-center text-center">
            <div className="indicatorContainer">
              <h4 className="indicatorSubtext">
                {/*Change in <span className="accentSubText">Construction Hours</span> from the Same Month in 2019*/}
                Change in <span className="accentSubText">Construction Hours</span> from {bjrp.length ?
                                                                    // @ts-ignore
                                                                    new Intl.DateTimeFormat("en-US", secondOptions).format((new Date(bjrp[bjrp.length - 1]['Month'])))
                                                                    : ''} 2019
              </h4>
              <div className="d-flex flex-row justify-content-around">
                <h4>{
                  // once data is loaded, display text. otherwise, show "loading"
                  bjrp.length ?
                    // @ts-ignore
                    new Intl.DateTimeFormat("en-US", options).format((new Date(bjrp[bjrp.length - 1]['Month'])))
                    : 'loading'
                }
                </h4>
                <h4 className="accentNumber">{
                  // once data is loaded, display text. otherwise, show "loading"
                  bjrp.length ?
                    // format number to expplicitly show positive/negtaive sign
                    new Intl.NumberFormat("en-US", { signDisplay: "exceptZero" }).format(((bjrp[bjrp.length - 1]['Percent Change from 2019']) * 100).toFixed(1))
                    : 'loading'
                }%</h4>
              </div>
            </div>
          </div>
        </div>
        <div className="row mh-20 gx-0 gy-0 graph-row">
          <div className="col-12 col-md-6 graph-column">
            <h6 className="chartTitle">Net Non-Residential Permitted Square Footage</h6>
            <ResponsiveContainer width="98%" height={graphHeight}>
              <BarChart
                width={500}
                height={400}
                data={startsDemos}
                stackOffset="expand"

              >
                <XAxis
                  dataKey="Epoch Miliseconds"
                  scale="time"
                  type="number"
                  domain={['dataMin', 'dataMax']}
                  tickFormatter={quarterlyFormatter}
                  padding={{ left: 40, right: 40 }}
                />
                <YAxis
                  type="number"
                  width={100}
                  tickCount={4}
                  domain={[0, 3500000]}
                  tickFormatter={millionFormatter}
                />
                <ReferenceLine y={0} stroke="#a3a3a3" strokeWidth="2" />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip labelFormatter={quarterlyFormatter} formatter={commaFormatter} />
                <Bar
                  dataKey="New or Redeveloped SF"
                  fill="#091F2F"
                />

              </BarChart>
            </ResponsiveContainer>
            <p className="citation">Source: Mayor’s Office of Housing, net of demolitions.<br></br>Note: M is in millions.</p>
          </div>
          <div className="col-12 col-md-6 graph-column">
            <h6 className="chartTitle">Planning Dept. Development Pipeline Square Footage by Use Type</h6>
            <ResponsiveContainer width="98%" height={graphHeight}>
              <BarChart
                width={500}
                height={400}
                data={upcomingDev}
                layout="vertical"
              >
                <YAxis
                  dataKey="Category"
                  type="category"
                  tick={{ fontSize: 11 }}
                  width={180}
                />
                <XAxis
                  type="number"
                  domain={[0, 40000000]}
                  // tickFormatter={(value) => new Intl.NumberFormat('en').format(value)}
                  tickFormatter={millionFormatter}

                  // width={80}
                />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip 
                  // {...this.props}
                  formatter={commaFormatter}
                  // payload={CustomPayload}
                  content={<CustomTooltip />} 
                  // formatter= {
                  //   (value) => ( value > 0 ) ? value : null
                  // }
                  // filterNull={true}
                  // payload={this.props.payload.filter(data => data.value>0)}
                  // payload={this.props.data.filter(data => data.value>0)}
                  // {console.log(payload);}
                  // payload={this.props.data}
                />
                <Bar
                  stackId="a"
                  dataKey="Residential sqft"
                  fill="#091F2F"
                />
                <Bar
                  stackId="a"
                  dataKey="Retail sqft"
                  fill="#1871bd"
                />
                <Bar
                  stackId="a"
                  dataKey="Office sqft"
                  fill="#bd9033"
                />
                <Bar
                  stackId="a"
                  dataKey="RnD sqft"
                  fill="#FB4D42"
                />
                <Bar
                  stackId="a"
                  dataKey="Cultural sqft"
                  fill="#7d972a"
                />
                <Bar
                  stackId="a"
                  dataKey="Hotel sqft"
                  fill="#ce1b46"
                />
                <Bar
                  stackId="a"
                  dataKey="Medical Clinical sqft"
                  fill="#7a3a86"
                />
                <Bar
                  stackId="a"
                  dataKey="Recreational sqft"
                  fill="#144746"
                />
                <Bar
                  stackId="a"
                  dataKey="Education/Dormitory sqft"
                  fill="#496c2a"
                />
                <Bar
                  stackId="a"
                  dataKey="Other sqft"
                  fill="#931d26"
                />
              </BarChart>
            </ResponsiveContainer>
            <p className="citation">Source: City of Boston Planning Department Division of Development Review.<br></br>Note: M is in millions.</p>
          </div>
        </div>
        <div className="row mh-20 gx-0 gy-0 graph-row">
          <div className="col-12 col-md-6 graph-column">
            <h6 className="chartTitle">Net Permitted Market Rate and Affordable Housing Units</h6>
            <ResponsiveContainer width="98%" height={graphHeight}>
              <BarChart
                width={500}
                height={400}
                data={netUnits}
              >
                <XAxis
                  dataKey="Epoch Miliseconds"
                  scale="time"
                  type="number"
                  domain={['dataMin', 'dataMax']}
                  tickFormatter={quarterlyFormatter}
                  padding={{ left: 40, right: 40 }}
                />
                <YAxis 
                  tickFormatter={(value) => new Intl.NumberFormat('en').format(value)} 
                  tickCount={4}
                />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip labelFormatter={quarterlyFormatter} />
                <Legend />
                <Bar
                  stackId="a"
                  dataKey="Net Income-restricted Units"
                  fill="#091F2F"
                  name="Income-restricted New Units"
                />
                <Bar
                  stackId="a"
                  dataKey="Net Market Rate Units"
                  fill="#FB4D42"
                  name="Market Rate New Units"
                />

              </BarChart>
            </ResponsiveContainer>
            <p className="citation">Source: Mayor’s Office of Housing, net of demolitions.</p>

          </div>
          <div className="col-12 col-md-6 graph-column">
            <h6 className="chartTitle">Monthly Construction Hours</h6>
            <ResponsiveContainer width="98%" height={graphHeight}>
              <LineChart
                width={500}
                height={400}
                data={bjrp}
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
                  tickFormatter={thousandFormatter}
                  width={80}
                />

                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip labelFormatter={dateFormatter} formatter={commaFormatter} />
                <Line
                  type="monotone"
                  dataKey="Construction Hours"
                  stroke="#091F2F"
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
            <p className="citation">Source: Boston Residents Jobs Policy Office (BRJP), Boston Jobs Policy Compliance Reports.<br></br>Note: K is in thousands.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RealEstateDevelopment;