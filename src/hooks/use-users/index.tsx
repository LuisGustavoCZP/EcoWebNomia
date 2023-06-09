import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authState, getUsers, setUsers, usersState } from '../../features';

export function useUsers ()
{
    const {users} = useSelector(usersState);
    const auth = useSelector(authState);
    const dispach = useDispatch();

    async function loadUsers ()
    {
        if(!auth.token) return;
        const response = await getUsers(auth);
        
        dispach(setUsers(response))

        //console.log(response)
    } 

    useEffect(() =>
    {
        if(!users) loadUsers ();
    }, [auth.token])

    return {users, loadUsers};
}