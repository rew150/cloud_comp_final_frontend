import React from 'react'
import {Form, FormGroup, Label, Input, FormText, Button, Alert,Container} from 'reactstrap'


class Appointment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showBody: false,
      patientName: "",
      patientAge: "",
      gender: "",
      aptDate: "",
      aptTime: "",
      aptNotes: "",
      formErrors: false
    };
  }

  save = (e) => {
    e.preventDefault();
    const { patientName, patientAge, gender, aptDate, aptTime, aptNotes } = this.state;
    if (patientName !== "" && patientAge !== "" && gender !== "" && aptDate !== "" && aptTime !== "" && aptNotes !== "") {
      let apt = {
        id: Date.now(),
        patientName: this.state.patientName,
        patientAge: this.state.patientAge,
        gender: this.state.gender,
        aptDate: this.state.aptDate + ' ' + this.state.aptTime,
        aptNotes: this.state.aptNotes
      };

      let clear = {
        patientName: "",
        patientAge: "",
        gender: "",
        aptDate: "",
        aptTime: "",
        aptNotes: "",
      };

      this.setState({
        formErrors: false,
        showBody: false,
        ...clear
      });
      this.props.saveApt(apt);

    } else {
      this.setState({ 
        formErrors: true
      });
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }
  
  render() {
    let errors = {
      display: this.state.formErrors ? 'block' : 'none'
    };
    
    return (
      <Container>
          <h3>Appointment</h3>

          <FormText color="muted" className="mb-1">
            <span className="text-danger">*</span>All fields are required
          </FormText>

          <Form onSubmit={this.save}>
            <FormGroup>
              <Label for="patientName">Patient Name</Label>
              <Input type="text" id="patientName" placeholder="Patient's name" value={this.state.patientName} onChange={this.handleChange} />
            </FormGroup>

            <FormGroup>
              <Label for="patientAge">Age</Label>
              <Input type="number" id="patientAge" placeholder="Patient's age" value={this.state.patientAge} onChange={this.handleChange} />
            </FormGroup>

            <FormGroup>
              <Label for="gender">Gender</Label>
              <Input type="select" id="gender" value={this.state.gender} onChange={this.handleChange} >
                <option>Select gender</option>
                <option>Male</option>
                <option>Female</option>
              </Input>
            </FormGroup>

            <FormGroup>
              <Label for="aptDate">Date</Label>
              <Input type="date" id="aptDate" value={this.state.aptDate} onChange={this.handleChange} />
            </FormGroup>

            <FormGroup>
              <Label for="aptTime">Time</Label>
              <Input type="time" id="aptTime" value={this.state.aptTime} onChange={this.handleChange} />
            </FormGroup>

            <FormGroup>
              <Label for="exampleText">Problem</Label>
              <Input type="textarea" id="aptNotes" placeholder="Notes" value={this.state.aptNotes} onChange={this.handleChange} />
            </FormGroup>

            <Alert color="danger" style={errors}>
              Please fill all the details
            </Alert>

            <Button type="submit" color="primary" block>Add Appointment</Button>
          </Form>
      </Container>
    )
  }
}

export default Appointment;