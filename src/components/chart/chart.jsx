import React, {useState, useEffect} from 'react';
import {Line} from 'react-chartjs-2';
import styles from './chart.module.css';

export default function Charts() {
    const [currentData, setData] = useState([]);

    /*const fetchData = async () => {
        setData(await FETCHDATAHERE());
    }*/
    
    useEffect(() => {
        setInterval(() => {
            fetchData();
        }, 1000);
    }, [])

    const pieChart = (
        currentData.length
        ? (
            <Line>
            </Line>
        ) : null
    )
    };