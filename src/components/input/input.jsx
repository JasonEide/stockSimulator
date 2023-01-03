import React, {useRef, useState} from 'react';
import {TextField, Button, IconButton} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/Add';
import styles from './input.module.css';
import {fetchData} from '../../api';
import button from "bootstrap/js/src/button";
import UserFormL, {curr_user, is_logged} from "../userForm/userFormLogin";
import {updateDoc, doc, arrayUnion, setDoc} from "@firebase/firestore";
import {db} from "../userForm/firebase-config";
import {collection, getDocs} from "firebase/firestore";
import {tickers} from '../../utilities/tickers';

export default function Input({data}) {
    const stockRef = useRef();

    async function handleStock() {
        if (tickers.includes(stockRef.current.value.toUpperCase())) {
            data.setState({stock: stockRef.current.value})
            stockRef.current.value = null;
        }
    }  

    return (
        <div className={styles.container}>
            <TextField 
                id="stock" 
                label="Search Stock" 
                variant="outlined" 
                className={styles.text}
                inputRef={stockRef} 
                type="text"
                onKeyPress={(e) => {
                    if (e.key === "Enter") {
                        e.preventDefault();
                        handleStock();
                    }
                }}
                InputLabelProps={{
                    classes: {
                        root: styles.label
                    }
                }}
            />
            <IconButton className={styles.searchButton} onClick={handleStock}> 
                <SearchIcon/>
            </IconButton>
        </div>
    )
}