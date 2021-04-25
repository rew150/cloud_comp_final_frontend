import React, { useReducer } from 'react'
import {Form, FormGroup, Label, Input, FormText, Button, Alert,Container} from 'reactstrap'

const initialState = {
  showBody: false,
  patientName: "",
  patientAge: "",
  gender: "",
  aptDate: "",
  aptTime: "",
  aptNotes: "",
  formErrors: false
};

function reducer(state, action) {
  switch (action.type) {
    case 'setState':
      return {
        ...state,
        ...action.state,
      }
    case 'save':
      const { patientName, patientAge, gender, aptDate, aptTime, aptNotes } = state;
      if (patientName !== "" && patientAge !== "" && gender !== "" && aptDate !== "" && aptTime !== "" && aptNotes !== "") {
        const apt = {
          id: Date.now(),
          patientName: state.patientName,
          patientAge: state.patientAge,
          gender: state.gender,
          aptDate: state.aptDate + ' ' + state.aptTime,
          aptNotes: state.aptNotes
        };
        console.log(apt)
  
        const clear = {
          patientName: "",
          patientAge: "",
          gender: "",
          aptDate: "",
          aptTime: "",
          aptNotes: "",
        };
  
        return {
          ...state,
          formErrors: false,
          showBody: false,
          ...clear
        };
        // props.saveApt(apt);
  
      } else {
        return {
          ...state,
          formErrors: true
        };
      }
    default:
      return state;
  }
}

function Appointment(props) {

  const [state, dispatch] = useReducer(reducer, initialState)

  function setState(state) {
    dispatch({
      type: 'setState',
      state
    })
  }

  function save(e) {
    e.preventDefault();
    dispatch({ type: 'save' })
  }


  function handleChange(event) {
    setState({
      [event.target.id]: event.target.value
    })
  }

  const errors = {
    display: state.formErrors ? 'block' : 'none'
  };

  return (
    <Container>
      <h3>Appointment</h3>

      <FormText color="muted" className="mb-1">
        <span className="text-danger">*</span>All fields are required
      </FormText>

      <Form onSubmit={save}>
        <FormGroup>
          <Label for="patientName">Patient Name</Label>
          <Input type="text" id="patientName" placeholder="Patient's name" value={state.patientName} onChange={handleChange} />
        </FormGroup>

        <FormGroup>
          <Label for="patientAge">Age</Label>
          <Input type="number" id="patientAge" placeholder="Patient's age" value={state.patientAge} onChange={handleChange} />
        </FormGroup>

        <FormGroup>
          <Label for="gender">Gender</Label>
          <Input type="select" id="gender" value={state.gender} onChange={handleChange} >
            <option>Select gender</option>
            <option>Male</option>
            <option>Female</option>
          </Input>
        </FormGroup>

        <FormGroup>
          <Label for="aptDate">Date</Label>
          <Input type="date" id="aptDate" value={state.aptDate} onChange={handleChange} />
        </FormGroup>

        <FormGroup>
          <Label for="aptTime">Time</Label>
          <Input type="time" id="aptTime" value={state.aptTime} onChange={handleChange} />
        </FormGroup>

        <FormGroup>
          <Label for="exampleText">Problem</Label>
          <Input type="textarea" id="aptNotes" placeholder="Notes" value={state.aptNotes} onChange={handleChange} />
        </FormGroup>

        <Alert color="danger" style={errors}>
          Please fill all the details
        </Alert>

        <Button type="submit" color="primary" block>Add Appointment</Button>
      </Form>
    </Container>
  );
}

export default Appointment;
