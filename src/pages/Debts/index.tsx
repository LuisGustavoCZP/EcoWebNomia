import React, { FormEvent, Fragment, ReactNode, useContext, useState } from 'react';
import { DebtList, NewDebtModal, NewPaymentModal } from '../../components';
import type {UserProps, IDebt, IFilter} from "../../interfaces";
import { Debt } from "../../models";
import { useFilter } from '../../hooks';
import debtsStatus from "../../assets/debt-status.json";
import { DebtsContext } from '../../context';

import "./style.css";
import { useCreditors } from '../../hooks/use-creditors';

const now = new Date();
now.setDate(28);

export function Debts ({auth} : UserProps)
{
    const debts = useContext(DebtsContext);
    const [modal, setModal] = useState<null | ReactNode>(null);
    const [filter, setFilter] = useFilter("debts");
    const [status, setStatus] = useState("any");
    const [date, setDate] = useState(now);
    const [creditors] = useCreditors();

    function onClose ()
    {
        setModal(null);
    }

    function openDebtModal ()
    {
        return (
            setModal(<NewDebtModal creditors={creditors} onClose={onClose} onSucess={() => {onClose(); debts.reload();}}/>)
        )
    }

    function openPaymentModal (id : number)
    {
        return (
            setModal(<NewPaymentModal onClose={onClose} debt={debts.list.find((debt) => debt.id === id)!} onSucess={() => {onClose(); debts.reload();}}/>)
        )
    }

    const NewDebtButton = (<button className='button' key={-1} onClick={openDebtModal}>Adicionar Dívida</button>)

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

    function renderMonthFilter ()
    {
        const mounts = [
            <option key="1" value={0}>Janeiro</option>,
            <option key="2" value={1}>Fevereiro</option>,
            <option key="3" value={2}>Março</option>,
            <option key="4" value={3}>Abril</option>,
            <option key="5" value={4}>Maio</option>,
            <option key="6" value={5}>Junho</option>,
            <option key="7" value={6}>Julho</option>,
            <option key="8" value={7}>Agosto</option>,
            <option key="9" value={8}>Setembro</option>,
            <option key="10" value={9}>Outubro</option>,
            <option key="11" value={10}>Novembro</option>,
            <option key="12" value={11}>Dezembro</option>,
        ];

        return (
            <select value={
                date.getMonth()} onChange={(e) => 
                {
                    const d = new Date(now);
                    d.setMonth(Number(e.target.value));
                    setDate(d);
                }
            } >
                {mounts}
            </select>
        )
    }

    function renderStatusFilter ()
    {
        const filterHandler = (e : FormEvent<HTMLSelectElement>) => 
        {
            const select = e.target as HTMLSelectElement;
            setStatus(select.value);
        }

        const selectors = debtsStatus.map((status, i) => <option key={i} value={status}>{status.slice(0,1).toUpperCase() + status.slice(1)}</option>)

        selectors.unshift(<option key={-1} value="any" defaultChecked>Todos</option>)

        // value={filter["creditor"]}
        return (
            <select onChange={filterHandler}>
                {selectors}
            </select>
        );
    }

    function renderUserFilter ()
    {
        const filterHandler = (e : FormEvent<HTMLSelectElement>) => 
        {
            const select = e.target as HTMLSelectElement;
            setFilter("creditor", select.value);
        }

        const creditorSet = new Set();
        const creditors = debts.list.filter(debt => 
        {
            if(creditorSet.has(debt.creditor)) return false;
            creditorSet.add(debt.creditor);
            return true;
        }).map((debt, i) => <option key={i} value={debt.creditor}>{debt.creditor}</option>)

        creditors.unshift(<option key={-1} value="any" defaultChecked>Todos</option>)

        // value={filter["creditor"]}
        return (
            <select onChange={filterHandler}>
                {creditors}
            </select>
        );
    }

    function renderDebts (list: IDebt[])
    {
        const totalDebts = list.reduce((total, debt) => total += debt.installment.cost, 0);

        const totalString = filter["creditor"] ? ` com ${filter["creditor"]} ` : "";

        return (
            <Fragment>
                <span>
                    <h2>Suas <b>dívidas</b>, {auth.name}. Para este mês {totalString} é de <span className='red'>{currencyString(totalDebts)}</span></h2>
                    <span>
                        { renderMonthFilter () }
                        { renderStatusFilter () }
                        { renderUserFilter () }
                        { debts && NewDebtButton }
                    </span>
                </span>
                <div className='container'>
                    <DebtList debts={list} date={date} pay={openPaymentModal}/>
                </div>
            </Fragment>
        )
    }

    function filterList (list: IDebt[])
    {
        const entries = Object.entries(filter);
        const statusAll = status === "any";

        if(statusAll)
        {
            list = list.filter((debt: IDebt) => 
            {
                const status = debt.status(date);
                return status !== "ok" && status !== "complete";
            });
        }
        else
        {
            list = list.filter((debt: IDebt) => debt.status(date) === status);
        }

        if(entries.length === 0) 
        {
            return list;
        }

        return list.filter((debt : any) => entries.every(([key, value]) => debt[key] && debt[key] === value));
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