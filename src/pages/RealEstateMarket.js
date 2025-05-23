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
  dollarFormatter,
  dollarDecimalFormatter,
  dollarThousandFormatter,
  options,
  quarterlyFormatter,
  GraphContainer
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
        <Clipboard2DataFill size={(height*0.015)+12} color={'#288BE4'} className="subHeaderIcon" />
        <h2>Real Estate Market</h2>
      </div>
      <div className="dashBody">
        <div className="row mh-20 g-6 indicator-row">
          <div className="col-md justify-content-center text-center">
            <div className="indicatorContainer">
              <h4 className="indicatorSubtext">
                <span className="accentSubText">Office Vacancy </span>Rate
              </h4>
              <div className="takeawayCardImageContainer">
                <img className="takeawayCardImage" src={require("../images/takeaway_card_icons/office_single.png")}/>
              </div>
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
              <h4 className="indicatorSubtext"><span className="accentSubText">Retail Vacancy </span>Rate</h4>
              <div className="takeawayCardImageContainer">
                <img className="smallertakeawayCardImage" src={require("../images/takeaway_card_icons/Shop Building@4x.png")}/>
              </div>
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
              <h4 className="indicatorSubtext"><span className="accentSubText">Multifamily Residential Vacancy </span>Rate</h4>
              <div className="takeawayCardImageContainer">
                <img className="takeawayCardImage" src={require("../images/takeaway_card_icons/Building 3@4x.png")}/>
              </div>
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
              <h4 className="indicatorSubtext"><span className="accentSubText">Office Asking Rent </span>per Square Foot</h4>
              <div className="takeawayCardImageContainer">
                <img className="takeawayCardImage" src={require("../images/takeaway_card_icons/office_price_3.png")}/>
              </div>
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
              <h4 className="indicatorSubtext"><span className="accentSubText">Median Condo Sales </span>Price</h4>
              <div className="takeawayCardImageContainer">
                <img className="takeawayCardImage" src={require("../images/takeaway_card_icons/condo_price_4.png")}/>
              </div>
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
        <div className="row mh-20 gx-0 gy-0 graph-row">
          <div className="col-12 col-md-6 graph-column">
            <h6 className="chartTitle">Commercial Vacancy Rate in Boston</h6>
            <GraphContainer data={rent} height={graphHeight} width="98%">
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
                <Tooltip labelFormatter={dateFormatter} formatter={oneDecimalFormatter} />
                <Legend iconType="plainline" />
                <Line
                  type="monotone"
                  dataKey="Office Vacancy"
                  stroke="#091F2F"
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="Retail Vacancy"
                  stroke="#FB4D42"
                  dot={false}
                />
              </LineChart>
            </GraphContainer>
            <p className="citation">Source: CoStar Real Estate Analytics.</p>
          </div>
          <div className="col-12 col-md-6 graph-column">
            <h6 className="chartTitle">Commercial Space Asking Rent Per Square Foot in Boston</h6>
            <GraphContainer data={rent} height={graphHeight} width="98%">
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
                <Tooltip labelFormatter={dateFormatter} formatter={dollarDecimalFormatter}/>
                <Legend iconType="plainline" />
                <Line
                  type="monotone"
                  dataKey="Office Asking Rent"
                  stroke="#091F2F"
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="Retail Asking Rent"
                  stroke="#FB4D42"
                  dot={false}
                />
              </LineChart>
            </GraphContainer>
            <p className="citation">Source: CoStar Real Estate Analyics.</p>
          </div>
        </div>
        <div className="row mh-20 gx-0 gy-0 graph-row">
          <div className="col-12 col-md-6 graph-column">
            <h6 className="chartTitle">Multifamily Residential Vacancy Rate in Boston</h6>
            <GraphContainer data={rent} height={graphHeight} width="98%">
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
                  tickCount={4}
                  tickFormatter={decimalFormatter}
                />
                <ReferenceLine y={0} stroke="#a3a3a3" strokeWidth="2" />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip labelFormatter={dateFormatter}  formatter={oneDecimalFormatter} />
                <Line
                  type="monotone"
                  dataKey="Multifamily Vacancy"
                  stroke="#091F2F"
                  dot={false}
                />
              </LineChart>
            </GraphContainer>
            <p className="citation">Source: CoStar Real Estate Analytics.</p>

          </div>
          <div className="col-12 col-md-6 graph-column">
            <h6 className="chartTitle">Median Sales Price for Single-Family Homes and Condos in Boston</h6>
            <GraphContainer data={qmhp} height={graphHeight} width="98%">
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
                  tickFormatter={dollarThousandFormatter}
                  width={80}
                  domain={[500000, 'auto']}
                />

                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip labelFormatter={quarterlyFormatter} formatter={dollarFormatter} />
                <Legend iconType="plainline" />
                <Line
                  type="monotone"
                  dataKey="Single-Family Home"
                  stroke="#091F2F"
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="Condominium Unit"
                  stroke="#FB4D42"
                  dot={false}
                />
              </LineChart>
            </GraphContainer>
            <p className="citation">Source: City of Boston, Mayor's Office of Housing using data from the Warren Group. Note: K is in thousands.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RealEstateMarket;