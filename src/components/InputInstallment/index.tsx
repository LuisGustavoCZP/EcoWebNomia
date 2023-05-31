import { CSSProperties, useState } from "react";

interface IInputInstallmentProps {
    nameInstallment: string,
    costInstallment?: string,
    totalCurrency: string[],
    value?: number,
}

export function InputInstallment ({nameInstallment, costInstallment, value:initialValue=1, totalCurrency} : IInputInstallmentProps)
{
    const [getValue, setValue] = useState<number>(initialValue);

    function createOptions ()
    {
        const [currencyType, currencyCost] = totalCurrency;
        const currencyValue = Number(currencyCost.replace(".", "").replace(",", "."));

        const p = Array(12);
        for(let i = 1; i <= p.length; i++)
        {
            const cost = currencyValue / i;
            const costString = cost.toLocaleString("pt-br", { style: 'currency', currency:currencyType});
            if (i === getValue) p[i-1] = (<option key={i} value={i} defaultChecked>{`${i}x ${costString}`}</option>)
            else p[i-1] = (<option key={i} value={i}>{`${i}x ${costString}`}</option>)
        }
        return p;
    }

    const currencyStyle : CSSProperties = {
        display: "flex",
        flexGrow: "1"
    }

    return (
        <span style={currencyStyle}>
            <select style={currencyStyle} name={nameInstallment} onChange={(e) => setValue(Number(e.target.value))}>
                {createOptions ()}
            </select>
        </span>
    );
}