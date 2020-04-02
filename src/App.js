import React, { Component } from 'react';
import Axios from 'axios'
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';

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
      <div className="container">
        <div className="row">
          <div className="col-md">
            <h3>Confirmed Cases</h3>
            <h4>{this.state.confirmed}</h4>
          </div>
          <div className="col-md">
            <h3>Recovered</h3>
            <h4>{this.state.recovered}</h4>
          </div>
          <div className="col-md">
            <h3>Deaths</h3>
            <h4>{this.state.deaths}</h4>
          </div>
        </div>
      </div>

    )
  }
}


export default App;
