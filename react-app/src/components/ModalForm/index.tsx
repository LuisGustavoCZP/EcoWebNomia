import {Modal} from "../Modal";
import type {ModalSuperProps} from "../Modal";
import {Form} from "../Form";
import { CSSProperties, ReactNode, useState } from "react";
import { InputCurrency } from "../InputCurrency";
import { useAuth } from "../../hooks";
import { dateParse } from "../../utils";
import { IAuth, IDebt, IRequest } from "../../interfaces";
import { postPayment } from "../../features";

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