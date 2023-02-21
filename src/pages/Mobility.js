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
  decimalFormatter,
  options,
} from "../utils.js"

const Mobility = () => {
  const [domestic, setDomestic] = useState([])
  const [logan, setLogan] = useState([])
  const [MBTA, setMBTA] = useState([])
  const [MBTALine, setMBTALine] = useState([])

  useEffect(() => {
    Promise.all([
      fetch(baseAPI + 'Mobility_DomesticTrips'),
      fetch(baseAPI + 'Mobility_LoganAirport'),
      fetch(baseAPI + 'Mobility_MBTA'),
      fetch(baseAPI + 'Mobility_MBTALine'),
    ])
      .then(([resDomestic, resLogan, resMBTA, resMBTALine]) =>
        Promise.all([resDomestic.json(), resLogan.json(), resMBTA.json(), resMBTALine.json()])
      )
      .then(([dataDomestic, dataLogan, dataMBTA, dataMBTALine]) => {
        setDomestic(dataDomestic);
        setLogan(dataLogan);
        setMBTA(dataMBTA);
        setMBTALine(dataMBTALine);
      })

  }, []);

  return (
    <div>
      <div className="subHeader">
        <Clipboard2DataFill size={24} color={'#94D5DB'} className="subHeaderIcon"/>
        <h2>Mobility</h2>
      </div>
      <div className="dashBody">
        <div className="row mh-20 g-6 indicator-row">
          <div className="col-md justify-content-center text-center">
            <div className="indicatorContainer">
              <h4 className="indicatorSubtext"> 
                Change in Boston <span className="accentSubText">Visitors</span> from {
                    domestic.length ?
                      // @ts-ignore
                      new Intl.DateTimeFormat("en-US", options).format((new Date(domestic[0]['Month'])))
                      : 'loading'
                }
              </h4>
              <div className="d-flex flex-row justify-content-around">
                <h4 className="date">{
                  domestic.length ?
                    // @ts-ignore
                    new Intl.DateTimeFormat("en-US", options).format((new Date(domestic[domestic.length - 1]['Month'])))
                    : 'loading'
                }
                </h4>
                <h4 className="accentNumber">{
                  domestic.length ?
                  new Intl.NumberFormat("en-US", {signDisplay: "exceptZero"}).format(((domestic[domestic.length - 1]['Non-Work-Related Trips']) * 100).toFixed(1))
                    : 'loading'
                }%</h4>
              </div>
            </div>
          </div>
          <div className="col-md justify-content-center text-center">
            <div className="indicatorContainer">
              <h4 className="indicatorSubtext"> 
                Change in Boston <span className="accentSubText">Commuters</span> from {
                    domestic.length ?
                      // @ts-ignore
                      new Intl.DateTimeFormat("en-US", options).format((new Date(domestic[0]['Month'])))
                      : 'loading'
                }
              </h4>
              <div className="d-flex flex-row justify-content-around">
                <h4 className="date">{
                  domestic.length ?
                    // @ts-ignore
                    new Intl.DateTimeFormat("en-US", options).format((new Date(domestic[domestic.length - 1]['Month'])))
                    : 'loading'
                }
                </h4>
                <h4 className="accentNumber">{
                  domestic.length ?
                  new Intl.NumberFormat("en-US", {signDisplay: "exceptZero"}).format(((domestic[domestic.length - 1]['Commuting Trips']) * 100).toFixed(1))
                    : 'loading'
                }%</h4>
              </div>
            </div>
          </div>
          <div className="col-md justify-content-center text-center">
            <div className="indicatorContainer">
              <h4 className="indicatorSubtext">Change in <span className="accentSubText">MBTA Passengers</span> from {
                MBTA.length ?
                  // @ts-ignoreang 
                  new Intl.DateTimeFormat("en-US", options).format((new Date(MBTA[0]['Month'])))
                  : 'loading'
              }</h4>
              <div className="d-flex flex-row justify-content-around">
                <h4 className="date">{
                MBTA.length ?
                  // @ts-ignore
                  new Intl.DateTimeFormat("en-US", options).format((new Date(MBTA[MBTA.length - 1]['Month'])))
                  : 'loading'
                }
                </h4>
                <h4 className="accentNumber">{
                  MBTA.length ?
                    ((MBTA[MBTA.length - 1]['Percent Change']) * 100).toFixed(1)
                    : 'loading'
                }%</h4>
              </div>
            </div>
          </div>
          <div className="col-md justify-content-center text-center">
            <div className="indicatorContainer">
              <h4 className="indicatorSubtext">Change in <span className="accentSubText">MBTA Orange Line Passengers</span> Rate from {
                MBTALine.length ?
                  // @ts-ignore
                  new Intl.DateTimeFormat("en-US", options).format((new Date(MBTALine[0]['Month'])))
                  : 'loading'
              }</h4>
              <div className="d-flex flex-row justify-content-around">
                <h4 className="date">{
                  MBTALine.length ?
                    // @ts-ignore
                    new Intl.DateTimeFormat("en-US", options).format((new Date(MBTALine[MBTALine.length - 1]['Month'])))
                    : 'loading'
                }
                </h4>
                <h4 className="accentNumber">{
                  MBTALine.length ?
                    ((MBTALine[MBTALine.length - 1]['Percent Change Orange Line'])).toFixed(1)
                    : 'loading'
                }%</h4>
              </div>
            </div>
          </div>
          <div className="col-md justify-content-center text-center">
            <div className="indicatorContainer">
              <h4 className="indicatorSubtext">Change in <span className="accentSubText">Logan Airport Domestic Passengers</span> from {
                logan.length ?
                  // @ts-ignore
                  new Intl.DateTimeFormat("en-US", options).format((new Date(logan[0]['Month'])))
                  : 'loading'
              }</h4>
              <div className="d-flex flex-row justify-content-around">
                <h4>{
                    logan.length ?
                      // @ts-ignore
                      new Intl.DateTimeFormat("en-US", options).format((new Date(logan[logan.length - 1]['Month'])))
                      : 'loading'
                  }
                </h4>
                <h4 className="accentNumber">{
                  logan.length ?
                    ((logan[logan.length - 1]['Percent Change Domestic']) * 100).toFixed(1)
                    : 'loading'
                }%</h4>
              </div>
            </div>
          </div>
        </div>
        <div className="row mh-20 gx-5 gy-5 graph-row">
          <div className="col-12 col-md-6">
              <h6 className="chartTitle">Incoming Trips to Boston, Compared to the Same Month in 2019</h6>
              <ResponsiveContainer width="90%" height={graphHeight}>
                <LineChart
                  width={500}
                  height={400}
                  data={domestic}
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
            <p className="citation">Source: Cuebiq mobility data.</p>
          </div>
          <div className="col-12 col-md-6">
              <h6 className="chartTitle">MBTA Gated Station Validations in Boston</h6>
              <ResponsiveContainer width="90%" height={graphHeight}>
                <LineChart
                  width={500}
                  height={400}
                  data={MBTA}
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
                    dataKey="Sum of Validations"
                    stroke="#003c50"
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
              <p className="citation">Source: MBTA Datablog, COVID-19 and MBTA Ridership: Part 4</p>
          </div>
        </div>
        <div className="row mh-20 gx-5 gy-5">
          <div className="col-12 col-md-6">
              <h6 className="chartTitle">Logan Passengers</h6>
              <ResponsiveContainer width="90%" height={graphHeight}>
                <LineChart
                  width={500}
                  height={400}
                  data={logan}
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
                    dataKey="Logan Domestic Passengers (incl. General Aviation)"
                    stroke="#003c50"
                    dot={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="Logan International Passengers"
                    stroke="#00a6b4"
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
              <p className="citation">Source: Massachusetts Port Authority, Aviation General Management (Massport)</p>

          </div>
          <div className="col-12 col-md-6">
              <h6 className="chartTitle">Monthly Validations by MBTA Line within Boston</h6>
              <ResponsiveContainer width="90%" height={graphHeight}>
                <LineChart
                  width={500}
                  height={400}
                  data={MBTALine}
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
                    dataKey="Blue Line"
                    stroke="#003c50"
                    dot={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="Red Line"
                    stroke="#CE1B46"
                    dot={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="Orange Line"
                    stroke="#E05926"
                    dot={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="Green Line"
                    stroke="#a6c838"
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
              <p className="citation">Source: MBTA Datablog, COVID-19 and MBTA Ridership: Part 4</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mobility;