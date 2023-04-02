import { Login, Main, Register } from '../pages';
import { Routes, Route } from "react-router-dom";

export function Router ()
{
    return (
        <Routes>
            <Route path='/' element={<Main/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/register' element={<Register/>}/>
        </Routes>
    );
}