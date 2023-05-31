import { Fragment } from "react";
import { IOptions } from "../../interfaces";
import "./style.css";

interface SelectProps 
{
    wordList: IOptions
    selected?: number
    onSelect: (index? : number) => void
}

export function Select ({wordList, onSelect, selected = undefined} : SelectProps)
{
    function createList ()
    {
        if(!wordList || wordList.length === 0) return null;
        return (
            <ul> 
                {
                wordList.map(([word, i]) => 
                {
                    if(selected !== undefined && i === selected)
                    {
                        return (
                            <li key={i} className="Selected">{word}</li>
                        );
                    }

                    return (
                        <li key={i} onClick={() => onSelect(i!)}>{word}</li>
                    );
                })
                }
            </ul>
        );
    }

    
    return (
        <Fragment>
            <div className="Select">
                {createList ()}
            </div>
            <div className="SelectBack" onClick={() => onSelect()}></div>
        </Fragment>
    );
}