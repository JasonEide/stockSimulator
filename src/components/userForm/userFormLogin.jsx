import React from 'react';
import UserFormRegister from "./userFormRegister";
import {Link} from "react-router-dom";
import styles from "./userFormLogin.module.css";
import {TextField, Button} from "@material-ui/core";

function userFormL(){
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
                                label="Password" 
                                variant="standard" 
                                fullWidth
                            />
                    </div>
                    <div className={styles.buttonLogin}>
                        <Button variant="outlined">
                            Login
                        </Button>
                    </div>
                    <div className={styles.register}>
                        <Link to={"/register"}>
                            Register
                        </Link>
                    </div>
            </div>
        </div>
    )

}
export default userFormL;