import React, { Component } from 'react';
import Axios from 'axios'
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.getCountryData = this.getCountryData.bind(this)
    this.state = {
      confirmed: 1,
      recovered: 5,
      deaths: 7,
      countriesArr: [],
      update: " ",
      showUpdate: false
    }
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

    this.setState({
      confirmed: response.data.confirmed.value,
      recovered: response.data.recovered.value,
      deaths: response.data.deaths.value,
      countriesArr
    })
  }

  async getCountryData(e) {
    try {
      const response = await Axios.get(`https://covid19.mathdro.id/api/countries/${e.target.value}`)
      this.setState({
        confirmed: response.data.confirmed.value,
        recovered: response.data.recovered.value,
        deaths: response.data.deaths.value,
        update: Date(response.data.lastUpdate),
        showUpdate: true
      })
    }
    catch (err) {
      if (err.response.status === 404) {
        this.setState({
          confirmed: "No Data Available",
          recovered: "No Data Available",
          deaths: "No Data Available",
        })
      }
    }
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
            <h3>Cases</h3>
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
        {this.state.showUpdate ? <span> Last Update: {this.state.update}</span> : " "}

      </div>

    )
  }
}


export default App;
