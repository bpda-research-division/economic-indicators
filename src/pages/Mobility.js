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
  commaFormatter,
  millionFormatter,
  thousandFormatter,
  options,
  secondOptions,
  CustomTooltip,
  MBTACustomTooltip,
  GraphContainer
} from "../utils.js"
import {
  useDeviceSize
} from "../useDeviceSize"
import ToggleButton from "react-bootstrap/ToggleButton";
import ButtonGroup from "react-bootstrap/ButtonGroup";


const Mobility = () => {

  // Testing out 
  const [checked, setChecked] = useState(true);
  const [radioValue, setRadioValue] = useState('1');

  const radios = [
    { name: 'All', value: '1' },
    { name: 'By Line', value: '2' },
  ];


  // set up state variables that will store g-sheet data
  const [domestic, setDomestic] = useState([])
  const [logan, setLogan] = useState([])
  const [MBTA, setMBTA] = useState([])
  const [MBTALine, setMBTALine] = useState([])
  const [blueBikes, setBlueBikes] = useState([])
  const [width, height, graphHeight] = useDeviceSize();

  // useEffect to load component after reciving data
  useEffect(() => {
    // promise/fetch data from g-sheet pages
    Promise.all([
      fetch(baseAPI + 'Mobility_DomesticTrips'),
      fetch(baseAPI + 'Mobility_LoganAirport'),
      fetch(baseAPI + 'Mobility_MBTA'),
      fetch(baseAPI + 'Mobility_MBTALine'),
      fetch(baseAPI + 'Mobility_BlueBikes'),
    ])
      // parse json results
      // would add resBlueBikes here
      .then(([resDomestic, resLogan, resMBTA, resMBTALine, resBlueBikes]) =>
        Promise.all([resDomestic.json(), resLogan.json(), resMBTA.json(), resMBTALine.json(), resBlueBikes.json()])
        // would add resBlueBikes.json() here
      )
      // store parsed data in state
      // would add dataBlueBikes
      .then(([dataDomestic, dataLogan, dataMBTA, dataMBTALine, dataBlueBikes]) => {
        setDomestic(dataDomestic);
        setLogan(dataLogan);
        setMBTA(dataMBTA);
        setMBTALine(dataMBTALine);
        setBlueBikes(dataBlueBikes);
      })

  }, []);

  return (
    <div className="dashboard">
      <div className="subHeader">
        <Clipboard2DataFill size={(height * 0.015) + 12} color={'#288BE4'} className="subHeaderIcon" />
        <h2>Mobility</h2>
      </div>
      <div className="dashBody">
        <div className="row mh-20 g-6 indicator-row">
          <div className="col-md justify-content-center text-center">
            <div className="indicatorContainer">
              <h4 className="indicatorSubtext">
                {/*Change in Boston <span className="accentSubText">People Stopping</span> from the Same Month in 2019*/}
                Change in Boston <span className="accentSubText">People Stopping</span> from {domestic.length ?
                                    // @ts-ignore
                                    new Intl.DateTimeFormat("en-US", secondOptions).format((new Date(domestic[domestic.length - 1]['Month'])))
                                    : ''} 2019
                {/* {
                    domestic.length ?
                      // @ts-ignore
                      new Intl.DateTimeFormat("en-US", options).format((new Date(domestic[0]['Month'])))
                      : 'loading'
                } */}
              </h4>
              <div className="takeawayCardImageContainer">
                <img className="takeawayCardImage" src={require("../images/takeaway_card_icons/walking-01-01.png")}/>
              </div>
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
              <h4 className="indicatorSubtext">
                {/*Change in <span className="accentSubText">Logan Airport Domestic Passengers</span> from the Same Month in 2019*/}
                Change in <span className="accentSubText">Logan Airport Domestic Passengers</span> from {logan.length ?
                                    // @ts-ignore
                                    new Intl.DateTimeFormat("en-US", secondOptions).format((new Date(logan[logan.length - 1]['Month'])))
                                    : ''} 2019
                {/* {
                logan.length ?
                  // @ts-ignore
                  new Intl.DateTimeFormat("en-US", options).format((new Date(logan[0]['Month'])))
                  : 'loading'
              } */}
              </h4>
              <div className="takeawayCardImageContainer">
                <img className="takeawayCardImage" src={require("../images/takeaway_card_icons/plane_smaller.png")}/>
              </div>
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
                {/*Change in <span className="accentSubText">Logan Airport International Passengers</span> from the Same Month in 2019*/}
                Change in <span className="accentSubText">Logan Airport International Passengers</span> from {logan.length ?
                                    // @ts-ignore
                                    new Intl.DateTimeFormat("en-US", secondOptions).format((new Date(logan[logan.length - 1]['Month'])))
                                    : ''} 2019
                {/* {
                    domestic.length ?
                      // @ts-ignore
                      new Intl.DateTimeFormat("en-US", options).format((new Date(domestic[0]['Month'])))
                      : 'loading'
                } */}
              </h4>
              <div className="takeawayCardImageContainer">
                <img className="smallertakeawayCardImage" src={require("../images/takeaway_card_icons/world_smaller.png")}/>
              </div>
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
              <h4 className="indicatorSubtext">
                {/*Change in <span className="accentSubText">MBTA Passengers</span> from the Same Month in 2019*/}
                Change in <span className="accentSubText">MBTA Passengers</span> from {MBTA.length ?
                                    // @ts-ignore
                                    new Intl.DateTimeFormat("en-US", secondOptions).format((new Date(MBTA[MBTA.length - 1]['Month'])))
                                    : ''} 2019
                {/* {
                MBTA.length ?
                  // @ts-ignoreang 
                  new Intl.DateTimeFormat("en-US", options).format((new Date(MBTA[0]['Month'])))
                  : 'loading'
              } */}
              </h4>
              <div className="takeawayCardImageContainer">
                <img className="takeawayCardImage" src={require("../images/takeaway_card_icons/mbta_logo.png")}/>
              </div>
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
              <h4 className="indicatorSubtext">
              Change in <span className="accentSubText">Bluebikes Trips</span> from {blueBikes.length ?
                                    // @ts-ignore
                                    new Intl.DateTimeFormat("en-US", secondOptions).format((new Date(blueBikes[blueBikes.length - 1]['Month'])))
                                    : ''} 2019
                {/* {
                MBTALine.length ?
                  // @ts-ignore
                  new Intl.DateTimeFormat("en-US", options).format((new Date(MBTALine[0]['Month'])))
                  : 'loading'
              } */}
              </h4>
              <div className="takeawayCardImageContainer">
                <img className="takeawayCardImage" src={require("../images/takeaway_card_icons/Bike 2 - Side@4x.png")}/>
              </div>
              <div className="d-flex flex-row justify-content-around">
                <h4 className="date">{
                  blueBikes.length ?
                    // @ts-ignore
                    new Intl.DateTimeFormat("en-US", options).format((new Date(blueBikes[blueBikes.length - 1]['Month'])))
                    : 'loading'
                }
                </h4>
                <h4 className="accentNumber">{
                  blueBikes.length ?
                    ((blueBikes[blueBikes.length - 1]['Percent Change Bluebikes']) * 100).toFixed(1)
                    : 'loading'
                }%</h4>
              </div>
            </div>
          </div>
          
        </div>
        <div className="row mh-20 gx-0 gy-0 graph-row">
          <div className="col-12 col-md-6 graph-column">
            <h6 className="chartTitle">People Stopping in Boston, Compared to the Same Month in 2019</h6>
            <GraphContainer data={domestic} height={graphHeight} width="98%">
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
                <Tooltip labelFormatter={dateFormatter} formatter={oneDecimalFormatter} />
                <Line
                  type="monotone"
                  dataKey="Total Stoppers"
                  stroke="#091F2F"
                  dot={false}
                />
              </LineChart>
            </GraphContainer>
            <p className="citation">Source: Cuebiq mobility data.</p>
          </div>
          <div className="col-12 col-md-6 graph-column">
            <h6 className="chartTitle">{radioValue==="1"?'MBTA Gated Station Validations in Boston':"MBTA Gated Station Validations by Line"}</h6>
            <ButtonGroup>
            <ToggleButton
                id={`radio-1`}
                className={radioValue=='1'?'toggleButtonActive':'toggleButton'}
                type="radio"
                //variant={idx % 2 ? 'outline-success' : 'outline-danger'}
                name="radio"
                value='1'
                checked={radioValue === '1'}
                onChange={(e) => setRadioValue(e.currentTarget.value)}
              >
                {'All Lines'}
              </ToggleButton>
              <ToggleButton
                id={`radio-2`}
                className={radioValue=='2'?'toggleButtonActive':'toggleButton'}
                type="radio"
                //variant={idx % 2 ? 'outline-success' : 'outline-danger'}
                name="radio"
                value='2'
                checked={radioValue === '2'}
                onChange={(e) => setRadioValue(e.currentTarget.value)}
              >
                {'By Line'}
              </ToggleButton>
      </ButtonGroup>
      
      {radioValue==='1'?
      //show all lines as one
      <><ResponsiveContainer width="98%" height={graphHeight}>
      
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
          tickFormatter={millionFormatter}
        />

        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip labelFormatter={dateFormatter} formatter={commaFormatter} />
        <Line
          type="monotone"
          dataKey="Sum of Validations"
          stroke="#091F2F"
          dot={false}
        />
      </LineChart>
      
    </ResponsiveContainer>
    <p className="citation">Source: MBTA, Gated Station Validations by Station. Note: M is in millions.</p></>
      :
      <><ResponsiveContainer width="98%" height={graphHeight}>
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
          tickFormatter={millionFormatter}
          domain={[0, 4000000]}
        />
        <ReferenceLine y={0} stroke="#a3a3a3" strokeWidth="2" />
        <CartesianGrid strokeDasharray="3 3" />
        {/*<Tooltip labelFormatter={dateFormatter} formatter={commaFormatter} content={MBTACustomTooltip}/>*/}
        <Tooltip labelFormatter={dateFormatter} formatter={commaFormatter} content={MBTACustomTooltip}/>
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
    <p className="citation">Source: MBTA, Gated Station Validations by Station.<br></br>Note: M is in millions.<br></br>*'All Lines' reflects total gated validations in Boston, ensuring each trip is counted only once, even at transfer stations with multiple lines.</p>
    </>}
            
          </div>
        </div>
        <div className="row mh-20 gx-0 gy-0 graph-row">
          <div className="col-12 col-md-6 graph-column">
            <h6 className="chartTitle">Logan Passengers</h6>
            <GraphContainer data={logan} height={graphHeight} width="98%">
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
                  tickFormatter={millionFormatter}
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
                  stroke="#091F2F"
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="Logan International Passengers"
                  stroke="#FB4D42"
                  dot={false}
                />
              </LineChart>
            </GraphContainer>
            <p className="citation">Source: Massachusetts Port Authority, Aviation General Management (Massport).<br></br>Note: M is in millions.</p>

          </div>
          
          <div className="col-12 col-md-6 graph-column">
            <h6 className="chartTitle">Bluebikes Trips Starting or Stopping in Boston</h6>
            <GraphContainer data={blueBikes} height={graphHeight} width="98%">
              <LineChart
                width={500}
                height={400}
                data={blueBikes}
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
                  tickFormatter={thousandFormatter}
                  tickCount={4}
                  interval="equidistantPreserveStart"
                />
                <ReferenceLine y={0} stroke="#a3a3a3" strokeWidth="2" />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip labelFormatter={dateFormatter} formatter={commaFormatter} />
                <Legend iconType="plainline" />
                <Line
                  type="monotone"
                  dataKey="Member Trips" // Change to Member Trips
                  stroke="#091F2F"
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="Non-Member Trips" // Change to Non-Member Trips
                  stroke="#1871BD"
                  dot={false}
                />
              </LineChart>
            </GraphContainer>
            <p className="citation">Source: Bluebikes System Data.<br></br>Note: K is in thousands.</p>
          </div>
          </div>
      </div>
    </div>
  );
};

export default Mobility;