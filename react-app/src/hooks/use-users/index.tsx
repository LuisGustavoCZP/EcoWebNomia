import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers, setUsers, authState } from '../../features';
import { IAuth } from '../../models';

export function useUsers ()
{
    const auth = useSelector(authState);
    const dispach = useDispatch();

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

    return {auth};
}