import { HashRouter } from 'react-router-dom';
import { Header } from './components';

import "./App.css";
import "./styles/button.css";
import "./styles/general-main.css";
import { Router } from './routes';

function App() 
{
  return (
    <div className='App'>
      <HashRouter>
        <Header />
        <Router/>
      </HashRouter>
    </div>
  );
}

export default App;
