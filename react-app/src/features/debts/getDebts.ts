import { api } from '../../services';
import { IAuth, IDebt } from "../../models";

function ceil2 (num : number)
{
    return Math.ceil(num*100)/100;
}

function floor2 (num : number)
{
    return Math.floor(num*100)/100;
}

export async function getDebts (auth : IAuth)
{
    const response = await api.get("debts", auth);
    console.log(response)
    let data = response.data;

    const today = new Date();
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

    const debts : IDebt[] = data.map((debt : any) => 
    {
        //debt["payment-date"] = new Date(debt["payment-date"]);

        const total = debt["installments-total"];
        const costTotal = debt["cost-total"];
        const parcelCost = ceil2(costTotal / total);
    
        const paymentTotal = debt.payments.reduce((t : any, payment : any) => t += payment.value, 0);
        const paymentRest = costTotal - paymentTotal;
        const paymentPendent = paymentRest / costTotal;
        
        const paymentParcels = total - (paymentPendent * total);
        const nextParcel = Math.floor(paymentParcels) + 1;
        const nextCost = ceil2((nextParcel - paymentParcels) * parcelCost);

        const creationDate = debt["creation-date"];
        const updateDate = debt["update-date"];
        const paymentDate = debt["payment-date"];
        const {id, owner, category, description, creditor, payments} = debt;
        
        const installment = {
            total: total,
            next: nextParcel,
            cost: parcelCost
        }
    
        const payment = {
            next: nextCost,
            rest: paymentRest,
            percent: 1 - paymentPendent,
            total: paymentTotal
        }
    
        const cost = {
            currency: debt["cost-currency"],
            total: costTotal
        }

        const nextPaymentDate = new Date(paymentDate).addMonths(installment.next-1);
        nextPaymentDate.setHours(0, 0, 0, 0);

        let status = "ok";

        if(!payment.rest)
        {
            status = "complete";
        }
        else if(nextPaymentDate.getTime() < today.getTime())
        {
            status = "overdue";
        }
        else if(nextPaymentDate.getTime() === today.getTime())
        {
            status = "warning";
        }
        else if(nextPaymentDate.getTime() < nextPayday.getTime())
        {
            status = "attention";
        }

        return {id, owner, paymentDate, category, description, creditor, installment, payment, cost, payments, status, creationDate, updateDate}
    });
    
    debts.sort((a, b) => new Date(a.paymentDate) > new Date(b.paymentDate)? -1 : 1)

    return debts; 
}