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
import { GeoAltFill } from "react-bootstrap-icons";
import { 
  baseAPI,
  graphHeight,
  dateFormatter,
  decimalFormatter,
  options,
} from "../utils.js"


const BackBay = () => {
  const [payroll, setPayroll] = useState([])
  const [postings, setPostings] = useState([])
  const [unemployment, setUnemployment] = useState([])
  const [laborforce, setLaborforce] = useState([])


  useEffect(() => {
    Promise.all([
      fetch(baseAPI + 'LaborMarket_PayrollEst'),
      fetch(baseAPI + 'LaborMarket_JobPostings'),
      fetch(baseAPI + 'LaborMarket_UnemploymentRate'),
      fetch(baseAPI + 'LaborMarket_ResLaborForce'),
    ])
      .then(([resPayroll, resPostings, resUnemployment, resLaborforce]) =>
        Promise.all([resPayroll.json(), resPostings.json(), resUnemployment.json(), resLaborforce.json()])
      )
      .then(([dataPayroll, dataPostings, dataUnemployment, dataLaborforce]) => {
        setPayroll(dataPayroll);
        setPostings(dataPostings);
        setUnemployment(dataUnemployment);
        setLaborforce(dataLaborforce);
      })

  }, []);

  return (
    <div>
      <div className="subHeader">
        <GeoAltFill size={24} color={'#94D5DB'} />
        <h2>Back Bay</h2>
      </div>
      <div className="dashBody">
        <div className="row mh-20 g-3">
          <div className="col-md justify-content-center text-center">
            <div className="indicatorContainer">
              <h4 className="indicatorSubtext">
                  Change in Boston <span className="accentSubText">Payroll Employment</span> from {
                    payroll.length ?
                      // @ts-ignore
                      new Intl.DateTimeFormat("en-US", options).format((new Date(payroll[0]['Month'])))
                      : 'loading'
                }
              </h4>
              <div className="d-flex flex-row justify-content-around">
                <h4 className="date">{
                  payroll.length ?
                    // @ts-ignore
                    new Intl.DateTimeFormat("en-US", options).format((new Date(payroll[payroll.length - 1]['Month'])))
                    : 'loading'
                }
                </h4>
                <h4 className="accentNumber">{
                  payroll.length ?
                  new Intl.NumberFormat("en-US", {signDisplay: "exceptZero"}).format(((payroll[payroll.length - 1]['Total Nonfarm Payroll Jobs']) * 100).toFixed(1))
                    : 'loading'
                }%</h4>
              </div>
            </div>
          </div>
          <div className="col-md justify-content-center text-center">
            <div className="indicatorContainer">
              <h4 className="indicatorSubtext">Change in Boston <span className="accentSubText">Job Postings</span> from {
                postings.length ?
                  // @ts-ignoreang 
                  new Intl.DateTimeFormat("en-US", options).format((new Date(postings[0]['Month'])))
                  : 'loading'
              }</h4>
              <div className="d-flex flex-row justify-content-around">
              <h4 className="date">{
                postings.length ?
                  // @ts-ignore
                  new Intl.DateTimeFormat("en-US", options).format((new Date(postings[postings.length - 1]['Month'])))
                  : 'loading'
                }
                </h4>
                <h4 className="accentNumber">{
                  postings.length ?
                    ((postings[postings.length - 1]['Total Nonfarm Payroll Jobs']) * 100).toFixed(1)
                    : 'loading'
                }%</h4>
              </div>
            </div> 
          </div>
          <div className="col-md justify-content-center text-center">
            <div className="indicatorContainer">
              <h4 className="indicatorSubtext">Change in Boston <span className="accentSubText">Resident Unemployment</span> Rate from {
                unemployment.length ?
                  // @ts-ignore
                  new Intl.DateTimeFormat("en-US", options).format((new Date(unemployment[0]['Month'])))
                  : 'loading'
              }</h4>
              <div className="d-flex flex-row justify-content-around">
                <h4 className="date">{
                  unemployment.length ?
                    // @ts-ignore
                    new Intl.DateTimeFormat("en-US", options).format((new Date(unemployment[unemployment.length - 1]['Month'])))
                    : 'loading'
                }
                </h4>
                <h4 className="accentNumber">{
                  unemployment.length ?
                    ((unemployment[unemployment.length - 1]['Boston Unemployment Rate'])).toFixed(1)
                    : 'loading'
                }%</h4>
              </div>
            </div>
          </div>
          <div className="col-md justify-content-center text-center">
            <div className="indicatorContainer">
              <h4 className="indicatorSubtext">Change in Boston <span className="accentSubText">Resident Labor Force</span> from {
                laborforce.length ?
                  // @ts-ignore
                  new Intl.DateTimeFormat("en-US", options).format((new Date(laborforce[0]['Month'])))
                  : 'loading'
              }</h4>
              <div className="d-flex flex-row justify-content-around">
                <h4>{
                    laborforce.length ?
                      // @ts-ignore
                      new Intl.DateTimeFormat("en-US", options).format((new Date(laborforce[laborforce.length - 1]['Month'])))
                      : 'loading'
                  }
                </h4>
                <h4 className="accentNumber">{
                  laborforce.length ?
                    ((laborforce[laborforce.length - 1]['Change From Previous Year']) * 100).toFixed(1)
                    : 'loading'
                }%</h4>
              </div>
            </div>
          </div>
          <div className="col-md justify-content-center text-center">
            <div className="indicatorContainer">
              <h4 className="indicatorSubtext">Change in Boston <span className="accentSubText">Resident Labor Force</span> from {
                laborforce.length ?
                  // @ts-ignore
                  new Intl.DateTimeFormat("en-US", options).format((new Date(laborforce[0]['Month'])))
                  : 'loading'
              }</h4>
              <div className="d-flex flex-row justify-content-around">
                <h4>{
                    laborforce.length ?
                      // @ts-ignore
                      new Intl.DateTimeFormat("en-US", options).format((new Date(laborforce[laborforce.length - 1]['Month'])))
                      : 'loading'
                  }
                </h4>
                <h4 className="accentNumber">{
                  laborforce.length ?
                    ((laborforce[laborforce.length - 1]['Change From Previous Year']) * 100).toFixed(1)
                    : 'loading'
                }%</h4>
              </div>
            </div>
          </div>
          <div className="col-md justify-content-center text-center">
            <div className="indicatorContainer">
              <h4 className="indicatorSubtext">Change in Boston <span className="accentSubText">Resident Labor Force</span> from {
                laborforce.length ?
                  // @ts-ignore
                  new Intl.DateTimeFormat("en-US", options).format((new Date(laborforce[0]['Month'])))
                  : 'loading'
              }</h4>
              <div className="d-flex flex-row justify-content-around">
                <h4>{
                    laborforce.length ?
                      // @ts-ignore
                      new Intl.DateTimeFormat("en-US", options).format((new Date(laborforce[laborforce.length - 1]['Month'])))
                      : 'loading'
                  }
                </h4>
                <h4 className="accentNumber">{
                  laborforce.length ?
                    ((laborforce[laborforce.length - 1]['Change From Previous Year']) * 100).toFixed(1)
                    : 'loading'
                }%</h4>
              </div>
            </div>
          </div>
        </div>
        <div className="row mh-20 gx-5 gy-5">
          <div className="col-md justify-content-center text-center">
            <div className="chartContainer">
              <h6 className="chartTitle">Change in Payroll Employment in Boston from February 2020</h6>
              <ResponsiveContainer width="90%" height={graphHeight}>
                <LineChart
                  width={500}
                  height={400}
                  data={payroll}
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
                    dataKey="Total Nonfarm Payroll Jobs"
                    stroke="#003c50"
                    dot={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="Production Construction Logistics"
                    stroke="#00a6b4"
                    dot={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="Professional and Financial Services"
                    stroke="#e05926"
                    dot={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="Healthcare and Education"
                    stroke="#a6c838"
                    dot={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="In Person and Support Services"
                    stroke="#ce1b46"
                    dot={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="Government"
                    stroke="#7a3a86"
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="col-12 col-md-4">
            <div className="chartContainer">
              <h6 className="chartTitle">Boston Resident Labor Force Unemployment Rate</h6>
              <ResponsiveContainer width="90%" height={graphHeight}>
                <LineChart
                  width={500}
                  height={400}
                  data={unemployment}
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
                    domain={[0, .2]}
                    tickFormatter={decimalFormatter}
                  />
                  
                  <CartesianGrid strokeDasharray="3 3" />
                  <Tooltip labelFormatter={dateFormatter} formatter={decimalFormatter} />
                  <Legend iconType="plainline" />
                  <Line
                    type="monotone"
                    dataKey="Boston Unemployment Rate"
                    stroke="#003c50"
                    dot={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="Massachusetts Unemployment Rate"
                    stroke="#00a6b4"
                    dot={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="US Unemployment Rate"
                    stroke="#e05926"
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="col-12 col-md-4">
            <div className="chartContainer">
              <h6 className="chartTitle">Boston Resident Labor Force Unemployment Rate</h6>
              <ResponsiveContainer width="90%" height={graphHeight}>
                <LineChart
                  width={500}
                  height={400}
                  data={unemployment}
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
                    domain={[0, .2]}
                    tickFormatter={decimalFormatter}
                  />
                  
                  <CartesianGrid strokeDasharray="3 3" />
                  <Tooltip labelFormatter={dateFormatter} formatter={decimalFormatter} />
                  <Legend iconType="plainline" />
                  <Line
                    type="monotone"
                    dataKey="Boston Unemployment Rate"
                    stroke="#003c50"
                    dot={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="Massachusetts Unemployment Rate"
                    stroke="#00a6b4"
                    dot={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="US Unemployment Rate"
                    stroke="#e05926"
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        <div className="row mh-20 gx-5 gy-5">
          <div className="col-12 col-md-4">
            <div className="chartContainer">
              <h6 className="chartTitle">Change in Job Postings in Boston from February 2020</h6>
              <ResponsiveContainer width="90%" height={graphHeight}>
                <LineChart
                  width={500}
                  height={400}
                  data={postings}
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
                    domain={[-.65, 0.5]}
                    tickFormatter={decimalFormatter}
                  />
                  <ReferenceLine y={0} stroke="#a3a3a3" strokeWidth="2"/>
                  <CartesianGrid strokeDasharray="3 3" />
                  <Tooltip labelFormatter={dateFormatter} formatter={decimalFormatter} />
                  <Legend iconType="plainline" />
                  <Line
                    type="monotone"
                    dataKey="Total Nonfarm Payroll Jobs"
                    stroke="#003c50"
                    dot={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="Production Construction Logistics"
                    stroke="#00a6b4"
                    dot={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="Professional and Financial Services"
                    stroke="#e05926"
                    dot={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="Healthcare and Education"
                    stroke="#a6c838"
                    dot={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="In Person and Support Services"
                    stroke="#ce1b46"
                    dot={false}
                  />
                  <Line type="monotone" dataKey="Government" stroke="#7a3a86" dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="col-12 col-md-4">
            <div className="chartContainer">
              <h6 className="chartTitle">Boston Resident Labor Force</h6>
              <ResponsiveContainer width="90%" height={graphHeight}>
                <BarChart
                  width={500}
                  height={400}
                  data={laborforce}
                  margin={{
                    top: 20,
                    right: 50,
                    left: 50,
                    bottom: 5,
                  }}
                >
                  <XAxis
                    dataKey="Epoch Miliseconds"
                    scale="time"
                    type="number"
                    domain={['dataMin', 'dataMax']}
                    tickFormatter={dateFormatter}
                    padding={{ left: 15, right: 15 }}
                  />
                  <YAxis tickFormatter={(value) => new Intl.NumberFormat('en').format(value)}/>
                  <CartesianGrid strokeDasharray="3 3" />
                  <Tooltip labelFormatter={dateFormatter} />
                  <Legend iconType="plainline" />
                  <Bar
                    stackId="a"
                    dataKey="Boston Resident Employment"
                    fill="#003c50"
                  />
                  <Bar
                    stackId="a"
                    dataKey="Boston Resident Unemployment"
                    fill="#e05926"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="col-12 col-md-4">
            <div className="chartContainer">
              <h6 className="chartTitle">Boston Resident Labor Force</h6>
              <ResponsiveContainer width="90%" height={graphHeight}>
                <BarChart
                  width={500}
                  height={400}
                  data={laborforce}
                  margin={{
                    top: 20,
                    right: 50,
                    left: 50,
                    bottom: 5,
                  }}
                >
                  <XAxis
                    dataKey="Epoch Miliseconds"
                    scale="time"
                    type="number"
                    domain={['dataMin', 'dataMax']}
                    tickFormatter={dateFormatter}
                    padding={{ left: 15, right: 15 }}
                  />
                  <YAxis tickFormatter={(value) => new Intl.NumberFormat('en').format(value)}/>
                  <CartesianGrid strokeDasharray="3 3" />
                  <Tooltip labelFormatter={dateFormatter} />
                  <Legend iconType="plainline" />
                  <Bar
                    stackId="a"
                    dataKey="Boston Resident Employment"
                    fill="#003c50"
                  />
                  <Bar
                    stackId="a"
                    dataKey="Boston Resident Unemployment"
                    fill="#e05926"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BackBay;