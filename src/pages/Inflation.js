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
  InflationCustomTooltip,
  GraphContainer
} from "../utils.js"
import {
  useDeviceSize
} from "../useDeviceSize"
import ToggleButton from "react-bootstrap/ToggleButton";
import ButtonGroup from "react-bootstrap/ButtonGroup";


const Inflation = () => {

  // Testing out 
  const [checked, setChecked] = useState(true);
  const [radioValue, setRadioValue] = useState('1');
  //const [energyRadioValue, setEnergyRadioValue] = useState('1');
  const [foodRadioValue, setFoodRadioValue] = useState('1');

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
  const [width, height, graphHeight] = useDeviceSize()
  //cecilia edits
  const [overall, setOverall] = useState([])
  const [cumulative, setCumulative] = useState([])
  const [less, setLess] = useState([])
  const [shelter, setShelter] = useState([])
  const [shelterEnergy, setShelterEnergy] = useState([])
  const [shelterComponents, setShelterComponents] = useState([])
  const [energy, setEnergy] = useState([])
  const [energyComponents, setEnergyComponents] = useState([])
  const [food, setFood] = useState([])
  const [foodComponents, setFoodComponents] = useState([]);
  
 
  // useEffect to load component after reciving data
  useEffect(() => {
    // promise/fetch data from g-sheet pages
    Promise.all([
      fetch(baseAPI + 'Mobility_DomesticTrips'),
      fetch(baseAPI + 'Mobility_LoganAirport'),
      fetch(baseAPI + 'Mobility_MBTA'),
      fetch(baseAPI + 'Mobility_MBTALine'),
      fetch(baseAPI + 'Mobility_BlueBikes'),
      fetch(baseAPI + 'Inflation_Cumulative'),
      fetch(baseAPI + 'Inflation_Overall'),
      fetch(baseAPI + 'Inflation_Less'),
      fetch(baseAPI + 'Inflation_Shelter'),
      fetch(baseAPI + 'Inflation_ShelterEnergy'),
      fetch(baseAPI + 'Inflation_ShelterComponents'),
      fetch(baseAPI + 'Inflation_Energy'),
      fetch(baseAPI + 'Inflation_EnergyComponents'),
      fetch(baseAPI + 'Inflation_Food'),
      fetch(baseAPI + 'Inflation_FoodComponents'),
    ])
      // parse json results
      // would add resBlueBikes here
      .then(([resDomestic, resLogan, resMBTA, resMBTALine, resBlueBikes,
        resCumulative, resOverall, resLess, resShelter, resShelterEnergy, resShelterComponents, resEnergy, resEnergyComponents, resFood, resFoodComponents,
      ]) =>
        Promise.all([resDomestic.json(), resLogan.json(), resMBTA.json(), resMBTALine.json(), resBlueBikes.json(),
            resCumulative.json(), resOverall.json(), resLess.json(), resShelter.json(), resShelterEnergy.json(), resShelterComponents.json(), resEnergy.json(), resEnergyComponents.json(), resFood.json(), resFoodComponents.json(),
        ])
        // would add resBlueBikes.json() here
      )
      // store parsed data in state
      // would add dataBlueBikes
      .then(([dataDomestic, dataLogan, dataMBTA, dataMBTALine, dataBlueBikes, dataCumulative, dataOverall, dataLess, dataShelter, dataShelterEnergy, dataShelterComponents, dataEnergy, dataEnergyComponents, dataFood, dataFoodComponents,]) => {
        setDomestic(dataDomestic);
        setLogan(dataLogan);
        setMBTA(dataMBTA);
        setMBTALine(dataMBTALine);
        setBlueBikes(dataBlueBikes);
        setCumulative(dataCumulative);
        setOverall(dataOverall);
        setLess(dataLess);
        setShelter(dataShelter);
        setShelterEnergy(dataShelterEnergy);
        setShelterComponents(dataShelterComponents);
        setEnergy(dataEnergy);
        setEnergyComponents(dataEnergyComponents);
        setFood(dataFood);
        setFoodComponents(dataFoodComponents);
      })

  }, []);

  return (
    <div className="dashboard">
      <div className="subHeader">
        <Clipboard2DataFill size={(height * 0.015) + 12} color={'#288BE4'} className="subHeaderIcon" />
        <h2>Inflation</h2>
      </div>
      <div className="dashBody">
        <div className="row mh-20 g-6 indicator-row">
          <div className="col-md justify-content-center text-center">
            <div className="indicatorContainer">
              <h4 className="indicatorSubtext">
                {/*Change in Boston <span className="accentSubText">People Stopping</span> from the Same Month in 2019*/}
                Cumulative Change in <span className="accentSubText">Overall Prices</span> from {cumulative.length ?
                                    // @ts-ignore
                                    new Intl.DateTimeFormat("en-US", secondOptions).format((new Date(cumulative[cumulative.length - 2]['Month'])))
                                    : ''} 2019
                {/* {
                    domestic.length ?
                      // @ts-ignore
                      new Intl.DateTimeFormat("en-US", options).format((new Date(domestic[0]['Month'])))
                      : 'loading'
                } */}
              </h4>
              <div className="takeawayCardImageContainer">
                <img className="takeawayCardImage" src={require("../images/takeaway_card_icons/money_increase.png")}/>
              </div>
              <div className="d-flex flex-row justify-content-around">
                <h4 className="date">{
                  // once data is loaded, display text. otherwise, show "loading"
                  cumulative.length ?
                    // @ts-ignore
                    new Intl.DateTimeFormat("en-US", options).format((new Date(cumulative[cumulative.length - 2]['Month'])))
                    : 'loading'
                }
                </h4>
                <h4 className="accentNumber">{
                  // once data is loaded, display text. otherwise, show "loading"
                  cumulative.length ?
                    // format number to expplicitly show positive/negtaive sign
                    new Intl.NumberFormat("en-US", { signDisplay: "exceptZero" }).format(((cumulative[cumulative.length - 2]['Overall']) * 100).toFixed(1))
                    : 'loading'
                }%</h4>
              </div>
            </div>
          </div>
          <div className="col-md justify-content-center text-center">
            <div className="indicatorContainer">
              <h4 className="indicatorSubtext">
                {/*Change in <span className="accentSubText">Logan Airport Domestic Passengers</span> from the Same Month in 2019*/}
                Cumulative Change in <span className="accentSubText">Shelter Prices</span> from {cumulative.length ?
                                    // @ts-ignore
                                    new Intl.DateTimeFormat("en-US", secondOptions).format((new Date(cumulative[cumulative.length - 1]['Month'])))
                                    : ''} 2019
                {/* {
                logan.length ?
                  // @ts-ignore
                  new Intl.DateTimeFormat("en-US", options).format((new Date(logan[0]['Month'])))
                  : 'loading'
              } */}
              </h4>
              <div className="takeawayCardImageContainer">
                <img className="takeawayCardImage" src={require("../images/takeaway_card_icons/house.png")}/>
              </div>
              <div className="d-flex flex-row justify-content-around">
                <h4>{
                  cumulative.length ?
                    // @ts-ignore
                    new Intl.DateTimeFormat("en-US", options).format((new Date(cumulative[cumulative.length - 1]['Month'])))
                    : 'loading'
                }
                </h4>
                <h4 className="accentNumber">{
                  // once data is loaded, display text. otherwise, show "loading"
                  cumulative.length ?
                    // format number to expplicitly show positive/negtaive sign
                    new Intl.NumberFormat("en-US", { signDisplay: "exceptZero" }).format(((cumulative[cumulative.length - 2]['Shelter']) * 100).toFixed(1))
                    : 'loading'
                }%</h4>
              </div>
            </div>
          </div>
          <div className="col-md justify-content-center text-center">
            <div className="indicatorContainer">
              <h4 className="indicatorSubtext">
                {/*Change in <span className="accentSubText">Logan Airport International Passengers</span> from the Same Month in 2019*/}
                Cumulative Change in <span className="accentSubText">Energy Prices</span> from {cumulative.length ?
                                    // @ts-ignore
                                    new Intl.DateTimeFormat("en-US", secondOptions).format((new Date(cumulative[cumulative.length - 1]['Month'])))
                                    : ''} 2019
                {/* {
                    domestic.length ?
                      // @ts-ignore
                      new Intl.DateTimeFormat("en-US", options).format((new Date(domestic[0]['Month'])))
                      : 'loading'
                } */}
              </h4>
              <div className="takeawayCardImageContainer">
                <img className="smallertakeawayCardImage" src={require("../images/takeaway_card_icons/energy.png")}/>
              </div>
              <div className="d-flex flex-row justify-content-around">
                <h4>{
                  cumulative.length ?
                    // @ts-ignore
                    new Intl.DateTimeFormat("en-US", options).format((new Date(cumulative[cumulative.length - 1]['Month'])))
                    : 'loading'
                }
                </h4>
                 <h4 className="accentNumber">{
                  // once data is loaded, display text. otherwise, show "loading"
                  cumulative.length ?
                    // format number to expplicitly show positive/negtaive sign
                    new Intl.NumberFormat("en-US", { signDisplay: "exceptZero" }).format(((cumulative[cumulative.length - 2]['Energy']) * 100).toFixed(1))
                    : 'loading'
                }%</h4>
              </div>
            </div>
          </div>
          <div className="col-md justify-content-center text-center">
            <div className="indicatorContainer">
              <h4 className="indicatorSubtext">
                {/*Change in <span className="accentSubText">MBTA Passengers</span> from the Same Month in 2019*/}
                Cumulative Change in <span className="accentSubText">At-Home Food Prices</span> from {cumulative.length ?
                                    // @ts-ignore
                                    new Intl.DateTimeFormat("en-US", secondOptions).format((new Date(cumulative[cumulative.length - 2]['Month'])))
                                    : ''} 2019
                {/* {
                MBTA.length ?
                  // @ts-ignoreang 
                  new Intl.DateTimeFormat("en-US", options).format((new Date(MBTA[0]['Month'])))
                  : 'loading'
              } */}
              </h4>
              <div className="takeawayCardImageContainer">
                <img className="takeawayCardImage" src={require("../images/takeaway_card_icons/fruit_basket.png")}/>
              </div>
              <div className="d-flex flex-row justify-content-around">
                <h4 className="date">{
                  // once data is loaded, display text. otherwise, show "loading"
                  cumulative.length ?
                    // @ts-ignore
                    new Intl.DateTimeFormat("en-US", options).format((new Date(cumulative[cumulative.length - 2]['Month'])))
                    : 'loading'
                }
                </h4>
                 <h4 className="accentNumber">{
                  // once data is loaded, display text. otherwise, show "loading"
                  cumulative.length ?
                    // format number to expplicitly show positive/negtaive sign
                    new Intl.NumberFormat("en-US", { signDisplay: "exceptZero" }).format(((cumulative[cumulative.length - 2]['Food at home']) * 100).toFixed(1))
                    : 'loading'
                }%</h4>
              </div>
            </div>
          </div>
          <div className="col-md justify-content-center text-center">
            <div className="indicatorContainer">
              <h4 className="indicatorSubtext">
              Cumulative Change in <span className="accentSubText">Away From Home Food Prices</span> from {cumulative.length ?
                                    // @ts-ignore
                                    new Intl.DateTimeFormat("en-US", secondOptions).format((new Date(cumulative[cumulative.length - 2]['Month'])))
                                    : ''} 2019
                {/* {
                MBTALine.length ?
                  // @ts-ignore
                  new Intl.DateTimeFormat("en-US", options).format((new Date(MBTALine[0]['Month'])))
                  : 'loading'
              } */}
              </h4>
              <div className="takeawayCardImageContainer">
                <img className="takeawayCardImage" src={require("../images/takeaway_card_icons/plate.png")}/>
              </div>
              <div className="d-flex flex-row justify-content-around">
                <h4 className="date">{
                  cumulative.length ?
                    // @ts-ignore
                    new Intl.DateTimeFormat("en-US", options).format((new Date(cumulative[cumulative.length - 2]['Month'])))
                    : 'loading'
                }
                </h4>
                <h4 className="accentNumber">{
                  // once data is loaded, display text. otherwise, show "loading"
                  cumulative.length ?
                    // format number to expplicitly show positive/negtaive sign
                    new Intl.NumberFormat("en-US", { signDisplay: "exceptZero" }).format(((cumulative[cumulative.length - 2]['Food away from home']) * 100).toFixed(1))
                    : 'loading'
                }%</h4>
              </div>
            </div>
          </div>
          
        </div>
        <div className="row mh-20 gx-0 gy-0 graph-row">
          <div className="col-12 col-md-6 graph-column">
            <h6 className="chartTitle">National and Boston Metro Overall Inflation</h6>
            <GraphContainer data={overall} height={graphHeight} width="98%">
              <LineChart
                width={500}
                height={400}
                data={overall}
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
                  //width={90}
                  tickFormatter={oneDecimalFormatter}
                  tickCount={5}
                  domain={[-0.015,.125]}
                  //interval="equidistantPreserveStart"
                />
                <ReferenceLine y={0} stroke="#a3a3a3" strokeWidth="2" />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip labelFormatter={dateFormatter} formatter={oneDecimalFormatter} content={InflationCustomTooltip}/>
                <Legend iconType="plainline" />
                <Line
                  type="monotone"
                  dataKey="National"
                  stroke="#FB4D42"
                  dot={false}
                  connectNulls='True'
                />
                <Line
                  type="monotone"
                  dataKey="Boston Metro"
                  stroke="#091F2F"
                  dot={false}
                  connectNulls='True'
                />
              </LineChart>
            </GraphContainer>
            <p className="citation">Source: BLS, All items CPI-U, National and Boston-Cambridge-Newton, MA-NH, not seasonally adjusted.Metro data available bi-monthly.</p>
          </div>
          <div className="col-12 col-md-6 graph-column">
            <h6 className="chartTitle">Boston Metro Core, Ex-Shelter, Ex-Energy Inflation</h6>
            <GraphContainer data={less} height={graphHeight} width="98%">
              <LineChart
                width={500}
                height={400}
                data={less}
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
                  //width={90}
                  tickFormatter={oneDecimalFormatter}
                  tickCount={5}
                  domain={[-0.015,.125]}
                  //interval="equidistantPreserveStart"
                />
                <ReferenceLine y={0} stroke="#a3a3a3" strokeWidth="2" />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip labelFormatter={dateFormatter} formatter={oneDecimalFormatter}content={InflationCustomTooltip} />
                <Legend iconType="plainline" />
                <Line
                  type="monotone"
                  dataKey="All items less food and energy"
                  stroke="#091F2F"
                  dot={false}
                  connectNulls='True'
                />
                <Line
                  type="monotone"
                  dataKey="All items less shelter"
                  //stroke="#ce1b46"
                  stroke="#7a3a86"
                  dot={false}
                  connectNulls='True'
                />
                <Line
                  type="monotone"
                  dataKey="All items less energy"
                  //stroke="#1871bd"
                  stroke="#FB4D42"
                  dot={false}
                  connectNulls='True'
                />
              </LineChart>
            </GraphContainer>
            <p className="citation">Source: BLS, All items CPI-U, National and Boston-Cambridge-Newton, MA-NH, not seasonally adjusted. Metro data available bi-monthly.</p>
          </div>
        </div>
        <div className="row mh-20 gx-0 gy-0 graph-row">
          <div className="col-12 col-md-6 graph-column">
            <h6 className="chartTitle">{radioValue==="1"?'Boston Metro Energy and Shelter Inflation':"Boston Metro Shelter Inflation By Component"}</h6>
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
                {'All'}
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
                {'Components'}
              </ToggleButton>
      </ButtonGroup>
      
      {radioValue==='1'?
      //show all lines as one
      <><GraphContainer data={shelterEnergy} height={graphHeight} width="98%">
      
      <LineChart
        width={500}
        height={400}
        data={shelterEnergy}
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
          //width={90}
          tickFormatter={decimalFormatter}
        />

        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip labelFormatter={dateFormatter} formatter={oneDecimalFormatter} content={InflationCustomTooltip} />
        <Legend iconType="plainline" />
        <Line
          type="monotone"
          dataKey="Shelter"
          stroke="#ce1b46"
          dot={false}
          connectNulls="True"
        />
        <Line
          type="monotone"
          dataKey="Energy"
          stroke="#1871bd"
          dot={false}
          connectNulls="True"
        />
      </LineChart>
      
    </GraphContainer>
    <p className="citation">Source: BLS, CPI-U Energy and Shelter, Boston-Cambridge-Newton, MA-NH (not seasonally adjusted). Metro data available bi-monthly.</p></>
      :
      <><GraphContainer data={shelterComponents} height={graphHeight} width="98%">
      <LineChart
        width={500}
        height={400}
        data={shelterComponents}
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
          tickFormatter={oneDecimalFormatter}
          //domain={['dataMin', 'dataMax']}
          tickCount={5}
          domain={[-0.015,.125]}
        />
        <ReferenceLine y={0} stroke="#a3a3a3" strokeWidth="2" />
        <CartesianGrid strokeDasharray="3 3" />
        {/*<Tooltip labelFormatter={dateFormatter} formatter={commaFormatter} content={MBTACustomTooltip}/>*/}
        <Tooltip labelFormatter={dateFormatter} formatter={oneDecimalFormatter} content={InflationCustomTooltip}/>
        <Legend iconType="plainline" />
        <Line
          type="monotone"
          dataKey="Rent of primary residence"
          stroke="#eb6485"
          dot={false}
          connectNulls="True"
        />
        <Line
          type="monotone"
          dataKey="Owners' equivalent rent of residences"
          stroke="#740f27"
          dot={false}
          connectNulls="True"
        />
      </LineChart>
    </GraphContainer>
    <p className="citation">Source: BLS, CPI-U Shelter series (Shelter, Rent of Primary Residence, Owners’ Equivalent Rent of Residences), Boston-Cambridge-Newton, MA-NH (not seasonally adjusted). Metro data available bi-monthly. Energy components not available.</p>
    </>}
            

          </div>
          
          <div className="col-12 col-md-6 graph-column">
            <h6 className="chartTitle">{foodRadioValue==='1'?'Boston Metro Food Inflation':'Boston Metro Food Inflation by Component'}</h6>
            <ButtonGroup>
            <ToggleButton
                id={`food-radio-1`}
                className={foodRadioValue=='1'?'toggleButtonActive':'toggleButton'}
                type="radio"
                name="radio"
                value='1'
                checked={foodRadioValue === '1'}
                onChange={(e) => setFoodRadioValue(e.currentTarget.value)}
              >
                {'All'}
              </ToggleButton>
              <ToggleButton
                id={`food-radio-2`}
                className={foodRadioValue=='2'?'toggleButtonActive':'toggleButton'}
                type="radio"
                name="radio"
                value='2'
                checked={foodRadioValue === '2'}
                onChange={(e) => setFoodRadioValue(e.currentTarget.value)}
              >
                {'Components'}
              </ToggleButton>
      </ButtonGroup>
      {foodRadioValue==='1'? <>
      <GraphContainer data={food} height={graphHeight} width="98%">
              <LineChart
                width={500}
                height={400}
                data={food}
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
                  //width={90}
                  tickFormatter={oneDecimalFormatter}
                  tickCount={5}
                  domain={[-0.015,.125]}
                  //interval="equidistantPreserveStart"
                />
                <ReferenceLine y={0} stroke="#a3a3a3" strokeWidth="2" />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip labelFormatter={dateFormatter} formatter={oneDecimalFormatter} content={InflationCustomTooltip}/>
                <Line
                  type="monotone"
                  dataKey="Food"
                  stroke="#7d972a"
                  dot={false}
                  connectNulls="True"
                />
              </LineChart>
            </GraphContainer>
            <p className="citation">Source: BLS, CPI-U Food, Boston-Cambridge-Newton, MA-NH (not seasonally adjusted).  Metro data available bi-monthly.</p></>
            :
            <><GraphContainer data={foodComponents} height={graphHeight} width="98%">
              <LineChart
                width={500}
                height={400}
                data={foodComponents}
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
                  //width={90}
                  tickFormatter={decimalFormatter}
                  tickCount={6}
                  //interval="equidistantPreserveStart"
                />
                <ReferenceLine y={0} stroke="#a3a3a3" strokeWidth="2" />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip labelFormatter={dateFormatter} formatter={oneDecimalFormatter} content={InflationCustomTooltip} />
                <Legend iconType="plainline" />
                <Line
                  type="monotone"
                  dataKey="Food at home"
                  stroke="#b3d057"
                  dot={false}
                  connectNulls="True"
                />
                <Line
                  type="monotone"
                  dataKey="Food away from home"
                  stroke="#3b4714"
                  dot={false}
                  connectNulls="True"
                />
              </LineChart>
            </GraphContainer>
            <p className="citation">Source: BLS, CPI-U Food series (Food, Food at Home, Food Away from Home), Boston-Cambridge-Newton, MA-NH (not seasonally adjusted).  Metro data available bi-monthly.</p></>
            }
          </div>
          </div>
      </div>
    </div>
  );
};

export default Inflation;