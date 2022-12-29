import React, {useRef, useState} from 'react';
import {TextField, Button, IconButton, Typography} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/Add';
import styles from './stockInput.module.css';
import { fetchData } from '../../api';
import button from "bootstrap/js/src/button";
import UserFormL, {curr_user, is_logged} from "../userForm/userFormLogin";
import {updateDoc, doc, arrayUnion, setDoc} from "@firebase/firestore";
import {db} from "../userForm/firebase-config";
import {collection, getDocs} from "firebase/firestore";

export default function StockInput({data}) {
    const [qt, setQt] = useState(0);
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
                    console.log(curr_user.holdings);
                }
                let data_tkr = data.state.data[0]['data']['symbol'];
                let prc = parseFloat(data.state.data[0]['stockData']['adjusted_close'])
                let histry = curr_user.trading_history;
                histry.push({"date":new Date().toLocaleString(), "stock": data_tkr.toUpperCase(), "qt":parseInt(qt), "price":prc});
                console.log(histry)
                await updateDoc(user_ref, {trading_history: histry});
                curr_user.trading_history = histry;

            }
            else{
                alert("Insufficient Balance. stack more bread u broke fag.")
            }
        }
    }
    const modifiedData = data.state.data;
    const estimated_bal = (modifiedData.length > 0 ? Math.round(100 * (balance - (qt * modifiedData[0]["stockData"]["adjusted_close"])))/100: null)
    return (
        <div>
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
                                max: 100000, min: 0
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
                            backgroundColor: "rgba(51, 51, 255, 0.5)"
                        }}
                    >
                       Buy
                    </Button>
                </div>
            </div>
            : null}
        </div>



    )
}