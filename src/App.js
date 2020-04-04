import React, { Component } from 'react';
import Axios from 'axios'
import "./App.css"
import NumberFormat from 'react-number-format';
import { Container, Row, Col, Card, Alert, ListGroup, Button, Accordion } from "react-bootstrap"
import decode from './assets/decoding.jpg'
import pandemics from './assets/pandemics-history.jpg'
import liveMap from './assets/realtimeMap.jpg'
import spread from './assets/spread.jpg'
import chart from './assets/chart.png'


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

        <Row style={{ marginTop: '2rem', borderTop: "2px solid #000" }}>
          <Col xs={12} md={12} lg={12} style={{ paddingTop: '1rem' }}>
            <h5 className="text-center">CoronaVirus Explained</h5>
          </Col>
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
        {this.state.showUpdate ? <Alert variant="dark" style={{ marginTop: '1rem' }} className='text-center'> Last Updated: {this.state.update}</Alert> : null}

        <Row>
          <Col xs={12} md={12} lg={12} style={{ paddingTop: '1rem' }}>
            <iframe title='covid explained' width="100%" height="315" src="https://www.youtube.com/embed/BtN-goy9VOY" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen='true'></iframe>
          </Col>
        </Row>

        <Row style={{ marginTop: "1rem" }}>
          <Col xs={12} md={12} lg={4} style={{ paddingTop: '1rem' }}>
            <Accordion>
              <Card style={{ width: 'auto', padding: '7px' }} className="text-center">

                <Card.Header>
                  <Accordion.Toggle as={Button} variant="link" eventKey="0">
                    <h5>Know How it Spreads</h5>
                  </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                  <Card.Body><ul>
                    <li>The virus is thought to spread mainly from person-to-person.</li>
                    <li>Between people who are in close contact with one another within about 6 feet.</li>
                    <li>Through respiratory droplets produced when an infected person coughs, sneezes or talks.</li>
                    <li>These droplets can land in the mouths or noses of people who are nearby or possibly be inhaled into the lungs.</li>
                    <li>COVID-19 may be spread by people who are not showing symptoms.</li>
                  </ul></Card.Body>
                </Accordion.Collapse>

              </Card>
            </Accordion>
          </Col>
          <Col xs={12} md={12} lg={4} style={{ paddingTop: '1rem' }}>
            <Accordion>
              <Card style={{ width: 'auto', padding: '7px' }} className="text-center">

                <Card.Header>
                  <Accordion.Toggle as={Button} variant="link" eventKey="1">
                    <h5>How to Protect Yourself</h5>
                  </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="1">
                  <Card.Body> <ul>
                    <li>Wash your hands often with soap and water for at least 20 seconds.</li>
                    <li>If soap and water are not readily available, use a hand sanitizer that contains at least 60% alcohol.</li>
                    <li>Avoid touching your eyes, nose, and mouth with unwashed hands.</li>
                    <li>Avoid close contact with people who are sick.</li>
                    <li>Put distance between yourself and other people. Remember that some people without symptoms may be able to spread virus.</li>
                  </ul></Card.Body>
                </Accordion.Collapse>

              </Card>
            </Accordion>
          </Col>
          <Col xs={12} md={12} lg={4} style={{ paddingTop: '1rem' }}>
            <Accordion>
              <Card style={{ width: 'auto', padding: '7px' }} className="text-center">

                <Card.Header>
                  <Accordion.Toggle as={Button} variant="link" eventKey="2">
                    <h5>How to Protect Others</h5>
                  </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="2">
                  <Card.Body><ul>
                    <li>Stay home if you are sick, except to get medical care. </li>
                    <li>Cover your mouth and nose with a tissue when you cough. Throw used tissues in the trash.</li>
                    <li>If you are sick: Wear a facemask when you are around other people (e.g., sharing a room or vehicle).</li>
                    <li>If you are NOT sick: You do not need to wear a facemask unless you are caring for someone who is sick</li>
                    <li>Clean AND disinfect frequently touched surfaces daily.</li>
                  </ul></Card.Body>
                </Accordion.Collapse>

              </Card>
            </Accordion>
          </Col>
        </Row>

        <Row>
          <Col xs={12} md={12} lg={4} style={{ paddingTop: '1rem' }}></Col>
          <Col xs={12} md={12} lg={4} style={{ paddingTop: '1rem' }} className='text-center'>
            <Button variant="info" style={{ marginTop: "0.5rem" }} href="https://www.cdc.gov/coronavirus/2019-ncov/if-you-are-sick/steps-when-sick.html" target='_blank'>
              What to Do if You Are Sick
            </Button>
          </Col>
          <Col xs={12} md={12} lg={4} style={{ paddingTop: '1rem' }}></Col>
        </Row>

        <Row style={{ marginTop: "1rem", borderTop: "3px solid #000" }}>
          <Col xs={12} md={12} lg={12} style={{ paddingTop: '1rem' }}>
            <h5 className="text-center">Here are the great resources</h5>
          </Col>
          <Col xs={12} md={12} lg={6} style={{ paddingTop: '1rem' }}>
            <Card style={{ width: 'auto' }}>
              <Card.Img variant="top" src={liveMap} />
              <Card.Body style={{ height: 'auto' }}>
                <Card.Text>
                  If you haven’t seen this useful real-time dashboard by Johns Hopkins University yet, it’s worth bookmarking right now.
                </Card.Text>
                <Button variant="primary" target='_blank' href='https://coronavirus.jhu.edu/map.html'>Visit Site</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} md={12} lg={6} style={{ paddingTop: '1rem' }}>
            <Card style={{ width: 'auto' }}>
              <Card.Img variant="top" src={spread} />
              <Card.Body style={{ height: 'auto' }}>
                <Card.Text>
                  This fantastic interactive page by the Washington Post actively simulates what happens when the virus spreads normally, contrasting it to how it may spread in a forced quarantine environment.
                </Card.Text>
                <Button variant="primary" target='_blank' href='https://www.washingtonpost.com/graphics/2020/world/corona-simulator/'>Visit Site</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} md={12} lg={6} style={{ paddingTop: '1rem' }}>
            <Card style={{ width: 'auto' }}>
              <Card.Img variant="top" src={decode} />
              <Card.Body style={{ height: 'auto' }}>

                <Card.Text>
                  This educational scrolling infographic by SCMP walks you through some of the more familiar types of coronaviruses, how they spread, and how they affect the human body.
                </Card.Text>
                <Button variant="primary" target='_blank' href='https://multimedia.scmp.com/infographics/news/china/article/3075382/decoding-coronavirus-covid-19/index.html'>Visit Site</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} md={12} lg={6} style={{ paddingTop: '1rem' }}>
            <Card style={{ width: 'auto' }}>
              <Card.Img variant="top" src={pandemics} />
              <Card.Body style={{ height: 'auto' }}>

                <Card.Text>
                  On March 11th, the World Health Organization declared COVID-19 a pandemic.
                  In this infographic, we look at the data to show you the history of pandemics — all the way from the Black Death to how the current COVID-19 situation.
                </Card.Text>
                <Button variant="primary" target='_blank' href='https://www.visualcapitalist.com/history-of-pandemics-deadliest/'>Visit Site</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} md={12} lg={6} style={{ paddingTop: '1rem' }}>
            <Card style={{ width: 'auto' }}>
              <Card.Img variant="top" src={chart} />
              <Card.Body style={{ height: 'auto' }}>

                <Card.Text>
                  The interactive chart updates daily based on the latest numbers, and you can actually search for any country by using the “Search” button. Using the filters on the right side, you can also sort by region as well.
                </Card.Text>
                <Button variant="primary" target='_blank' href='https://www.visualcapitalist.com/infection-trajectory-flattening-the-covid19-curve/'>Visit Site</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col xs={12} md={12} lg={12} style={{ paddingTop: '1rem' }}>
            <iframe title='covid explained' width="100%" height="315" src="https://www.youtube.com/embed/BtN-goy9VOY" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen='true'></iframe>
          </Col>
        </Row>

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

        <Row style={{ margin: "2rem 0" }}>
          <Col xs={12} className='text-center'>
            <span>made with &hearts; by <a href="https://www.johnlwin.info" target='_blank' rel='noopener noreferrer'>John Lwin</a> ~ be safe out there!</span> <br />

          </Col>
        </Row>
      </Container>

    )
  }
}


export default App;
