import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from "react-redux";
import store from "./store.jsx";
import Nav from './components/Nav.jsx'
import Home from './components/Home.jsx'
import Contact from './components/Contact.jsx'
import About from './components/About.jsx'
import Projects from './components/Projects.jsx'
import Pokedex from './components/Pokedex.jsx'
import WeatherApp from './components/WeatherApp.jsx'
import Ranking from './components/RankingApp.jsx'
import Footer from "./components/Footer.jsx";

function App() {

  return (
    <Provider store={store}>
      <BrowserRouter>
      <div className="App">
        <Nav/>
          <Routes>
                <Route index element={<Home/>} />
                <Route path='/about' element={<About/>} />
                <Route path='/contact' element={<Contact/>} />
                <Route path='/projects' element={<Projects/>} /> 
                <Route path='/ranking' element={<Ranking/>} />
                <Route path='/weather' element={<WeatherApp/>} />
                <Route path='/Pokedex' element={<Pokedex/>} />
          </Routes>
          <Footer/>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App
