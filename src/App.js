import React, { Component } from 'react';
import Axios from 'axios'
import "./App.css"
import NumberFormat from 'react-number-format';
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
      showUpdate: false,
      confirmedOC: 9,
      recoveredOC: 6,
      deathsOC: 3,
      confirmedIC: 9,
      recoveredIC: 6,
      deathsIC: 3
    }
  }

  componentDidMount() {
    this.getData()
    this.getDailyData()
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
    //console.log(countriesArr)

    this.setState({
      confirmed: response.data.confirmed.value,
      recovered: response.data.recovered.value,
      deaths: response.data.deaths.value,
      countriesArr
    })
  }

  async getCountryData(e) {
    if (e.target.value === "Select Country") {
      this.setState({
        showUpdate: false
      })
      return this.getData()
    }
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

  async getDailyData() {

    const response = await Axios.get("https://covid19.mathdro.id/api/daily")
    console.log(response.data.slice(-1)[0].confirmed.outsideChina)
    let lastItem = response.data.slice(-1)[0]
    this.setState({
      confirmedOC: lastItem.confirmed.outsideChina,
      recoveredOC: lastItem.recovered.outsideChina,
      deathsOC: lastItem.deaths.outsideChina,
      confirmedIC: lastItem.confirmed.china,
      recoveredIC: lastItem.recovered.china,
      deathsIC: lastItem.deaths.china,

    })

  }

  renderCountryArr() {
    return this.state.countriesArr.map((country, i) => {
      return <option key={i}>{country}</option>
    })
  }


  render() {

    return (


      <Container>
        <h5 className="text-center">Hello from the inside...</h5>

        <Row style={{ marginTop: '2rem' }}>
          <Col>
            <select onChange={this.getCountryData} className="custom-select text-center" style={{ background: '#000', color: '#fff' }}>
              <option defaultValue>Select Country</option>
              {this.renderCountryArr()}
            </select>

          </Col>
        </Row>
        <Row style={{ marginTop: "1rem" }}>
          <Col xs={12} md={12} lg={4} style={{ paddingTop: '1rem' }}>
            <Card style={{ width: 'auto', padding: '7px', background: "rgb(255, 144, 0)" }} className="text-center">
              <h4>Confirmed Cases</h4>
              <NumberFormat value={this.state.confirmed} displayType={'text'} thousandSeparator={true} renderText={value => <h1>{value}</h1>} />
              {this.state.showUpdate ? null : <NumberFormat value={this.state.confirmedIC} displayType={'text'} thousandSeparator={true} renderText={value => <p>Mainland China: {value}</p>} />
              }
              {this.state.showUpdate ? null : <NumberFormat value={this.state.confirmedOC} displayType={'text'} thousandSeparator={true} renderText={value => <p>Outside China: {value}</p>} />
              }
            </Card>
          </Col>
          <Col xs={12} md={12} lg={4} style={{ paddingTop: '1rem' }}>
            <Card bg="success" style={{ width: 'auto', padding: '7px' }} className="text-center">
              <h4>Recovered</h4>
              <NumberFormat value={this.state.recovered} displayType={'text'} thousandSeparator={true} renderText={value => <h1>{value}</h1>} />
              {this.state.showUpdate ? null : <NumberFormat value={this.state.recoveredIC} displayType={'text'} thousandSeparator={true} renderText={value => <p>Mainland China: {value}</p>} />
              }
              {this.state.showUpdate ? null : <NumberFormat value={this.state.recoveredOC} displayType={'text'} thousandSeparator={true} renderText={value => <p>Outside China: {value}</p>} />
              }
            </Card>
          </Col>
          <Col xs={12} md={12} lg={4} style={{ paddingTop: '1rem' }}>
            <Card bg="danger" style={{ width: 'auto', padding: '7px' }} className="text-center">
              <h4>Deaths</h4>
              <NumberFormat value={this.state.deaths} displayType={'text'} thousandSeparator={true} renderText={value => <h1>{value}</h1>} />
              {this.state.showUpdate ? null : <NumberFormat value={this.state.deathsIC} displayType={'text'} thousandSeparator={true} renderText={value => <p>Mainland China: {value}</p>} />
              }
              {this.state.showUpdate ? null : <NumberFormat value={this.state.deathsOC} displayType={'text'} thousandSeparator={true} renderText={value => <p>Outside China: {value}</p>} />
              }
            </Card>
          </Col>
        </Row>
        {this.state.showUpdate ? <Alert variant="dark" style={{ marginTop: '1rem' }}> Last Updated: {this.state.update}</Alert> : null}
        <Row style={{ marginTop: "2rem" }}>

          <Col xs={12} style={{ paddingTop: '1rem' }}>
            <Card border="primary" style={{ width: 'auto', padding: '7px' }} className="text-center">
              <h2>Donations</h2>
              <ListGroup >
                <Button style={{ marginTop: "0.5rem" }} href="https://www.cdcfoundation.org/give/ways-to-give" target='_blank'>
                  CDC Foundation
                </Button>
                <Button style={{ marginTop: "0.5rem" }} href="https://covid19responsefund.org/" target='_blank'>
                  WHO Response Fund
                </Button>
                <Button style={{ marginTop: "0.5rem" }} href="https://donate.sunnybrook.ca/donation-landing" target='_blank'>
                  Sunnybrook Health Care Centre
                </Button>
              </ListGroup>
            </Card>
          </Col>
        </Row>

        <Row style={{ marginTop: "1rem" }}>
          <Col xs={12} md={12} lg={4} style={{ paddingTop: '1rem' }}>
            <Card style={{ width: 'auto', padding: '7px' }} className="text-center">
              <h5>Know How it Spreads</h5>
              <ul>
                <li>The virus is thought to spread mainly from person-to-person.</li>
                <li>Between people who are in close contact with one another (within about 6 feet).</li>
                <li>Through respiratory droplets produced when an infected person coughs, sneezes or talks.</li>
                <li>These droplets can land in the mouths or noses of people who are nearby or possibly be inhaled into the lungs.</li>
                <li>Some recent studies have suggested that COVID-19 may be spread by people who are not showing symptoms.</li>
              </ul>
            </Card>
          </Col>
          <Col xs={12} md={12} lg={4} style={{ paddingTop: '1rem' }}>
            <Card style={{ width: 'auto', padding: '7px' }} className="text-center">
              <h5>How to Protect Yourself</h5>
              <ul>
                <li>Wash your hands often with soap and water for at least 20 seconds.</li>
                <li>If soap and water are not readily available, use a hand sanitizer that contains at least 60% alcohol.</li>
                <li>Avoid touching your eyes, nose, and mouth with unwashed hands.</li>
                <li>Avoid close contact with people who are sick.</li>
                <li>Put distance between yourself and other people. Remember that some people without symptoms may be able to spread virus.</li>
              </ul>
            </Card>
          </Col>
          <Col xs={12} md={12} lg={4} style={{ paddingTop: '1rem' }}>
            <Card style={{ width: 'auto', padding: '7px' }} className="text-center">
              <h5>Take Steps to Protect Others</h5>
              <ul>
                <li>Stay home if you are sick, except to get medical care. </li>
                <li>Cover your mouth and nose with a tissue when you cough. Throw used tissues in the trash.
</li>
                <li>If you are sick: Wear a facemask when you are around other people (e.g., sharing a room or vehicle).</li>
                <li>If you are NOT sick: You do not need to wear a facemask unless you are caring for someone who is sick</li>
                <li>Clean AND disinfect frequently touched surfaces daily.</li>
              </ul>
            </Card>
          </Col>
        </Row>


        <Row style={{ margin: "2rem 0" }}>
          <Col xs={12} className='text-center'>
            <span>made with &hearts; ~ be safe out there! </span> <br />
            <Button href="https://www.johnlwin.info" target='_blank' variant="light">check out my site</Button>
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
