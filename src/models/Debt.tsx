import { IDebt, IPayment } from "../interfaces";
import debtsStatus from "../assets/debt-status.json";
import { DebtItem } from "../components/DebtList/DebtItem";

const [OK, COMPLETE, OVERDUE, WARNING, ATTENTION] = debtsStatus;

function ceil2 (num : number)
{
    return Math.ceil(num*100)/100;
}

export class Debt implements IDebt
{
    id:number;
    creationDate:Date;
    updateDate:Date;
    paymentDate:Date;
    category:string;
    description:string;
    owner:number;
    creditor:string;
    
    installment: {
        total:number,
        next:number,
        cost:number,
    };

    payment: {
        total:number,
        rest:number,
        percent:number,
        next:number,
    };

    cost: {
        total:number,
        currency: string,
    };

    payments: IPayment[];

    constructor (debt : any)
    {
        const total = debt["installments-total"];
        const costTotal = debt["cost-total"];
        const parcelCost = ceil2(costTotal / total);
    
        const paymentTotal = debt.payments.reduce((t : any, payment : any) => t += payment.value, 0);
        const paymentRest = costTotal - paymentTotal;
        const paymentPendent = paymentRest / costTotal;
        
        const paymentParcels = total - (paymentPendent * total);
        const nextParcel = Math.floor(paymentParcels) + 1;
        const nextCost = ceil2((nextParcel - paymentParcels) * parcelCost);

        this.creationDate = new Date(debt["creation-date"]);
        this.creationDate.setHours(0, 0, 0, 0);
        
        this.updateDate = new Date(debt["update-date"]);
        this.updateDate.setHours(0, 0, 0, 0);

        this.paymentDate = new Date(debt["payment-date"]);
        this.paymentDate.setHours(0, 0, 0, 0);

        const {id, owner, category, description, creditor, payments} = debt;
        
        this.id = id;
        this.owner = owner;
        this.category = category;
        this.description = description;
        this.creditor = creditor;
        this.payments = payments;

        this.installment = {
            total: total,
            next: nextParcel,
            cost: parcelCost
        }
    
        this.payment = {
            next: nextCost,
            rest: paymentRest,
            percent: 1 - paymentPendent,
            total: paymentTotal
        }
    
        this.cost = {
            currency: debt["cost-currency"],
            total: costTotal
        }
    }

    status (date : number | Date)
    {
        const today = date ? new Date(date) : new Date();
        today.setHours(0, 0, 0, 0);
    
        let nextPayday = new Date(today);
        if(nextPayday.getDate() > 2)
        {
            nextPayday = new Date(nextPayday.toISOString().replace(/\d{2}T/, "02T"));
            nextPayday.addMonths(1);
        }
        else 
        {
            nextPayday.addMonths(1);
        }

        const nextPaymentDate = new Date(this.paymentDate).addMonths(this.installment.next-1);
        nextPaymentDate.setHours(0, 0, 0, 0);

        if(!this.payment.rest)
        {
            return COMPLETE;
        }
        else if(nextPaymentDate.getTime() < today.getTime())
        {
            return OVERDUE;
        }
        else if(nextPaymentDate.getTime() === today.getTime())
        {
            return WARNING;
        }
        else if(nextPaymentDate.getTime() < nextPayday.getTime())
        {
            return ATTENTION;
        }
        return OK;
    }

    render (pay:(id : number) => void, date : number | Date)
    {
        return <DebtItem debt={this} status={this.status(date)} pay={pay} />;
    }
}