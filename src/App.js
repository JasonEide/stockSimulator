import React from 'react';
import styles from './App.module.css';
import Cards from './components/cards/cards.jsx';
import Input from './components/input/input.jsx';
import {fetchData} from './api';

class App extends React.Component {
  state = {
    data: {},
    stock: ''
  }
  async componentDidMount() {
    const fetchedData = await fetchData();
    this.setState({data: fetchedData})
  }
    
  render() {
    return (
      <div className={styles.container}>
        <div className={styles.rectangle}>
          <Input/>
          <Cards/>
        </div>
      </div>
    ) 
  }
}

export default App;
