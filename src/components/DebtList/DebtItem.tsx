import { IDebt } from "../../interfaces";
import { PaymentItem } from "./PaymentItem";


export function DebtItem ({debt, status, pay} : {debt:IDebt, status : string, pay:(id : number) => void})
{
    const {category, description, creditor, installment, payment, cost, payments} = debt;
    
    //const paymentDate = new Date(debt.paymentDate);
    const nextPaymentDate = new Date(debt.paymentDate).addMonths(installment.next-1);
    nextPaymentDate.setHours(0, 0, 0, 0);

    function currencyString (valor : number, currency : string)
    {
        const cs = valor.toLocaleString("pt-br", { style: 'currency', currency});
        return (
            <span>
                <span className="currency">{cs.slice(0, 2)}</span>
                <span>{cs.slice(3)}</span>
            </span>
        );
    }

    function renderBody ()
    {
        if(status === "complete") return <span className="debt-body paid">Pago</span>

        return (
            <span className="debt-body">
                {renderInfo ()}
                {renderParcels ()}
            </span>
        )
    }

    function renderInfo ()
    {
        return (
            <span className="info">
                <span><span>{Math.max(installment.total - (installment.next-1), 0)}</span> x {currencyString(installment.cost, cost.currency)}</span>
                <span className="op">=</span>
                <span className="rest">{currencyString(payment.rest, cost.currency)}</span>
            </span>
        )
    }

    function renderParcels ()
    {
        return (
            <span className="parcels">
                <span> Proxima Parcela 
                    <span>{installment.next} / {installment.total}</span>
                </span>
                <span>{currencyString(payment.next, cost.currency)}</span>
                <button onClick={() => pay(debt.id)}>Pagar</button>
            </span>
        )
    }

    function renderState ()
    {
        <span className="debt-state">
            <span className="total">{installment.total} x {currencyString(installment.cost, cost.currency)} = {currencyString(cost.total, cost.currency)}</span>
            <span className="paid">-{currencyString(payment.total, cost.currency)}</span>
        </span>
    }

    function renderPayments ()
    {
        if(payments.length === 0) return null;

        return (
            <ul className="debt-payments">
                {payments.map(payment => <PaymentItem key={`${payment["id"]}`} payment={payment}/>)}
            </ul>
        );
    }

    function debtStatus ()
    {
        return ` ${status}`;
    }

    return (
        <div className={`DebtItem${debtStatus ()}`}>
            <span className="debt-header">
                <span>
                    <span className="date">{nextPaymentDate.toLocaleDateString()}</span>
                    <span className="category">{category}</span>
                </span>
                <span>
                    <span className="description">{description}</span>
                    <span className="creditor">Para: {creditor}</span>
                </span>
            </span>
            {renderBody()}
            {renderPayments ()}
        </div>
    );
}