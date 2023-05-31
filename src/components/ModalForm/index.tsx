import { CSSProperties, ReactNode, useState } from "react";
import { useAuth } from "../../hooks";
import { IRequest } from "../../interfaces";
import { Form } from "../Form";
import type { ModalSuperProps } from "../Modal";
import { Modal } from "../Modal";

interface ModalFormProps extends ModalSuperProps
{
    children: ReactNode;
    onSucess?: () => void;
    name: string;
    request : IRequest;
    tryText?: string;
}

export function ModalForm ({onClose=undefined, onSucess=undefined, children, name, request, tryText} : ModalFormProps)
{
    const {auth} = useAuth();
    const [loading, setLoading] = useState(false);

    async function onSubmit (data: {[key: string] : string | number})
    {
        console.log(data);
        
        setLoading(true);
        const response = await request(data, auth);
        setLoading(false);

        if(response.result === "success")
        {
            if(onSucess) onSucess();
            return "";
        }
        else 
        {
            return response.error!;
        }
    }

    const formStyle : CSSProperties = {
        backgroundColor: "var(--black)",
        padding: "40px 60px 20px 60px",
        width: "400px"
    }

    return (
        <Modal onClose={() => {if(onClose && !loading) onClose()}}>
            <Form name={name} onSubmit={onSubmit} style={formStyle} tryText={tryText}>
                {children}
            </Form>
        </Modal>
    );
}