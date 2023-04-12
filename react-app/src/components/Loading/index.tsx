import { CSSProperties } from "react";
import "../../styles/loading.css";
import { LoadingSpinner } from "./LoadingSpinner";

export function Loading ({size = 100} : {size? : number})
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
            {create(3)}
            <p>Loading...</p>
        </div>
    );
}