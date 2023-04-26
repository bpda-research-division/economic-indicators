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
  dollarFormatter,
  options,
  quarterlyFormatter,
} from "../utils.js"
import {
  useDeviceSize
} from "../useDeviceSize"

const RealEstateMarket = () => {
  // set up state variables that will store g-sheet data
  const [rent, setRent] = useState([])
  const [qmhp, setQmhp] = useState([])
  const [width, height, graphHeight] = useDeviceSize();

  // useEffect to load component after reciving data
  useEffect(() => {
    // promise/fetch data from g-sheet pages
    Promise.all([
      fetch(baseAPI + 'RealEstate_Rent'),
      fetch(baseAPI + 'RealEstate_QuarterlyMedianHousingPrice')
    ])
    // parse json results
      .then(([resRent, resQuarterlyMedianHousingPrice]) =>
        Promise.all([resRent.json(), resQuarterlyMedianHousingPrice.json()])
      )
      // store parsed data in state
      .then(([dataRent, dataQuarterlyMedianHousingPrice]) => {
        setRent(dataRent);
        setQmhp(dataQuarterlyMedianHousingPrice);
      })
  }, []);


  return (
    <div className="dashboard">
      <div className="subHeader">
        <Clipboard2DataFill size={(height*0.015)+12} color={'#94D5DB'} className="subHeaderIcon" />
        <h2>Real Estate Market</h2>
      </div>
      <div className="dashBody">
        <div className="row mh-20 g-6 indicator-row">
          <div className="col-md justify-content-center text-center">
            <div className="indicatorContainer">
              <h4 className="indicatorSubtext">
                <span className="accentSubText">Office Vacancy Rate</span>
              </h4>
              <div className="d-flex flex-row justify-content-around">
                <h4 className="date">{
                   // once data is loaded, display text. otherwise, show "loading"
                  rent.length ?
                    // @ts-ignore
                    new Intl.DateTimeFormat("en-US", options).format((new Date(rent[rent.length - 1]['Month'])))
                    : 'loading'
                }
                </h4>
                <h4 className="accentNumber">{
                   // once data is loaded, display text. otherwise, show "loading"
                  rent.length ?
                    ((rent[rent.length - 1]['Office Vacancy']) * 100).toFixed(1)
                    : 'loading'
                }%
                </h4>
              </div>
            </div>
          </div>
          <div className="col-md justify-content-center text-center">
            <div className="indicatorContainer">
              <h4 className="indicatorSubtext"><span className="accentSubText">Retail Vacancy Rate</span></h4>
              <div className="d-flex flex-row justify-content-around">
                <h4 className="date">{
                   // once data is loaded, display text. otherwise, show "loading"
                  rent.length ?
                    // @ts-ignore
                    new Intl.DateTimeFormat("en-US", options).format((new Date(rent[rent.length - 1]['Month'])))
                    : 'loading'
                }
                </h4>
                <h4 className="accentNumber">{
                   // once data is loaded, display text. otherwise, show "loading"
                  rent.length ?
                    ((rent[rent.length - 1]['Retail Vacancy']) * 100).toFixed(1)
                    : 'loading'
                }%</h4>
              </div>
            </div>
          </div>
          <div className="col-md justify-content-center text-center">
            <div className="indicatorContainer">
              <h4 className="indicatorSubtext"><span className="accentSubText">Multifamily Residential Vacancy Rate</span></h4>
              <div className="d-flex flex-row justify-content-around">
                <h4 className="date">{
                   // once data is loaded, display text. otherwise, show "loading"
                  rent.length ?
                    // @ts-ignore
                    new Intl.DateTimeFormat("en-US", options).format((new Date(rent[rent.length - 1]['Month'])))
                    : 'loading'
                }
                </h4>
                <h4 className="accentNumber">{
                   // once data is loaded, display text. otherwise, show "loading"
                  rent.length ?
                    ((rent[rent.length - 1]['Multifamily Vacancy']) * 100).toFixed(1)
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
                  rent.length ?
                    // @ts-ignore
                    new Intl.DateTimeFormat("en-US", options).format((new Date(rent[rent.length - 1]['Month'])))
                    : 'loading'
                }
                </h4>
                <h4 className="accentNumber">${
                   // once data is loaded, display text. otherwise, show "loading"
                  rent.length ?
                    ((rent[rent.length - 1]['Office Asking Rent']).toFixed(0).toLocaleString("en-US"))
                    : 'loading'
                }</h4>
              </div>
            </div>
          </div>
          <div className="col-md justify-content-center text-center">
            <div className="indicatorContainer">
              <h4 className="indicatorSubtext"><span className="accentSubText">Median Condo Sales Price</span></h4>
              <div className="d-flex flex-row justify-content-around">
                <h4>{
                   // once data is loaded, display text. otherwise, show "loading"
                  qmhp.length ?
                    // @ts-ignore
                    (qmhp[qmhp.length - 1]['Year and Quater'])
                    : 'loading'
                }
                </h4>
                <h4 className="accentNumber">${
                   // once data is loaded, display text. otherwise, show "loading"
                  qmhp.length ?
                    // format number with comma-based thousands seperator
                    ((qmhp[qmhp.length - 1]['Condominium Unit']).toLocaleString("en-US"))
                    : 'loading'
                }</h4>
              </div>
            </div>
          </div>
        </div>
        <div className="row mh-20 gx-5 gy-5 graph-row">
          <div className="col-12 col-md-6 graph-column">
            <h6 className="chartTitle">Commercial Vacancy Rate in Boston</h6>
            <ResponsiveContainer width="98%" height={graphHeight}>
              <LineChart
                width={500}
                height={400}
                data={rent}
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
                  tickFormatter={decimalFormatter}
                />
                <ReferenceLine y={0} stroke="#a3a3a3" strokeWidth="2" />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip labelFormatter={dateFormatter} formatter={decimalFormatter} />
                <Legend iconType="plainline" />
                <Line
                  type="monotone"
                  dataKey="Office Vacancy"
                  stroke="#003c50"
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="Retail Vacancy"
                  stroke="#e05926"
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
            <p className="citation">Source: CoStar</p>
          </div>
          <div className="col-12 col-md-6 graph-column">
            <h6 className="chartTitle">Commercial Space Asking Rent Per Square Foot in Boston</h6>
            <ResponsiveContainer width="98%" height={graphHeight}>
              <LineChart
                width={500}
                height={400}
                data={rent}
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
                  domain={[30, 55]}
                  tickFormatter={dollarFormatter}
                  tickCount={6}
                  interval="equidistantPreserveStart"
                />

                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip labelFormatter={dateFormatter} />
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
                  stroke="#e05926"
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
            <p className="citation">Source: CoStar</p>
          </div>
        </div>
        <div className="row mh-20 gx-5 gy-5 graph-row">
          <div className="col-12 col-md-6 graph-column">
            <h6 className="chartTitle">Multifamily Residential Vacancy Rate in Boston</h6>
            <ResponsiveContainer width="98%" height={graphHeight}>
              <LineChart
                width={500}
                height={400}
                data={rent}
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
                <ReferenceLine y={0} stroke="#a3a3a3" strokeWidth="2" />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip labelFormatter={dateFormatter}  formatter={decimalFormatter} />
                <Legend iconType="plainline" />
                <Line
                  type="monotone"
                  dataKey="Multifamily Vacancy"
                  stroke="#003c50"
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
            <p className="citation">Source: CoStar</p>

          </div>
          <div className="col-12 col-md-6 graph-column">
            <h6 className="chartTitle">Median Sales Price for Single-Family Homes and Condos</h6>
            <ResponsiveContainer width="98%" height={graphHeight}>
              <LineChart
                width={500}
                height={400}
                data={qmhp}
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
                  tickFormatter={dollarFormatter}
                  width={80}
                />

                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip labelFormatter={quarterlyFormatter} formatter={dollarFormatter} />
                <Legend iconType="plainline" />
                <Line
                  type="monotone"
                  dataKey="Single-Family Home"
                  stroke="#003c50"
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="Condominium Unit"
                  stroke="#e05926"
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
            <p className="citation">Source: City of Boston, Mayor's Office of Housing</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RealEstateMarket;