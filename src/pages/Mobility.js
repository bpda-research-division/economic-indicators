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
  commaFormatter,
  options,
} from "../utils.js"
import {
  useDeviceSize
} from "../useDeviceSize"

const Mobility = () => {
  // set up state variables that will store g-sheet data
  const [domestic, setDomestic] = useState([])
  const [logan, setLogan] = useState([])
  const [MBTA, setMBTA] = useState([])
  const [MBTALine, setMBTALine] = useState([])
  const [width, height, graphHeight] = useDeviceSize();

  // useEffect to load component after reciving data
  useEffect(() => {
    // promise/fetch data from g-sheet pages
    Promise.all([
      fetch(baseAPI + 'Mobility_DomesticTrips'),
      fetch(baseAPI + 'Mobility_LoganAirport'),
      fetch(baseAPI + 'Mobility_MBTA'),
      fetch(baseAPI + 'Mobility_MBTALine'),
    ])
      // parse json results
      .then(([resDomestic, resLogan, resMBTA, resMBTALine]) =>
        Promise.all([resDomestic.json(), resLogan.json(), resMBTA.json(), resMBTALine.json()])
      )
      // store parsed data in state
      .then(([dataDomestic, dataLogan, dataMBTA, dataMBTALine]) => {
        setDomestic(dataDomestic);
        setLogan(dataLogan);
        setMBTA(dataMBTA);
        setMBTALine(dataMBTALine);
      })

  }, []);

  return (
    <div className="dashboard">
      <div className="subHeader">
        <Clipboard2DataFill size={(height * 0.015) + 12} color={'#4dc1cb'} className="subHeaderIcon" />
        <h2>Mobility</h2>
      </div>
      <div className="dashBody">
        <div className="row mh-20 g-6 indicator-row">
          <div className="col-md justify-content-center text-center">
            <div className="indicatorContainer">
              <h4 className="indicatorSubtext">
                Change in Boston <span className="accentSubText">People Stopping</span> from the Same Month in 2019
                {/* {
                    domestic.length ?
                      // @ts-ignore
                      new Intl.DateTimeFormat("en-US", options).format((new Date(domestic[0]['Month'])))
                      : 'loading'
                } */}
              </h4>
              <div className="d-flex flex-row justify-content-around">
                <h4 className="date">{
                  // once data is loaded, display text. otherwise, show "loading"
                  domestic.length ?
                    // @ts-ignore
                    new Intl.DateTimeFormat("en-US", options).format((new Date(domestic[domestic.length - 1]['Month'])))
                    : 'loading'
                }
                </h4>
                <h4 className="accentNumber">{
                  // once data is loaded, display text. otherwise, show "loading"
                  domestic.length ?
                    // format number to expplicitly show positive/negtaive sign
                    new Intl.NumberFormat("en-US", { signDisplay: "exceptZero" }).format(((domestic[domestic.length - 1]['Total Stoppers']) * 100).toFixed(1))
                    : 'loading'
                }%</h4>
              </div>
            </div>
          </div>
          <div className="col-md justify-content-center text-center">
            <div className="indicatorContainer">
              <h4 className="indicatorSubtext">Change in <span className="accentSubText">Logan Airport Domestic Passengers</span> from the Same Month in 2019
                {/* {
                logan.length ?
                  // @ts-ignore
                  new Intl.DateTimeFormat("en-US", options).format((new Date(logan[0]['Month'])))
                  : 'loading'
              } */}
              </h4>
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
          <div className="col-md justify-content-center text-center">
            <div className="indicatorContainer">
              <h4 className="indicatorSubtext">
                Change in <span className="accentSubText">Logan Airport International Passengers</span> from the Same Month in 2019
                {/* {
                    domestic.length ?
                      // @ts-ignore
                      new Intl.DateTimeFormat("en-US", options).format((new Date(domestic[0]['Month'])))
                      : 'loading'
                } */}
              </h4>
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
                    ((logan[logan.length - 1]['Percent Change International']) * 100).toFixed(1)
                    : 'loading'
                }%</h4>
              </div>
            </div>
          </div>
          <div className="col-md justify-content-center text-center">
            <div className="indicatorContainer">
              <h4 className="indicatorSubtext">Change in <span className="accentSubText">MBTA Passengers</span> from the Same Month in 2019
                {/* {
                MBTA.length ?
                  // @ts-ignoreang 
                  new Intl.DateTimeFormat("en-US", options).format((new Date(MBTA[0]['Month'])))
                  : 'loading'
              } */}
              </h4>
              <div className="d-flex flex-row justify-content-around">
                <h4 className="date">{
                  // once data is loaded, display text. otherwise, show "loading"
                  MBTA.length ?
                    // @ts-ignore
                    new Intl.DateTimeFormat("en-US", options).format((new Date(MBTA[MBTA.length - 1]['Month'])))
                    : 'loading'
                }
                </h4>
                <h4 className="accentNumber">{
                  // once data is loaded, display text. otherwise, show "loading"
                  MBTA.length ?
                    ((MBTA[MBTA.length - 1]['Percent Change']) * 100).toFixed(1)
                    : 'loading'
                }%</h4>
              </div>
            </div>
          </div>
          <div className="col-md justify-content-center text-center">
            <div className="indicatorContainer">
              <h4 className="indicatorSubtext">Change in <span className="accentSubText">MBTA Orange Line Passengers</span> from the Same Month in 2019
                {/* {
                MBTALine.length ?
                  // @ts-ignore
                  new Intl.DateTimeFormat("en-US", options).format((new Date(MBTALine[0]['Month'])))
                  : 'loading'
              } */}
              </h4>
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
                    ((MBTALine[MBTALine.length - 1]['Percent Change Orange Line']) * 100).toFixed(1)
                    : 'loading'
                }%</h4>
              </div>
            </div>
          </div>
          
        </div>
        <div className="row mh-20 gx-0 gy-0 graph-row">
          <div className="col-12 col-md-6 graph-column">
            <h6 className="chartTitle">People Stopping in Boston, Compared to the Same Month in 2019</h6>
            <ResponsiveContainer width="98%" height={graphHeight}>
              <LineChart
                width={500}
                height={400}
                data={domestic}
              // stackOffset="expand"
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
                <Line
                  type="monotone"
                  dataKey="Total Stoppers"
                  stroke="#003c50"
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
            <p className="citation">Source: Cuebiq mobility data.</p>
          </div>
          <div className="col-12 col-md-6 graph-column">
            <h6 className="chartTitle">MBTA Gated Station Validations in Boston</h6>
            <ResponsiveContainer width="98%" height={graphHeight}>
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
                  width={90}
                  tickFormatter={commaFormatter}
                />

                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip labelFormatter={dateFormatter} formatter={commaFormatter} />
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
        <div className="row mh-20 gx-0 gy-0 graph-row">
          <div className="col-12 col-md-6 graph-column">
            <h6 className="chartTitle">Logan Passengers</h6>
            <ResponsiveContainer width="98%" height={graphHeight}>
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
                  width={90}
                  tickFormatter={commaFormatter}
                  tickCount={4}
                  interval="equidistantPreserveStart"
                />
                <ReferenceLine y={0} stroke="#a3a3a3" strokeWidth="2" />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip labelFormatter={dateFormatter} formatter={commaFormatter} />
                <Legend iconType="plainline" />
                <Line
                  type="monotone"
                  dataKey="Logan Domestic Passengers"
                  stroke="#003c50"
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="Logan International Passengers"
                  stroke="#e05926"
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
            <p className="citation">Source: Massachusetts Port Authority, Aviation General Management (Massport)</p>

          </div>
          <div className="col-12 col-md-6 graph-column">
            <h6 className="chartTitle">Monthly Validations by MBTA Line within Boston</h6>
            <ResponsiveContainer width="98%" height={graphHeight}>
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
                  width={90}
                  tickFormatter={commaFormatter}
                  domain={[0, 4000000]}
                />
                <ReferenceLine y={0} stroke="#a3a3a3" strokeWidth="2" />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip labelFormatter={dateFormatter} formatter={commaFormatter} />
                <Legend iconType="plainline" />
                <Line
                  type="monotone"
                  dataKey="Blue Line"
                  stroke="#003da5"
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="Red Line"
                  stroke="#da291c"
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="Orange Line"
                  stroke="#ed8b00"
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="Green Line"
                  stroke="#00843d"
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