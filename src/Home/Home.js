import React from 'react';
import { Button } from 'antd';
import {useHistory} from 'react-router';
import {Container } from 'react-bootstrap'

function Home() {
  
  const history = useHistory();

  function handleClick() {
    history.push('/timetable');
  }

  return (
    <Container>
      <h1>HOME</h1>
      
      <Button type='primary' onClick = {handleClick}>เริ่มนัดหมอ</Button>
    </Container>
  )
}
export default Home;
