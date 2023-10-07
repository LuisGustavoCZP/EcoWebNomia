import React, { 
    useState,
    FormEvent,
    PropsWithChildren,
    CSSProperties,
    forwardRef,
} from "react";
import { Loading } from '../../components';
import "./style.css";

interface FormProps extends PropsWithChildren
{
    name:string,
    onSubmit: (data : any) => Promise<string>,
    autoComplete?: boolean,
    style?: CSSProperties,
    tryText?: string,
}

export const Form = forwardRef<HTMLFormElement, FormProps>(({
    name,
    onSubmit,
    autoComplete = false,
    style,
    tryText,
    children,
} : FormProps, ref) => 
{
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function onSubmitHandle(e : FormEvent<HTMLFormElement>) 
    {
        e.preventDefault();
        e.stopPropagation();
        
        const formElement = e.target as HTMLFormElement;

        const formData = new FormData(formElement);
        const data = Object.fromEntries(formData.entries());
        
        setLoading(true);
        const responseError = await onSubmit(data);
        setLoading(false);

        setError(responseError);
        if(responseError) 
        {
            formElement.reset();
            // delay dismissing the dialog.
            /* setTimeout(()=> {
                // dismiss the dialog.
                e.type = "";
            }); */
            return false
        }
    }

    if(isLoading)
    {
        return (<Loading text={tryText} size={200}/>);
    }

    
// autoComplete={autoComplete?"on":"off"} autoSave="false"
    return (
        <form name={name} ref={ref} onSubmit={onSubmitHandle} spellCheck role="main" style={style}>
            <h2>{name}</h2>
            {children}
            <h4 className="Error">{error}</h4>
        </form>
    );
});