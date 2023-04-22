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
    "installment-cost":number,
    "installment-next":number,
    "payment-total":number,
    "payment-rest":number,
    "payment-percent":number,
    "payment-next":number,
    "cost-total":number,
    "cost-currency": string,
    "payment-date":string,
    payments: IPayment[]
}