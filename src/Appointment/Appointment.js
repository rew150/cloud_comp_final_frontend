import { message } from 'antd';
import { Modal } from 'antd';
import ky from 'ky';
import React, { useReducer, useContext, useEffect } from 'react'
import { useHistory } from 'react-router';
import {Form, FormGroup, Label, Input, FormText, Button, Alert,Container} from 'reactstrap'
import { TimetableContext } from '../Context/TimetableContext';
import { kyp } from '../utils/kyp';

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
  const { timeslot } = useContext(TimetableContext)
  const history = useHistory();

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

  async function handleSubmit() {
    const data = {
      information: state.aptNotes,
      appointmentId: timeslot.id,
    }
    try {
      const res = await kyp.post('appointment/booking', {json:data}).json()
      Modal.success({
        title: 'Successful',
        content: (
          <>
            <p>ID: {res.id}</p>
            <p>Begin time: {res.beginTime}</p>
          </>
        ),
        afterClose: () => history.push('/timetable')
      })
    } catch (error) {
      if (error instanceof ky.HTTPError) {
        if (error.response.status === 400) {
          message.error('กรุณากรอกให้ถูกต้อง')
        } else if (error.response.status === 409) {
          message.error('ช่องเต็มแล้ว กรุณาจองใหม่',() => history.push('/timetable'))
        } else {
          message.error(`${error.response.status} - ${(await error.response.json()).message}`)
        }
      } else if (error instanceof ky.TimeoutError) {
        message.error('timeout')
      } else {
        console.error(JSON.stringify(error))
        message.error('Unexpected error')
      }
    }
  }

  const errors = {
    display: state.formErrors ? 'block' : 'none'
  };

  useEffect(() => {
    if (!timeslot) {
      message.error('กรุณาเลือกเวลาก่อน')
      history.push('/timetable')
    }
  }, [timeslot])

  return (
    <Container>
      <h3>Appointment (id: {timeslot.id}, Availability: {timeslot.isAvailable ? 'Yes': 'No'})</h3>
      <p>
        Doctor: {timeslot.doctor}
      </p>
      <p>
        Begin Time: {timeslot.beginTime}
      </p>
      <FormText color="muted" className="mb-1">
        <span className="text-danger">*</span>All fields are required
      </FormText>

      {/* <Form onSubmit={save}>
        <FormGroup>
          <Label for="patientName">Patient Name</Label>
          <Input type="text" id="patientName" placeholder="Patient's name" value={state.patientName} onChange={handleChange} />
        </FormGroup> */}

        {/* <FormGroup>
          <Label for="patientAge">Age</Label>
          <Input type="number" id="patientAge" placeholder="Patient's age" value={state.patientAge} onChange={handleChange} />
        </FormGroup> */}

        {/* <FormGroup>
          <Label for="gender">Gender</Label>
          <Input type="select" id="gender" value={state.gender} onChange={handleChange} >
            <option>Select gender</option>
            <option>Male</option>
            <option>Female</option>
          </Input>
        </FormGroup> */}

        <FormGroup>
          <Label for="exampleText">Problem</Label>
          <Input type="textarea" id="aptNotes" placeholder="Notes" value={state.aptNotes} onChange={handleChange} />
        </FormGroup>

        <Alert color="danger" style={errors}>
          Please fill all the details
        </Alert>

        <Button color="primary" onClick={handleSubmit}>Add Appointment</Button>
    </Container>
  );
}

export default Appointment;
