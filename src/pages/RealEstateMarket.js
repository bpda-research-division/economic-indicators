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
  graphHeight,
  dateFormatter,
  decimalFormatter,
  dollarFormatter,
  options,
  ordinal,
  quarterlyFormatter,
} from "../utils.js"

const RealEstateMarket = () => {
  const [rent, setRent] = useState([])
  const [qmhp, setQmhp] = useState([])

  useEffect(() => {
    Promise.all([
      fetch(baseAPI + 'RealEstate_Rent'),
      fetch(baseAPI + 'RealEstate_QuarterlyMedianHousingPrice')
    ])
      .then(([resRent, resQuarterlyMedianHousingPrice]) =>
        Promise.all([resRent.json(), resQuarterlyMedianHousingPrice.json()])
      )
      .then(([dataRent, dataQuarterlyMedianHousingPrice]) => {
        setRent(dataRent);
        setQmhp(dataQuarterlyMedianHousingPrice);
      })
  }, []);


  return (
    <div>
      <div className="subHeader">
        <Clipboard2DataFill size={24} color={'#94D5DB'} className="subHeaderIcon"/>
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
                  rent.length ?
                    // @ts-ignore
                    new Intl.DateTimeFormat("en-US", options).format((new Date(rent[rent.length - 1]['Month'])))
                    : 'loading'
                }
                </h4>
                <h4 className="accentNumber">{
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
                rent.length ?
                  // @ts-ignore
                  new Intl.DateTimeFormat("en-US", options).format((new Date(rent[rent.length - 1]['Month'])))
                  : 'loading'
                }
                </h4>
                <h4 className="accentNumber">{
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
                  rent.length ?
                    // @ts-ignore
                    new Intl.DateTimeFormat("en-US", options).format((new Date(rent[rent.length - 1]['Month'])))
                    : 'loading'
                }
                </h4>
                <h4 className="accentNumber">{
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
                    rent.length ?
                      // @ts-ignore
                      new Intl.DateTimeFormat("en-US", options).format((new Date(rent[rent.length - 1]['Month'])))
                      : 'loading'
                  }
                </h4>
                <h4 className="accentNumber">${
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
                    qmhp.length ?
                      // @ts-ignore
                      (qmhp[qmhp.length - 1]['Year and Quater'])
                      : 'loading'
                  }
                </h4>
                <h4 className="accentNumber">${
                  qmhp.length ?

                    ((qmhp[qmhp.length - 1]['Condominium Unit']).toLocaleString("en-US"))
                    : 'loading'
                }</h4>
              </div>
            </div>
          </div>
        </div>
        <div className="row mh-20 gx-5 gy-5 graph-row">
          <div className="col-12 col-md-6">
              <h6 className="chartTitle">Commercial Vacancy Rate in Boston</h6>
              <ResponsiveContainer width="90%" height={graphHeight}>
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
                    // domain={[0, .1]}
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
          <div className="col-12 col-md-6">
              <h6 className="chartTitle">Commercial Space Asking Rent Per Square Foot in Boston</h6>
              <ResponsiveContainer width="90%" height={graphHeight}>
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
                  />
                  
                  <CartesianGrid strokeDasharray="3 3" />
                  <Tooltip labelFormatter={dateFormatter}  />
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
        <div className="row mh-20 gx-5 gy-5">
          <div className="col-12 col-md-6">
              <h6 className="chartTitle">MultiFamily Residential Vacancy Rate in Boston</h6>
              <ResponsiveContainer width="90%" height={graphHeight}>
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
                    // domain={[-.65, 0.5]}
                    tickFormatter={decimalFormatter}
                  />
                  <ReferenceLine y={0} stroke="#a3a3a3" strokeWidth="2"/>
                  <CartesianGrid strokeDasharray="3 3" />
                  <Tooltip formatter={decimalFormatter} />
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
          <div className="col-12 col-md-6">
              <h6 className="chartTitle">Median Sales Price for Single-Family Homes and Condos</h6>
              <ResponsiveContainer width="90%" height={graphHeight}>
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
                    // domain={[0, .2]}
                    tickFormatter={dollarFormatter}
                    width={80}
                  />
                  
                  <CartesianGrid strokeDasharray="3 3" />
                  {/* <Tooltip labelFormatter={quarterlyFormatter} formatter={decimalFormatter} /> */}
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
              <p className="citation">Source: City of Boston, Mayor's Office of Housing based on data provided by Banker and Tradesman Mastercard Geographic Insights from Carto &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; *In January 2019 dollars</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RealEstateMarket;