import React, {useState} from 'react';
import {Link, Navigate, redirect, useNavigate} from "react-router-dom";
import styles from "./userFormLogin.module.css";
import {TextField, Button} from "@material-ui/core";
import UserData from "../../Userinfo/UserData";
import app from "../../App";





function UserFormR(){
    const [email, setemail] = useState("");
    const emailhandler = event => {
        setemail(event.target.value);
    };
    const [pass, setpass] = useState("");
    const passhandler = event => {
        setpass(event.target.value);
    };
    const [bal, setbal] = useState("");
    const balhandler = event => {
        setbal(event.target.value);
    };
    const navi = useNavigate();

    const HandleClick=()=>{
        if(email!== '' && pass!=='' && bal!==''){
            localStorage.setItem("email", email)
            localStorage.setItem("pass", pass)
            localStorage.setItem("balance", bal)
            localStorage.setItem("signup", "True")
            alert("Account Created! You'll be redircted to the home page.")
            navi("/");

        }
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
                        <Button variant="outlined" onClick={HandleClick}>
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