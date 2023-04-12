import { AuthProps, IAuth } from '../models';
import { Login, Main, Register, Debts, Logout } from '../pages';
import {Guard} from "../components";
import { Routes, Route } from "react-router-dom";

export function Router ()
{
    return (
        <Routes>
            <Route path='/logout' element={<Logout/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='/' element={(<Guard>{(auth : IAuth) => (<Main auth={auth}/>)}</Guard>)}/>
            <Route path='/debts' element={(<Guard>{(auth : IAuth) => (<Debts auth={auth}/>)}</Guard>)}/>
        </Routes>
    );
}