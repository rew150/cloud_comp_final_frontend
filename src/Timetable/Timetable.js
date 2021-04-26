import React, {useState} from 'react';
import {Table,Container,Button,Form} from 'react-bootstrap';

const Timetable = () => {
    var today = new Date();
    today.setHours(today.getHours() + 7);
    const [startDate, setStartDate] = useState(today.toJSON().slice(0,10));
    return (
        <Container>
            <Form.Group controlId="Date">
                
                <Form.Control  type="date" min={new Date().toJSON().slice(0,10)} value={startDate} onChange={e => setStartDate(e.target.value)} />
            </Form.Group>
            <h3>ตารางนัดหมอ วันที่ {startDate}</h3>
            <Table striped bordered hover>
            <thead>
                <tr>
                    <th></th>
                    <th>10.00-11.30 </th>
                    <th>11.30-13.00</th>
                    <th>13.00-14.30</th>
                    <th>14.30-16.00</th>
                    <th>16.00-17.30</th>
                    <th>17.30-19.00</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>หมอ A</td>
                    <td><Button>ว่าง</Button></td>
                    <td><Button>ว่าง</Button></td>
                    <td><Button variant="danger">เต็มแล้ว</Button></td>
                    <td><Button>ว่าง</Button></td>
                    <td><Button variant="danger">เต็มแล้ว</Button></td>
                    <td><Button variant="danger">เต็มแล้ว</Button></td>
                </tr>
                <tr>
                    <td>หมอ B</td>
                    <td><Button variant="danger">เต็มแล้ว</Button></td>
                    <td><Button variant="danger">เต็มแล้ว</Button></td>
                    <td><Button variant="danger">เต็มแล้ว</Button></td>
                    <td><Button>ว่าง</Button></td>
                    <td><Button>ว่าง</Button></td>
                    <td><Button variant="danger">เต็มแล้ว</Button></td>
                </tr>
                <tr>
                    <td>หมอ C</td>
                    <td><Button>ว่าง</Button></td>
                    <td><Button variant="danger">เต็มแล้ว</Button></td>
                    <td><Button variant="danger">เต็มแล้ว</Button></td>
                    <td><Button>ว่าง</Button></td>
                    <td><Button>ว่าง</Button></td>
                    <td><Button variant="danger">เต็มแล้ว</Button></td>
                </tr>
                
            </tbody>
            </Table>
            
        </Container>
    )
}

export default Timetable
