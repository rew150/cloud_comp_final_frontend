import './App.css';
import 'antd/dist/antd.css';
import { matchPath, Switch, useLocation } from 'react-router';
import { Link, Route } from 'react-router-dom';
import About from './About/About';
import Home from './Home/Home';
import { Affix, Tooltip } from 'antd';
import { UpSquareFilled } from '@ant-design/icons';
import RegisterLogin from './RegisterLogin/RegisterLogin';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from './Auth/AuthContext';
import PrivateApp from './PrivateApp';
import Timetable from './Timetable/Timetable';

function activeSpreder(expect, current, exact = false) {
  if (matchPath(current, { path: expect, exact })) {
    return {
      className: 'Navbar-active'
    }
  } else {
    return {}
  }
}

function scrollTotop() {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth',
  })
}

function App() {
  const location = useLocation()

  const { userID, fetchContext, clearContext } = useContext(AuthContext);
  const [isFirstTime, setIsFirstTime] = useState(true);

  useEffect(() => {
    if (isFirstTime) {
      setIsFirstTime(false);
      fetchContext();
    }
  }, [isFirstTime, fetchContext])

  return (
    <div className="App">
      <nav className="Navbar">
        <ul>
          {
            userID ? (
              <></>
            ) : (
              <li>
                <Link to="/login" className={activeSpreder("/login", location.pathname).className + ' Navbar-bright'}>
                  สมัครสมาชิก / เข้าสู่ระบบ
                </Link>
              </li>
            )
          }
          <li>
            <Link to="/" {...activeSpreder("/", location.pathname, true)}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" {...activeSpreder("/about", location.pathname)}>
              About
            </Link>
          </li>
          {
            userID ? (
              <>
                <li>
                  <Link to="/private/appointment" {...activeSpreder("/private/appointment", location.pathname)}>
                    Appointment
                  </Link>
                </li>
                <li>
                  <Link to="/private/about" {...activeSpreder("/private/about", location.pathname)}>
                    About2
                  </Link>
                </li>
                <li className='Navbar-right'>
                  <Link className='Navbar-bright' to="/" onClick={clearContext}>
                    ออกจากระบบ
                  </Link>
                </li>
              </>
            ): <></>
          }
        </ul>
      </nav>

      <section className="App-mainbody">
        <Switch>
          <Route path="/login">
            <RegisterLogin />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/private">
            <PrivateApp />
          </Route>
          <Route path = "/timetable">
            <Timetable />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </section>

      <Affix className='App-toTop'>
        <Tooltip placement='topLeft' title='To the top'>
          <UpSquareFilled onClick={scrollTotop} />
        </Tooltip>
      </Affix>
    </div>
  );
}

export default App;
