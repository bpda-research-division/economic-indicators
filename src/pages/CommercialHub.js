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
  oneDecimalFormatter,
  dollarFormatter,
  thousandFormatter,
  options,
  secondOptions,
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
  // console.log(hubName + ", " + hubVar);
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
      })
    // reload useEffect when hubName or hubVar updates
  }, [props.hubName, props.hubVar]);

  return (
    <div className="dashboard">
      <div className="subHeader">
        <GeoAltFill size={(height * 0.015) + 12} color={'#288BE4'} />
        <h2>{hubName}</h2>
      </div>
      <div className="dashBody">
        <div className="row mh-20 g-6 indicator-row">
          <div className="col-md justify-content-center text-center">
            <div className="indicatorContainer">
              <h4 className="indicatorSubtext">
                {/*Change in <span className="accentSubText">People Stopping</span> from the same month in 2019*/}
                Change in <span className="accentSubText">People Stopping</span> from {hubMobility.length ?
                                                    // @ts-ignore
                                                    new Intl.DateTimeFormat("en-US", secondOptions).format((new Date(hubMobility[hubMobility.length - 1]['Month'])))
                                                    : ''} 2019
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
                    new Intl.NumberFormat("en-US", { signDisplay: "exceptZero" }).format(((hubMobility[hubMobility.length - 1]['Total Stoppers']) * 100).toFixed(1))
                    : 'loading'
                }%</h4>
              </div>
            </div>
          </div>
          <div className="col-md justify-content-center text-center">
            <div className="indicatorContainer">
              <h4 className="indicatorSubtext">
                {/*Change in <span className="accentSubText">MBTA Passengers</span> from the same month in 2019*/}
                Change in <span className="accentSubText">MBTA Passengers</span> from {hubValidationSum.length ?
                                                    // @ts-ignore
                                                    new Intl.DateTimeFormat("en-US", secondOptions).format((new Date(hubValidationSum[hubValidationSum.length - 1]['Month'])))
                                                    : ''} 2019
              </h4>
              <div className="d-flex flex-row justify-content-around">
                <h4 className="date">{
                  // once data is loaded, display text. otherwise, show "loading"
                  hubValidationSum.length ?
                    // @ts-ignore
                    new Intl.DateTimeFormat("en-US", options).format((new Date(hubValidationSum[hubValidationSum.length - 1]['Month'])))
                    : 'loading'
                }
                </h4>
                <h4 className="accentNumber">{
                  // once data is loaded, display text. otherwise, show "loading"
                  hubValidationSum.length ?
                    // format number to expplicitly show positive/negtaive sign
                    new Intl.NumberFormat("en-US", { signDisplay: "exceptZero" }).format(((hubValidationSum[hubValidationSum.length - 1][`${hubName} Percent Change From 2019`]) * 100).toFixed(1))
                    : 'loading'
                }%</h4>
              </div>
            </div>
          </div>
          <div className="col-md justify-content-center text-center">
            <div className="indicatorContainer">
              <h4 className="indicatorSubtext">
                {/*Change in <span className="accentSubText">Overall In-person Spending</span> from same month in 2019*/}
                Change in <span className="accentSubText">Overall In-Person Spending</span> from {hubEconomicActivity.length ?
                                                                    // @ts-ignore
                                                                    new Intl.DateTimeFormat("en-US", secondOptions).format((new Date(hubEconomicActivity[hubEconomicActivity.length - 1]['Month'])))
                                                                    : ''} 2019
              </h4>
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
            <h6 className="chartTitle">People Stopping in {hubName}, Compared to the Same Month in 2019</h6>
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
                <Tooltip labelFormatter={dateFormatter} formatter={oneDecimalFormatter} />
                <Line
                  type="monotone"
                  dataKey="Total Stoppers"
                  stroke="#091F2F"
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
            <p className="citation">Source: Cuebiq mobility data.</p>
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
                <Tooltip labelFormatter={dateFormatter} formatter={oneDecimalFormatter} />
                <Legend iconType="plainline" />
                <Line
                  type="monotone"
                  dataKey="Grocery"
                  stroke="#091F2F"
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="Restaurants"
                  stroke="#1871bd"
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="Overall Spending"
                  stroke="#FB4D42"
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
            <p className="citation">Source: Mastercard Geographic Insights, adjusted for inflation.</p>
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
                <Tooltip labelFormatter={quarterlyFormatter} formatter={oneDecimalFormatter} />
                <Legend iconType="plainline" />
                <Line
                  type="monotone"
                  dataKey="Multifamily Residential"
                  stroke="#FB4D42"
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="Office"
                  stroke="#091F2F"
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="Retail"
                  stroke="#1871bd"
                  dot={false}
                  hide={hide}
                />
                
              </LineChart>
            </ResponsiveContainer>
            <p className="citation">Source: CoStar Real Estate Analytics.</p>
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
                  tickFormatter={thousandFormatter}
                  tickCount={4}
                  interval="equidistantPreserveStart"
                />
                <ReferenceLine y={0} stroke="#a3a3a3" strokeWidth="2" />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip labelFormatter={dateFormatter} formatter={commaFormatter} />
                <Line
                  type="monotone"
                  dataKey={hubName + " Validation Sums"}
                  stroke="#091F2F"
                  dot={false}
                />

              </LineChart>
            </ResponsiveContainer>
            <p className="citation">Source: MBTA, Gated Station Validations by Station.<br></br>Note: K is in thousands.</p>

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
            <p className="citation">Source: City of Boston Planning Department Division of Development Review.</p>
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
                  stroke="#091F2F"
                  dot={false}
                />

                {/* hide if Retail Asking Rent is empty */}
                <Line
                  type="monotone"
                  dataKey="Retail Asking Rent"
                  stroke="#1871bd"
                  dot={false}
                  hide={hide}
                />
              </LineChart>
            </ResponsiveContainer>
            <p className="citation">Source: CoStar Real Estate Analytics.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommercialHub;