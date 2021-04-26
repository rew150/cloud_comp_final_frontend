import React, {useState,useEffect} from 'react';
import {Table,Container,Button,Form} from 'react-bootstrap';
import { kyp } from '../utils/kyp';


const Timetable = () => {
    var today = new Date();
    today.setHours(today.getHours() + 7);
    const [dueDate, setDueDate] = useState(today.toJSON().slice(0,10));
    const [doctor, setDoctor] = useState('');
    const [beginTime, setBegintime] = useState('');
    const [isAvailable, setIsAvailable] = useState('');
    const getURL = "/appointment/date/2021-04-26"


    useEffect(() => {
        (async () => {
            kyp.get(getURL).
        })()
    },[])


    return (
        <Container>
            <Form.Group controlId="Date">
                <Form.Control type="date" min={new Date().toJSON().slice(0,10)}  onChange={e => setDueDate(e.target.value)} />
            </Form.Group>
            <h3>ตารางนัดหมอ วันที่ {dueDate} </h3>
            <Table striped bordered hover>
            <thead class = "text-center">
                <tr >
                    <th></th>
                    <th>10.00-11.30 </th>
                    <th>11.30-13.00</th>
                    <th>13.00-14.30</th>
                    <th>14.30-16.00</th>
                    <th>16.00-17.30</th>
                    <th>17.30-19.00</th>
                </tr>
            </thead>
            <tbody  class = "text-center" >
                
                
            </tbody>
            </Table>
            
        </Container>
    )
}

export default Timetable;
