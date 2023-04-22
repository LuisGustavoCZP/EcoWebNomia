import { CSSProperties } from "react";
import "./style.css";
import { LoadingSpinner } from "./LoadingSpinner";

export function Loading ({text = "Carregando", size = 100} : {text? : string, size? : number})
{
    function create (total : number)
    {
        const ls = Array(total);
        for (let i = 0; i < total; i++)
        {
            ls[i] = <LoadingSpinner key={i} index={i}/>;
        }
        return ls;
    }

    const style : CSSProperties = {
        width: `${size}px`,
        fontSize: `${size/6}px`,
    }

    return (
        <div className="Loading" style={style}>
            {create(2)}
            <p>{text}<span><span>...</span></span></p>
        </div>
    );
}