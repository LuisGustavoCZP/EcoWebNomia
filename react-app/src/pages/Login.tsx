import { FormEvent } from 'react';
import { loginUser, writeAuth } from '../features';
import { useNavigate } from "react-router-dom";

export function Login ()
{
    const navigation = useNavigate()
    async function onSubmit (e : FormEvent)
    {
        e.preventDefault();
        e.stopPropagation();

        const formData = new FormData(e.target as HTMLFormElement);
        const username = formData.get("username") as string;
        const password = formData.get("password") as string;

        if(!username || !password) 
        {
            return;
        }

        const response = await loginUser(username, password);
        if(response.result === "success")
        {
            console.log("Login correto!", response.data)
            writeAuth(response.data)
            navigation("/")
        }
        else 
        {
            console.log("Login errado!")
        }
    }

    return (
        <main>
            <form onSubmit={onSubmit}>
                <input type="text" required name="username" placeholder='Usuario'/>
                <input type="password" required name="password" placeholder='Senha' />
                <button>Login</button>
            </form>
        </main>
    );
}