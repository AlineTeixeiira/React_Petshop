import './App.css';
import Logo from './components/template/Logo';
import Menu from './components/template/Menu';
import { BrowserRouter } from 'react-router-dom';
import Rotas from './Rotas';

export default function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Logo/>
        <Menu/>
        <Rotas/>
      </div>
    </BrowserRouter>
  );
}
