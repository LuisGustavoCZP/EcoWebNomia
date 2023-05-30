import { createContext, ReactNode, useEffect, useState } from "react";
import { IDebt } from "../interfaces";
import { useDebts } from "../hooks";
import { Loading } from '../components';

interface DebtsContextProps
{
    children? : ReactNode
}

interface IDebtsContext
{
    list: IDebt[],
    reload: () => Promise<void>
}

const DEFAULT : IDebtsContext = {
    list: [] as IDebt[],
    reload: async () => {}
}

export const DebtsContext = createContext(DEFAULT);

export function DebtsProvider ({children} : DebtsContextProps)
{
    const {list, reload} = useDebts();

    const loading = !list;

    if(loading)
    {
        return <Loading size={200}/>;
    }

    const value = {
        list,
        reload
    };

    return (
        <DebtsContext.Provider value={value}>
            {children}
        </DebtsContext.Provider>
    );
}