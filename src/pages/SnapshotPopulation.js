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
import { AspectRatioFill } from "react-bootstrap-icons";
import {
    baseAPI,
    graphHeight,
    dateFormatter,
    decimalFormatter,
    dollarFormatter,
    commaFormatter,
    options,
    ordinal,
    quarterlyFormatter,
} from "../utils.js"
import { Placeholder } from "react-bootstrap";

const RealEstateMarket = () => {
    const [foreignBorn, setForeignBorn] = useState([])
    const [age, setAge] = useState([])
    const [education, setEducation] = useState([])
    const [raceEthnicity, setRaceEthnicity] = useState([])

    const [ageBar, setAgeBar] = useState([])
    const [edBar, setEdBar] = useState([])
    const [reBar, setReBar] = useState([])

    let ageArray = []
    let edArray = []
    let reArray = []
            

    useEffect(() => {
        Promise.all([
        fetch(baseAPI + 'AnnualSnapshot_Population_ForeignBorn'),
        fetch(baseAPI + 'AnnualSnapshot_Population_AgeGroups'),
        fetch(baseAPI + 'AnnualSnapshot_Population_EducationalAttainmentForOver25'),
        fetch(baseAPI + 'AnnualSnapshot_Population_RaceEthnicity'),
        ])
        .then(([resForeignBorn, resAge, resEducation, resRaceEthnicity]) =>
            Promise.all([resForeignBorn.json(), resAge.json(), resEducation.json(), resRaceEthnicity.json()])
        )
        .then(([dataForeignBorn, dataAge, dataEducation, dataRaceEthnicity]) => {
            setForeignBorn(dataForeignBorn);
            setAge(dataAge);
            setEducation(dataEducation);
            setRaceEthnicity(dataRaceEthnicity);
        }).then(() => {
            let ageLatest = age[age.length - 1];
            
            for (var name in ageLatest) {
                if (name.includes("Percent")) {
                    let newEntry = {
                        category: 'placeholder',
                        percent: 0
                    }
                    newEntry.category = name.substring(0, name.length - 11);
                    newEntry.percent = ageLatest[name];
                    ageArray.push(newEntry);
                    console.log(ageArray);
                }
            }
            
            let edLatest = education[education.length - 1];
            console.log(edLatest);
            
            for (var name in edLatest) {
                if (name.includes("Percent")) {
                    console.log(name);
                    let newEntry = {
                        category: 'placeholder',
                        percent: 0
                    }
                    newEntry.category = name.substring(8);
                    newEntry.percent = edLatest[name];
                    edArray.push(newEntry);
                }
            }

            let reLatest = raceEthnicity[raceEthnicity.length - 1];
            console.log(reLatest);
            
            for (var name in reLatest) {
                if (name.includes("Percent")) {
                    console.log(name);
                    let newEntry = {
                        category: 'placeholder',
                        percent: 0
                    }
                    newEntry.category = name.substring(8);
                    newEntry.percent = reLatest[name];
                    reArray.push(newEntry);
                }
            }
            

            
        }).then(() => {
            setAgeBar(ageArray)
            console.log(ageBar);

            setEdBar(edArray);
            console.log(edBar);

            setReBar(reArray);
            console.log(reBar);
        }
        );

    }, []);


    return (
        <div>
            <div className="subHeader">
                <AspectRatioFill size={24} color={'#94D5DB'} className="subHeaderIcon" />
                <h2>Annual Snapshot: Population</h2>
            </div>
            <div className="dashBody">
                <div className="row mh-20 g-6 indicator-row">
                    <div className="col-md justify-content-center text-center">
                        <div className="indicatorContainer">
                            <h4 className="indicatorSubtext">
                                City of Boston <span className="accentSubText">Total Population</span>
                            </h4>
                            <div className="d-flex flex-row justify-content-around">
                                <h4 className="date">{
                                    foreignBorn.length ?
                                        // @ts-ignore
                                        foreignBorn[foreignBorn.length - 1]['Year']
                                        : 'loading'
                                }
                                </h4>
                                <h4 className="accentNumber">{
                                    foreignBorn.length ?
                                    ((foreignBorn[foreignBorn.length - 1]['Total Population']).toLocaleString("en-US"))
                                        : 'loading'
                                }%
                                </h4>
                            </div>
                        </div>
                    </div>
                    <div className="col-md justify-content-center text-center">
                        <div className="indicatorContainer">
                            <h4 className="indicatorSubtext">Percent of <span className="accentSubText">Boston Residents over 25</span> with a <span className="accentSubText">Bachelors Degree or Higher</span></h4>
                            <div className="d-flex flex-row justify-content-around">
                                <h4 className="date">{
                                    education.length ?
                                        // @ts-ignore
                                        education[education.length - 1]['Year']
                                        : 'loading'
                                }
                                </h4>
                                <h4 className="accentNumber">{
                                    education.length ?
                                        ((education[education.length - 1]["Percent Bachelor's Degree"] + education[education.length - 1]['Percent Graduate or Professional Degree']) * 100).toFixed(1)
                                        
                                        : 'loading'
                                }%</h4>
                            </div>
                        </div>
                    </div>
                    <div className="col-md justify-content-center text-center">
                        <div className="indicatorContainer">
                            <h4 className="indicatorSubtext">Percentage of <span className="accentSubText">Foreign Born</span></h4>
                            <div className="d-flex flex-row justify-content-around">
                                <h4 className="date">{
                                    raceEthnicity.length ?
                                        // @ts-ignore
                                        raceEthnicity[raceEthnicity.length - 1]['Year']
                                        : 'loading'
                                }
                                </h4>
                                <h4 className="accentNumber">{
                                    raceEthnicity.length ?
                                        ((raceEthnicity[raceEthnicity.length - 1]['Percent Foreign-Born'])).toFixed(1)
                                        : 'loading'
                                }%</h4>
                            </div>
                        </div>
                    </div>
                    <div className="col-md justify-content-center text-center">
                        <div className="indicatorContainer">
                            <h4 className="indicatorSubtext">Percent of Boston Residents aged <span className="accentSubText">18-34</span></h4>
                            <div className="d-flex flex-row justify-content-around">
                                <h4>{
                                    age.length ?
                                        // @ts-ignore
                                        (age[age.length - 1]['Year'])
                                        : 'loading'
                                }
                                </h4>
                                <h4 className="accentNumber">{
                                    age.length ?
                                        ((age[age.length - 1]['18-34 As Percent']).toFixed(1))
                                        : 'loading'
                                }%</h4>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row mh-20 gx-5 gy-5 graph-row">
                    <div className="col-12 col-md-6">
                        <h6 className="chartTitle">Citywide Population</h6>
                        <ResponsiveContainer width="90%" height={graphHeight}>
                            <LineChart
                                width={500}
                                height={400}
                                data={foreignBorn}
                                stackOffset="expand"
                            >
                                <XAxis
                                    dataKey="Year"
                                    // scale="time"
                                    type="number"
                                    domain={['dataMin', 'dataMax']}
                                    // tickFormatter={dateFormatter}
                                />
                                <YAxis
                                    type="number"
                                    domain={[-0.5, .1]}
                                    // ticksCount={5}
                                    // interval={0}
                                    tickFormatter={commaFormatter}
                                />
                                <ReferenceLine y={0} stroke="#a3a3a3" strokeWidth="2" />
                                <CartesianGrid strokeDasharray="3 3" />
                                <Tooltip  formatter={commaFormatter} />
                                <Legend iconType="plainline" />
                                <Line
                                    type="monotone"
                                    dataKey="Total Population"
                                    stroke="#003c50"
                                    dot={false}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                        <p className="citation">Source: U.S. Census Bureau, 2021 American Community Survey 1-Year Estimates</p>
                    </div>
                    <div className="col-12 col-md-6">
                        <h6 className="chartTitle">Age Groups</h6>
                        <ResponsiveContainer width="90%" height={graphHeight}>
                            <BarChart
                                width={500}
                                height={400}
                                data={ageBar}
                            >
                                <XAxis
                                    dataKey="category"
                                    // scale="time"
                                    // type="number"
                                    // domain={['dataMin', 'dataMax']}
                                    // tickFormatter={dateFormatter}
                                />
                                <YAxis
                                    type="number"
                                    domain={[0, .2]}
                                    tickFormatter={decimalFormatter}
                                />
                                <CartesianGrid strokeDasharray="3 3" />
                                <Tooltip />
                                <Legend iconType="plainline" />
                                <Bar
                                    dataKey="percent"
                                    fill="#003c50"
                                />
                                
                            </BarChart>
                        </ResponsiveContainer>
                        <p className="citation">Source: U.S. Census Bureau, 2021 American Community Survey 1-Year Estimates</p>
                    </div>
                </div>
                <div className="row mh-20 gx-5 gy-5">
                    <div className="col-12 col-md-6">
                        <h6 className="chartTitle">Educational Attainment for Population over 25</h6>
                        <ResponsiveContainer width="90%" height={graphHeight}>
                            <BarChart
                                width={500}
                                height={400}
                                data={edBar}
                            >
                                <XAxis
                                    dataKey="category"
                                    // scale="time"
                                    // type="number"
                                    // domain={['dataMin', 'dataMax']}
                                    // tickFormatter={dateFormatter}
                                />
                                <YAxis
                                    type="number"
                                    // domain={[0, .2]}
                                    tickFormatter={decimalFormatter}
                                />
                                <CartesianGrid strokeDasharray="3 3" />
                                <Tooltip  />
                                <Legend iconType="plainline" />
                                <Bar
                                    dataKey="percent"
                                    fill="#003c50"
                                />
                                
                            </BarChart>
                        </ResponsiveContainer>
                        <p className="citation">Source: U.S. Census Bureau, 2021 American Community Survey 1-Year Estimates</p>

                    </div>
                    <div className="col-12 col-md-6">
                        <h6 className="chartTitle">Race, Ethincity, and Nativity</h6>
                        <ResponsiveContainer width="90%" height={graphHeight}>
                        <BarChart
                                width={500}
                                height={400}
                                data={reBar}
                            >
                                <XAxis
                                    dataKey="category"
                                    // scale="time"
                                    // type="number"
                                    // domain={['dataMin', 'dataMax']}
                                    // tickFormatter={dateFormatter}
                                />
                                <YAxis
                                    type="number"
                                    domain={[0, .2]}
                                    tickFormatter={decimalFormatter}
                                />
                                <CartesianGrid strokeDasharray="3 3" />
                                <Tooltip />
                                <Legend iconType="plainline" />
                                <Bar
                                    dataKey="percent"
                                    fill="#003c50"
                                />
                            
                            </BarChart>
                        </ResponsiveContainer>
                        <p className="citation">Source: U.S. Census Bureau, 2021 American Community Survey 1-Year Estimates</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RealEstateMarket;