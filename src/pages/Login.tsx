import { Fragment, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { loginUser } from '../features';
import { Form, Header } from '../components';

import "../styles/form-handler.css";

export function Login ()
{
    const navigation = useNavigate()

    async function onSubmit (data: {username: string, password: string})
    {
        const {username, password} = data;

        if(!username || !password) 
        {
            return "Algum campo não foi preenchido!";
        }

        const response = await loginUser(username, password);
 
        if(!response) navigation("/");

        return response;
    }

    return (
        <Fragment>
            <Header />
            <main className="Login Center">
                <div className="Panel">
                    <Form onSubmit={onSubmit} name="Login" tryText="Entrando">
                        <input type="text" required name="username" placeholder='Usuario'/>
                        <input type="password" required name="password" placeholder='Senha' />
                        <button>Entrar</button>
                        <NavLink className="button" to="/register">Cadastro</NavLink>
                    </Form>
                </div>
            </main>
        </Fragment>
    );
}