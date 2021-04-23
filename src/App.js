import './App.css';
import 'antd/dist/antd.css';
import { matchPath, Switch, useLocation } from 'react-router';
import { Link, Route } from 'react-router-dom';
import About from './About/About';
import Home from './Home/Home';

function activeSpreder(expect, current, exact = false) {
  if (matchPath(current, { path: expect, exact })) {
    return {
      className: 'Navbar-active'
    }
  } else {
    return {}
  }
}

function App() {
  const location = useLocation()

  return (
    <div className="App">
      <nav className="Navbar">
        <ul>
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
        </ul>
      </nav>

      <section className="App-mainbody">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/about">
            <About />
          </Route>
        </Switch>
      </section>
    </div>
  );
}

export default App;
