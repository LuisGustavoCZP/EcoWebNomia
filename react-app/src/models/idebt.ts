import { IPayment } from "./ipayment";

export interface IDebt {
    id:number,
    "creation-date":string,
    "update-date":string,
    category:string,
    description:string,
    owner:number,
    creditor:string,
    "installments-total":number,
    "cost-total":number,
    "cost-currency": string,
    "payment-date":string,
    payments: IPayment[]
}