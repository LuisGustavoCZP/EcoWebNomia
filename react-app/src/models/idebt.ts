import { IPayment } from "./ipayment";

export interface IDebt {
    id:number,
    creationDate:string,
    updateDate:string,
    paymentDate:string,
    category:string,
    description:string,
    owner:number,
    creditor:string,
    installment: {
        total:number,
        next:number,
        cost:number,
    }
    payment: {
        total:number,
        rest:number,
        percent:number,
        next:number,
    }
    cost: {
        total:number,
        currency: string,
    }
    status: string,
    payments: IPayment[]
}