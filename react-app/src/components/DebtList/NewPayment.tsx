import {ModalForm} from "../ModalForm";
import type {ModalSuperProps} from "../Modal";
import { useState } from "react";
import { InputCurrency } from "../InputCurrency";
import { dateParse, dateTimeParse } from "../../utils";
import { IDebt } from "../../models";
import { postPayment } from "../../features";

interface INewPaymentProps extends ModalSuperProps
{
    onSucess?: () => void;
    debt: IDebt;
}

export function NewPaymentModal ({onClose=undefined, onSucess=undefined, debt} : INewPaymentProps)
{
    const [[currencyType, currencyValue], setTotalCost] = useState([debt["cost-currency"]!, `${debt["payment-next"]}`.replace(".", ",")]);

    const total = debt["payment-rest"];
    const parcel = debt["installment-cost"];
    const value = Number(currencyValue.replace(".", "").replace(",", "."));
    const toPay = Number(value).toLocaleString("pt-br", { style: 'currency', currency:currencyType});

    function paymentType ()
    {
        if(value === total)
        {
            return "Total";
        }

        if(value > parcel)
        {
            return "Advance"
        }

        if(value === parcel)
        {
            return "Parcel"
        }

        return "Partial";
    }

    const payType = paymentType ();
    const dateString = dateTimeParse(new Date(), true);

    console.log(dateString);

    return (
        <ModalForm name={`Pagamento ${debt.id}`} request={postPayment} onSucess={onSucess} onClose={onClose} tryText="Aguarde" >
            <input type="text" name="description" placeholder='Descrição?'/>
            <InputCurrency onChange={(values : [string, string]) => setTotalCost(values)} value={`${currencyValue}`} type={currencyType} max={total} />
            <input type="datetime-local" name="payment-date" defaultValue={dateString}/>
            <input type="hidden" name="value" value={toPay}/>
            <input type="hidden" name="currency" value={currencyType}/>
            <input type="hidden" name="debt-id" value={debt["id"]}/>
            <input type="hidden" name="type" value={payType} />
            <button type="submit">Pagar</button>
            <button type="button" onClick={onClose}>Voltar</button>
        </ModalForm>
    );
}