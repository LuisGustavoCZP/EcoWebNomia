import { AuthProps } from "../models";

export function Main ({auth} : AuthProps)
{
    return (
        <main>
            <h2>Olá, {auth.name}</h2>
        </main>
    );
}