import { IPayment } from "./ipayment";

export interface IDebt {
    id:number,
    creationDate:Date,
    updateDate:Date,
    paymentDate:Date,
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
    payments: IPayment[]
    status: (date : Date | number) => string;
    render: (pay:(id : number) => void, date : number | Date) => React.ReactNode
}