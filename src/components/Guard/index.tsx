import { FunctionComponent, ReactNode, Fragment } from "react";
import { useAuth, useDebts } from "../../hooks";
import { IAuth } from "../../interfaces";
import { Header, Loading } from '../../components';

type AuthNode = ({auth} : {auth:IAuth}) => ReactNode;

interface GuardProps
{
    children: FunctionComponent<any>,
}

export function Guard ({children} : GuardProps)
{
    const { auth } = useAuth();

    const loading = !auth;

    return (
        <Fragment>
            <Header navigation={!loading}/>
            {loading ? <Loading size={200}/> : children(auth)}
        </Fragment>
    );
}