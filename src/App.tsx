import { HashRouter } from 'react-router-dom';

import "./styles/app.css";
import "./styles/button.css";
import "./styles/general-main.css";
import { Router } from './routes';
import { Theme } from './context/ThemeContext';

function App() 
{
  return (
    <div className='App'>
      <Theme>
        <HashRouter>
          <Router/>
        </HashRouter>
      </Theme>
    </div>
  );
}

export default App;
