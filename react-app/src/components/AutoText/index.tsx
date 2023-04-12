import { FormEvent, Fragment, useEffect, useState } from "react";
import { Select } from "../Select";
import { IOptions } from "../../models";

interface AutoTextProps
{
    wordList: string[]
    name: string,
    placeholder?: string,
    required?: boolean
}

export function AutoText ({wordList, name, required=false, placeholder=undefined} : AutoTextProps)
{
    const allWords : IOptions = wordList.map((w, i) => [w, i]);

    const [words, setWords] = useState(allWords);
    const [select, setSelected] = useState<number | undefined>();
    const [showing, setShow] = useState(false);
    const [value, setValue] = useState("");
    
    function onInput (e : FormEvent<HTMLInputElement>)
    {   
        setSelected(undefined);
        const target = e.target as HTMLInputElement;
        setValue(target.value);
    }

    function onKeyDown  (e : KeyboardEvent)
    {
        if(words.length === 0) return; 
        
        showOptions ();

        if (e.key === "Enter") 
        {
            e.preventDefault();
            e.stopPropagation();
            if(showing)
            {
                if(select !== undefined) setValue(wordList[select]);
                setShow(false);
            }
        } 
        // User pressed the up arrow, decrement the index
        else if (e.key === "ArrowUp" && showing) 
        {
            const lastIndex = words.length-1;
            const lastWord = words[lastIndex][1]!;
            const s = select !== undefined ? words.findIndex(([, i]) => i === select)-1 : undefined;
            let v = s || lastWord;
            if(v < 0) v = lastWord;
            setSelected(v);
        } 
        // User pressed the down arrow, increment the index
        else if (e.key === "ArrowDown" && showing) 
        {
            const lastIndex = words.length-1;
            const firstWord = words[0][1]!;
            const s = select !== undefined ? words.findIndex(([, i]) => i === select)+1 : undefined;
            let v = s || firstWord;
            if(v > lastIndex) v = firstWord;
            setSelected(v);
        }
    }

    function showOptions ()
    {
        if(words.length <= 0) return;
        setShow(true);
    }

    function renderList ()
    {   
        if(!showing) return null;
        return (
            <Select wordList={words} selected={select} onSelect={(i) => 
            {
                if(setSelected !== undefined) setSelected(i);
                setShow(false);
                if(i !== undefined) setValue(wordList[i]);
            }}/>
        )
    }

    useEffect(() => 
    {
        const list = allWords.filter(([word]) => word.includes(value));
        setWords(list);
    }, [value])
    
    return (
        <Fragment>
            <input type="text" name={name} placeholder={placeholder} required={required} onKeyDown={(e) => onKeyDown(e as any)} onFocus={() => showOptions ()} onInput={onInput} value={value} />
            {renderList ()}
        </Fragment>
    );
}