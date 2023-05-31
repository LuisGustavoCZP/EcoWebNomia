import { Fragment, FunctionComponent } from "react";
import { Header, Loading } from '../../components';
import { useAuth } from "../../hooks";

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