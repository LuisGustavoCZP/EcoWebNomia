import { IDebt } from "../../models";
import "./style.css"
import { DebtItem } from "./DebtItem";
export { NewDebtModal } from "./NewDebt";
export { NewPaymentModal } from "./NewPayment";

export function DebtList ({debts=[], pay} : {debts:IDebt[], pay:(id : number) => void}) 
{
    function createDebtList ()
    {
        if(!debts) return null;
        const sortedDebts = debts;
        const debtElements = sortedDebts.map((debt, i) => <li key={i}><DebtItem debt={debt} pay={pay} /></li>);
        return debtElements;
    }

    return (
        <ul className='DebtList'>
            {createDebtList ()}
        </ul>
    );
}