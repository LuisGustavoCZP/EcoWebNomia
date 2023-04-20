import { IDebts, IAuth } from '../models';
import { Login, Main, Register, Debts, Logout } from '../pages';
import {Guard} from "../components";
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
                <Route path='' element={(<Guard>{(auth : IAuth, debts : IDebts) => (<Main auth={auth} debts={debts}/>)}</Guard>)}/>
                <Route path='/debts' element={(<Guard>{(auth : IAuth, debts : IDebts) => (<Debts auth={auth} debts={debts}/>)}</Guard>)}/>
                <Route path='/gains' element={(<Guard>{(auth : IAuth, debts : IDebts) => (<Debts auth={auth} debts={debts}/>)}</Guard>)}/>
                <Route path='/logout' element={(<Guard>{(auth : IAuth, debts : IDebts) => (<Logout/>)}</Guard>)}/>
            </Route>
            
        </Routes>
    );
}