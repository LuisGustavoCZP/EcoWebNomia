import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { authState, setAuth } from '../../features';
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
        if(!auth || !auth.token) loadAuth ();
    }, [])

    return {auth};
}