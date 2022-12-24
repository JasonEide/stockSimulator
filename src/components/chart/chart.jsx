import React, {useState, useEffect} from 'react';
import {Line} from 'react-chartjs-2';
import {Chart as ChartJS, registerables} from 'chart.js';
import styles from './chart.module.css';
import { fetchData } from '../../api';
import { red } from '@material-ui/core/colors';
ChartJS.register(...registerables);

export default function Charts({stock}) {
    const [currentData, setData] = useState([{},{}]);
    useEffect(() => {
        const fetchAPI = async () => {
            setData(await fetchData(stock));
        }
        fetchAPI();
    }, []);
    console.log(currentData);
    let dates = [];
    let open = [];
    let high = [];
    let low = [];
    for (let i in currentData[1]) {
        dates.push(i);
        open.push(currentData[1][i]["1. open"])
        high.push(currentData[1][i]["2. high"])
        low.push(currentData[1][i]["3. low"])
    }
    dates = dates.reverse();
    open = open.reverse();
    high = high.reverse();
    low = low.reverse();
    const lineChart = (
        currentData.length
        ? (
            <Line
                data={{
                    labels: dates,
                    datasets: [
                    {
                        data: open, 
                        label: "open", 
                        borderColor: "#3333ff", 
                        borderWidth: 3,
                        fill: true,
                        fillColor: "3333ff"
                    },  
                    { 
                        data: high, 
                        label: "high", 
                        borderColor: "#ff0000",
                        borderWidth: 3,
                        fill: true
                    },
                    {
                        data: low, 
                        label: "low", 
                        borderColor: "#00ff00",
                        borderWidth: 3,
                        fill: true
                    }
                ]
                }}
                options={{
                    scales: {
                        y: {
                            grid: {
                                display: false
                            }
                        },
                        x: {
                            grid: {
                                display: false
                            }
                        }
                    },
                    elements: {
                        point: {
                            radius: 0
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