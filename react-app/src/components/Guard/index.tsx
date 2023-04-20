import { FunctionComponent, ReactNode, Fragment } from "react";
import { useAuth, useDebts } from "../../hooks";
import { IAuth } from "../../models";
import { Header } from '../../components';

type AuthNode = ({auth} : {auth:IAuth}) => ReactNode;

interface GuardProps
{
    children: FunctionComponent<any>,
}

export function Guard ({children} : GuardProps)
{
    const { auth } = useAuth();
    const debts = useDebts();

    const loading = !auth || !debts.list;

    return (
        <Fragment>
            <Header navigation={!loading}/>
            {children(auth, debts)}
        </Fragment>
    );
}