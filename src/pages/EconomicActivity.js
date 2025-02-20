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
  oneDecimalFormatter,
  options,
  secondOptions,
} from "../utils.js"
import {
  useDeviceSize
} from "../useDeviceSize"

const EconomicActivity = () => {
  // set up state variables that will store g-sheet data
  const [apparel, setApparel] = useState([])
  const [hotels, setHotels] = useState([])
  const [spending, setSpending] = useState([])
  const [hotelsYearly, setHotelsYearly] = useState([])
  const [width, height, graphHeight] = useDeviceSize();
  const [series, setSeries] = useState([])
  // useEffect to load component after reciving dat
  useEffect(() => {
     // promise/fetch data from g-sheet pages
    Promise.all([
      fetch(baseAPI + 'EconomicActivity_Apparel'),
      fetch(baseAPI + 'EconomicActivity_HotelOccupancy'),
      fetch(baseAPI + 'EconomicActivity_InPersonSpending'),
      fetch(baseAPI + 'EconomicActivity_HotelOccupancyByYear'),
    ])
      // parse json results
      .then(([resApparel, resHotelOccupancy, resInPersonSpending, resHotelOccupancyByYear]) =>
        Promise.all([resApparel.json(), resHotelOccupancy.json(), resInPersonSpending.json(), resHotelOccupancyByYear.json()])
      )
      // store parsed data in state
      .then(([dataApparel, dataHotelOccupancy, dataInPersonSpending, dataHotelOccupancyByYear]) => {
        setApparel(dataApparel);
        setHotels(dataHotelOccupancy);
        setSpending(dataInPersonSpending);
        setHotelsYearly(dataHotelOccupancyByYear);
        // console.log(dataHotelOccupancyByYear)
        let combo = [
          {
            name: 'Grocery',
            data: dataInPersonSpending,
          },
          {
            name: 'Apparel',
            data: dataApparel,
          }
        ]
        console.log(combo);
        setSeries(combo)
        console.log(series);
      })
      // .then(() => {
      //   let combo = [
      //     {
      //       name: 'Grocery',
      //       data: spending,
      //     },
      //     {
      //       name: 'Apparel',
      //       data: apparel,
      //     }
      //   ]
      //   console.log(combo);
      //   setSeries(combo)
      // })
  }, []);


  return (
    <div className="dashboard">
      <div className="subHeader">
        <Clipboard2DataFill size={(height*0.015)+12} color={'#288BE4'} className="subHeaderIcon" />
        <h2>Economic Activity</h2>
      </div>
      <div className="dashBody">
        <div className="row mh-20 g-6 indicator-row">
        <div className="col-md justify-content-center text-center">
            <div className="indicatorContainer">
              <h4 className="indicatorSubtext">
                {/*Change in <span className="accentSubText">Overall Spending</span> from the Same Month in 2019*/}
                Change in <span className="accentSubText">Overall In-Person Spending</span> from {spending.length ?
                                                    // @ts-ignore
                                                    new Intl.DateTimeFormat("en-US", secondOptions).format((new Date(spending[spending.length - 1]['Month'])))
                                                    : ''} 2019
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
              <h4 className="indicatorSubtext"><span className="accentSubText">Hotel Occupancy </span>Rate</h4>
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
              <h4 className="indicatorSubtext">
                
                {/*Change in <span className="accentSubText">Restaurant Spending</span> from the Same Month in 2019*/}
                Change in <span className="accentSubText">Restaurant Spending</span> from {spending.length ?
                                                    // @ts-ignore
                                                    new Intl.DateTimeFormat("en-US", secondOptions).format((new Date(spending[spending.length - 1]['Month'])))
                                                    : ''} 2019
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
          <div className="col-md justify-content-center text-center">
            <div className="indicatorContainer">
              <h4 className="indicatorSubtext">
                {/*Change in <span className="accentSubText">Grocery Spending</span> from the Same Month in 2019*/}
                Change in <span className="accentSubText">Grocery Spending</span> from {spending.length ?
                                                    // @ts-ignore
                                                    new Intl.DateTimeFormat("en-US", secondOptions).format((new Date(spending[spending.length - 1]['Month'])))
                                                    : ''} 2019
                {/* {
                    dining.length ?
                      // @ts-ignore
                      new Intl.DateTimeFormat("en-US", options).format((new Date(dining[0]['Month'])))
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
                    ((spending[spending.length - 1]['Grocery']) * 100).toFixed(1)
                    : 'loading'
                }%</h4>
              </div>
            </div>
          </div>
        </div>
        <div className="row mh-20 gx-0 gy-0 graph-row">
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
                <Tooltip labelFormatter={dateFormatter} formatter={oneDecimalFormatter} />
                <Legend iconType="plainline" />
                <Line
                  type="monotone"
                  dataKey="Overall Spending"
                  stroke="#091F2F"
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
            <p className="citation">Source: Mastercard Geographic Insights, adjusted for inflation.</p>
          </div>
          <div className="col-12 col-md-6 graph-column">
            <h6 className="chartTitle">Restaurant Spending Compared to the Same Month in 2019</h6>
            <ResponsiveContainer width="98%" height={graphHeight}>
              <LineChart
                width={500}
                height={400}
                data={spending}
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
                <Tooltip labelFormatter={dateFormatter} formatter={oneDecimalFormatter} />
                <Legend iconType="plainline" />
                <Line
                  type="monotone"
                  dataKey="Eating Places"
                  stroke="#091F2F"
                  dot={false}
                  name="Restaurant Spending"
                />
              </LineChart>
            </ResponsiveContainer>
            <p className="citation">Source: Mastercard Geographic Insights, adjusted for inflation.</p>
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
                <Legend iconType="plainline" />
                <Line
                  type="monotone"
                  dataKey="Boston"
                  stroke="#091F2F"
                  dot={false}
                  name="Hotel Occupancy Rate in Boston"
                />
              </LineChart>
            </ResponsiveContainer>
            <p className="citation">Source: The Pinnacle Perspective Boston Monthly Report.</p>

          </div>
          <div className="col-12 col-md-6 graph-column">
            {/* <h6 className="chartTitle">In-Person Spending in Boston, Compared to the Same Month in 2019</h6> */}
            <h6 className="chartTitle">Spending on Grocery & Apparel in Boston, Compared to the Same Month in 2019</h6>
            <ResponsiveContainer width="98%" height={graphHeight}>
              <LineChart
                width={500}
                height={400}
                // data={spending}
              >
                <XAxis
                  dataKey="Epoch Miliseconds"
                  scale="time"
                  type="number"
                  domain={['dataMin', 'dataMax']}
                  tickFormatter={dateFormatter}
                  allowDuplicatedCategory={false}
                />
                <YAxis
                  type="number"
                  domain={[-1, 0.5]}
                  tickFormatter={decimalFormatter}
                  tickCount={4}
                  interval="equidistantPreserveStart"
                />
          
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip labelFormatter={dateFormatter} formatter={oneDecimalFormatter} />
                <Legend iconType="plainline" />
                {/* The following is done to combine two datasheets onto one graph */}
                {series.map((s) => (
                  <Line 
                    // dataKey="value" 
                    dataKey={s.name === "Grocery" ? "Grocery" : s.name === "Apparel" ? "City of Boston" : "value"}
                    data={s.data} 
                    name={s.name}
                    stroke={s.name === "Grocery" ? "#091F2F" : s.name === "Apparel" ? "#FB4D42" : "#091F2F"}
                    key={s.name} 
                    dot={false}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
            <p className="citation">Source: Mastercard Geographic Insights, adjusted for inflation.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EconomicActivity;