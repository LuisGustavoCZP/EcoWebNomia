import { CSSProperties } from "react";
import { IDebt } from "../../../models";

export function DebtItem ({debt} : {debt:IDebt})
{
    const today = Date.now();
    const paymentDate = new Date(debt["payment-date"]);
    const overdue = paymentDate.getTime() < today;

    const total = debt["installments-total"];
    const costTotal = debt["cost-total"];
    const costParcel = costTotal/total;
    const costCurrency = debt["cost-currency"];

    const paymentTotal = debt.payments.reduce((t, payment) => t += payment.value, 0);
    const paymentRest = costTotal - paymentTotal;
    const paymentPercent = paymentTotal ? (paymentTotal / costTotal) : 0;
    
    const paymentParcels = paymentPercent * total;
    const nextParcel = Math.floor(paymentParcels) + 1;
    const nextCost = (nextParcel - paymentParcels) * costParcel;

    function currencyString (valor : number, currency : string)
    {
        const cs = valor.toLocaleString("pt-br", { style: 'currency', currency});
        return [<span className="currency">{cs.slice(0, 2)}</span>, <span>{cs.slice(3)}</span>]
    }

    const restStyle : CSSProperties = {
        color: `rgb(${Math.floor(255*(.7-(paymentPercent)))}, ${Math.floor(255*(paymentPercent*.7))}, 0)`
    }

    return (
        <div className={`DebtItem${overdue?" overdue":""}`}>
            <span className="debt-header">
                <span>
                    <span className="date">{paymentDate.toLocaleDateString()}</span>
                    <span className="creditor">Para: <strong>{debt["creditor"]}</strong></span>
                </span>
                <span>
                    <span className="description">{debt["description"]}</span>
                    <span className="category">{debt["category"]}</span>
                </span>
            </span>
            <span className="debt-body">
                <span>{total} x {currencyString(costParcel, costCurrency)}</span>
                <span>
                    <span className="total">{currencyString(costTotal, costCurrency)}</span> 
                    <span className="paid">- {currencyString(paymentTotal, costCurrency)}</span> 
                    <span className="op">=</span> 
                    <span className="rest" style={restStyle}>{currencyString(paymentRest, costCurrency)}</span>
                </span>
            </span>
            <span className="debt-parcels">
                <span>Proxima Parcela <span style={restStyle}>{nextParcel} / {total}</span></span>
                <span>{currencyString(nextCost, costCurrency)}</span>
                <button>Pagar</button>
            </span>
            {debt.payments.length > 0 ? (
                <div className="debt-payments">
                    {debt.payments.map(payment => <span>{JSON.stringify(payment)}</span>)}
                </div>
            ) : null
            }
        </div>
    );
}