import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from "react-redux";
import store from "./store.jsx";
import Nav from './components/Nav.jsx'
import Home from './components/Home.jsx'
import Contact from './components/Contact.jsx'
import About from './components/About.jsx'
import Projects from './components/Projects.jsx'
import PokedexApp from './components/PokedexApp.jsx'
import WeatherApp from './components/WeatherApp.jsx'
import CRUDApp from './components/CRUDApp.jsx'
import Footer from "./components/Footer.jsx";

function App() {

  return (
    <Provider store={store}>
      <div className="flex flex-col h-screen">
        <Nav className="sticky top-0 z-50"/>
          <Routes>
                <Route index element={<Home/>} />
                <Route path='/about' element={<About/>} />
                <Route path='/contact' element={<Contact/>} />
                <Route path='/projects' element={<Projects/>} /> 
                <Route path='/table' element={<CRUDApp/>} />
                <Route path='/weather' element={<WeatherApp/>} />
                <Route path='/pokedex' element={<PokedexApp/>} />
          </Routes>
          <Footer className="sticky bottom-0 z-50"/>
        </div>
    </Provider>
  );
}

export default App
