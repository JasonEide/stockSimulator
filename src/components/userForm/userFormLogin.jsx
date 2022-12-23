import React from 'react';
import UserFormRegister from "./userFormRegister";
import {Link} from "react-router-dom";

function userFormL(){
    return(
        <div className="log-form">
            <h2>Login to your account</h2>
            <form>
                <input type="text" title="username" placeholder="username"/>
                <input type="password" title="username" placeholder="password"/>
                <button type="submit" className="btn">Login</button>
                <Link to={"/register"}> Register</Link>
            </form>
        </div>

    )

}
export default userFormL;