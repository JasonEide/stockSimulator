import React from 'react';
import {TextField} from '@material-ui/core'
import styles from './input.module.css'

export default function Input() {
    function handleSearchStock(){
        
    }
    return (
        <div className={styles.container}>
            <TextField id="outlined-basic" label="Search Stock" variant="outlined" onClick={handleSearchStock} />
        </div>
    )
}