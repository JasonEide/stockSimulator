import React from 'react';

function userFormR(){
    return(
        <div className="log-form">
            <h2>Register a new Account</h2>
            <form>
                <input type="text" title="username" placeholder="username"/>
                <input type="password" title="username" placeholder="password"/>
                <input type="number" title="balance" placeholder="balance"/>
                <button type="submit" className="btn">Register</button>

            </form>
        </div>
    )

}
export default userFormR;