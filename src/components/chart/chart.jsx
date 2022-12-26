import React, {useState, useEffect} from 'react';
import {Line} from 'react-chartjs-2';
import {Chart as ChartJS, registerables} from 'chart.js';
import styles from './chart.module.css';
import { fetchData } from '../../api';
ChartJS.register(...registerables);

export default function Charts({data}) {
    const currentData = data;
    let dates = [];
    let open = [];
    let high = [];
    let low = [];
    for (let i in currentData[1]) {
        const date = i.split('-');
        dates.push(date[1] + '-' + date[2])
        open.push(currentData[1][i]["1. open"])
        high.push(currentData[1][i]["2. high"])
        low.push(currentData[1][i]["3. low"])
    }
    dates = dates.reverse();
    open = open.reverse();

    const lineChart = (
        currentData.length
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
    return (
        <div className={styles.container}>
            {lineChart}
        </div>
      )
    };