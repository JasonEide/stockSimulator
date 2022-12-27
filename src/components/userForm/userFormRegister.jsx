import React, {useState} from 'react';
import {Link, Navigate, redirect, useNavigate} from "react-router-dom";
import styles from "./userFormLogin.module.css";
import {TextField, Button, IconButton} from "@material-ui/core";
import app from "../../App";
import {db} from "./firebase-config"
import {collection, addDoc} from "firebase/firestore";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';


function UserFormR(){
    const [email, setEmail] = useState("");
    const emailHandler = event => {
        setEmail(event.target.value);
    };
    const [values, setPass] = useState({
        password: "",
        showPassword: false
    });
    const passHandler = event => {
        setPass({...values, password: event.target.value});
    };
    const handleClickShowPassword = () => {
        setPass({ ...values, showPassword: !values.showPassword });
    };
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const [bal, setBal] = useState(0);
    const balHandler = event => {
        setBal(event.target.value);
    };
    const navi = useNavigate();
    const usersRef = collection(db, "users");

    const register_user = async () => {
        await addDoc(usersRef, {email: email, password: values.password, balance: bal, holdings: []});
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
                        onChange={emailHandler}
                        value={email}
                    />
                </div>
                <div className={styles.pass}>
                    <FormControl fullWidth>
                        <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                        <Input
                            id="standard-adornment-password"
                            type={values.showPassword ? 'text' : 'password'}

                            value={values.password}
                            onChange={passHandler}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    >
                                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                                }
                        />
                    </FormControl>
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
                        onChange={balHandler}
                        value={bal}
                    />
                </div>
                <div className={styles.buttonRegister}>
                    <Button variant="outlined" onClick={register_user}>
                        Register
                    </Button>
                </div>
                <div className={styles.login}>
                    <Link to={"/login"}>
                        Sign in
                    </Link>
                </div>
                <div>
                    <IconButton className={styles.registerBack}>
                        <Link to={"/"} className={styles.link}>
                            <ArrowBackIcon className={styles.backIcon}/> 
                        </Link>
                    </IconButton>
                </div>
            </div>
        </div>
    )

}
export default UserFormR;