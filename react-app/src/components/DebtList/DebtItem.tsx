import { CSSProperties, Fragment } from "react";
import { IDebt } from "../../models";
import {PaymentItem} from "./PaymentItem";

export function DebtItem ({debt, pay} : {debt:IDebt, pay:(id : number) => void})
{
    const today = Date.now();
    const paymentDate = new Date(debt["payment-date"]);
    const overdue = paymentDate.getTime() < today;
    
    //const total = ;
    const costCurrency = debt["cost-currency"];
    const paymentPercent = debt["payment-percent"];
    const paid = !debt["payment-rest"];

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

    /* const restStyle : CSSProperties = {
        color: `rgb(${Math.floor(255*(.7-(paymentPercent)))}, ${Math.floor(255*(paymentPercent*.7))}, 0)`
    } */

    return (
        <div className={`DebtItem${overdue?" overdue":""}`}>
            <span className="debt-header">
                <span>
                    <span className="date">{paymentDate.toLocaleDateString()}</span>
                    <span className="category">{debt["category"]}</span>
                </span>
                <span>
                    <span className="description">{debt["description"]}</span>
                    <span className="creditor">Para: {debt["creditor"]}</span>
                    
                </span>
            </span>
            <span className="debt-body">
                <span>{debt["installments-total"]} x {currencyString(debt["installment-cost"], costCurrency)}</span>
                <span>=</span>
                <span className="total">{currencyString(debt["cost-total"], costCurrency)}</span> 
            </span>
            <span className="debt-state">
                {!paid ?
                <Fragment>
                    <span className="paid">{currencyString(debt["payment-total"], costCurrency)}</span>
                    <span className="rest">{currencyString(debt["payment-rest"], costCurrency)}</span>
                </Fragment>
                :
                <span>Pago</span>
                }
            </span>
            {!paid && <span className="debt-parcels">
                <span> Proxima Parcela 
                    <span>{debt["installment-next"]} / {debt["installments-total"]}</span>
                </span>
                <span>{currencyString(debt["payment-next"], costCurrency)}</span>
                {<button onClick={() => pay(debt.id)} disabled={paid}>Pagar</button>}
            </span>}
            {debt.payments.length > 0 ? (
                <ul className="debt-payments">
                    {debt.payments.map(payment => <PaymentItem key={`${payment["id"]}`} payment={payment}/>)}
                </ul>
            ) : null
            }
        </div>
    );
}