import { Fragment } from "react";
import { IPayment } from "../../interfaces";
import { dateLocal } from "../../utils";

export function PaymentItem ({payment} : {payment:IPayment})
{
    function currencyString (valor : number, currency : string)
    {
        const cs = valor.toLocaleString("pt-br", { style: 'currency', currency});
        return (
            <Fragment>
                <span className="currency">{cs.slice(0, 2)}</span>
                <span>{cs.slice(3)}</span>
            </Fragment>
        );
    }

    function type ()
    {
        switch (payment["type"])
        {
            case "Partial":
                return "Pagamento parcial de parcela"
            case "Parcel":
                return "Pagamento de parcela"
            case "Advance":
                return "Pagamento parcial do total"
            case "Total":
                return "Pagamento total"
        }
    }

    return (
        <li className="DebtPayment">
            <span>{dateLocal(new Date(payment["payment-date"]))}</span>
            <span>
                <span>{type ()}</span>
                <span>{payment["description"]}</span>
                <span className="price">{currencyString(payment.value, payment.currency)}</span>
            </span>
        </li>
    );
}