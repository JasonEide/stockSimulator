import React, {useRef, useState} from 'react';
import {TextField, Button, IconButton} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/Add';
import styles from './input.module.css';
import {fetchData} from '../../api';
import button from "bootstrap/js/src/button";
import UserFormL, {curr_user, is_logged, } from "../userForm/userFormLogin";
import {updateDoc, doc, arrayUnion, setDoc} from "@firebase/firestore";
import {db} from "../userForm/firebase-config";
import {collection, getDocs} from "firebase/firestore";
import { Link } from "react-router-dom";

export default function Input({data}) {
    const [qt, setQt] = useState(1);
    const [add, setAdd] = useState(true);
    const qtHandler = event => {
        setQt(event.target.value);
    };
    const stockRef = useRef();

    async function handleStock() {
        data.setState({stock: stockRef.current.value})
        stockRef.current.value = null;
    }  

    async function handleAddStock() {
        /*
       Add functionality to save specific data to the user's holdings...
       Note to add the date the person bought the stock and the value of the
       stock at that time plus the name of it.

       Below will be the data given to you that you will need to parse the data.
       Refer to index.js for more information on how to index into the data.
       */
        if(is_logged){
            let holdings_updated = false;
            if(curr_user.balance >= (data.state.data[0]['stockData']['adjusted_close'] * qt)){
                const user_ref = doc(db, "users", curr_user.id);

                let bal = curr_user.balance - data.state.data[0]['stockData']['adjusted_close'] * qt;
                await updateDoc(user_ref, {balance: bal});
                curr_user.balance = bal;
                let holdings = curr_user.holdings
                for(let i = 0; i<holdings.length; i++){
                    let usr_tkr = holdings[i]['StockTIKR'];
                    let data_tkr = data.state.data[0]['data']['symbol']
                    if(usr_tkr.toUpperCase()=== data_tkr.toUpperCase()){
                        holdings[i]['Amount'] = parseInt(holdings[i]['Amount']) + parseInt(qt);
                        await updateDoc(user_ref, {holdings: holdings});
                        curr_user.holdings = holdings
                        console.log(curr_user.holdings);
                        holdings_updated = true;
                    }

                }
                if(!holdings_updated){
                    let data_tkr = data.state.data[0]['data']['symbol'];
                    await updateDoc(user_ref, {holdings: arrayUnion({'StockTIKR':data_tkr.toUpperCase(), 'Amount': parseInt(qt), 'Price':parseFloat(data.state.data[0]['stockData']['adjusted_close'])})});
                    curr_user.holdings.push({'StockTIKR':data_tkr.toUpperCase(), 'Amount': parseInt(qt), 'Price':parseFloat(data.state.data[0]['stockData']['adjusted_close'])});
                    console.log(curr_user.holdings);
                }

            }
            else{
                alert("Insufficient Balance. stack more bread u broke fag.")
            }
        }
    }

    /* 
    Listens for whenever user presses enter whenever focused into the search textfield.
    */


    return (
        <div className={styles.container}>
            <TextField 
                id="stock" 
                label="Search Stock" 
                variant="outlined" 
                inputRef={stockRef} 
                type="text"
                onKeyPress={(e) => {
                    if (e.key === "Enter") {
                        e.preventDefault();
                        handleStock();
                    }
                }
            }
            />
            <IconButton className={styles.searchButton} onClick={handleStock}> 
                <SearchIcon/>
            </IconButton>
            <IconButton className={styles.addButton} onClick={handleAddStock}>
                <AddIcon/>
            </IconButton>
        </div>
    )
}