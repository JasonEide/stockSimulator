import React from 'react';
import styles from './info.module.css';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }));

export default function Info({data}) {
    const classes = useStyles();
    console.log(data);
    return (
        <div className={styles.position}>
          {data.length > 0 ? 
            <Grid container spacing={1}>
              <Grid item>
              <Paper className={classes.paper}>{("peepee").toUpperCase()}</Paper>
              </Grid>
              <Grid item>
              <Paper className={classes.paper}>{(data[0]["data"]["symbol"]).toUpperCase()}</Paper>
              </Grid>
              <Grid item>
              <Paper className={classes.paper}>{"$" + data[0]["stockData"]["open"]}</Paper>
              </Grid>
            </Grid>
          : null}

        </div>
    )
}