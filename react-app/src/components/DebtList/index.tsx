import { IDebt } from "../../models";
import "./style.css"
import { DebtItem } from "./DebtItem";

export function DebtList ({debts=[]} : {debts:IDebt[]}) 
{
    function createDebtList ()
    {
        if(!debts) return null;
        const sortedDebts = debts;
        const debtElements = sortedDebts.map((debt, i) => <li key={i}><DebtItem debt={debt} /></li>);
        return debtElements;
    }

    return (
        <ul className='DebtList'>
            {createDebtList ()}
        </ul>
    );
}