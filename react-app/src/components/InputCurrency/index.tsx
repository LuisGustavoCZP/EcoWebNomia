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
    type?: "BRL" | "USD" | string,
    style?: CSSProperties,
    required?: boolean
    max?: number
    onChange?: (currency : ICurrency) => void
}

export function InputCurrency ({name, value="0,00", type="BRL", style, onChange, required=true, max} : IInputCurrencyProps)
{
    const [currencyType, setCurrencyType] = useState<string>(type);
    const [currencyValue, setCurrencyValue] = useState(convert(value));
    
    function convert (v : string)
    {
        const match = v.match(/\d*/gmi);
        
        v = match? match.join('') : "000";

        if(v.length === 0)
            v = `000`;
        if(value.length === 1)
            v = `00${v}`;
        
        const decimals = v.slice(-2);
        let integers = v.slice(0, -2);

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
        return `${integers},${decimals}`;
    }

    function onInput (e : FormEvent<HTMLInputElement>)
    {
        const input = e.target as HTMLInputElement;
        let v = convert(input.value);
    
        const vn = Number(v.replace(".", "").replace(",", "."));
        if(max && vn > max)
        {
            v = convert(`${max}`);
        }

        onChanged(currencyType, v);
        setCurrencyValue(v);
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
            <input type="text" required={required} pattern={`^${pattern}$`} onInput={onInput} value={`${currencyValue}`}/>
            {name ? <input type="hidden" hidden name={name} value={currencyString}/> : null}
        </span>
    );
}