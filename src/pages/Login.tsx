import React, { Fragment, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Form, Header } from '../components';
import { loginUser } from '../features';

import "../styles/form-handler.css";
import { Button } from "../components";

export function Login ()
{
    const navigation = useNavigate();
    const formRef = useRef<HTMLFormElement>(null);

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
                    <Form onSubmit={onSubmit} ref={formRef} name="Login" tryText="Entrando">
                        <input type="text" required name="username" placeholder='Usuario'/>
                        <input type="password" required name="password" placeholder='Senha' />
                        <Button>Entrar</Button>
                        <NavLink className="button" to="/register">Cadastro</NavLink>
                    </Form>
                </div>
            </main>
        </Fragment>
    );
}