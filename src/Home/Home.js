import React, { useEffect, useState } from 'react';
import { Button, Card } from 'antd';
import {useHistory} from 'react-router';
import {Container, Form, Table } from 'react-bootstrap'
import { kyp } from '../utils/kyp';

const zeroPad = (num, places) => String(num).padStart(places, '0');
const today = new Date();
const todayDueDate = `${today.getFullYear()}-${zeroPad(today.getMonth()+1,2)}-${today.getDate()}`

const fetching = async (setNum) => {
  try {
    const num = await kyp.get('info').text()
    setNum(num)
  } catch (error) {
    console.error(error)
  }
  setTimeout(() => {
    fetching(setNum)
  }, 3000);
}

function Home() {
  
  const history = useHistory();
  const [dueDate, setDueDate] = useState(todayDueDate);
  const [isFirstTime, setIsFirstTime] = useState(true);
  const [num, setNum] = useState();
  const [patientCount, setPatientCount] = useState([]);

  const getURL = `appointment/date/${dueDate}`


  useEffect(() => {
      (async () => {
          try {
              const res = await kyp.get(getURL).json()
              // console.log(appointments)
              setPatientCount(Object.entries(res.patientCount));
          } catch (error) {
              console.error(error)
          }
      })()
  },[getURL])

  useEffect(() => {
    if (isFirstTime) {
      setIsFirstTime(false);
      fetching(setNum);
    }
  }, []);

  return (
    <Container>
      <h1>HOME</h1>
      <Card title="จำนวนคนตอนนี้" style={{ maxWidth: 300, margin: '50px 0px 50px 0px' }}>
        <p><b>{num}</b></p>
      </Card>
      <h3>ข้อมูลจำนวนการนัด วันที่ {dueDate}</h3>
      <Form.Control type="date" min={todayDueDate} onChange={e => setDueDate(e.target.value)} />
      <Table striped bordered hover style={{marginTop: '20px'}}>
        <thead>
          <tr>
            <th>เวลา</th>
            <th>จำนวนคน</th>
          </tr>
        </thead>
        <tbody>
          {
            patientCount.map(([time, count]) => (
              <tr key={time}>
                <td>{time}</td>
                <td>{count}</td>
              </tr>
            ))
          }
        </tbody>
      </Table>
    </Container>
  )
}
export default Home;
