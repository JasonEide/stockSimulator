import React from 'react';
import {Link} from "react-router-dom";
import styles from "./userFormLogin.module.css";
import {TextField, Button} from "@material-ui/core";

function userFormR(){
    return(
        <div className={styles.container}>
            <div className={styles.rectangle}>
                    <div className={styles.email}>
                        <TextField 
                            id="outlined-basic" 
                            label="Email" 
                            variant="standard" 
                            fullWidth
                        />
                    </div>
                    <div className={styles.pass}>
                        <TextField 
                                id="outlined-basic"
                                type={"password"}
                                label="Password" 
                                variant="standard" 
                                fullWidth
                            />
                    </div>
                <div className={styles.pass}>
                    <TextField
                        type={"number"}
                        InputProps={{
                            inputProps: {
                                max: 100000, min: 5000
                            }
                        }}
                        min={"5000"}
                        id="outlined-basic"
                        label="Balance"
                        variant="standard"
                        fullWidth
                    />
                </div>
                    <div className={styles.buttonRegister}>
                        <Button variant="outlined">
                            Register
                        </Button>
                    </div>
                    <div className={styles.login}>
                        <Link to={"/"}>
                            Login
                        </Link>
                    </div>
            </div>
        </div>
    )

}
export default userFormR;