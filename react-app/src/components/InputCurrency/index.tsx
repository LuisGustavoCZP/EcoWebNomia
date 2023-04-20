import { CSSProperties, FormEvent, useState } from "react";
import { Choices } from "../Choices";

const pattern = "((\\d{1,3}\\.){0,}\\d{3}|\\d{1,3})(,\\d{0,2})?";

type ICurrency = [
    type : string, 
    value : string
]

interface IInputCurrencyProps {
    name?: string,
    value?: string,
    type?: "BRL" | "USD",
    style?: CSSProperties,
    onChange?: (currency : ICurrency) => void
}

export function InputCurrency ({name, value="0,00", type="BRL", style, onChange} : IInputCurrencyProps)
{
    const [currencyType, setCurrencyType] = useState<string>(type);
    const [currencyValue, setCurrencyValue] = useState(value);

    function onInput (e : FormEvent<HTMLInputElement>)
    {
        const input = e.target as HTMLInputElement;
        let value = input.value;
        const match = value.match(/\d*/gmi);
        
        value = match? match.join('') : "000";

        if(value.length === 0)
            value = `000`;
        if(value.length === 1)
            value = `00${value}`;
        
        const decimals = value.slice(-2);
        let integers = value.slice(0, -2);

        if(integers) integers = integers.replace(/\b0+/g, '');

        if(integers.length === 0) integers = '0';
        else 
        {
            const digits = integers.split('');
            const points = Math.floor((digits.length-1) / 3);
            if(points > 0)
            {
                for (let point = 1; point <= points; point++)
                {
                    const i = (point * 3) + 1;
                    const s = digits.length - i;
                    digits[s] = `${digits[s]}.` 
                }
            }
            integers = digits.join('');
        }
        value = `${integers},${decimals}`;

        onChanged(currencyType, value);
        
        setCurrencyValue(value);
    }

    function onChanged(type: string, value: string)
    {
        if(onChange) onChange([type, value]);
    }

    const choicesStyle : CSSProperties = {
        maxWidth: "calc(2rem + 10px)",
        minHeight: "100%"
    }

    const currencyString = Number(currencyValue.replace(".", "").replace(",", ".")).toLocaleString("pt-br", { style: 'currency', currency:currencyType});

    return (
        <span className="InputCurrency" style={style}>
            <Choices style={choicesStyle} wordList={[["BRL", "R$"], ["USD", "U$"]]} initial={currencyType} onChange={(cType) => {setCurrencyType(cType); onChanged(cType, currencyValue);}} />
            <input type="text" required pattern={`^${pattern}$`} onInput={onInput} value={`${currencyValue}`}/>
            {name ? <input type="hidden" hidden name={name} value={currencyString}/> : null}
        </span>
    );
}