import { HashRouter } from 'react-router-dom';

import "./styles/app.css";
import "./styles/button.css";
import "./styles/general-main.css";
import { Router } from './routes';

function App() 
{
  return (
    <div className='App'>
      <HashRouter>
        <Router/>
      </HashRouter>
    </div>
  );
}

export default App;
