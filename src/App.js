import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from "react-redux";
import store from "./store";
import Nav from './components/Nav'
import Home from './components/Home'
import Contact from './components/Contact'
import About from './components/About'
import Projects from './components/Projects'
import Pokedex from './components/Pokedex'
import WeatherApp from './components/Weather'
import Ranking from './components/Ranking'
import Footer from "./Footer.js";

function App() {

  return (
    <Provider store={store}>
      <BrowserRouter>
      <div className="App">
        <Nav/>
        {/* Contains website data in multiple routes */}
          <Routes>
                <Route index element={<Home />} />
                <Route path='/about' element={<About/>} />
                <Route path='/contact' element={<Contact/>} />
                <Route path='/projects' element={<Projects/>} /> 
                <Route path='/ranking' element={<Ranking/>} />
                <Route path='/weather' element={<WeatherApp/>} />
                <Route path='/Pokedex' element={<Pokedex/>} />
          </Routes >
          <Footer/>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App
