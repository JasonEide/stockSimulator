import { Typography } from "@material-ui/core";
import React from "react";
import styles from "./label.module.css";
import CountUp from "react-countup";

export default function Label({data}) {
    return (
        
        <div className={styles.container}>
            {data.length ?
            <div>
                <Typography className={styles.chartLabel}>
                    {(data[0]['data']['symbol']).toUpperCase()}
                </Typography>
                <Typography className={styles.chartPriceLabel}>
                    {"$"+data[0]['stockData']['adjusted_close']} 
                </Typography>
            </div> : null}

        </div>
        
    )
}