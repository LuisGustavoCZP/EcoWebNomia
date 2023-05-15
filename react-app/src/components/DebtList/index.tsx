import { IDebt } from "../../interfaces";
import "./style.css"
export { NewDebtModal } from "./NewDebt";
export { NewPaymentModal } from "./NewPayment";

export function DebtList ({debts=[], date, pay} : {debts:IDebt[], date : number | Date, pay:(id : number) => void}) 
{
    function createDebtList ()
    {
        if(!debts) return null;
        const sortedDebts = debts;
        const debtElements = sortedDebts.map((debt, i) => <li key={i}>{debt.render(pay, date)}</li>);
        return debtElements;
    }

    return (
        <ul className='DebtList'>
            {createDebtList ()}
        </ul>
    );
}