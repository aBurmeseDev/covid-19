import React, { Component } from 'react';
import Axios from 'axios'
import "./App.css"

import { Container, Row, Col, Card, Alert, ListGroup, Button } from "react-bootstrap"


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


      <Container>
        <h2 className="text-center">Hello from the inside...</h2>
        <Row>
          <Col>
            <select onChange={this.getCountryData} className="custom-select">
              <option selected>Select Country</option>
              {this.renderCountryArr()}
            </select>
          </Col>
        </Row>
        <Row style={{ marginTop: "2rem" }}>
          <Col xs={12} md={12} lg={4} style={{ paddingTop: '1rem' }}>
            <Card bg="warning" style={{ width: 'auto', padding: '7px' }} className="text-center" fluid>
              <h3>Cases</h3>
              <h3 style={{ fontFamily: 'monospace' }}>{this.state.confirmed}</h3>
            </Card>
          </Col>
          <Col xs={12} md={12} lg={4} style={{ paddingTop: '1rem' }}>
            <Card bg="success" style={{ width: 'auto', padding: '7px' }} className="text-center">
              <h3>Recovered</h3>
              <h3 style={{ fontFamily: 'monospace' }}>{this.state.recovered}</h3>
            </Card>
          </Col>
          <Col xs={12} md={12} lg={4} style={{ paddingTop: '1rem' }}>
            <Card bg="danger" style={{ width: 'auto', padding: '7px' }} className="text-center">
              <h3>Deaths</h3>
              <h3 style={{ fontFamily: 'monospace' }}>{this.state.deaths}</h3>
            </Card>
          </Col>
        </Row>
        {this.state.showUpdate ? <Alert variant="dark" style={{ marginTop: '1rem' }}> Last Update: {this.state.update}</Alert> : " "}
        <Row style={{ marginTop: "2rem" }}>

          <Col xs={12} style={{ paddingTop: '1rem' }}>
            <Card border="primary" style={{ width: 'auto', padding: '7px' }} className="text-center">
              <h2>Donations</h2>
              <ListGroup >
                <Button style={{ marginTop: "0.5rem" }} href="https://covid19responsefund.org/">
                  WHO Response Fund
                </Button>
                <Button style={{ marginTop: "0.5rem" }} href="https://www.cdcfoundation.org/give/ways-to-give">
                  CDC Foundation
                </Button>
                <Button style={{ marginTop: "0.5rem" }} href="https://donate.sunnybrook.ca/donation-landing">
                  Sunnybrook Health Care Centre
                </Button>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      </Container>













      // <div className="container">
      //   <h2 className="text-center">Hello from the inside...</h2>
      //   <div className="row">
      //     <div className="col-sm list">
      //       <select onChange={this.getCountryData} className="custom-select">
      //         <option selected>Select Country</option>
      //         {this.renderCountryArr()}
      //       </select>
      //     </div>
      //   </div>
      //   <div className="row">
      //     <div className="col py-3 px-lg-5 border bg-light">
      //       <h3>Cases</h3>
      //       <h4>{this.state.confirmed}</h4>
      //     </div>
      //     <div className="col py-3 px-lg-5 border bg-light">
      //       <h3>Recovered</h3>
      //       <h4>{this.state.recovered}</h4>
      //     </div>
      //     <div className="col py-3 px-lg-5 border bg-light">
      //       <h3>Deaths</h3>
      //       <h4>{this.state.deaths}</h4>
      //     </div>
      //   </div>
      //   {this.state.showUpdate ? <span> Last Update: {this.state.update}</span> : " "}

      // </div>

    )
  }
}


export default App;
