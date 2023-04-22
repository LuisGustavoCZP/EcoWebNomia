import { NavLink } from "react-router-dom";
import "./style.css";

export function Header ({navigation=false})
{
    return (
        <header>
            <h1>EcoWebNomia</h1>
            {navigation && <nav>
                <NavLink className="button" to="/">Home</NavLink>
                <NavLink className="button" to="/debts">Gastos</NavLink>
                <NavLink className="button" to="/gains">Ganhos</NavLink>
                <NavLink className="button" to="/logout">Sair</NavLink>
            </nav>}
        </header>
    )
}