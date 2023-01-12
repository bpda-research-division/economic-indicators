import React, {useEffect, useState, useRef} from "react";
import { LineChart, Line, BarChart, Bar, Legend, Tooltip, YAxis, XAxis, ResponsiveContainer} from 'recharts';
import {format} from "date-fns";


const baseAPI = 'https://script.google.com/macros/s/AKfycbyy_JR7AM_AAnUB2DB_AnKXqsdqlIPJoBc-7CKW-S2In2_OslstV1XSz0Ex2MWobh9w/exec?path='



const LaborMarket = () => {
    const [ payroll, setPayroll ] = useState([])
    const [ postings, setPostings ] = useState([])
    const [ unemployment, setUnemployment ] = useState([])
    const [ laborforce, setLaborforce ] = useState([])

// const toDateObject = (arr) => {
//     let temp = [...arr]
//     for (const obj of arr) {
//         obj.Month = new Date(obj.Month).getTime()
//     }
// }
{/* @ts-ignore */}
const dateFormatter = date => {
    return format(new Date(date), "MMM yyyy");
};

{/* @ts-ignore */}
const decimalFormatter = (value) => {
    let num = (value *10).toFixed(1);
    let label = `${num}%`;
    return label;
};

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
{/* @ts-ignore */}
const options = { month: "long", year: "numeric"};

if (payroll.length > 1) {
    console.log('plain month', payroll[0]['Month'])
    console.log('new date', new Date(payroll[0]['Month']).getTime())
    console.log('ex epoch',payroll[0]['Epoch Miliseconds'])

}



    
    return (
        <div className="BodyDiv">
            {/* Have this fill in by State */}
            <div className="subHeader">
                <h2>Labor Market</h2>
            </div>
            <div>
           
            <div className="row mh-20">
                <div className="col-6 col-md-3 justify-content-center text-center p-4">
                    <h5>{
                    payroll.length ? 
                    // @ts-ignore
                    new Intl.DateTimeFormat("en-US", options).format((new Date(payroll[payroll.length -1]['Month'])))
                    : 'loading'
                    }
                    </h5>
                    <p className="indicatorSubtext">
                    Change in Boston Payroll Employment from {
                    payroll.length ? 
                    // @ts-ignore
                    new Intl.DateTimeFormat("en-US", options).format((new Date(payroll[0]['Month'])))
                    : 'loading'
                    }</p>
                    <h3 className="accentNumber">{
                    payroll.length ? 
                    ((payroll[payroll.length -1]['Total Nonfarm Payroll Jobs'])*100).toFixed(1) 
                    : 'loading'
                    }%</h3>
                    
                </div>
                <div className="col-6 col-md-3 justify-content-center text-center p-4">
                    <h3>{
                    postings.length ? 
                    // @ts-ignore
                    new Intl.DateTimeFormat("en-US", options).format((new Date(postings[postings.length -1]['Month'])))
                    : 'loading'
                    }
                    </h3>
                    <h3 className="accentNumber">{
                    postings.length ? 
                    ((postings[postings.length -1]['Total Nonfarm Payroll Jobs'])*100).toFixed(1) 
                    : 'loading'
                    }%</h3>
                    <p className="indicatorSubtext">Change in Boston Job Postings from {
                    postings.length ? 
                    // @ts-ignore
                    new Intl.DateTimeFormat("en-US", options).format((new Date(postings[0]['Month'])))
                    : 'loading'
                    }</p>
                </div>
                <div className="col-6 col-md-3 justify-content-center text-center p-4">
                    <h3 >{
                    unemployment.length ? 
                    // @ts-ignore
                    new Intl.DateTimeFormat("en-US", options).format((new Date(unemployment[unemployment.length -1]['Month'])))
                    : 'loading'
                    }
                    </h3>
                    <h3 className="accentNumber">{
                    unemployment.length ? 
                    ((unemployment[unemployment.length -1]['Boston Unemployment Rate'])).toFixed(1) 
                    : 'loading'
                    }%</h3>
                    <p>Change in Boston Resident Unemployment Rate from {
                    unemployment.length ? 
                    // @ts-ignore
                    new Intl.DateTimeFormat("en-US", options).format((new Date(unemployment[0]['Month'])))
                    : 'loading'
                    }</p>
                </div>
                <div className="col-6 col-md-3 justify-content-center text-center p-4">
                    <h3>{
                    laborforce.length ? 
                    // @ts-ignore
                    new Intl.DateTimeFormat("en-US", options).format((new Date(laborforce[laborforce.length -1]['Month'])))
                    : 'loading'
                    }
                    </h3>
                    <h3 className="accentNumber">{
                    laborforce.length ? 
                    ((laborforce[laborforce.length -1]['Change From Previous Year'])*100).toFixed(1) 
                    : 'loading'
                    }%</h3>
                    <p className="indicatorSubtext">Change in Boston Resident Labor Force from {
                    laborforce.length ? 
                    // @ts-ignore
                    new Intl.DateTimeFormat("en-US", options).format((new Date(laborforce[0]['Month'])))
                    : 'loading'
                    }</p>
                    </div>
            </div>
            <div className="row mh-20">
                <div className="col-12 col-md-6">
                <h6>Change in Payroll Employment in Boston from February 2020</h6>
                    <ResponsiveContainer width="90%" height={250}>
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
                                domain={['dataMin', 'dataMax']} 
                                tickFormatter={decimalFormatter}
                            />
                            <Tooltip labelFormatter={dateFormatter} formatter={decimalFormatter}/>
                            <Legend  iconType="plainline" />
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
                <div className="col-12 col-md-6">
                    <h6>Boston Resident Labor Force Unemployment Rate</h6>
                    <ResponsiveContainer width="90%" height={250}>
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
                                domain={['dataMin', 'dataMax']} 
                                tickFormatter={decimalFormatter}
                            />
                            <Tooltip labelFormatter={dateFormatter} formatter={decimalFormatter}/>
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
            <div className="row mh-20">
                <div className="col-12 col-md-6">
                    <h6>Change in Job Postings in Boston from February 2020</h6>
                    <ResponsiveContainer width="90%" height={250}>
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
                                domain={['dataMin', 'dataMax']} 
                                tickFormatter={decimalFormatter}
                            />
                            <Tooltip labelFormatter={dateFormatter} formatter={decimalFormatter}/>
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
                            <Line type="monotone" dataKey="Government" stroke="#7a3a86" dot={false}/>
                        </LineChart>
                    </ResponsiveContainer>
                </div>
                <div className="col-12 col-md-6">
                    <h6>Boston Resident Labor Force</h6>
                    <ResponsiveContainer width="90%" height={250}>
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
                            <YAxis />
                            <Tooltip labelFormatter={dateFormatter}/>
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
    );
};

export default LaborMarket;