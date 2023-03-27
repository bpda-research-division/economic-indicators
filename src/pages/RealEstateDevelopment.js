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
  graphHeight,
  dateFormatter,
  commaFormatter,
  decimalFormatter,
  dollarFormatter,
  options,
  ordinal,
  quarterlyFormatter,
} from "../utils.js"

const RealEstateDevelopment = () => {
  const [boardApproved, setBoardApproved] = useState([])
  const [netUnits, setNetUnits] = useState([])
  const [upcomingDev, setUpcomingDev] = useState([])
  const [bjrp, setBjrp] = useState([])
  const [affordableHousing, setAffordableHousing] = useState([])
  const [startsDemos, setStartsDemos] = useState([])

  useEffect(() => {
    Promise.all([
      fetch(baseAPI + `RealEstateDev_BPDABoardApprovedByType`),
      fetch(baseAPI + `RealEstateDev_NetUnits`),
      fetch(baseAPI + `RealEstateDev_RecentUpcomingDevelopments`),
      fetch(baseAPI + `RealEstateDev_BJRPConstructionHours`),
      fetch(baseAPI + `RealEstateDev_MarketAndAffordableHousingProduction`),
      fetch(baseAPI + `RealEstateDev_CommercialInstitutionalStartsAndDemos`),
    ])
      .then(([resBoardApproved, resNetUnits, resUpcomingDev, resBjrp, resAffordableHousing, resStartsDemo]) =>
        Promise.all([resBoardApproved.json(), resNetUnits.json(), resUpcomingDev.json(), resBjrp.json(), resAffordableHousing.json(),  resStartsDemo.json()])
      )
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
    <div>
      <div className="subHeader">
        <Clipboard2DataFill size={24} color={'#94D5DB'} className="subHeaderIcon"/>
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
                    boardApproved.length ?
                      // @ts-ignore
                      (boardApproved[boardApproved.length - 1]['Year and Quater'])
                      : 'loading'
                  }
                </h4>
                <h4 className="accentNumber">{
                  boardApproved.length ?
                  ((boardApproved[boardApproved.length - 1]['Sum of Net Gross Floor Area']).toLocaleString("en-US"))
                    : 'loading'
                }
                </h4>
              </div>
            </div>
          </div>
          <div className="col-md justify-content-center text-center">
            <div className="indicatorContainer">
              <h4 className="indicatorSubtext"><span className="accentSubText">Permitted Housing Units:</span></h4>
              <div className="d-flex flex-row justify-content-around">
                <h4 className="date">{
                    boardApproved.length ?
                      // @ts-ignore
                      (boardApproved[boardApproved.length - 1]['Year and Quater'])
                      : 'loading'
                  }
                </h4>
                <h4 className="accentNumber">{
                  netUnits.length ?
                    (netUnits[netUnits.length - 1]['Permitted Housing Units'])
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
                    boardApproved.length ?
                      // @ts-ignore
                      (boardApproved[boardApproved.length - 1]['Year and Quater'])
                      : 'loading'
                  }
                </h4>
                <h4 className="accentNumber">{
                  netUnits.length ?
                    (netUnits[netUnits.length - 1]['Net Income-restricted Units'])
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
                    upcomingDev.length ?
                      // @ts-ignore
                      new Intl.DateTimeFormat("en-US", options).format((new Date(upcomingDev[upcomingDev.length - 1]['Month'])))
                      : 'loading'
                  }
                </h4>
                <h4 className="accentNumber">{
                  upcomingDev.length ?
                    ((upcomingDev[0]['Total']).toLocaleString("en-US"))
                    : 'loading'
                } SF</h4>
              </div>
            </div>
          </div>
          <div className="col-md justify-content-center text-center">
            <div className="indicatorContainer">
              <h4 className="indicatorSubtext"><span className="accentSubText">Change in Construciton Hours from the same Month in 2019</span></h4>
              <div className="d-flex flex-row justify-content-around">
                <h4>{
                    bjrp.length ?
                      // @ts-ignore
                      new Intl.DateTimeFormat("en-US", options).format((new Date(bjrp[bjrp.length - 1]['Month'])))
                      : 'loading'
                  }
                </h4>
                <h4 className="accentNumber">{
                  bjrp.length ?
                  new Intl.NumberFormat("en-US", {signDisplay: "exceptZero"}).format(((bjrp[bjrp.length - 1]['Percent Change from 2019']) * 100).toFixed(1))
                    : 'loading'
                }%</h4>
              </div>
            </div>
          </div>
        </div>
        <div className="row mh-20 gx-5 gy-5 graph-row">
          <div className="col-12 col-md-6">
              <h6 className="chartTitle">Non-Residential Permitted Square Feet</h6>
              <ResponsiveContainer width="90%" height={graphHeight}>
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
                    domain={[-0.5, .1]}
                    // ticksCount={5}
                    // interval={0}
                    tickFormatter={commaFormatter}
                  />
                  <ReferenceLine y={0} stroke="#a3a3a3" strokeWidth="2"/>
                  <CartesianGrid strokeDasharray="3 3" />
                  <Tooltip labelFormatter={quarterlyFormatter} formatter={commaFormatter} />
                  <Legend iconType="plainline" />
                  <Bar
                    dataKey="New or Redeveloped SF"
                    fill="#003c50"
                  />
                
                </BarChart>
              </ResponsiveContainer>
            <p className="citation">Source: Boston Planning & Development Agency (BPDA) Development Review</p>
          </div>
          <div className="col-12 col-md-6">
          <h6 className="chartTitle">Development Pipeline Square Footage by Use Type</h6>
              <ResponsiveContainer width="90%" height={graphHeight}>
              <BarChart
                  width={500}
                  height={400}
                  data={upcomingDev}
                  // margin={{
                  //   top: 20,
                  //   right: 50,
                  //   left: 50,
                  //   bottom: 5,
                  // }}
                >
                  <XAxis
                    dataKey="Category"
                    
                  />
                  <YAxis tickFormatter={(value) => new Intl.NumberFormat('en').format(value)}/>
                  <CartesianGrid strokeDasharray="3 3" />
                  <Tooltip />
                  <Legend iconType="plainline" />
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
              <p className="citation">Boston Planning & Development Agency (BPDA) Development Review</p>
          </div>
        </div>
        <div className="row mh-20 gx-5 gy-5">
          <div className="col-12 col-md-6">
              <h6 className="chartTitle">Permitted Market Rate and Affordable Housing Units</h6>
              <ResponsiveContainer width="90%" height={graphHeight}>
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
                  <YAxis tickFormatter={(value) => new Intl.NumberFormat('en').format(value)}/>
                  <CartesianGrid strokeDasharray="3 3" />
                  <Tooltip labelFormatter={quarterlyFormatter} />
                  <Legend iconType="plainline" />
                  <Bar
                    stackId="a"
                    dataKey="Net Market Rate Units"
                    fill="#003c50"
                  />
                  <Bar
                    stackId="a"
                    dataKey="Net Income-restricted Units"
                    fill="#e05926"
                  />
                  
                  </BarChart>
              </ResponsiveContainer>
              <p className="citation">Source: Boston Planning & Development Agency (BPDA) Development Review</p>

          </div>
          <div className="col-12 col-md-6">
              <h6 className="chartTitle">Monthly Construction Hours</h6>
              <ResponsiveContainer width="90%" height={graphHeight}>
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
                    tickFormatter={quarterlyFormatter}
                  />
                  <YAxis
                    type="number"
                    domain={[0, 1200000]}
                    tickFormatter={commaFormatter}
                    width={80}
                    // padding={{ top: 15, bottom: 15 }}
                  />
                  
                  <CartesianGrid strokeDasharray="3 3" />
                  <Tooltip labelFormatter={dateFormatter} formatter={commaFormatter} />
                  <Legend iconType="plainline" />
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