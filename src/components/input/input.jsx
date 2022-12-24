import React, {useState, useRef} from 'react';
import {TextField, Button} from '@material-ui/core'
import styles from './input.module.css'
import {fetchData} from '../../api';

export default function Input({data}) {
    const stockRef = useRef();
    async function handleStock() {
        const fetchedData = await fetchData(stockRef.current.value);
        data.setState({data: fetchedData, stock: stockRef.current.value})
        stockRef.current.value = null;
    }  
    return (
        <div className={styles.container}>
            <TextField id="stock" label="Search Stock" variant="outlined" inputRef={stockRef} type="text"/>
            <Button className={styles.button} onClick={handleStock}> ADD </Button>
        </div>
    )
}