import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { authState, getDebts } from '../../features';
import { IDebt } from '../../interfaces';

export function useDebts ()
{
    const auth = useSelector(authState);
    const [debts, setDebts] = useState<IDebt[] | undefined>(undefined);
    
    async function loadDebts() 
    {
        if(!auth.token) return;
        setDebts(undefined);
        const response = await getDebts(auth);
        setDebts(response);
    }

    useEffect(() => 
    {
        if(!debts || debts.length === 0) loadDebts();
    }, [auth.token])

    return {list:debts, reload:loadDebts};
}