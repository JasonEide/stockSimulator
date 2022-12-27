import React, {useRef} from 'react';
import {TextField, Button, IconButton} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/Add';
import styles from './input.module.css';
import {fetchData} from '../../api';

export default function Input({data}) {
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
        console.log(data.state.data);
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