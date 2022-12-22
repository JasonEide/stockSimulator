import {extendObservable } from 'mobx';

class UserData{
    constructor() {
        extendObservable(this, {
            loading: true,
            isLoggedIn: false,
            username: '',
            password: '',
            balance: '',
            holdings: [],
            
        })
    }
}