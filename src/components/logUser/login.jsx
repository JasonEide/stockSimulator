import React, {useState} from "react";
import styles from './login.module.css';
import {Button, IconButton} from "@material-ui/core";
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import CloseIcon from '@material-ui/icons/Close';
import FormatBoldIcon from '@material-ui/icons/FormatBold';
import { Link } from "react-router-dom";

export default function Login() {
    const [menu, setMenu] = useState(false);
    
    async function handleUserIcon() {
        var prop = document.getElementById("menu");
        if (menu) {
            prop.style.setProperty("height", "0px");
            prop.style.setProperty("left", "1170px");
            prop.style.setProperty("width", "0px");
        }
        if (!menu) {
            prop.style.setProperty("height", "200px");
            prop.style.setProperty("left", "970px");
            prop.style.setProperty("width", "200px");
        }
        setMenu(!menu);
    }

    return (
        <div>
            <div>
            <IconButton className={styles.container}>
                {menu ? 
                    <CloseIcon className={styles.user} onClick={handleUserIcon}/> :
                    <PersonOutlineIcon className={styles.user} onClick={handleUserIcon}/>   
                }
            </IconButton>
            </div>

            <div className={styles.rectangle} id="menu">
                {menu ?                 
                <>
                    <div>
                        <Button variant="text" className={styles.loginButton}> 
                            <Link to={"/"} className={styles.link}>
                                Login
                            </Link>
                        </Button>
                    </div>
                    <div>
                        <Button variant="text" className={styles.registerButton}>
                            <Link to={"/register"} className={styles.link}>
                                Register
                            </Link>
                        </Button>
                    </div>
                </> : null}
            </div>
        </div>
    )

}