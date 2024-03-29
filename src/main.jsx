import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import 'tailwindcss/tailwind.css';
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
)