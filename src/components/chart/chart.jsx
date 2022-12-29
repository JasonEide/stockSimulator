import React, {useState, useRef} from 'react';
import {Line} from 'react-chartjs-2';
import {Chart as ChartJS, registerables} from 'chart.js';
import styles from './chart.module.css';
import { Button } from '@material-ui/core';
ChartJS.register(...registerables);

export default function Charts({data}) {
    const [dateOption, setDateOption] = useState("fourMonth")
    const ratioMonth = {"week": 7, "oneMonth": 30, "twoMonth": 60, "threeMonth": 90, "fourMonth": 120}
    const currentData = data[1];
    let modifiedData = [];
    for (let i in currentData) {
        modifiedData.push([i ,currentData[i]]);  
    } 
    let dates = [];
    let open = [];
    let count = 0
    for (let i in modifiedData) {
        const date = modifiedData[i][0].split('-');
        dates.push(date[1] + '-' + date[2])
        open.push(modifiedData[i][1]["1. open"])
        if (count > ratioMonth[dateOption]) {
            break;
        }
        if ((new Date(date)).getDay() === 5) {
            count += 3;
        } else {
            count++;
        }
    }

    dates = dates.reverse();
    open = open.reverse();

    const lineChart = (
        data.length
        ? (
            <Line
                data={{
                    labels: dates,
                    datasets: [
                    {
                        data: open,  
                        borderColor: "#3333ff",
                        backgroundColor: "rgba(51, 51, 255, 0.2)",
                        borderWidth: 3,
                        fill: true,
                    }
                ]
                }}
                options={{
                    scales: {
                        y: {
                            grid: {
                                display: false,
                                drawBorder: false
                            },
                            ticks: {
                                display: false
                            }
                        },
                        x: {
                            grid: {
                                display: false,
                                drawBorder: false
                            },
                            ticks: {
                                display: false
                            }
                        }
                    },
                    elements: {
                        point: {
                            radius: 0
                        }
                    },
                    plugins: {
                        legend: {
                            display: false
                        }
                    }
                }}
            />
        ) : null
    )
    const weekState = useRef();
    const oneMonthState = useRef();
    const twoMonthState = useRef();
    const threeMonthState = useRef();
    const fourMonthState = useRef();
    return (
        <>
            <div className={styles.buttonContainer}>
                <Button ref={weekState} 
                    id="week" 
                    variant={(dateOption === "week") ? "contained" : "outlined"}
                    style={{
                        backgroundColor: (dateOption === "week")? "rgba(51, 51, 255, 0.2)" : "white"
                    }}
                    className={styles.chartButton} 
                    onClick={() => setDateOption(weekState.current.id)}
                >
                    1W
                </Button>
                <Button 
                    ref={oneMonthState} 
                    id="oneMonth" 
                    variant={(dateOption === "oneMonth") ? "contained" : "outlined"}
                    style={{
                        backgroundColor: (dateOption === "oneMonth")? "rgba(51, 51, 255, 0.2)" : "white"
                    }}
                    className={styles.chartButton} 
                    onClick={() => setDateOption(oneMonthState.current.id)}
                >
                    1M
                </Button>
                <Button 
                    ref={twoMonthState} 
                    id="twoMonth" 
                    variant={(dateOption === "twoMonth") ? "contained" : "outlined"}
                    style={{
                        backgroundColor: (dateOption === "twoMonth")? "rgba(51, 51, 255, 0.2)" : "white"
                    }}
                    className={styles.chartButton} 
                    onClick={() => setDateOption(twoMonthState.current.id)}
                >
                    2M
                </Button>
                <Button 
                    ref={threeMonthState} 
                    id="threeMonth" 
                    variant={(dateOption === "threeMonth") ? "contained" : "outlined"}
                    style={{
                        backgroundColor: (dateOption === "threeMonth")? "rgba(51, 51, 255, 0.2)" : "white"
                    }}
                    className={styles.chartButton} 
                    onClick={() => setDateOption(threeMonthState.current.id)}
                >
                    3M
                </Button>
                <Button 
                    ref={fourMonthState} 
                    id="fourMonth" 
                    variant={(dateOption === "fourMonth") ? "contained" : "outlined"} 
                    style={{
                        backgroundColor: (dateOption === "fourMonth")? "rgba(51, 51, 255, 0.2)" : "white"
                    }}
                    className={styles.chartButton} 
                    onClick={() => setDateOption(fourMonthState.current.id)}
                >
                    4M
                </Button>
            </div>
            <div className={styles.container}>
            {lineChart}
            </div>
        </>

      )
    };