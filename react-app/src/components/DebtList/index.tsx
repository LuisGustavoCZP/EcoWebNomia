import { useDebts } from '../../hooks/use-debts';
import "../../styles/debtlist.css"

export function DebtList () 
{
    const {debts} = useDebts();

    function createDebtList ()
    {
        if(!debts) return null;
        const debtElements = debts.map((debt, i) => <li key={i}>{JSON.stringify(debt)}</li>);
        return debtElements;
    }

    return (
        <ul className='DebtList'>
            {createDebtList ()}
        </ul>
    );
}