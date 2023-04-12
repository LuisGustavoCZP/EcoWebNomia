import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authState, debtsState, getDebts, setDebts } from '../../features';

export function useDebts ()
{
    const dispach = useDispatch();
    const auth = useSelector(authState);
    const {debts} = useSelector(debtsState);
    
    async function loadDebts() 
    {
        if(!auth.token) return;

        const response = await getDebts(auth);
        dispach(setDebts(response))
    }

    useEffect(() => 
    {
        loadDebts()
    }, [auth.token])

    return {debts};
}