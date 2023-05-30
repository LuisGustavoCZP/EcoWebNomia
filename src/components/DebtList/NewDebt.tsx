import {Modal} from "../Modal";
import type {ModalSuperProps} from "../Modal";
import {Form} from "../Form";
import { CSSProperties, Fragment, useEffect, useState } from "react";
import { AutoText } from "../AutoText";
import categories from "../../assets/category-debts.json"
import { Choices } from "../Choices";
import { InputCurrency } from "../InputCurrency";
import { useDebts, useUsers } from "../../hooks";
import { InputInstallment } from "../InputInstallment";
import { postDebt } from "../../features";
import { dateParse } from "../../utils";
import { ModalForm } from "../ModalForm";

interface INewDebtModalProps extends ModalSuperProps
{
    onSucess?: () => void
    creditors?: string[]
}

export function NewDebtModal ({creditors=[], onClose=undefined, onSucess=undefined} : INewDebtModalProps)
{
    const [totalCost, setTotalCost] = useState(["BRL", "0.00"]);

    return (
        <ModalForm name="Dívida" request={postDebt} onSucess={onSucess} onClose={onClose} tryText="Aguarde" >
                <AutoText wordList={categories} required name="category" placeholder='Categoria?'/>
                <input type="text" required name="description" placeholder='Descrição?'/>
                <AutoText wordList={creditors} required name="creditor" placeholder='Quem se deve?'/>
                <InputCurrency onChange={(values : string[]) => setTotalCost(values)} />

                <InputInstallment nameInstallment="installments-total" totalCurrency={totalCost}/>
                <input type="date" name="payment-date" defaultValue={dateParse(new Date(), true)}/>
                <input type="hidden" name={"cost-total"} value={Number(totalCost[1].replace(".", "").replace(",", ".")).toLocaleString("pt-br", { style: 'currency', currency:totalCost[0]})}/>
                <input type="hidden" name={"cost-currency"} value={totalCost[0]}/>

                <button type="submit">Adicionar</button>
                <button type="button" onClick={onClose}>Voltar</button>
        </ModalForm>
    );
}