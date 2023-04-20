import { api } from '../../services';
import { IAuth, IDebt } from "../../models";

export async function getDebts (auth : IAuth)
{
    const response = await api.get("debts", auth);
    console.log(response)
    let data = response.data as IDebt[];
    //.map((value: any, index: number) => {return {id:index, ...value}});
    //.map((value: any) => {return {...value, payments: data.payments.filter((payment) => payment.debtID === value.id)}})
    return data as IDebt[]; 
}