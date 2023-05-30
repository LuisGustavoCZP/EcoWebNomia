import { IDebts, IAuth } from '../interfaces';
import { Login, Main, Register, Debts, Logout } from '../pages';
import { Guard } from "../components";
import { DebtsProvider } from '../context';
import { Routes, Route } from "react-router-dom";

export function Router ()
{
    return (
        <Routes>
            <Route path='/login' element={<Login/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route 
                path='/'
            >
                <Route path='' element={(<Guard>{(auth : IAuth, debts : IDebts) => (<DebtsProvider><Main auth={auth} debts={debts}/></DebtsProvider>)}</Guard>)}/>
                <Route path='/debts' element={(<Guard>{(auth : IAuth, debts : IDebts) => (<DebtsProvider><Debts auth={auth} debts={debts}/></DebtsProvider>)}</Guard>)}/>
                <Route path='/gains' element={(<Guard>{(auth : IAuth, debts : IDebts) => (<DebtsProvider><Debts auth={auth} debts={debts}/></DebtsProvider>)}</Guard>)}/>
                <Route path='/logout' element={(<Guard>{(auth : IAuth, debts : IDebts) => (<Logout/>)}</Guard>)}/>
            </Route>
            
        </Routes>
    );
}