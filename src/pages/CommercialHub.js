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
  dateFormatter,
  decimalFormatter,
  dollarFormatter,
  options,
  quarterlyFormatter,
  commaFormatter,
  CustomTooltip,
  maxKey
} from "../utils.js"
import {
  useDeviceSize
} from "../useDeviceSize"


const CommercialHub = (props) => {

  // the commercial hub is passed as a prop, and stored in a variable
  const hubName = props.hubName;
  const hubVar = props.hubVar;
  console.log(hubName + ", " + hubVar);
  {/* set to true if South Boston Waterfront */ }
  const hide = props.hubVar == 'SouthBostonWaterfront' ? true : false;

  // set up state variables that will store g-sheet data
  const [hubEconomicActivity, setHubEconomicActivity] = useState([])
  const [hubMobility, setHubMobility] = useState([])
  const [hubRealEstate, setHubRealEstate] = useState([])
  const [hubRealEstateDev, setHubRealEstateDev] = useState([])
  const [hubValidationSum, setHubValidationSum] = useState([])
  const [width, height, graphHeight] = useDeviceSize();

  // useEffect to load component after reciving data
  useEffect(() => {
    // promise/fetch data from g-sheet pages
    Promise.all([
      fetch(baseAPI + `Hub_${hubVar}_EconomicActivity`),
      fetch(baseAPI + `Hub_${hubVar}_Mobility`),
      fetch(baseAPI + `Hub_${hubVar}_RealEstate`),
      fetch(baseAPI + `Hub_${hubVar}_RealEstateDev`),
      fetch(baseAPI + `Hub_MBTAValidationSums`),
    ])
      // parse json results
      .then(([resEconomicActivity, resMobility, resRealEstate, resRealEstateDev, resValidationSums]) =>
        Promise.all([resEconomicActivity.json(), resMobility.json(), resRealEstate.json(), resRealEstateDev.json(), resValidationSums.json()])
      )
      // store parsed data in state
      .then(([dataEconomicActivity, dataMobility, dataRealEstate, dataRealEstateDev, dataValidationSums]) => {
        setHubEconomicActivity(dataEconomicActivity);
        setHubMobility(dataMobility);
        setHubRealEstate(dataRealEstate);
        setHubRealEstateDev(dataRealEstateDev);
        setHubValidationSum(dataValidationSums);
        // console tests
        // console.log('julie test')
        // console.log(dataRealEstateDev[dataRealEstateDev.length -1])
        // const obj =dataRealEstateDev[dataRealEstateDev.length -1]
        // const maxVal = Object.keys(obj).slice(0,-1).reduce((a, b) => obj[a] > obj[b] ? a : b);
        // console.log(maxVal)
      })
    // reload useEffect when hubName or hubVar updates
  }, [props.hubName, props.hubVar]);

  return (
    <div className="dashboard">
      <div className="subHeader">
        <GeoAltFill size={(height * 0.015) + 12} color={'#4dc1cb'} />
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
                  // once data is loaded, display text. otherwise, show "loading"
                  hubMobility.length ?
                    // @ts-ignore
                    new Intl.DateTimeFormat("en-US", options).format((new Date(hubMobility[hubMobility.length - 1]['Month'])))
                    : 'loading'
                }
                </h4>
                <h4 className="accentNumber">{
                  // once data is loaded, display text. otherwise, show "loading"
                  hubMobility.length ?
                    // format number to expplicitly show positive/negtaive sign
                    new Intl.NumberFormat("en-US", { signDisplay: "exceptZero" }).format(((hubMobility[hubMobility.length - 1]['Commuting Trips']) * 100).toFixed(1))
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
                  // once data is loaded, display text. otherwise, show "loading"
                  hubMobility.length ?
                    // @ts-ignore
                    new Intl.DateTimeFormat("en-US", options).format((new Date(hubMobility[hubMobility.length - 1]['Month'])))
                    : 'loading'
                }
                </h4>
                <h4 className="accentNumber">{
                  // once data is loaded, display text. otherwise, show "loading"
                  hubMobility.length ?
                    // format number to expplicitly show positive/negtaive sign
                    new Intl.NumberFormat("en-US", { signDisplay: "exceptZero" }).format(((hubMobility[hubMobility.length - 1]['Non-Work-Related Trips']) * 100).toFixed(1))
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
                  // once data is loaded, display text. otherwise, show "loading"
                  hubEconomicActivity.length ?
                    // @ts-ignore
                    new Intl.DateTimeFormat("en-US", options).format((new Date(hubEconomicActivity[hubEconomicActivity.length - 1]['Month'])))
                    : 'loading'
                }
                </h4>
                <h4 className="accentNumber">{
                  // once data is loaded, display text. otherwise, show "loading"
                  hubEconomicActivity.length ?
                    ((hubEconomicActivity[hubEconomicActivity.length - 1]['Overall Spending']) * 100).toFixed(1)
                    : 'loading'
                }%</h4>
              </div>
            </div>
          </div>
          <div className="col-md justify-content-center text-center">
            <div className="indicatorContainer">
              <h4 className="indicatorSubtext"><span className="accentSubText">Top Use Type for Recent and Upcoming Development</span> in &nbsp;
                {
                  // once data is loaded, display text. otherwise, show "loading"
                  hubRealEstate.length ?
                    // @ts-ignore
                    (hubRealEstate[hubRealEstate.length - 1]['Year and Quater'])
                    : 'loading'
                }
              </h4>
              <div className="d-flex flex-row justify-content-around">
                <h4 className="date">{
                  // once data is loaded, display text. otherwise, show "loading"
                  hubRealEstateDev.length ?
                  // determine the key with the highest percentage of square feet
                  maxKey(hubRealEstateDev[hubRealEstateDev.length - 1]).slice(0, -5)
                  : 'loading'
                }
                </h4>
                <h4 className="accentNumber">{
                  hubRealEstateDev.length ?
                  //  display percentage of the max key from above
                    ((hubRealEstateDev[hubRealEstateDev.length - 1][maxKey(hubRealEstateDev[hubRealEstateDev.length - 1])]) * 100).toFixed(1)
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
                  // once data is loaded, display text. otherwise, show "loading"
                  hubRealEstate.length ?
                    // @ts-ignore
                    (hubRealEstate[hubRealEstate.length - 1]['Year and Quater'])
                    : 'loading'
                }
                </h4>
                <h4 className="accentNumber">{
                  // once data is loaded, display text. otherwise, show "loading"
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
                  // once data is loaded, display text. otherwise, show "loading"
                  hubRealEstate.length ?
                    // @ts-ignore
                    (hubRealEstate[hubRealEstate.length - 1]['Year and Quater'])
                    : 'loading'
                }
                </h4>
                <h4 className="accentNumber">${
                  // once data is loaded, display text. otherwise, show "loading"
                  hubRealEstate.length ?
                    ((hubRealEstate[hubRealEstate.length - 1]['Office Asking Rent']).toFixed(0).toLocaleString("en-US"))
                    : 'loading'
                }</h4>
              </div>
            </div>
          </div>
        </div>
        <div className="row mh-20 gx-0 gy-0 graph-row">
          <div className="col-12 col-md-4 graph-column">
            <h6 className="chartTitle">Incoming Trips to {hubName}, Compared to the Same Month in 2019</h6>
            <ResponsiveContainer width="98%" height={graphHeight}>
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
                />
                <YAxis
                  type="number"
                  domain={[-1, .5]}
                  tickFormatter={decimalFormatter}
                  tickCount={4}
                  interval="'equidistantPreserveStart"
                />
                <ReferenceLine y={0} stroke="#a3a3a3" strokeWidth="2" />
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
          <div className="col-12 col-md-4 graph-column">
            <h6 className="chartTitle">In-Person Spending in {hubName}, Compared to the Same Month 2019</h6>
            <ResponsiveContainer width="98%" height={graphHeight}>
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
                  domain={[-1, .5]}
                  tickFormatter={decimalFormatter}
                  tickCount={4}
                  interval="equidistantPreserveStart"
                />
                <ReferenceLine y={0} stroke="#a3a3a3" strokeWidth="2" />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip labelFormatter={dateFormatter} formatter={decimalFormatter} />
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
            <p className="citation">Source: Mastercard Geographic Insights from Carto adjusted for inflation</p>
          </div>
          <div className="col-12 col-md-4 graph-column">
            <h6 className="chartTitle">Vacancy Rates in {hubName}</h6>
            <ResponsiveContainer width="98%" height={graphHeight}>
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
                  domain={[0, .1]}
                  tickFormatter={decimalFormatter}
                  tickCount={3}
                  interval="equidistantPreserveStart"
                />
                <ReferenceLine y={0} stroke="#a3a3a3" strokeWidth="2" />
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
                <Line
                  type="monotone"
                  dataKey="Multifamily Residential"
                  stroke="#e05926"
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
            <p className="citation">Source: CoStar</p>
          </div>
        </div>
        <div className="row mh-20 gx-0 gy-0 graph-row">
          <div className="col-12 col-md-4 graph-column">
            <h6 className="chartTitle">MBTA Gated Station Validations in {hubName}</h6>
            <ResponsiveContainer width="98%" height={graphHeight}>
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
                  tickFormatter={commaFormatter}
                  tickCount={4}
                  interval="equidistantPreserveStart"
                />
                <ReferenceLine y={0} stroke="#a3a3a3" strokeWidth="2" />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip labelFormatter={dateFormatter} formatter={commaFormatter} />
                <Line
                  type="monotone"
                  dataKey={hubName + " Validation Sums"}
                  stroke="#003c50"
                  dot={false}
                />

              </LineChart>
            </ResponsiveContainer>
            <p className="citation">Source: MBTA Datablog, COVID-19 and MBTA Ridership: Part 4</p>

          </div>
          <div className="col-12 col-md-4 graph-column">
            <h6 className="chartTitle">Recent and Upcoming Development in {hubName}</h6>
            <ResponsiveContainer width="98%" height={graphHeight}>
              <BarChart
                width={500}
                height={400}
                data={hubRealEstateDev.slice(0, 4)}
                layout="vertical"
              >
                <YAxis
                  dataKey="Category"
                  type="category"
                  tick={{ fontSize: 11 }}
                  width={150}
                />
                <XAxis
                  type="number"
                  // domain={[0, 0.20]}
                  tickFormatter={(value) => new Intl.NumberFormat('en').format(value)}
                  width={80}
                  tickCount={3}
                  interval="equidistantPreserveStart"
                />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip formatter={commaFormatter} content={<CustomTooltip />} />
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
            <p className="citation">Source: BPDA Development Review</p>
          </div>
          <div className="col-12 col-md-4 graph-column">
            <h6 className="chartTitle">Commerical Asking Rents in {hubName}</h6>
            <ResponsiveContainer width="98%" height={graphHeight}>
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
                  tickFormatter={dollarFormatter}
                />
                <ReferenceLine y={0} stroke="#a3a3a3" strokeWidth="2" />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip labelFormatter={quarterlyFormatter} formatter={dollarFormatter} />
                <Legend iconType="plainline" />
                <Line
                  type="monotone"
                  dataKey="Office Asking Rent"
                  stroke="#003c50"
                  dot={false}
                />

                {/* hide if Retail Asking Rent is empty */}
                <Line
                  type="monotone"
                  dataKey="Retail Asking Rent"
                  stroke="#e05926"
                  dot={false}
                  hide={hide}
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