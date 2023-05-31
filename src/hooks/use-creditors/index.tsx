import { useEffect, useState } from "react";
import { useDebts } from "../use-debts";
import { useUsers } from "../use-users";

export function useCreditors ()
{
    const {list: debts} = useDebts();
    const {users} = useUsers();
    const [creditors, setCreditors] = useState<string[]>([]);
    const [userCreditors, setUserCreditors] = useState<string[]>([]);
    const [possibleCreditors, setPossibleCreditors] = useState<string[]>([]);
    
    useEffect(() => 
    {
        const crs = new Set<string>();
        debts?.forEach((debt) => 
        {
            const {creditor} = debt;
            if(!crs.has(creditor)) crs.add(creditor);
        });
        setCreditors(Array.from(crs));
    }, [debts]);

    useEffect(() => 
    {
        if(!users) return;
        const crs = users? users.map((user) => user.name) : [];
        setUserCreditors(Array.from(crs));
    }, [users]);

    useEffect(() => 
    {
        setPossibleCreditors(Array(...userCreditors, ...creditors));
    }, [userCreditors, creditors]);

    return [possibleCreditors, creditors];
}