import './App.css'
// Need to import componenets for React Router
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
        <Nav/>
        <Home/>
        <Contact/>
        <About/>
        <Projects/>
        <Pokedex/>
        <Weather/>
        <Ranking/>
      </div>
    </>
  )
}

export default App
