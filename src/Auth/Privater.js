import './Privater.css';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { Spinner } from 'reactstrap';
import { AuthContext } from './AuthContext';
import { message } from 'antd';

function Privater({ children }) {
  const { fetchContext } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isFirstTime, setIsFirstTime] = useState(true);

  const history = useHistory();

  useEffect(() => {
    if (isFirstTime) {
      (async () => {
        setIsLoading(true);
        const ok = await fetchContext();
        if (!ok) {
          history.push('/login')
          message.error("ไม่สามารถยืนยันตัวตนได้ กรุณาเข้าสู่ระบบใหม่อีกครั้ง")
        }
        setIsLoading(false);
      })();
      setIsFirstTime(false);
    }
  }, [fetchContext, history, isFirstTime])

  return (
    <>
      {children}
      {
        isLoading ? (
          <div className='private-page-loading-page'>
            <Spinner color='light' />
            <p className='private-page-loading-text'>Loading</p>
          </div>
        ) : <></>
      }
    </>
  );
}
export default Privater;
