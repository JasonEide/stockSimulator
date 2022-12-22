import axios from 'axios';
import {useState} from 'react';
let stock = `AAPL`
let url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${stock}&apikey=XLOFSB8IFD1ERBB8`
export const fetchData = async (pickedStock) => {
    if (pickedStock && pickedStock !== stock) {
        stock = pickedStock;
    }
    try {
        const {"Meta Data": {s} } = await axios.get(url);
        console.log({s});
    } catch (error) {
        console.log(error);
    }
}