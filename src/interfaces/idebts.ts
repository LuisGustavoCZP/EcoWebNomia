import { IDebt } from "./idebt";

export interface IDebts {
    list: IDebt[], 
    reload: () => Promise<void>
}