import React, {useState} from 'react';
import {TextField, Button, Typography} from '@material-ui/core';
import styles from './stockInput.module.css';
import {curr_user, is_logged} from "../userForm/userFormLogin";
import {updateDoc, doc, arrayUnion} from "@firebase/firestore";
import {db} from "../userForm/firebase-config";
import {Tabs, Tab, AppBar} from "@material-ui/core";

export default function StockInput({data}) {
    const [qt, setQt] = useState(1);
    const [add, setAdd] = useState(true);
    const [balance, setBalance] = useState((curr_user == null ? 0 : curr_user.balance));
    const qtHandler = event => {
        setQt(event.target.value);
    };
    async function handleAddStock() {
        if(is_logged){
            let holdings_updated = false;
            if(curr_user.balance >= (data.state.data[0]['stockData']['adjusted_close'] * qt)){
                const user_ref = doc(db, "users", curr_user.id);

                let bal = curr_user.balance - data.state.data[0]['stockData']['adjusted_close'] * qt;
                await updateDoc(user_ref, {balance: bal});
                curr_user.balance = bal;
                setBalance(bal)
                let holdings = curr_user.holdings
                for(let i = 0; i<holdings.length; i++){
                    let usr_tkr = holdings[i]['StockTIKR'];
                    let data_tkr = data.state.data[0]['data']['symbol']
                    if(usr_tkr.toUpperCase()=== data_tkr.toUpperCase()){
                        holdings[i]['Amount'] = parseInt(holdings[i]['Amount']) + parseInt(qt);
                        await updateDoc(user_ref, {holdings: holdings});
                        curr_user.holdings = holdings
                        holdings_updated = true;
                    }

                }
                if(!holdings_updated){
                    let data_tkr = data.state.data[0]['data']['symbol'];
                    await updateDoc(user_ref, {holdings: arrayUnion({'StockTIKR':data_tkr.toUpperCase(), 'Amount': parseInt(qt), 'Price':parseFloat(data.state.data[0]['stockData']['adjusted_close'])})});
                    curr_user.holdings.push({'StockTIKR':data_tkr.toUpperCase(), 'Amount': parseInt(qt), 'Price':parseFloat(data.state.data[0]['stockData']['adjusted_close'])});
                }
                let data_tkr = data.state.data[0]['data']['symbol'];
                let prc = parseFloat(data.state.data[0]['stockData']['adjusted_close'])
                let histry = curr_user.trading_history;
                histry.push({"date":new Date().toLocaleString(), "stock": data_tkr.toUpperCase(), "qt":parseInt(qt), "price":prc, "ordertype":"BUY", "Profit/Loss": "FLOATING"});
                await updateDoc(user_ref, {trading_history: histry});
                curr_user.trading_history = histry;
            }
            else{
                alert("Insufficient Balance. stack more bread u broke fag.")
            }
            data.setState({rerender: null})
        }
    }
    async function handleRemoveStock(){
        const user_ref = doc(db, "users", curr_user.id);
        if(is_logged){
            let holdings = curr_user.holdings;
            let bal = curr_user.balance;
            let StockExsits = false;
            let ActionCompleted = false;

            for(let i = 0; i<holdings.length; i++){
                if(holdings[i]['StockTIKR'] === (data.state.data[0]['data']['symbol']).toUpperCase()){
                    StockExsits = true;
                    if(parseInt(qt)<holdings[i]['Amount']){
                        holdings[i]['Amount'] = holdings[i]['Amount'] - qt
                        await updateDoc(user_ref, {holdings: holdings})
                        curr_user.holdings = holdings;
                        bal = bal + (qt*data.state.data[0]['stockData']['adjusted_close'])
                        await updateDoc(user_ref, {balance: bal})
                        curr_user.balance = bal;
                        let data_tkr = data.state.data[0]['data']['symbol'];
                        let prc = parseFloat(data.state.data[0]['stockData']['adjusted_close'])
                        let histry = curr_user.trading_history;
                        let curr_qt = qt;
                        for(let i = 0; i< histry.length; i++){
                            if(curr_qt === 0){
                                break;
                            }
                            if(histry[i]['stock'] === "TSLA" && histry[i]["type"] === "buy"){
                                if(curr_qt!==0){
                                    if(curr_qt>=histry[i]['qt']){
                                        histry.push({"date":new Date().toLocaleString(),
                                            "stock": data_tkr, "qt":histry[i]["qt"],
                                            "price":histry[i]["price"], "ordertype":"SELL",
                                            "Profit/Loss":histry[i]["qt"]*prc - histry[i]["qt"]*histry[i]['price']});
                                        curr_qt = curr_qt - histry[i]['qt'];
                                        histry[i]['Profit/Loss'] = "CLOSED";
                                        histry[i]['qt'] = 0;
                                    }
                                    if(curr_qt<histry[i]['qt']){
                                        histry.push({"date":new Date().toLocaleString(),
                                            "stock": data_tkr, "qt":parseInt(curr_qt) ,
                                            "price":histry[i]["price"], "ordertype":"SELL",
                                            "Profit/Loss": parseInt(curr_qt)*prc - parseInt(curr_qt)*histry[i]['price']});
                                        histry[i]['qt'] = histry[i]['qt'] - curr_qt;
                                        curr_qt = 0;

                                    }
                                }
                                else{
                                    break;
                                }
                            }
                        }
                        await updateDoc(user_ref, {trading_history: histry});
                        curr_user.trading_history = histry;
                        ActionCompleted = true;
                        alert("Shares sucessfully sold!")
                        break;

                    }
                    if(parseInt(qt) === holdings[i]['Amount']){
                        holdings.splice(i, 1);
                        await updateDoc(user_ref, {holdings: holdings})
                        curr_user.holdings = holdings;
                        bal = (bal + (qt*data.state.data[0]['stockData']['adjusted_close']))
                        await updateDoc(user_ref, {balance: bal})
                        curr_user.balance = bal;
                        let data_tkr = data.state.data[0]['data']['symbol'];
                        let prc = parseFloat(data.state.data[0]['stockData']['adjusted_close'])
                        let histry = curr_user.trading_history;
                        let curr_qt = qt;
                        for(let i = 0; i< histry.length; i++){
                            if(curr_qt === 0){
                                break;
                            }
                            if(histry[i]['stock'] === "TSLA" && histry[i]["type"] === "buy"){
                                if(curr_qt!==0){
                                    if(curr_qt>=histry[i]['qt']){
                                        histry.push({"date":new Date().toLocaleString(), "stock": data_tkr,
                                            "qt":histry[i]["qt"], "price":histry[i]["price"],
                                            "ordertype":"SELL",
                                            "Profit/Loss":histry[i]["qt"]*prc - histry[i]["qt"]*histry[i]['price']});
                                        curr_qt = curr_qt - histry[i]['qt'];
                                        histry[i]['Profit/Loss'] = "CLOSED";
                                        histry[i]['qt'] = 0;
                                    }
                                    if(curr_qt<histry[i]['qt']){
                                        histry.push({"date":new Date().toLocaleString(),
                                            "stock": data_tkr, "qt":parseInt(curr_qt) ,
                                            "price":histry[i]["price"],
                                            "ordertype":"SELL",
                                            "Profit/Loss": parseInt(curr_qt)*prc - parseInt(curr_qt)*histry[i]['price']});
                                        histry[i]['qt'] = histry[i]['qt'] - curr_qt;
                                        curr_qt = 0;

                                    }
                                }
                                else{
                                    break;
                                }
                            }
                        }
                        await updateDoc(user_ref, {trading_history: histry});
                        curr_user.trading_history = histry;
                        ActionCompleted = true;
                        alert("Shares sucessfully sold!")
                        break;
                    }
                }


            }
            if(!StockExsits){
                alert("Stock is not in Portfolio")
                ActionCompleted = true;
            }
            if(!ActionCompleted){
                alert("Not enough shares own to sell the quantity requested.")
            }
        }

    }
    const modifiedData = data.state.data;
    const estimated_bal = (modifiedData.length > 0 ? Math.round(100 * (balance - (qt * modifiedData[0]["stockData"]["adjusted_close"])))/100: null)
    const estimated_bal2 = (modifiedData.length > 0 ? Math.round(100 * (balance + (qt * modifiedData[0]["stockData"]["adjusted_close"])))/100: null)
    function profitCalc(){
        if(modifiedData.length>0 && is_logged){
            for(let i = 0; i < curr_user.holdings.length; i++){
                if (curr_user.holdings[i]['StockTIKR'] === modifiedData[0]['data']['symbol'].toUpperCase()){
                    return Math.round(100 * (curr_user.holdings[i]['Price'] - modifiedData[0]['stockData']['adjusted_close']))/100;
                }
            }

        }
    }
    function TabPanel(props) {
        const {value, index, data} = props;
        return(<div>
            {
                value === index&&(
                    <h1>{data}</h1>
                )
            }
        </div>)
    }
    const [value, setValue] = useState(0)
    const handleTabs=(e,val)=>{
        console.warn(val)
        setValue(val)
    }
    let estimatedValue = 0;
    if (is_logged) {
        estimatedValue = profitCalc()
    }
    return (
        <div>
            <AppBar position={"absolute"} style={{
                margin:'70px 520px',
                maxWidth: '301px',
                backgroundColor:'white',
                zIndex: 1
            }}>
                <Tabs value={value} textColor="primary" indicatorColor="primary" onChange={handleTabs} TabIndicatorProps={{
                    style:{hidden: true}
                }}>
                    <Tab label={"Buy"}/>
                    <Tab label={"Sell"}/>
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0} data={<div>
                {modifiedData.length > 0 ?
                <div className={styles.rectangle}>
                    <div className={styles.mainTag}>
                        <Typography variant="h6" className={styles.buyTag}>
                            {"Buy " + ((modifiedData[0]["data"]["symbol"]).toUpperCase())}
                        </Typography>
                        <Typography className={styles.balanceTag}>
                            {"Balance: " + Math.round(100 * balance)/100}
                        </Typography>
                    </div>
                    <div>
                        <Typography variant="body2" className={styles.body}>
                            Shares
                        </Typography>
                        <TextField
                            type={"number"}
                            InputProps={{
                                classes: {
                                    input: styles.bal
                                },
                                inputProps: {
                                    max: 100000, min: 1
                                }
                            }}
                            style={{
                                width: 100,
                            }}
                            className={styles.bal}
                            id="bal"
                            variant="outlined"
                            onChange={qtHandler}
                            value={qt}
                        />
                    </div>
                    <div>
                        <Typography variant="body2" className={styles.body}>
                            Market Price
                        </Typography>
                        <Typography variant="body1" className={styles.price}>
                            {"$" + Math.round(100 * modifiedData[0]["stockData"]["adjusted_close"])/100}
                        </Typography>
                    </div>
                    <div>
                        <Typography variant="h6" className={styles.body2}>
                            Estimated Cost
                        </Typography>
                        <Typography variant="body1" className={styles.cost}>
                            {"$" + Math.round(100 * (qt * modifiedData[0]["stockData"]["adjusted_close"]))/100}
                        </Typography>
                    </div>
                    <div>
                        <Typography variant="h6" className={styles.body2}>
                            Leftover Balance
                        </Typography>
                        <Typography variant="body1" className={styles.reCost}>
                            {(estimated_bal < 0 ? "-$" : "$") + Math.abs(estimated_bal)}
                        </Typography>
                    </div>
                    <div>
                        <Button
                            variant="contained"
                            className={styles.addButton}
                            onClick={handleAddStock}
                            style={{
                                backgroundColor: "rgb(0,217,0)"
                            }}
                        >
                            Buy
                        </Button>
                    </div>
                </div>
                : null}</div>}></TabPanel>
            <TabPanel value={value} index={1} data={<div>
                {modifiedData.length > 0 ?
                <div className={styles.rectangle}>
                    <div className={styles.mainTag}>
                        <Typography variant="h6" className={styles.buyTag}>
                            {"Sell " + ((modifiedData[0]["data"]["symbol"]).toUpperCase())}
                        </Typography>
                        <Typography className={styles.balanceTag}>
                            {"Balance: " + Math.round(100 * balance)/100}
                        </Typography>
                    </div>
                    <div>
                        <Typography variant="body2" className={styles.body}>
                            Shares
                        </Typography>
                        <TextField
                            type={"number"}
                            InputProps={{
                                classes: {
                                    input: styles.bal
                                },
                                inputProps: {
                                    max: 100000, min: 1
                                }
                            }}
                            style={{
                                width: 100,
                            }}
                            className={styles.bal}
                            id="bal"
                            variant="outlined"
                            onChange={qtHandler}
                            value={qt}
                        />
                    </div>
                    <div>
                        <Typography variant="body2" className={styles.body}>
                            Market Price
                        </Typography>
                        <Typography variant="body1" className={styles.price}>
                            {"$" + Math.round(100 * modifiedData[0]["stockData"]["adjusted_close"])/100}
                        </Typography>
                    </div>
                    <div>
                        <Typography variant="h6" className={styles.body2}>
                            Est. Profit/Share
                        </Typography>
                        <Typography variant="body1" className={styles.cost}>
                            {(estimatedValue < 0 ? "-$" : "$") + Math.abs(estimatedValue)}
                        </Typography>
                    </div>
                    <div>
                        <Typography variant="h6" className={styles.body2}>
                            Estimated Balance
                        </Typography>
                        <Typography variant="body1" className={styles.reCost}>
                            {(estimated_bal2 < 0 ? "-$" : "$") + Math.abs(estimated_bal2)}
                        </Typography>
                    </div>
                    <div>
                        <Button
                            variant="contained"
                            className={styles.addButton}
                            onClick={handleRemoveStock}
                            style={{
                                backgroundColor: "rgba(255,0,0,0.8)"
                            }}
                        >
                            Sell
                        </Button>
                    </div>
                </div>
                : null}</div>}></TabPanel>
        </div>
    )
}
