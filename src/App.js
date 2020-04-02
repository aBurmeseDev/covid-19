import React, { Component } from 'react';
import Axios from 'axios'
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';

class App extends Component {
  state = {
    confirmed: 100000,
    recovered: 50000,
    deaths: 7000,
    countriesArr: []
  }
  componentDidMount() {
    this.getData()
  }

  async getData() {
    const response = await Axios.get("https://covid19.mathdro.id/api");
    const resLocation = await Axios.get("https://covid19.mathdro.id/api/countries")
    // console.log(resLocation.data.countries)
    let locationArr = resLocation.data.countries;
    let countriesArr = []
    for (let i = 0, l = locationArr.length; i < l; i++) {
      countriesArr.push(locationArr[i].name)
    }
    console.log(countriesArr)
    // console.log(countriesArr)
    // const countries = Object.keys(resLocation.data.countries)

    // function toObject(locationArr) {
    //   var rv = {};
    //   for (var i = 0; i < locationArr.length; ++i)
    //     rv[i] = locationArr[i];
    //   return rv;
    //   console.log(rv)
    // }
    // toObject(locationArr);


    this.setState({
      confirmed: response.data.confirmed.value,
      recovered: response.data.recovered.value,
      deaths: response.data.deaths.value,
      countriesArr
    })
  }

  async getCountryData(e) {
    const response = await Axios.get("https://covid19.mathdro.id/api/countries/USA")
  }
  renderCountryArr() {
    return this.state.countriesArr.map((country, i) => {
      return <option key={i}>{country}</option>
    })
  }

  render() {
    return (
      <div className="container">
        <h2 className="text-center">Hello from the inside...</h2>
        <div className="row">
          <div className="col-10 py-5">
            <select onChange={this.getCountryData} className="custom-select">
              <option selected>Select Country</option>
              {this.renderCountryArr()}
            </select>
          </div>
        </div>
        <div className="row">
          <div className="col py-3 px-lg-5 border bg-light">
            <h3>Confirmed</h3>
            <h4>{this.state.confirmed}</h4>
          </div>
          <div className="col py-3 px-lg-5 border bg-light">
            <h3>Recovered</h3>
            <h4>{this.state.recovered}</h4>
          </div>
          <div className="col py-3 px-lg-5 border bg-light">
            <h3>Deaths</h3>
            <h4>{this.state.deaths}</h4>
          </div>
        </div>
      </div>

    )
  }
}


export default App;
