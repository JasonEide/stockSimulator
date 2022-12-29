import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import {curr_user, is_logged} from "../userForm/userFormLogin";
import styles from './pieChart.module.css';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function PieChart() {
    const qt = []
    const stocks = []
    if (curr_user !== undefined) {
        if(is_logged){
            for(let i = 0; i < curr_user.holdings.length; i++){
                qt.push(curr_user.holdings[i]['Amount'])
                stocks.push(curr_user.holdings[i]['StockTIKR'])
            }
        }
    }
    const pieChart = (
        curr_user !== undefined
        ? (
        <Pie
            data={{
                labels: stocks,
                datasets: [
                    {
                        data: qt,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.5)',
                            'rgba(54, 162, 235, 0.5)',
                            'rgba(255, 206, 86, 0.5)',
                            'rgba(75, 192, 192, 0.5)',
                            'rgba(153, 102, 255, 0.5)',
                            'rgba(255, 159, 64, 0.5)',
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)',
                        ],
                        borderWidth: 1,
                    }
                ]
            }}
        /> 
        ) : null
    );
    return (
        <React.Fragment>
            <div className={styles.chart}>
                {pieChart}
            </div>
        </React.Fragment>
    );
}
