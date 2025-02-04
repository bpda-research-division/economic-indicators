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
    Cell,
} from 'recharts';
import { AspectRatioFill } from "react-bootstrap-icons";
import {
    baseAPI,
    decimalFormatter,
    commaFormatter,
    CustomXAxisTick,
} from "../utils.js"
// import { Placeholder } from "react-bootstrap";
import {
    useDeviceSize
  } from "../useDeviceSize"

const RealEstateMarket = () => {
    // set up state variables that will store g-sheet data
    const [foreignBorn, setForeignBorn] = useState([])
    const [age, setAge] = useState([])
    const [education, setEducation] = useState([])
    const [raceEthnicity, setRaceEthnicity] = useState([])
    const [width, height, graphHeight] = useDeviceSize();

    // set up state variables that will store transposed data for bar charts
    const [ageBar, setAgeBar] = useState([])
    const [edBar, setEdBar] = useState([])
    const [reBar, setReBar] = useState([])

    // set up empty arrays to transpose data
    let ageArray = []
    let edArray = []
    let reArray = []

    // set up color order for last bar chart
    const barColors = [
        "#091F2F",
        "#091F2F",
        "#091F2F",
        "#091F2F",
        "#091F2F",
        "#091F2F",
        "#091F2F",
        "#FB4D42",
        "#FB4D42",
    ]



    // useEffect to load component after reciving data
    useEffect(() => {
        // promise/fetch data from g-sheet pages
        Promise.all([
            fetch(baseAPI + 'AnnualSnapshot_Population_ForeignBorn'),
            fetch(baseAPI + 'AnnualSnapshot_Population_AgeGroups'),
            fetch(baseAPI + 'AnnualSnapshot_Population_EducationalAttainmentForOver25'),
            fetch(baseAPI + 'AnnualSnapshot_Population_RaceEthnicity'),
        ])
            // parse json results
            .then(([resForeignBorn, resAge, resEducation, resRaceEthnicity]) =>
                Promise.all([resForeignBorn.json(), resAge.json(), resEducation.json(), resRaceEthnicity.json()])
            )
            // store parsed data in state
            .then(([dataForeignBorn, dataAge, dataEducation, dataRaceEthnicity]) => {
                setForeignBorn(dataForeignBorn);
                setAge(dataAge);
                setEducation(dataEducation);
                setRaceEthnicity(dataRaceEthnicity);

                // transpose the most recent age data
                let ageLatest = dataAge[dataAge.length - 1];

                for (var name in ageLatest) {
                    if (name.includes("Percent")) {
                        let newEntry = {
                            category: 'placeholder',
                            percent: 0
                        }
                        newEntry.category = name.substring(0, name.length - 11);
                        newEntry.percent = ageLatest[name];
                        ageArray.push(newEntry);
                        // console.log(ageArray);
                    }
                }

                // transpose the most recent education data
                let edLatest = dataEducation[dataEducation.length - 1];
                // console.log(edLatest);

                for (var name in edLatest) {
                    if (name.includes("Percent")) {
                        // console.log(name);
                        let newEntry = {
                            category: 'placeholder',
                            percent: 0
                        }
                        newEntry.category = name.substring(8);
                        newEntry.percent = edLatest[name];
                        edArray.push(newEntry);
                    }
                }

                // transpose the most recent race & ethnicity  data 
                let reLatest = dataRaceEthnicity[dataRaceEthnicity.length - 1];

                for (var name in reLatest) {
                    if (name.includes("Percent")) {
                        // console.log(name);
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
                // store the above transposed data in state
                setAgeBar(ageArray)
                // console.log(ageBar);

                setEdBar(edArray);
                // console.log(edBar);

                setReBar(reArray);
                // console.log(reBar);
            }
            );

    }, []);


    return (
        <div className="dashboard">
            <div className="subHeader">
                <AspectRatioFill size={(height*0.015)+12} color={'#288BE4'} className="subHeaderIcon" />
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
                                    // once data is loaded, display text. otherwise, show "loading"
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
                                }
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
                                        ((raceEthnicity[raceEthnicity.length - 1]['Percent Foreign Born']) * 100).toFixed(1)
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
                                        ((age[age.length - 1]['18-34 As Percent'] * 100).toFixed(1))
                                        : 'loading'
                                }%</h4>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row mh-20 gx-0 gy-0 graph-row">
                    <div className="col-12 col-md-6 graph-column">
                        <h6 className="chartTitle">Citywide Population</h6>
                        <ResponsiveContainer width="98%" height={graphHeight}>
                            <LineChart
                                width={500}
                                height={400}
                                data={foreignBorn}
                                stackOffset="expand"
                            >
                                <XAxis
                                    dataKey="Year"
                                    type="number"
                                    domain={['dataMin', 'dataMax']}
                                />
                                <YAxis
                                    type="number"
                                    // domain={[0, dataMax => (Math.round(dataMax / 100.0) * 100)]}
                                    tickFormatter={commaFormatter}
                                    width={80}
                                />
                                <ReferenceLine y={0} stroke="#a3a3a3" strokeWidth="2" />
                                <CartesianGrid strokeDasharray="3 3" />
                                <Tooltip formatter={commaFormatter} />
                                <Legend iconType="plainline" />
                                <Line
                                    type="monotone"
                                    dataKey="Total Population"
                                    stroke="#091F2F"
                                    dot={true}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                        <p className="citation">Source: U.S. Census Bureau, 1900 - 2010 U.S. Decennial Census; City of Boston Planning Department Research Division Estimates, 2020 - 2024.</p>
                    </div>
                    <div className="col-12 col-md-6 graph-column">
                        <h6 className="chartTitle">Age Groups</h6>
                        <ResponsiveContainer width="98%" height={graphHeight}>
                            <BarChart
                                width={500}
                                height={400}
                                data={ageBar}

                            >
                                <XAxis dataKey="category" />
                                <YAxis
                                    type="number"
                                    domain={[0, .5]}
                                    tickFormatter={decimalFormatter}
                                    tickCount={3}
                                />
                                <CartesianGrid strokeDasharray="3 3" />
                                <Tooltip formatter={decimalFormatter} />
                                <Bar
                                    dataKey="percent"
                                    fill="#FB4D42"
                                />

                            </BarChart>
                        </ResponsiveContainer>
                        <p className="citation">Source: City of Boston Planning Department Research Division Estimates, 2024.</p>
                    </div>
                </div>
                <div className="row mh-20 gx-0 gy-0 graph-row">
                    <div className="col-12 col-md-6 graph-column">
                        <h6 className="chartTitle">Educational Attainment for Population over 25</h6>
                        <ResponsiveContainer width="98%" height={graphHeight}>
                            <BarChart
                                width={500}
                                height={400}
                                data={edBar}
                            >
                                <XAxis
                                    dataKey="category"
                                    interval={0}
                                    tick={<CustomXAxisTick />}
                                    height={90}
                                />
                                <YAxis
                                    type="number"
                                    domain={[0, .3]}
                                    tickFormatter={decimalFormatter}
                                    tickCount={3}
                                />
                                <CartesianGrid strokeDasharray="3 3" />
                                <Tooltip formatter={decimalFormatter} />
                                <Bar
                                    dataKey="percent"
                                    fill="#FB4D42"
                                />

                            </BarChart>
                        </ResponsiveContainer>
                        <p className="citation">Source: City of Boston Planning Department Research Division Estimates, 2024.</p>

                    </div>
                    <div className="col-12 col-md-6 graph-column">
                        <h6 className="chartTitle">Race, Ethnicity, and Nativity</h6>
                        <ResponsiveContainer width="98%" height={graphHeight}>
                            <BarChart
                                width={500}
                                height={400}
                                data={reBar}
                            >
                                <XAxis
                                    dataKey="category"
                                    interval={0}
                                    tick={<CustomXAxisTick />}
                                    height={90}
                                />
                                <YAxis
                                    type="number"
                                    domain={[0, .8]}
                                    tickFormatter={decimalFormatter}
                                />
                                <CartesianGrid strokeDasharray="3 3" />
                                <Tooltip formatter={decimalFormatter} />
                                <Bar
                                    dataKey="percent"
                                    fill="#091F2F"
                                >
                                    {barColors.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={barColors[index % 20]} />
                                    ))}
                                </Bar>

                            </BarChart>
                        </ResponsiveContainer>
                        <p className="citation">*Note: Excludes those identifying as Hispanic or Latino. </p>
                        <p className="citation">Source: City of Boston Planning Department Research Division Estimates, 2024.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RealEstateMarket;