import axios from 'axios';

let stock = `AAPL`;
let url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${stock}&apikey=TGZERLSVGJNZFCCA`;
const infoArray = ["1. Information", "2. Symbol", "3. Last Refreshed", "4. Output Size", "5. Time Zone"];
const stockArray = ["1. open", "2. high", "3. low", "4. close", "5. adjusted close", "6. volume", "7. dividend amount", "8. split coefficient"];
export const fetchData = async (pickedStock) => {
    if (pickedStock) {
        stock = pickedStock;
        url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${stock}&apikey=TGZERLSVGJNZFCCA`;
    }
    try {
        const {data: {"Meta Data": info, "Time Series (Daily)": updatedData}} = await axios.get(url);
        const modifiedData = updatedData[(info[infoArray[2]]).split(" ")[0]];
        const chosenStockInfo = {
            symbol: info[infoArray[1]],
            last_update: info[infoArray[2]],
            timezone: info[infoArray[4]]
        }
        const chosenStockData = {
            open: modifiedData[stockArray[0]], 
            high: modifiedData[stockArray[1]], 
            low: modifiedData[stockArray[2]], 
            close: modifiedData[stockArray[3]],
            adjusted_close: modifiedData[stockArray[4]],
            volume: modifiedData[stockArray[5]],
            dividend_amount: modifiedData[stockArray[6]],
            split_coefficient: modifiedData[stockArray[7]]
        }
        /*console.log([{data: chosenStockInfo, stockData: chosenStockData}, updatedData]);*/
        return [{data: chosenStockInfo, stockData: chosenStockData}, updatedData]
        
    } catch (error) {
        console.log("API reached maximum calls");
    }
}