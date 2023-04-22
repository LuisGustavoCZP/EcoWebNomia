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
    let data = response.data as IDebt[];

    data = data.map((debt) => 
    {
        const total = debt["installments-total"];
        const costTotal = debt["cost-total"];
        const parcelCost = ceil2(costTotal/total);
    
        const paymentTotal = debt.payments.reduce((t, payment) => t += payment.value, 0);
        const paymentRest = costTotal - paymentTotal;
        const paymentPendent = paymentRest / costTotal;
        
        const paymentParcels = total - (paymentPendent * total);
        const nextParcel = Math.floor(paymentParcels) + 1;
        const nextCost = ceil2((nextParcel - paymentParcels) * parcelCost);

        return {...debt, "installment-cost":parcelCost, "installment-next":nextParcel, "payment-total":paymentTotal, "payment-rest":paymentRest, "payment-pendent": 1 - paymentPendent, "payment-next":nextCost}
    });
    

    return data as IDebt[]; 
}