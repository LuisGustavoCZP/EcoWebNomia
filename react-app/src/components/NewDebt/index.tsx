import {Modal} from "../Modal";
import type {ModalSuperProps} from "../Modal";
import {Form} from "../Form";
import { useState } from "react";
import { AutoText } from "../AutoText";
import categories from "../../assets/category-debts.json"
import { Choices } from "../Choices";

export function NewDebtModal ({onClose=undefined} : ModalSuperProps)
{
    const [debtType, setDebtType] = useState("cash");

    async function onSubmit (data: {[key: string] : string})
    {
        const {category, name, creditor} = data;

        if(!category || !name || !creditor) 
        {
            return "Algum campo não foi preenchido!";
        }
        
        return "";
        /* const response = await loginUser(username, password);
        
        if(response.result === "success")
        {
            return "";
        }
        else 
        {
            return response.error!;
        } */
    }

    function InCash ()
    {
        return (
            <>Cash</>
        )
    }

    function OnCredit ()
    {
        return (
            <>Credit</>
        )
    }

    function SelectDebtType ()
    {
        switch (debtType)
        {
            case "cash":
                return InCash();
            case "credit":
                return OnCredit();
            default:
                return null;
        }
    }

    return (
        <Modal onClose={onClose}>
            <Form name="Dívida" onSubmit={onSubmit}>
                <AutoText wordList={categories} required name="category" placeholder='Categoria'/>
                <input type="text" required name="name" placeholder='Nome'/>
                <input type="text" required name="creditor" placeholder='Para'/>
                <Choices wordList={[["cash", "À vista"], ["credit", "Parcelado"]]} initial={debtType} onChange={(debtType) => setDebtType(debtType)} />
                {SelectDebtType ()}
                <button type="submit">Adicionar</button>
                <button type="button" onClick={onClose}>Voltar</button>
            </Form>
        </Modal>
    );
}