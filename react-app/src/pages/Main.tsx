import { useSelector } from 'react-redux';
import { authState } from '../features';

export function Main ()
{
    const { name } = useSelector(authState);

    return (
        <main>
            <h2>Olá, {name}</h2>
        </main>
    );
}