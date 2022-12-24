import React, {useState} from 'react';
import UserFormRegister from "./userFormRegister";
import {Link, useNavigate} from "react-router-dom";
import styles from "./userFormLogin.module.css";
import {TextField, Button} from "@material-ui/core";




function UserFormL(){
    const [email, setemail] = useState("");
    const emailhandler = event => {
        setemail(event.target.value);
    };
    const [pass, setpass] = useState("");
    const passhandler = event => {
        setpass(event.target.value);
    };
    const navi = useNavigate();
    const HandleClick=()=>{
        if(localStorage.getItem("email")===email && localStorage.getItem("pass")===pass){
            navi("/home");
        }
        else{
            alert("Wrong username or password!")
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
                                label="Password" 
                                variant="standard" 
                                fullWidth
                                onChange={passhandler}
                                value={pass}
                            />
                    </div>
                    <div className={styles.buttonLogin}>
                        <Button variant="outlined" onClick={HandleClick}>
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
export default UserFormL;