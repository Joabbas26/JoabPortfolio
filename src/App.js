import './App.css'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Nav from './components/Nav'
import Home from './components/Home'
import Contact from './components/Contact'
import About from './components/About'
import Projects from './components/Projects'
import Pokedex from './components/Pokedex'
import Weather from './components/Weather'
import Ranking from './components/Ranking'

function App() {

  return (
    <>
      <div>
        <Router>
          <Route>
            <Nav/>
          </Route>
          <Route>
            <Home/>
          </Route>
          <Route>
            <Contact/>
          </Route>
          <Route>
            <About/>
          </Route>
          <Route>
            <Projects/>
          </Route>
          <Route>
            <Pokedex/>
          </Route>
          <Route>
            <Weather/>
          </Route>
          <Route>
            <Ranking/>
          </Route>
        </Router>
      </div>
    </>
  )
}

export default App
