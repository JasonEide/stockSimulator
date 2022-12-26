import React, {useState} from 'react';
import {Link, Navigate, redirect, useNavigate} from "react-router-dom";
import styles from "./userFormLogin.module.css";
import {TextField, Button} from "@material-ui/core";
import app from "../../App";
import {db} from "./firebase-config"
import {collection, addDoc} from "firebase/firestore";


function UserFormR(){
    const [email, setemail] = useState("");
    const emailhandler = event => {
        setemail(event.target.value);
    };
    const [pass, setpass] = useState("");
    const passhandler = event => {
        setpass(event.target.value);
    };
    const [bal, setbal] = useState(0);
    const balhandler = event => {
        setbal(event.target.value);
    };
    const navi = useNavigate();
    const usersref = collection(db, "users");

    const register_user = async () => {
        await addDoc(usersref, {email: email, password: pass, balance: bal, holdings: []});
        alert("Account Created! You'll be redirected to login.")
        navi("/");
    }

    return(
        <div className={styles.container}>
            <div className={styles.rectangle}>
                    <div className={styles.email}>
                        <TextField 
                            id="outlined-basic" 
                            label="Email" 
                            variant="standard"
                            fullWidth
                            onChange={emailhandler}
                            value={email}
                        />
                    </div>
                    <div className={styles.pass}>
                        <TextField 
                                id="outlined-basic"
                                type={"password"}
                                label="Password" 
                                variant="standard" 
                                fullWidth
                                onChange={passhandler}
                                value={pass}
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
                        id="outlined-basic"
                        label="Balance"
                        variant="standard"
                        fullWidth
                        onChange={balhandler}
                        value={bal}
                    />
                </div>
                    <div className={styles.buttonRegister}>
                        <Button variant="outlined" onClick={register_user}>
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
export default UserFormR;