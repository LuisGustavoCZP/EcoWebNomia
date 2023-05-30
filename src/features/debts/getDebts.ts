import { api } from '../../services';
import { IAuth, IDebt } from "../../interfaces";
import { Debt } from '../../models';

export async function getDebts (auth : IAuth)
{
    const response = await api.get("debts", auth);
    console.log(response)
    let data = response.data;

    const debts : IDebt[] = data.map((debt : any) => 
    {
        return new Debt(debt);
    });
    
    debts.sort((a, b) => new Date(a.paymentDate) > new Date(b.paymentDate)? -1 : 1)
    
    return debts; 
}