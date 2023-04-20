import { Fragment, ReactNode, useState } from 'react';
import { DebtList, Loading, NewDebtModal, Header } from '../../components';
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

    const NewDebtButton = (<button className='button' key={-1} onClick={openDebtModal}>Adicionar Dívida</button>)

    function renderDebts (list: IDebt[])
    {
        return (
            <Fragment>
                <span>
                    <h2>Suas <b>dívidas</b>, {auth.name}</h2>
                    { debts && NewDebtButton }
                </span>
                <DebtList debts={list}/>
            </Fragment>
        )
    }

    return (
        <Fragment>
            <main className='Debts'>
                { !debts.list? <Loading size={200}/> :  renderDebts(debts.list)}
            </main>
            {modal}
        </Fragment>
    );
}