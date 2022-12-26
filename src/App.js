import React from 'react';
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
class App extends React.Component {
  state = {
    data: {},
    stock: '',
    prev_stock: ''
  }
  
  async componentDidMount() {
    const fetchedData = await fetchData();
    const symbol = fetchedData[0]["data"]["symbol"];
    this.setState({data: fetchedData, stock: symbol, prev_stock: symbol})
  }
  async componentDidUpdate() {
    console.log(this.state.stock, this.state.data)
    if (this.state.stock != this.state.prev_stock) {
      const fetchedData = await fetchData(this.state.stock);
      this.setState({data: fetchedData, prev_stock: this.state.stock})
    }
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
                <Charts data={this.state.data}/>
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
