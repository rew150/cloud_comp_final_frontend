import React, {useState,useEffect, useContext} from 'react';
import {Table,Container,Button,Form} from 'react-bootstrap';
import { kyp } from '../utils/kyp';
import { groupBy } from '../utils/groupBy';
import {useHistory} from 'react-router';
import { TimetableContext } from '../Context/TimetableContext';

const zeroPad = (num, places) => String(num).padStart(places, '0');
const today = new Date();
const todayDueDate = `${today.getFullYear()}-${zeroPad(today.getMonth()+1,2)}-${today.getDate()}`

const Timetable = () => {
    const [dueDate, setDueDate] = useState(todayDueDate);
    const [doctor, setDoctor] = useState('');
    const [beginTime, setBegintime] = useState('');
    const [isAvailable, setIsAvailable] = useState('');
    const [data, setData] = useState([]);
    const history = useHistory();
    const {setTimeslot} = useContext(TimetableContext);
    function handleClick(t) {
        return () => {
            setTimeslot(t)
            history.push('/private/appointment');
        }
    }
    const getURL = `appointment/date/${dueDate}`


    useEffect(() => {
        (async () => {
            try {
                const res = await kyp.get(getURL).json()
                const appointments = res.appointments.map((v) => ({...v, beginTime: v.beginTime.slice(11,16)}))
                // console.log(appointments)
                const groups = groupBy(appointments, a => a.doctor)
                setData(Array.from(groups.entries()));
            } catch (error) {
                console.error(error)
            }
        })()
    },[getURL])
//   "appointments": [
//     {
//         "id": 1,
//         "doctor": "Mailueng",
//         "beginTime": "2021-04-27T10:00:00.000Z",
//         "isAvailable": true
//     },
//     {
//         "id": 12,
//         "doctor": "Peem",
//         "beginTime": "2021-04-27T17:30:00.000Z",
//         "isAvailable": true
//     },
//     {
//         "id": 7,
//         "doctor": "Mailueng",
//         "beginTime": "2021-04-27T17:30:00.000Z",
//         "isAvailable": true
//     },
//     {
//         "id": 18,
//         "doctor": "Trust",
//         "beginTime": "2021-04-27T17:30:00.000Z",
//         "isAvailable": true
//     }
// ],
//      "patientCount": {
//          "10:00": 1,
//          "11:30": 0,
//          "13:00": 0,
//          "14:30": 0,
//          "16:00": 0,
//          "17:30": 0
//      }
// }
    return (
        <Container>
            <Form.Group controlId="Date">
                <Form.Control type="date" min={todayDueDate} onChange={e => setDueDate(e.target.value)} />
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
                {
                    data.map(e => (
                        <tr key={e[0]}>
                            <th>{e[0]}</th>
                            {
                                [...e[1]].sort().map(timeslot => (
                                    <td key={timeslot.id}>
                                        {
                                            timeslot.isAvailable ? (
                                                <Button onClick={handleClick(timeslot)}>ว่าง</Button>
                                            ) : (
                                                <Button variant="danger">เต็ม</Button>
                                            )
                                        }
                                    </td>
                                ))
                            }
                        </tr>
                    ))
                }
                
            </tbody>
            </Table>
            
        </Container>
    )
}

export default Timetable;
