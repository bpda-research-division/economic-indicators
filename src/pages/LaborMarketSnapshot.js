import React, {
  useEffect,
  useState,
} from "react";
import {
  LabelList,
  BarChart,
  Bar,
  Legend,
  Tooltip,
  YAxis,
  XAxis,
  ResponsiveContainer,
  CartesianGrid,
  ReferenceLine,
  Label,
} from 'recharts';
import { AspectRatioFill } from "react-bootstrap-icons";
import {
  baseAPI,
  dateFormatter,
  decimalFormatter,
  commaFormatter,
  options,
} from "../utils.js"
import {
  useDeviceSize
} from "../useDeviceSize.js"

const LaborMarketSnapshot = () => {
  // set up state variables that will store g-sheet data
  const [employment, setEmployment] = useState([])
  const [occupation, setOccupation] = useState([])
  const [width, height, graphHeight] = useDeviceSize()
  // state to access column names in LaborMarket_Occupation
  const [colNames, setColNames] = useState([])

  // useEffect to load component after reciving data
  useEffect(() => {
    // promise/fetch data from g-sheet pages
    Promise.all([
      fetch(baseAPI + 'LaborMarket_Employment'),
      fetch(baseAPI + 'LaborMarket_Occupation'),
    ])
     // parse json results
      .then(([resEmployment, resOccupation]) =>
        Promise.all([resEmployment.json(), resOccupation.json()])
      )
      // store parsed data in state
      .then(([dataEmployment, dataOccupation]) => {
        setEmployment(dataEmployment);
        // We're only focused on the top 30 occupations based on their 3 month averages
        // first sort the list by this average, then slice the array to extrat the top 30 records
        const topOcc = [...dataOccupation].sort((a,b) => (b["3 Month Average"] < a["3 Month Average"])).slice(0,30);
        // use topOcc to set state of Occupation
        setOccupation(topOcc);
        setColNames(Object.keys(dataOccupation[0]));
        // @ts-ignore
        console.log(employment[0].Quarter);
      })

  }, []);

  return (
    <div className="dashboard">
      <div className="subHeader">
        <AspectRatioFill size={(height*0.015)+12} color={'#288BE4'} className="subHeaderIcon" />
        <h2>Labor Market Snapshot</h2>
      </div>
      <div className="dashBody">
        <div className="row mh-20 gx-0 gy-0 graph-one-row">
          <div className="col-12 col-md-6 graph-column">
            <h6 className="chartTitle">Payroll Employment in Boston by Sector, (Quarter {
              // once data is loaded, display text. otherwise, show "loading"
              employment.length ?
              // @ts-ignore
              (employment[0].Quarter)
              : 'loading'
            }, {
              // once data is loaded, display text. otherwise, show "loading"
              employment.length ?
              // @ts-ignore
              (employment[0].Year)
              : 'loading'
            }) and Change from Four Quarters Prior</h6>

            <ResponsiveContainer width="98%" height={(graphHeight*2.5)}>
                <BarChart
                  width={500}
                  height={400}
                  data={employment}
                  layout="vertical"
                  barGap={50}
                >
                  <YAxis
                    dataKey="Sector"
                    type="category"
                    interval={0}
                    tick={{width: 500,  fontSize: 11   }}
                    width={350}
                    
                  />
                  <XAxis
                    type="number"
                    // function takes dataMin & dataMax. Uses the absolute max value to set range on either side of 0. Also rounds to the nearest thousand
                    domain={([dataMin, dataMax]) => { const absMax = Math.max(Math.ceil(Math.abs(dataMin)/1000)*1000, Math.ceil(Math.abs(dataMax)/1000)*1000); return [-absMax, absMax]; }}
                    tickFormatter={commaFormatter}
                  />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Tooltip formatter={commaFormatter} />
                  <Bar
                    // stackId="a"
                    dataKey="Change"
                    fill="rgba(224, 89, 38, .9)"
                  >
                    <LabelList dataKey="Change" position="right" fbackground="#FFFFFF"/>
                  </Bar>

                </BarChart>
            </ResponsiveContainer>
            <p className="citation">Source: Massachusetts Executive Office of Labor and Workforce Development (EOLWD)</p>
          </div>
          <div className="col-12 col-md-6 graph-column">
       
            <h6 className="chartTitle">
              Job Postings by Detailed Occupation, Average over  
              {
                // once data is loaded, display text. otherwise, show "loading"
                colNames.length ?
                // @ts-ignore
                (colNames[3])
                : 'loading'
              } to {
                // once data is loaded, display text. otherwise, show "loading"
                colNames.length ?
                // @ts-ignore
                (colNames[5])
                : 'loading'
              }
            </h6>
            <ResponsiveContainer width="98%" height={(graphHeight*2.5)}>
            <BarChart
                  width={500}
                  height={400}
                  data={occupation}
                  layout="vertical"
                  barGap={50}
                >
                  <YAxis
                    dataKey="Occupation"
                    type="category"
                    interval={0}
                    // adding width here helps make the axis labels not crush
                    tick={{width: 500,  fontSize: 11   }}
                    width={300}
                    
                  />
                  <XAxis
                    type="number"
                    // function takes dataMin & dataMax. Uses the absolute max value to set range on either side of 0. Also rounds to the nearest thousand
                    domain={[0,800]}
                    tickFormatter={commaFormatter}
                  />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Tooltip formatter={commaFormatter} />
                  <Bar
                    // stackId="a"
                    dataKey="3 Month Average"
                    fill="#091F2F"
                    // fill="#00a6b4"
                  />

                </BarChart>
            </ResponsiveContainer>
            <p className="citation">Source: Lightcast Job Postings</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LaborMarketSnapshot;