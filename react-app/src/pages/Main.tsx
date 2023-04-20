import { Fragment } from "react";
import { UserProps } from "../models";

export function Main ({auth, debts} : UserProps)
{
    return (
        <Fragment>
            <main>
                <h2>Olá, {auth.name}</h2>
            </main>
        </Fragment>
    );
}