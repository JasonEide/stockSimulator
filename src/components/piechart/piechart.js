import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import {curr_user, is_logged} from "../userForm/userFormLogin";

ChartJS.register(ArcElement, Tooltip, Legend);

export function Piechart() {
    const qt = []
    const stocks = []
    if(is_logged){
        for(let i =0; i< curr_user.holdings.length; i++){
            qt.push(curr_user.holdings[i]['Amount'])
        }
        for(let i =0; i< curr_user.holdings.length; i++){
            stocks.push(curr_user.holdings[i]['StockTIKR'])
        }
    }
    const data = {
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

    }
    return (
        <React.Fragment>
            <div style={
                {padding: '20px',
                    width: '30%',
                margin: '80px 700px'}
            }>
                <Pie
                    data={data}
                ></Pie>
            </div>
        </React.Fragment>

    );
}
