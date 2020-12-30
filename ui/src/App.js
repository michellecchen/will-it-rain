import React, { Component } from "react";
import "./App.scss";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.css";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      formData: {
        "MinTemp": 19.3,
        "MaxTemp": 21.6,
        "Rainfall": 2.4,
        "WindGustDir": "SE",
        "WindGustSpeed": 44,
        "WindDir9am": "SSE",
        "WindDir3pm": "SSE",
        "WindSpeed9am": 20,
        "WindSpeed3pm": 20,
        "Humidity9am": 86,
        "Humidity3pm": 68,
        "Pressure9am": 1022.7,
        "Pressure3pm": 1022.5,
        "Temp9am": 19.7,
        "Temp3pm": 21,
        "RainToday": "Yes"
      },
      result: ""
    };
  }

  handleChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    var formData = this.state.formData;
    formData[name] = value;
    this.setState({
      formData
    });
  };

  handlePredictClick = (event) => {
    const formData = this.state.formData;
    console.log(this.state.formData);
    this.setState({ isLoading: true });
    // fetch("http://127.0.0.1:5000/prediction/", {
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json"
    //   },
    //   method: "POST",
    //   body: JSON.stringify(formData)
    // })
    fetch("http://localhost:1234/prediction/", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify(formData)
    })
      .then((response) => response.json())
      .then((response) => {
        this.setState({
          result: response.result,
          isLoading: false
        });
        console.log("Prediction is: " + response.result);
      });
  };

  handleCancelClick = (event) => {
    this.setState({ result: "" });
  };

  render() {
    const isLoading = this.state.isLoading;
    const formData = this.state.formData;
    const result = this.state.result;

    return (
      <Container>
        <div>
          <h1 class="glitch" data-text="Will It Rain?">
            Will It Rain?
          </h1>

          {/* <h1 className="title">Will It Rain</h1> */}
        </div>
        <div className="content">
          <Form>
            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Today's MIN. temp (celsius)
              </Form.Label>
              <Col sm={2}>
                <Form.Control
                  type="text"
                  placeholder="MinTemp"
                  name="MinTemp"
                  value={formData.MinTemp}
                  onChange={this.handleChange}
                />
              </Col>

              <Form.Label column sm={2}>
                TEMP...
              </Form.Label>

              <Form.Label column sm={1}>
                @9am
              </Form.Label>
              <Col sm={2}>
                <Form.Control
                  type="text"
                  placeholder="Temp9am"
                  name="Temp9am"
                  value={formData.Temp9am}
                  onChange={this.handleChange}
                />
              </Col>

              <Form.Label column sm={1}>
                @3pm
              </Form.Label>
              <Col sm={2}>
                <Form.Control
                  type="text"
                  placeholder="Temp3pm"
                  name="Temp3pm"
                  value={formData.Temp3pm}
                  onChange={this.handleChange}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Today's MAX. temp (celsius)
              </Form.Label>
              <Col sm={2}>
                <Form.Control
                  type="text"
                  placeholder="MaxTemp"
                  name="MaxTemp"
                  value={formData.MaxTemp}
                  onChange={this.handleChange}
                />{" "}
              </Col>

              <Form.Label column sm={2}>
                HUMIDITY...
              </Form.Label>

              <Form.Label column sm={1}>
                @9am
              </Form.Label>
              <Col sm={2}>
                <Form.Control
                  type="text"
                  placeholder="Humidity9am"
                  name="Humidity9am"
                  value={formData.Humidity9am}
                  onChange={this.handleChange}
                />
              </Col>

              <Form.Label column sm={1}>
                @3pm
              </Form.Label>
              <Col sm={2}>
                <Form.Control
                  type="text"
                  placeholder="Humidity3pm"
                  name="Humidity3pm"
                  value={formData.Humidity3pm}
                  onChange={this.handleChange}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                RAINFALL
              </Form.Label>
              <Col sm={2}>
                <Form.Control
                  type="text"
                  placeholder="Rainfall"
                  name="Rainfall"
                  value={formData.Rainfall}
                  onChange={this.handleChange}
                />{" "}
              </Col>

              <Form.Label column sm={2}>
                PRESSURE...
              </Form.Label>

              <Form.Label column sm={1}>
                @9am
              </Form.Label>
              <Col sm={2}>
                <Form.Control
                  type="text"
                  placeholder="Pressure9am"
                  name="Pressure9am"
                  value={formData.Pressure9am}
                  onChange={this.handleChange}
                />
              </Col>

              <Form.Label column sm={1}>
                @3pm
              </Form.Label>
              <Col sm={2}>
                <Form.Control
                  type="text"
                  placeholder="Pressure3pm"
                  name="Pressure3pm"
                  value={formData.Pressure3pm}
                  onChange={this.handleChange}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                DIRECTION of wind gust
              </Form.Label>
              <Col sm={2}>
                <Form.Control
                  as="select"
                  value={formData.WindGustDir}
                  name="WindGustDir"
                  onChange={this.handleChange}
                >
                  <option>N</option>
                  <option>NNE</option>
                  <option>NE</option>
                  <option>ENE</option>

                  <option>E</option>
                  <option>ESE</option>
                  <option>SE</option>
                  <option>SSE</option>

                  <option>S</option>
                  <option>SSW</option>
                  <option>SW</option>
                  <option>WSW</option>

                  <option>W</option>
                  <option>WNW</option>
                  <option>NW</option>
                  <option>NNW</option>
                </Form.Control>{" "}
              </Col>

              <Form.Label column sm={2}>
                DIRECTION of wind...
              </Form.Label>

              <Form.Label column sm={1}>
                @9am
              </Form.Label>
              <Col sm={2}>
                <Form.Control
                  as="select"
                  value={formData.WindDir9am}
                  name="WindDir9am"
                  onChange={this.handleChange}
                >
                  <option>N</option>
                  <option>NNE</option>
                  <option>NE</option>
                  <option>ENE</option>

                  <option>E</option>
                  <option>ESE</option>
                  <option>SE</option>
                  <option>SSE</option>

                  <option>S</option>
                  <option>SSW</option>
                  <option>SW</option>
                  <option>WSW</option>

                  <option>W</option>
                  <option>WNW</option>
                  <option>NW</option>
                  <option>NNW</option>
                </Form.Control>{" "}
              </Col>

              <Form.Label column sm={1}>
                @3pm
              </Form.Label>
              <Col sm={2}>
                <Form.Control
                  as="select"
                  value={formData.WindDir3pm}
                  name="WindDir3pm"
                  onChange={this.handleChange}
                >
                  <option>N</option>
                  <option>NNE</option>
                  <option>NE</option>
                  <option>ENE</option>

                  <option>E</option>
                  <option>ESE</option>
                  <option>SE</option>
                  <option>SSE</option>

                  <option>S</option>
                  <option>SSW</option>
                  <option>SW</option>
                  <option>WSW</option>

                  <option>W</option>
                  <option>WNW</option>
                  <option>NW</option>
                  <option>NNW</option>
                </Form.Control>{" "}
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                SPEED of wind gust
              </Form.Label>
              <Col sm={2}>
                <Form.Control
                  type="text"
                  placeholder="WindGustSpeed"
                  name="WindGustSpeed"
                  value={formData.WindGustSpeed}
                  onChange={this.handleChange}
                />{" "}
              </Col>

              <Form.Label column sm={2}>
                SPEED of wind...
              </Form.Label>

              <Form.Label column sm={1}>
                @9am
              </Form.Label>
              <Col sm={2}>
                <Form.Control
                  type="text"
                  placeholder="WindSpeed9am"
                  name="WindSpeed9am"
                  value={formData.WindSpeed9am}
                  onChange={this.handleChange}
                />
              </Col>

              <Form.Label column sm={1}>
                @3pm
              </Form.Label>
              <Col sm={2}>
                <Form.Control
                  type="text"
                  placeholder="WindSpeed3pm"
                  name="WindSpeed3pm"
                  value={formData.WindSpeed3pm}
                  onChange={this.handleChange}
                />
              </Col>

            </Form.Group>

            <Form.Group as={Row}>
            <Form.Label column sm={2}>
                rain TODAY?
              </Form.Label>
              <Col sm={2}>
                <Form.Control
                  as="select"
                  value={formData.RainToday}
                  name="RainToday"
                  onChange={this.handleChange}
                >
                  <option>No</option>
                  <option>Yes</option>
                </Form.Control>{" "}
              </Col>

            </Form.Group>

            <Row>
              <Col>
                <Button
                  block
                  variant="success"
                  disabled={isLoading}
                  onClick={!isLoading ? this.handlePredictClick : null}
                >
                  {isLoading ? "Making prediction" : "Predict"}
                </Button>
              </Col>
              <Col>
                <Button
                  block
                  variant="danger"
                  disabled={isLoading}
                  onClick={this.handleCancelClick}
                >
                  Reset prediction
                </Button>
              </Col>
            </Row>
          </Form>
          {result === "" ? null : (
            <Row>
              <Col className="result-container">
                <h5 id="result">{result}</h5>
              </Col>
            </Row>
          )}
        </div>
      </Container>
    );
  }
}

export default App;
