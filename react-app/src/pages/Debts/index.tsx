import { FormEvent, Fragment, ReactNode, useState } from 'react';
import { DebtList, NewDebtModal, NewPaymentModal } from '../../components';
import type {UserProps, IDebt, IFilter} from "../../models";
import "./style.css";
import { useFilter } from '../../hooks';

export function Debts ({auth, debts} : UserProps)
{
    const [modal, setModal] = useState<null | ReactNode>(null);
    const [filter, setFilter] = useFilter("debts");

    function onClose ()
    {
        setModal(null);
    }

    function openDebtModal ()
    {
        return (
            setModal(<NewDebtModal onClose={onClose} onSucess={() => {onClose(); debts.reload();}}/>)
        )
    }

    function openPaymentModal (id : number)
    {
        return (
            setModal(<NewPaymentModal onClose={onClose} debt={debts.list.find((debt) => debt.id === id)!} onSucess={() => {onClose(); debts.reload();}}/>)
        )
    }

    const NewDebtButton = (<button className='button' key={-1} onClick={openDebtModal}>Adicionar Dívida</button>)

    function renderMonthFilter ()
    {
        
    }

    function currencyString (valor : number, currency = "BRL")
    {
        const cs = valor.toLocaleString("pt-br", { style: 'currency', currency});
        return (
            <span>
                <span className="currency">{cs.slice(0, 2)}</span>
                <span>{cs.slice(3)}</span>
            </span>
        );
    }

    function renderUserFilter ()
    {
        const filterHandler = (e : FormEvent<HTMLSelectElement>) => 
        {
            const select = e.target as HTMLSelectElement;
            const newFilter = Object.assign({}, filter);

            if(select.value === "any") delete newFilter["creditor"];
            else newFilter["creditor"] = select.value;

            setFilter(newFilter);
        }

        const creditorSet = new Set();
        const creditors = debts.list.filter(debt => 
        {
            if(creditorSet.has(debt.creditor)) return false;
            creditorSet.add(debt.creditor);
            return true;
        }).map((debt, i) => <option key={i} value={debt.creditor}>{debt.creditor}</option>)

        creditors.unshift(<option key={-1} value="any" defaultChecked>Todos</option>)

        return (
            <select onChange={filterHandler}>
                {creditors}
            </select>
        );
    }

    function renderDebts (list: IDebt[])
    {
        const totalDebts = list.filter(debt => !(debt.status === "ok" || debt.status === "complete")).reduce((total, debt) => total += debt.installment.cost, 0);

        const totalString = filter["creditor"] ? ` com ${filter["creditor"]} ` : ""

        return (
            <Fragment>
                <span>
                    <h2>Suas <b>dívidas</b>, {auth.name}. Para este mês {totalString} é de <span className='red'>{currencyString(totalDebts)}</span></h2>
                    <span>
                        { renderUserFilter () }
                        { debts && NewDebtButton }
                    </span>
                </span>
                <div className='container'>
                    <DebtList debts={list} pay={openPaymentModal}/>
                </div>
            </Fragment>
        )
    }

    function filterList (list: IDebt[])
    {
        const entries = Object.entries(filter);

        if(entries.length === 0) return list;
        return list.filter((debt : any) => entries.some(([key, value]) => debt[key] && debt[key] === value ));
    }

    const list = filterList(debts.list);

    return (
        <Fragment>
            <main className='Debts'>
                {renderDebts(list)}
            </main>
            {modal}
        </Fragment>
    );
}