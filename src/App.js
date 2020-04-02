import React, { Component } from 'react';
import Axios from 'axios'
import './App.css';

class App extends Component {
  state = {
    confirmed: 100000,
    recovered: 50000,
    deaths: 7000
  }
  componentDidMount() {
    this.getData()
  }

  async getData() {
    const res = await Axios.get("https://covid19.mathdro.id/api");
    this.setState({
      confirmed: res.data.confirmed.value,
      recovered: res.data.recovered.value,
      deaths: res.data.deaths.value
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          Hello from the inside...
      </header>
      </div>
    )
  }
}


export default App;
