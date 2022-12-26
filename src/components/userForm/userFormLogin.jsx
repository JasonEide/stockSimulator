import React, {useState} from 'react';
import UserFormRegister from "./userFormRegister";
import {Link, useNavigate, useLocation} from "react-router-dom";
import styles from "./userFormLogin.module.css";
import {TextField, Button} from "@material-ui/core";
import {db} from "./firebase-config"
import {collection, getDocs} from "firebase/firestore";




function UserFormL(){
    const [users, setUsers] = useState([]);
    const getUsers = async () =>{
        const data = await getDocs(usersref);
        setUsers(data.docs.map((doc) => ({...doc.data(), id:doc.id})))
    }
    const [email, setemail] = useState("");
    const emailhandler = event => {
        setemail(event.target.value);
    };
    const [pass, setpass] = useState("");
    const passhandler = event => {
        setpass(event.target.value);
    };
    const navi = useNavigate();
    const usersref = collection(db, "users");
    getUsers();

    const HandleClick=()=>{
        let is_valid = false;
        for(let i = 0; i< users.length; i++){
            if(users[i].email === email && users[i].password === pass){
                is_valid = true;
                break;
            }
        }
        if(is_valid){
            navi("/home")
        }
        else{
            alert("Invalid Credentials, Please Try Again.")
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
                                type={"Password"}
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