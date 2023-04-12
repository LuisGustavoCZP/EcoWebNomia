import { ReactNode, useState } from 'react';
import { DebtList, NewDebtModal } from '../components';
import type {AuthProps} from "../models";
import "../styles/debts.css";

export function Debts ({auth} : AuthProps)
{
    const [modal, setModal] = useState<null | ReactNode>(null);

    function onClose ()
    {
        setModal(null);
    }

    function openDebtModal ()
    {
        return (
            setModal(<NewDebtModal onClose={onClose} />)
        )
    }

    const NewDebtButton = (<button className='button' key={-1} onClick={openDebtModal}>Nova Dívida</button>)

    return (
        <>
            <main className='Debts'>
                <span>
                    <h2>Suas <b>dívidas</b>, {auth.name}</h2>
                    {NewDebtButton}
                </span>
                <DebtList/>
            </main>
            {modal}
        </>
    );
}