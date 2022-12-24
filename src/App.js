import React, {useState, useRef} from 'react';
import styles from './App.module.css';
import Cards from './components/cards/cards.jsx';
import Input from './components/input/input.jsx';
import Charts from './components/chart/chart';
import {fetchData} from './api';
import UserFormL from './components/userForm/userFormLogin'
import UserFormR from './components/userForm/userFormRegister'
import UserFormRegister from "./components/userForm/userFormRegister";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import UserFormLogin from "./components/userForm/userFormLogin";
import userFormRegister from "./components/userForm/userFormRegister";
import UserData from "./Userinfo/UserData";
import {Button} from "@material-ui/core";

class App extends React.Component {
  state = {
    data: {},
    stock: ''
  }
  
  async componentDidMount() {
    const fetchedData = await fetchData();
    this.setState({data: fetchedData, stock: fetchedData[0]["data"]["symbol"]})
  }

  render() {
    return (
        <Router>
          <Routes>
            <Route path={"/"} element={<UserFormLogin/>}/>
            <Route path={"/register"} element={<UserFormRegister/>}/>
            <Route path={"/home"} element={
            <div className={styles.container}>
              <div className={styles.rectangle}>
                <Input data={this}/>
                <Cards/>
                <Charts stock={this.state.stock}/>
              </div>
            </div>
            }/>

          </Routes>
          {/*<Cards/>*/}
        </Router>
    )
  }
}

export default App;
