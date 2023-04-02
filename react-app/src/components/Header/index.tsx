import { CSSProperties } from "react";

export function Header ()
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
            <nav>
                <a href="/">Home</a>
            </nav>
        </header>
    )
}