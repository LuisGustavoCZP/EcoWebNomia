import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import { authState, getUsers, readAuth, setAuth, setUsers } from './features';
import { Router } from './routes';
import { Header } from './components';

function App() 
{
  const dispach = useDispatch();
  const { token } = useSelector(authState);
  
  function loadAuth ()
  {
    const auth = readAuth();
    dispach(setAuth(auth))
  }

  async function loadUsers ()
  {
    if(token) return;
    const users = await getUsers(token);;
    dispach(setUsers(users))
  }

  useEffect(() =>
  {
    loadAuth ();
  }, [])

  useEffect(() =>
  {
    loadUsers ();
  }, [token])

  return (
    <div>
      <Header />
      <HashRouter>
        <Router />
      </HashRouter>
    </div>
  );
}

export default App;
