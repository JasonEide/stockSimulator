import axios from 'axios';
import {useState} from 'react';
let stock = `AAPL`
let url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${stock}&apikey=XLOFSB8IFD1ERBB8`
export const fetchData = async (pickedStock) => {
    if (pickedStock && pickedStock !== stock) {
        stock = pickedStock;
    }
    try {
        const {data: {"Meta Data": info}} = await axios.get(url);
        console.log(info.log);
    } catch (error) {
        console.log(error);
    }
}