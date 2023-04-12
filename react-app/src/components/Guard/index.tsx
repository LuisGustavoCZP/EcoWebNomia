import { FunctionComponent, ReactNode } from "react";
import { useAuth } from "../../hooks/use-auth";
import { IAuth } from "../../models";

type AuthNode = ({auth} : {auth:IAuth}) => ReactNode;

interface GuardProps 
{
    children: FunctionComponent<any>,
}

export function Guard ({children} : GuardProps)
{
    const { auth } = useAuth();
    return (
        <div>
            {children(auth)}
        </div>
    );
}