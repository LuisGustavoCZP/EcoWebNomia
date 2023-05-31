import { Fragment } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Form, Header } from '../components';
import { registerUser } from '../features';
import "../styles/form-handler.css";

export function Register ()
{
    const navigation = useNavigate()
    
    async function onSubmit (data: {username: string, password: string, name: string})
    {
        const {username, password, name} = data;

        if(!username || !password || !name) 
        {
            return "Algum campo não foi preenchido!";
        }

        const response = await registerUser(username, password, name);

        if(response.result === "success")
        {
            console.log("Cadastrado com sucesso!", response.data)
            navigation("/login")
            return "";
        }
        else 
        {
            return response.error!;
        }
    }

    return (
        <Fragment>
            <Header />
            <main className="Register Center">
                <div className="Panel">
                    <Form onSubmit={onSubmit} name="Cadastro" tryText="Registrando">
                        <input type="text" required name="username" placeholder='Usuario' autoComplete="username"/>
                        <input type="password" required name="password" placeholder='Senha' autoComplete="new-password"/>
                        <input type="text" required name="name" placeholder='Nome' autoComplete="name"/>
                        <button>Registrar</button>
                        <NavLink className="button" to="/login">Login</NavLink>
                    </Form>
                </div>
            </main>
        </Fragment>
    );
}