import React, {
  useEffect,
  useState,
} from "react";
import {
  LineChart,
  Line,
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
  decimalFormatter,
  options,
} from "../utils.js"
import {
  useDeviceSize
} from "../useDeviceSize"

const EconomicActivity = () => {
  // set up state variables that will store g-sheet data
  const [dining, setDining] = useState([])
  const [hotels, setHotels] = useState([])
  const [spending, setSpending] = useState([])
  const [hotelsYearly, setHotelsYearly] = useState([])
  const [width, height, graphHeight] = useDeviceSize();

  // useEffect to load component after reciving dat
  useEffect(() => {
     // promise/fetch data from g-sheet pages
    Promise.all([
      fetch(baseAPI + 'EconomicActivity_SeatedDining'),
      fetch(baseAPI + 'EconomicActivity_HotelOccupancy'),
      fetch(baseAPI + 'EconomicActivity_InPersonSpending'),
      fetch(baseAPI + 'EconomicActivity_HotelOccupancyByYear'),
    ])
      // parse json results
      .then(([resSeatedDining, resHotelOccupancy, resInPersonSpending, resHotelOccupancyByYear]) =>
        Promise.all([resSeatedDining.json(), resHotelOccupancy.json(), resInPersonSpending.json(), resHotelOccupancyByYear.json()])
      )
      // store parsed data in state
      .then(([dataSeatedDining, dataHotelOccupancy, dataInPersonSpending, dataHotelOccupancyByYear]) => {
        setDining(dataSeatedDining);
        setHotels(dataHotelOccupancy);
        setSpending(dataInPersonSpending);
        setHotelsYearly(dataHotelOccupancyByYear);
        // console.log(dataHotelOccupancyByYear)
      })
  }, []);


  return (
    <div className="dashboard">
      <div className="subHeader">
        <Clipboard2DataFill size={(height*0.015)+12} color={'#4dc1cb'} className="subHeaderIcon" />
        <h2>Economic Activity</h2>
      </div>
      <div className="dashBody">
        <div className="row mh-20 g-6 indicator-row">
          <div className="col-md justify-content-center text-center">
            <div className="indicatorContainer">
              <h4 className="indicatorSubtext">
                Change in <span className="accentSubText">Seated Dining</span> from the Same Month in 2019
                {/* {
                    dining.length ?
                      // @ts-ignore
                      new Intl.DateTimeFormat("en-US", options).format((new Date(dining[0]['Month'])))
                      : 'loading'
                } */}
              </h4>
              <div className="d-flex flex-row justify-content-around">
                <h4 className="date">{
                  // once data is loaded, display text. otherwise, show "loading"
                  dining.length ?
                    // @ts-ignore
                    new Intl.DateTimeFormat("en-US", options).format((new Date(dining[dining.length - 1]['Month'])))
                    : 'loading'
                }
                </h4>
                <h4 className="accentNumber">{
                  // once data is loaded, display text. otherwise, show "loading"
                  dining.length ?
                    // format number to expplicitly show positive/negtaive sign
                    new Intl.NumberFormat("en-US", { signDisplay: "exceptZero" }).format(((dining[dining.length - 1]['Boston']) * 100).toFixed(1))
                    : 'loading'
                }%
                </h4>
              </div>
            </div>
          </div>
          <div className="col-md justify-content-center text-center">
            <div className="indicatorContainer">
              <h4 className="indicatorSubtext"><span className="accentSubText">Hotel Occupancy Rate</span></h4>
              <div className="d-flex flex-row justify-content-around">
                <h4 className="date">{
                  // once data is loaded, display text. otherwise, show "loading"
                  hotels.length ?
                    // @ts-ignore
                    new Intl.DateTimeFormat("en-US", options).format((new Date(hotels[hotels.length - 1]['Month'])))
                    : 'loading'
                }
                </h4>
                <h4 className="accentNumber">{
                  // once data is loaded, display text. otherwise, show "loading"
                  hotels.length ?
                    ((hotels[hotels.length - 1]['Boston']) * 100).toFixed(1)
                    : 'loading'
                }%</h4>
              </div>
            </div>
          </div>
          <div className="col-md justify-content-center text-center">
            <div className="indicatorContainer">
              <h4 className="indicatorSubtext">Change in <span className="accentSubText">Overall Spending</span> from the Same Month in 2019
                {/* {
                spending.length ?
                  // @ts-ignore
                  new Intl.DateTimeFormat("en-US", options).format((new Date(spending[0]['Month'])))
                  : 'loading'
              } */}
              </h4>
              <div className="d-flex flex-row justify-content-around">
                <h4 className="date">{
                  // once data is loaded, display text. otherwise, show "loading"
                  spending.length ?
                    // @ts-ignore
                    new Intl.DateTimeFormat("en-US", options).format((new Date(spending[spending.length - 1]['Month'])))
                    : 'loading'
                }
                </h4>
                <h4 className="accentNumber">{
                  // once data is loaded, display text. otherwise, show "loading"
                  spending.length ?
                    ((spending[spending.length - 1]['Overall Spending']) * 100).toFixed(1)
                    : 'loading'
                }%</h4>
              </div>
            </div>
          </div>
          <div className="col-md justify-content-center text-center">
            <div className="indicatorContainer">
              <h4 className="indicatorSubtext">Change in <span className="accentSubText">Resturant Spending</span> from the Same Month in 2019
                {/* {
                spending.length ?
                  // @ts-ignore
                  new Intl.DateTimeFormat("en-US", options).format((new Date(spending[0]['Month'])))
                  : 'loading'
              } */}
              </h4>
              <div className="d-flex flex-row justify-content-around">
                <h4>{
                  // once data is loaded, display text. otherwise, show "loading"
                  spending.length ?
                    // @ts-ignore
                    new Intl.DateTimeFormat("en-US", options).format((new Date(spending[spending.length - 1]['Month'])))
                    : 'loading'
                }
                </h4>
                <h4 className="accentNumber">{
                  // once data is loaded, display text. otherwise, show "loading"
                  spending.length ?
                    ((spending[spending.length - 1]['Eating Places']) * 100).toFixed(1)
                    : 'loading'
                }%</h4>
              </div>
            </div>
          </div>
        </div>
        <div className="row mh-20 gx-0 gy-0 graph-row">
          <div className="col-12 col-md-6 graph-column">
            <h6 className="chartTitle">Seated Diners Compared to the Same Month in 2019</h6>
            <ResponsiveContainer width="98%" height={graphHeight}>
              <LineChart
                width={500}
                height={400}
                data={dining}
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
                  domain={[-1, 0.5]}
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
                  dataKey="Boston"
                  stroke="#003c50"
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="US"
                  stroke="#00a6b4"
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
            <p className="citation">Source: OpenTable, Seated diners from online, phone, and walk-in reservations</p>
          </div>
          <div className="col-12 col-md-6 graph-column">
            <h6 className="chartTitle">Overall In-Person Spending in Boston, Compared to the Same Month in 2019</h6>
            <ResponsiveContainer width="98%" height={graphHeight}>
              <LineChart
                width={500}
                height={400}
                data={spending}
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
                  tickFormatter={decimalFormatter}
                />

                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip labelFormatter={dateFormatter} formatter={decimalFormatter} />
                <Legend iconType="plainline" />
                <Line
                  type="monotone"
                  dataKey="Overall Spending"
                  stroke="#003c50"
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
            <p className="citation">Source: Mastercard Geographic Insights from Carto adjusted for inflation</p>
          </div>
        </div>
        <div className="row mh-20 gx-0 gy-0 graph-row">
          <div className="col-12 col-md-6 graph-column">
            <h6 className="chartTitle">Hotel Occupancy Rate in Boston</h6>
            <ResponsiveContainer width="98%" height={graphHeight}>
              <LineChart
                width={500}
                height={400}
                data={hotels}
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
                  tickFormatter={decimalFormatter}
                />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip labelFormatter={dateFormatter} formatter={decimalFormatter} />
                {/* <Legend iconType="plainline" /> */}
                <Line
                  type="monotone"
                  dataKey="Boston"
                  stroke="#003c50"
                  dot={false}
                  name="Hotel Occupancy Rate in Boston"
                />
              </LineChart>
            </ResponsiveContainer>
            <p className="citation">Source: The Pinnacle Perspective Boston Monthly Report</p>

          </div>
          <div className="col-12 col-md-6 graph-column">
            <h6 className="chartTitle">In-Person Spending in Boston, Compared to the Same Month in 2019</h6>
            <ResponsiveContainer width="98%" height={graphHeight}>
              <LineChart
                width={500}
                height={400}
                data={spending}
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
                  domain={[-1, 0.5]}
                  tickFormatter={decimalFormatter}
                  tickCount={4}
                  interval="equidistantPreserveStart"
                />
          
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
        </div>
      </div>
    </div>
  );
};

export default EconomicActivity;