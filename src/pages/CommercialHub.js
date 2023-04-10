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
import { GeoAltFill } from "react-bootstrap-icons";
import { 
  baseAPI,
  graphHeight,
  dateFormatter,
  decimalFormatter,
  dollarFormatter,
  options,
  ordinal,
  quarterlyFormatter,
} from "../utils.js"


const CommercialHub = (props) => {

  const hubName = props.hubName;
  const hubVar = props.hubVar;
  console.log(hubName + ", " + hubVar);
  // const [hubName, setHubName] = useState(props)
  // const [hubVar, setHubVar] = useState(props)
  const [hubEconomicActivity, setHubEconomicActivity] = useState([])
  const [hubMobility, setHubMobility] = useState([])
  const [hubRealEstate, setHubRealEstate] = useState([])
  const [hubRealEstateDev, setHubRealEstateDev] = useState([])
  const [hubValidationSum, setHubValidationSum] = useState([])

  useEffect(() => {
    Promise.all([
      fetch(baseAPI + `Hub_${hubVar}_EconomicActivity`),
      fetch(baseAPI + `Hub_${hubVar}_Mobility`),
      fetch(baseAPI + `Hub_${hubVar}_RealEstate`),
      fetch(baseAPI + `Hub_${hubVar}_RealEstateDev`),
      fetch(baseAPI + `Hub_MBTAValidationSums`),
    ])
      .then(([resEconomicActivity, resMobility, resRealEstate, resRealEstateDev, resValidationSums]) =>
        Promise.all([resEconomicActivity.json(), resMobility.json(), resRealEstate.json(), resRealEstateDev.json(),  resValidationSums.json()])
      )
      .then(([dataEconomicActivity, dataMobility, dataRealEstate, dataRealEstateDev, dataValidationSums]) => {
        setHubEconomicActivity(dataEconomicActivity);
        setHubMobility(dataMobility);
        setHubRealEstate(dataRealEstate);
        setHubRealEstateDev(dataRealEstateDev);
        setHubValidationSum(dataValidationSums);
      })

  }, [props.hubName, props.hubVar]);

  return (
    <div>
      <div className="subHeader">
        <GeoAltFill size={24} color={'#94D5DB'} />
        <h2>{hubName}</h2>
      </div>
      <div className="dashBody">
      <div className="row mh-20 g-6 indicator-row">
          <div className="col-md justify-content-center text-center">
            <div className="indicatorContainer">
              <h4 className="indicatorSubtext"> 
                Change in <span className="accentSubText">Commuters</span> from the same month in 2019
              </h4>
              <div className="d-flex flex-row justify-content-around">
                <h4 className="date">{
                  hubMobility.length ?
                    // @ts-ignore
                    new Intl.DateTimeFormat("en-US", options).format((new Date(hubMobility[hubMobility.length - 1]['Month'])))
                    : 'loading'
                }
                </h4>
                <h4 className="accentNumber">{
                  hubMobility.length ?
                  new Intl.NumberFormat("en-US", {signDisplay: "exceptZero"}).format(((hubMobility[hubMobility.length - 1]['Commuting Trips']) * 100).toFixed(1))
                    : 'loading'
                }%</h4>
              </div>
            </div>
          </div>
          <div className="col-md justify-content-center text-center">
            <div className="indicatorContainer">
              <h4 className="indicatorSubtext"> 
                Change in <span className="accentSubText">MBTA Passengers</span> from the same month in 2019
              </h4>
              <div className="d-flex flex-row justify-content-around">
                <h4 className="date">{
                  hubMobility.length ?
                    // @ts-ignore
                    new Intl.DateTimeFormat("en-US", options).format((new Date(hubMobility[hubMobility.length - 1]['Month'])))
                    : 'loading'
                }
                </h4>
                <h4 className="accentNumber">{
                  hubMobility.length ?
                  new Intl.NumberFormat("en-US", {signDisplay: "exceptZero"}).format(((hubMobility[hubMobility.length - 1]['Non-Work-Related Trips']) * 100).toFixed(1))
                    : 'loading'
                }%</h4>
              </div>
            </div>
          </div>
          <div className="col-md justify-content-center text-center">
            <div className="indicatorContainer">
              <h4 className="indicatorSubtext">Change in <span className="accentSubText">Overall In-person Spending</span> from same month in 2019</h4>
              <div className="d-flex flex-row justify-content-around">
                <h4 className="date">{
                  hubEconomicActivity.length ?
                    // @ts-ignore
                    new Intl.DateTimeFormat("en-US", options).format((new Date(hubEconomicActivity[hubEconomicActivity.length - 1]['Month'])))
                    : 'loading'
                }
                </h4>
                <h4 className="accentNumber">{
                  hubEconomicActivity.length ?
                    ((hubEconomicActivity[hubEconomicActivity.length - 1]['Overall Spending']) * 100).toFixed(1)
                    : 'loading'
                }%</h4>
              </div>
            </div>
          </div>
          <div className="col-md justify-content-center text-center">
            <div className="indicatorContainer">
              <h4 className="indicatorSubtext"><span className="accentSubText">Top Use Type for Recent and Upcoming Development</span></h4>
              <div className="d-flex flex-row justify-content-around">
                <h4 className="date">{
                  hubRealEstate.length ?
                    // @ts-ignore
                    Object.keys(hubRealEstateDev[hubRealEstateDev.length - 1])[1].slice(0, -5)
                    : 'loading'
                }
                </h4>
                <h4 className="accentNumber">{
                  hubRealEstateDev.length ?
                    ((hubRealEstateDev[hubRealEstateDev.length - 1]['Residential sqft']) * 100).toFixed(1)
                    : 'loading'
                }%</h4>
              </div>
            </div>
          </div>
          <div className="col-md justify-content-center text-center">
            <div className="indicatorContainer">
              <h4 className="indicatorSubtext"><span className="accentSubText">Office Vacancy Rate</span></h4>
              <div className="d-flex flex-row justify-content-around">
                <h4>{
                    hubRealEstate.length ?
                      // @ts-ignore
                      (hubRealEstate[hubRealEstate.length - 1]['Year and Quater'])
                      : 'loading'
                  }
                </h4>
                <h4 className="accentNumber">{
                  hubRealEstate.length ?
                    ((hubRealEstate[hubRealEstate.length - 1]['Office']) * 100).toFixed(1)
                    : 'loading'
                }%</h4>
              </div>
            </div>
          </div>
          <div className="col-md justify-content-center text-center">
            <div className="indicatorContainer">
              <h4 className="indicatorSubtext"><span className="accentSubText">Office Asking Rent per Square Foot</span></h4>
              <div className="d-flex flex-row justify-content-around">
                <h4>{
                    hubRealEstate.length ?
                      // @ts-ignore
                      (hubRealEstate[hubRealEstate.length - 1]['Year and Quater'])
                      : 'loading'
                  }
                </h4>
                <h4 className="accentNumber">{
                  hubRealEstateDev.length ?
                    ((hubRealEstateDev[hubRealEstateDev.length - 1]['Residential sqft']) * 100).toFixed(1)
                    : 'loading'
                }%</h4>
              </div>
            </div>
          </div>
        </div>
        <div className="row mh-20 gx-5 gy-5 graph-row">
          <div className="col-12 col-md-4">
              <h6 className="chartTitle">Incoming Trips to {hubName}, Compared to the Same Month in 2019</h6>
              <ResponsiveContainer width="90%" height={graphHeight}>
                <LineChart
                  width={500}
                  height={400}
                  data={hubMobility}
                  stackOffset="expand"
                >
                  <XAxis
                    dataKey="Epoch Miliseconds"
                    scale="time"
                    type="number"
                    domain={['dataMin', 'dataMax']}
                    tickFormatter={dateFormatter}
                    padding={{ left: 15, right: 15 }}
                  />
                  <YAxis
                    type="number"
                    domain={[-0.5, .1]}
                    // ticksCount={5}
                    // interval={0}
                    tickFormatter={decimalFormatter}
                  />
                  <ReferenceLine y={0} stroke="#a3a3a3" strokeWidth="2"/>
                  <CartesianGrid strokeDasharray="3 3" />
                  <Tooltip labelFormatter={dateFormatter} formatter={decimalFormatter} />
                  <Legend iconType="plainline" />
                  <Line
                    type="monotone"
                    dataKey="Non-Work-Related Trips"
                    stroke="#003c50"
                    dot={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="Commuting Trips"
                    stroke="#00a6b4"
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            <p className="citation">Source: Cuebiq mobility data</p>
          </div>
          <div className="col-12 col-md-4">
              <h6 className="chartTitle">In-Person Spending* in {hubName}, Compared to the Same Month 2019</h6>
              <ResponsiveContainer width="90%" height={graphHeight}>
                <LineChart
                  width={500}
                  height={400}
                  data={hubEconomicActivity}
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
                    width={80}
                    // domain={[0, .2]}
                    // tickFormatter={decimalFormatter}
                  />
                  
                  <CartesianGrid strokeDasharray="3 3" />
                  <Tooltip labelFormatter={dateFormatter}  />
                  <Legend iconType="plainline" />
                  <Line
                    type="monotone"
                    dataKey="Grocery"
                    stroke="#003c50"
                    dot={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="Eating Places"
                    stroke="#00a6b4"
                    dot={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="Overall Spending"
                    stroke="#e05926"
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
              <p className="citation">Source: Mastercard Geographic Insights from Carto &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; *In January 2019 dollars</p>
          </div>
          <div className="col-12 col-md-4">
              <h6 className="chartTitle">Vacancy Rates in {hubName}</h6>
              <ResponsiveContainer width="90%" height={graphHeight}>
                <LineChart
                  width={500}
                  height={400}
                  data={hubRealEstate}
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
                    width={80}
                    // domain={[0, .2]}
                    tickFormatter={decimalFormatter}
                  />
                  <ReferenceLine y={0} stroke="#a3a3a3" strokeWidth="2"/>
                  <CartesianGrid strokeDasharray="3 3" />
                  <Tooltip labelFormatter={quarterlyFormatter} formatter={decimalFormatter} />
                  <Legend iconType="plainline" />
                  <Line
                    type="monotone"
                    dataKey="Office"
                    stroke="#003c50"
                    dot={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="Retail"
                    stroke="#00a6b4"
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
              <p className="citation">Source: CoStar</p>
          </div>
        </div>
        <div className="row mh-20 gx-5 gy-5">
          <div className="col-12 col-md-4">
              <h6 className="chartTitle">MBTA Gated Station Validations in {hubName}</h6>
              <ResponsiveContainer width="90%" height={graphHeight}>
                <LineChart
                  width={500}
                  height={400}
                  data={hubValidationSum}
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
                    width={80}
                    // domain={[-.65, 0.5]}
                    // tickFormatter={decimalFormatter}
                  />
                  <ReferenceLine y={0} stroke="#a3a3a3" strokeWidth="2"/>
                  <CartesianGrid strokeDasharray="3 3" />
                  <Tooltip labelFormatter={dateFormatter} />
                  <Legend iconType="plainline" />
                  <Line
                    type="monotone"
                    dataKey= {hubName + " Validation Sums"}
                    stroke="#003c50"
                    dot={false}
                  />
                  
                </LineChart>
              </ResponsiveContainer>
              <p className="citation">Source: MBTA Datablog, COVID-19 and MBTA Ridership: Part 4</p>

          </div>
          <div className="col-12 col-md-4">
              <h6 className="chartTitle">Recent and Upcoming Development in {hubName}</h6>
              <ResponsiveContainer width="90%" height={graphHeight}>
              <BarChart
                  width={500}
                  height={400}
                  data={hubRealEstateDev}
                  margin={{
                    top: 20,
                    right: 50,
                    left: 30,
                    bottom: 5,
                  }}
                >
                  <XAxis
                    dataKey="Category"
                    padding={{ left: 15, right: 15 }}
                  />
                  <YAxis tickFormatter={(value) => new Intl.NumberFormat('en').format(value)}/>
                  <CartesianGrid strokeDasharray="3 3" />
                  <Tooltip />
                  {/* <Legend iconType="plainline" /> */}
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
          <div className="col-12 col-md-4">
              <h6 className="chartTitle">Commerical Asking Rents in {hubName}</h6>
              <ResponsiveContainer width="90%" height={graphHeight}>
                <LineChart
                  width={500}
                  height={400}
                  data={hubRealEstate}
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
                    width={80}
                    // domain={[-.65, 0.5]}
                    tickFormatter={dollarFormatter}
                  />
                  <ReferenceLine y={0} stroke="#a3a3a3" strokeWidth="2"/>
                  <CartesianGrid strokeDasharray="3 3" />
                  <Tooltip labelFormatter={quarterlyFormatter} />
                  <Legend iconType="plainline" />
                  <Line
                    type="monotone"
                    dataKey="Office Asking Rent"
                    stroke="#003c50"
                    dot={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="Retail Asking Rent"
                    stroke="#CE1B46"
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
              <p className="citation">Source: CoStar</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommercialHub;