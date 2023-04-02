import { FormEvent } from 'react';
import { registerUser } from '../features';

export function Register ()
{
    async function onSubmit (e : FormEvent)
    {
        e.preventDefault();
        e.stopPropagation();

        const formData = new FormData(e.target as HTMLFormElement);
        const username = formData.get("username") as string;
        const password = formData.get("password") as string;
        const name = formData.get("name") as string;

        if(!username || !password || !name) 
        {
            return;
        }

        await registerUser(username, password, name);
    }

    return (
        <main>
            <form onSubmit={onSubmit}>
                <input type="text" required name="username" placeholder='Usuario'/>
                <input type="password" required name="password" placeholder='Senha' />
                <input type="text" required name="name" placeholder='Nome'/>
                <button>Registrar</button>
            </form>
        </main>
    );
}