import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { authState, getUsers, setAuth, setUsers } from '../../features';
import { readAuth } from "../../services";

export function useAuth ()
{
    const dispach = useDispatch();
    const auth = useSelector(authState);
    const navigate = useNavigate();

    function loadAuth ()
    {
        const auth = readAuth();
        if(!auth?.token) navigate("/login");
        dispach(setAuth(auth))
    }

    useEffect(() =>
    {
        loadAuth ();
    }, [])

    return {auth};
}

/* 
    async function loadUsers ()
    {
        if(!auth.token) return;
        const users = await getUsers(auth);
        console.log(users)
        dispach(setUsers(users))
    } 
    useEffect(() =>
    {
        loadUsers ();
    }, [auth.token])
*/