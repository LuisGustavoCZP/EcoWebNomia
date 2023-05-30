import { PropsWithChildren } from "react";
import "./style.css";

export interface ModalSuperProps 
{
    onClose?: () => void
}

export function Modal ({children, onClose} : PropsWithChildren & ModalSuperProps)
{
    return (
        <aside className="Modal" onClick={onClose}>
            <div onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </aside>
    );
}