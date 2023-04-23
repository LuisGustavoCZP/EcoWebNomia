import { Fragment, ReactNode, useState } from 'react';
import { DebtList, NewDebtModal, NewPaymentModal } from '../../components';
import type {UserProps, IDebt} from "../../models";
import "./style.css";

export function Debts ({auth, debts} : UserProps)
{
    const [modal, setModal] = useState<null | ReactNode>(null);

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

    function renderDebts (list: IDebt[])
    {
        return (
            <Fragment>
                <span>
                    <h2>Suas <b>dívidas</b>, {auth.name}</h2>
                    { debts && NewDebtButton }
                </span>
                <DebtList debts={list} pay={openPaymentModal}/>
            </Fragment>
        )
    }

    return (
        <Fragment>
            <main className='Debts'>
                {renderDebts(debts.list)}
            </main>
            {modal}
        </Fragment>
    );
}