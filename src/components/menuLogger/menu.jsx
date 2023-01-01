import React, {useState} from "react";
import styles from './menu.module.css';
import {Button, IconButton} from "@material-ui/core";
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import CloseIcon from '@material-ui/icons/Close';
import { Link } from "react-router-dom";
import {is_logged} from "../userForm/userFormLogin";

export default function Menu() {
    const [menu, setMenu] = useState(false);
    
    async function handleUserIcon() {
        var prop = document.getElementById("menu");
        if (menu) {
            prop.style.setProperty("height", "0px");
            prop.style.setProperty("left", "1170px");
            prop.style.setProperty("width", "0px");
        }
        if (!menu) {
            prop.style.setProperty("height", "115px");
            prop.style.setProperty("left", "970px");
            prop.style.setProperty("width", "200px");
        }
        setMenu(!menu);
    }

    async function logoutUser() {
        
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
                {menu && !is_logged ?                 
                <>
                    <div>
                        <Button variant="text" className={styles.loginButton}> 
                            <Link to={"/login"} className={styles.link}>
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
                {menu && is_logged ?
                <>
                    <div>
                        <Button variant="text" className={styles.logoutButton} onClick={logoutUser}>
                            Logout
                        </Button>
                    </div>
                </>: null}
            </div>
        </div>
    )

}