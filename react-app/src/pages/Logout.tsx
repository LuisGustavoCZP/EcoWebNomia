import { Fragment, useEffect } from "react";
import { eraseAuth } from "../services";
import { Header } from '../components';

export function Logout ()
{

    useEffect(() => 
    {
        eraseAuth();
        window.location.reload()
    });

    return (
        <Fragment>
            <Header />
            <main>
                <h2>Saindo...</h2>
            </main>
        </Fragment>
    );
}