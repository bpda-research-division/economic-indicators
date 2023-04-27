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
  options,
  quarterlyFormatter,
  CustomXAxisTick,
  CustomTooltip,
} from "../utils.js"
import {
  useDeviceSize
} from "../useDeviceSize"

const RealEstateDevelopment = () => {
  // set up state variables that will store g-sheet data
  const [boardApproved, setBoardApproved] = useState([])
  const [netUnits, setNetUnits] = useState([])
  const [upcomingDev, setUpcomingDev] = useState([])
  const [bjrp, setBjrp] = useState([])
  const [affordableHousing, setAffordableHousing] = useState([])
  const [startsDemos, setStartsDemos] = useState([])
  const [width, height, graphHeight] = useDeviceSize();

    // useEffect to load component after reciving data
  useEffect(() => {
    Promise.all([
      // promise/fetch data from g-sheet pages
      fetch(baseAPI + `RealEstateDev_BPDABoardApprovedByType`),
      fetch(baseAPI + `RealEstateDev_NetUnits`),
      fetch(baseAPI + `RealEstateDev_RecentUpcomingDevelopments`),
      fetch(baseAPI + `RealEstateDev_BJRPConstructionHours`),
      fetch(baseAPI + `RealEstateDev_MarketAndAffordableHousingProduction`),
      fetch(baseAPI + `RealEstateDev_CommercialInstitutionalStartsAndDemos`),
    ])
      // parse json results
      .then(([resBoardApproved, resNetUnits, resUpcomingDev, resBjrp, resAffordableHousing, resStartsDemo]) =>
        Promise.all([resBoardApproved.json(), resNetUnits.json(), resUpcomingDev.json(), resBjrp.json(), resAffordableHousing.json(), resStartsDemo.json()])
      )
      // store parsed data in state
      .then(([dataBoardApproved, dataNetUnits, dataUpcomingDev, dataBjrp, dataAffordableHousing, dataStartsDemo]) => {
        setBoardApproved(dataBoardApproved);
        setNetUnits(dataNetUnits);
        setUpcomingDev(dataUpcomingDev);
        setBjrp(dataBjrp);
        setAffordableHousing(dataAffordableHousing);
        setStartsDemos(dataStartsDemo);
      })

  }, []);


  return (
    <div className="dashboard">
      <div className="subHeader">
        <Clipboard2DataFill size={(height*0.015)+12} color={'#94D5DB'} className="subHeaderIcon" />
        <h2>Real Estate Development</h2>
      </div>
      <div className="dashBody">
        <div className="row mh-20 g-6 indicator-row">
          <div className="col-md justify-content-center text-center">
            <div className="indicatorContainer">
              <h4 className="indicatorSubtext">
                <span className="accentSubText">Non-Residential Permitted Square Feet:</span>
              </h4>
              <div className="d-flex flex-row justify-content-around">
                <h4 className="date">{
                  // once data is loaded, display text. otherwise, show "loading"
                  boardApproved.length ?
                    // @ts-ignore
                    (boardApproved[boardApproved.length - 1]['Year and Quater'])
                    : 'loading'
                }
                </h4>
                <h4 className="accentNumber">{
                  // once data is loaded, display text. otherwise, show "loading"
                  boardApproved.length ?
                    // format number with comma-based thousands seperator
                    ((boardApproved[boardApproved.length - 1]['Sum of Net Gross Floor Area']).toLocaleString("en-US"))
                    : 'loading'
                }&nbsp; SF
                </h4>
              </div>
            </div>
          </div>
          <div className="col-md justify-content-center text-center">
            <div className="indicatorContainer">
              <h4 className="indicatorSubtext"><span className="accentSubText">Permitted Housing Units:</span></h4>
              <div className="d-flex flex-row justify-content-around">
                <h4 className="date">{
                  // once data is loaded, display text. otherwise, show "loading"
                  boardApproved.length ?
                    // @ts-ignore
                    (boardApproved[boardApproved.length - 1]['Year and Quater'])
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
              <h4 className="indicatorSubtext"><span className="accentSubText">Permitted Income-Restricted Units: </span></h4>
              <div className="d-flex flex-row justify-content-around">
                <h4 className="date">{
                  // once data is loaded, display text. otherwise, show "loading"
                  boardApproved.length ?
                    // @ts-ignore
                    (boardApproved[boardApproved.length - 1]['Year and Quater'])
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
              <h4 className="indicatorSubtext"><span className="accentSubText">Under Review Projects</span></h4>
              <div className="d-flex flex-row justify-content-around">
                <h4>{
                  // once data is loaded, display text. otherwise, show "loading"
                  upcomingDev.length ?
                    // @ts-ignore
                    new Intl.DateTimeFormat("en-US", options).format((new Date(upcomingDev[upcomingDev.length - 1]['Month'])))
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
              <h4 className="indicatorSubtext"><span className="accentSubText">Change in Construction Hours from the Same Month in 2019</span></h4>
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
        <div className="row mh-20 gx-5 gy-5 graph-row">
          <div className="col-12 col-md-6 graph-column">
            <h6 className="chartTitle">Non-Residential Permitted Square Footage</h6>
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
                  tickFormatter={commaFormatter}
                />
                <ReferenceLine y={0} stroke="#a3a3a3" strokeWidth="2" />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip labelFormatter={quarterlyFormatter} formatter={commaFormatter} />
                <Bar
                  dataKey="New or Redeveloped SF"
                  fill="#003c50"
                />

              </BarChart>
            </ResponsiveContainer>
            <p className="citation">Source: Mayor’s Office of Housing</p>
          </div>
          <div className="col-12 col-md-6 graph-column">
            <h6 className="chartTitle">Development Pipeline Square Footage by Use Type</h6>
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
                  // domain={[0, 0.20]}
                  tickFormatter={(value) => new Intl.NumberFormat('en').format(value)}
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
                  fill="#003c50"
                />
                <Bar
                  stackId="a"
                  dataKey="Retail sqft"
                  fill="#00a6b4"
                />
                <Bar
                  stackId="a"
                  dataKey="Office sqft"
                  fill="#bd9033"
                />
                <Bar
                  stackId="a"
                  dataKey="RnD sqft"
                  fill="#e05926"
                />
                <Bar
                  stackId="a"
                  dataKey="Cultural sqft"
                  fill="#a6c838"
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
            <p className="citation">Source: Boston Planning & Development Agency (BPDA) Development Review</p>
          </div>
        </div>
        <div className="row mh-20 gx-5 gy-5 graph-row">
          <div className="col-12 col-md-6 graph-column">
            <h6 className="chartTitle">Permitted Market Rate and Affordable Housing Units</h6>
            <ResponsiveContainer width="98%" height={graphHeight}>
              <BarChart
                width={500}
                height={400}
                data={affordableHousing}
              >
                <XAxis
                  dataKey="Epoch Miliseconds"
                  scale="time"
                  type="number"
                  domain={['dataMin', 'dataMax']}
                  tickFormatter={quarterlyFormatter}
                  padding={{ left: 40, right: 40 }}
                />
                <YAxis tickFormatter={(value) => new Intl.NumberFormat('en').format(value)} />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip labelFormatter={quarterlyFormatter} />
                <Legend />
                <Bar
                  stackId="a"
                  dataKey="Afford New Units"
                  fill="#003c50"
                  name="Income-restricted New Units"
                />
                <Bar
                  stackId="a"
                  dataKey="Net Market Rate New Units"
                  fill="#e05926"
                  name="Market Rate New Units"
                />

              </BarChart>
            </ResponsiveContainer>
            <p className="citation">Source: Mayor’s Office of Housing</p>

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
                  tickFormatter={commaFormatter}
                  width={80}
                />

                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip labelFormatter={dateFormatter} formatter={commaFormatter} />
                <Line
                  type="monotone"
                  dataKey="Construction Hours"
                  stroke="#003c50"
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
            <p className="citation">Source: Boston Residents Jobs Policy Office (BRJP), Boston Jobs Policy Compliance Reports</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RealEstateDevelopment;