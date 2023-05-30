import { CSSProperties } from "react";
import loading from "../../assets/loading2.svg";

export function LoadingSpinner ({index} : {index : number})
{
    const odd = index % 2;
    const size = (1 / Math.pow(index+1, index/2)) * 100;
    const rot = 360 * size

    const spinnerStyle : CSSProperties = 
    {
        WebkitMaskImage: `url(${loading})`,
        maskImage: `url(${loading})`,
        
        width: `${size}%`,
        height: `${size}%`,
        rotate: `${rot}deg`,
        transform: odd? "scaleX(-1)":"scaleX(1)",
    }

    const loadingStyle : CSSProperties = 
    {
        WebkitAnimationDirection: odd ? "reverse" : "normal",
    }

    return (
        <span className="LoadingSpinner" style={loadingStyle}>
            <span style={spinnerStyle}/>
        </span>
    )
}