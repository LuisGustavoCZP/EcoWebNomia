import { FormEvent, Fragment, useEffect, useState } from "react";
import { Select } from "../Select";
import { IOptions } from "../../models";
import "../../styles/choices.css";

interface ChoicesProps
{
    wordList: [string, string][];
    initial?: string;
    onChange?: (select : string) => void;
}

export function Choices ({wordList, initial=wordList[0][0], onChange = undefined} : ChoicesProps)
{
    const allWords : IOptions = wordList.map(([, w], i) => [w, i]);
    const initialIndex = wordList.findIndex(([w]) => w === initial);

    const [selected, setSelected] = useState<number>(initialIndex);
    const [showing, setShow] = useState(false);

    function pick (index : number)
    {
        return wordList[index][0];
    }

    function select ()
    {
        if(showing)
        {
            if(onChange) onChange(pick (selected));
            setShow(false);
        }
    }

    function onKeyDown  (e : KeyboardEvent)
    {
        if(allWords.length === 0) return; 
        
        showOptions ();

        if (e.key === "Enter") 
        {
            e.preventDefault();
            e.stopPropagation();

            select();
        } 
        // User pressed the up arrow, decrement the index
        else if (e.key === "ArrowUp" && showing) 
        {
            e.preventDefault();
            e.stopPropagation();
            
            const lastIndex = allWords.length-1;
            const lastWord = allWords[lastIndex][1]!;
            const s = selected !== undefined ? selected-1 : undefined;
            let v = s || lastWord;
            if(v < 0) v = lastWord;
            setSelected(v);
        } 
        // User pressed the down arrow, increment the index
        else if (e.key === "ArrowDown" && showing) 
        {
            e.preventDefault();
            e.stopPropagation();

            const lastIndex = allWords.length-1;
            const firstWord = allWords[0][1]!;
            const s = selected !== undefined ? selected+1 : undefined;
            let v = s || firstWord;
            if(v > lastIndex) v = firstWord;
            setSelected(v);
        }
    }

    function showOptions ()
    {
        if(allWords.length <= 0) return;
        setShow(true);
    }

    function renderList ()
    {   
        if(!showing) return null;
        return (
            <Select wordList={allWords} selected={selected} onSelect={(i) => 
            {
                if(i !== undefined) setSelected(i!);
            }}/>
        )
    }

    useEffect(() => 
    {
        console.log("Select", selected);
        select();

    }, [selected])
    
    return (
        <Fragment>
            <div className="Choices" onKeyDown={(e) => onKeyDown(e as any)} onClick={showOptions}>
                {wordList[selected][1]}
            </div>
            {renderList ()}
        </Fragment>
    );
}