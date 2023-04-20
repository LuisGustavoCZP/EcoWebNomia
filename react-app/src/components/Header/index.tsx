import { CSSProperties } from "react";
import { NavLink } from "react-router-dom";
import "../../styles/nav.css";

export function Header ({navigation=false})
{
    const style : CSSProperties = {
        display:"flex", 
        justifyContent:"space-between", 
        alignItems:"center", 
        padding:"5px 20px",
        backgroundColor: "black",
        color:"white"
    };

    return (
        <header style={style}>
            <h1>EcoWebNomia</h1>
            {navigation && <nav>
                <NavLink className="button light" to="/">Home</NavLink>
                <NavLink className="button light" to="/debts">Gastos</NavLink>
                <NavLink className="button light" to="/gains">Ganhos</NavLink>
                <NavLink className="button light" to="/logout">Sair</NavLink>
            </nav>}
        </header>
    )
}