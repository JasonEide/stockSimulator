import React from 'react';
import styles from './App.module.css';
import Input from './components/input/input.jsx';
import Charts from './components/chart/chart';
import Menu from './components/menuLogger/menu';
import {fetchData} from './api';
import UserFormL from './components/userForm/userFormLogin'
import UserFormR from './components/userForm/userFormRegister'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import UserFormLogin from "./components/userForm/userFormLogin";
import UserFormRegister from "./components/userForm/userFormRegister";
import Info from './components/info/info';
import StockInput from './components/stockInput/stockInput';
import MTable from './components/trading-history/table';
import PieChart from "./components/piechart/pieChart.jsx";
import Label from "./components/label/label";
class App extends React.Component {
  state = {
    data: {},
    stock: '',
    prev_stock: '',
  }
  
  async componentDidMount() {
    const fetchedData = await fetchData();
    if (fetchedData !== undefined) {
      const symbol = fetchedData[0]["data"]["symbol"];
      this.setState({data: fetchedData, stock: symbol, prev_stock: symbol})
    }
  }
  async componentDidUpdate() {
    if (this.state.stock !== this.state.prev_stock) {
      const fetchedData = await fetchData(this.state.stock);
      this.setState({data: fetchedData, prev_stock: this.state.stock})
    }
  }
  render() {
    return (
        <Router>
          <Routes>
            <Route path={"/login"} element={<UserFormLogin/>}/>
            <Route path={"/register"} element={<UserFormRegister/>}/>
            <Route path={"/"} element={
            <div className={styles.container}>
              <div className={styles.rectangle}>
                <Input data={this}/>
                <Charts data={this.state.data}/>
                <Label data={this.state.data}/>
                <StockInput data={this}/>
                <Menu/>
              </div>
              <div>
                <MTable/>
              </div>
              <PieChart/>
            </div>
            }/>
          </Routes>
        </Router>
    )
  }
}

export default App;
