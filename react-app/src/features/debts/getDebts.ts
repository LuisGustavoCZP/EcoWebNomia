import { api } from '../../services';
import { IAuth, IDebt } from "../../models";

export async function getDebts (auth : IAuth)
{
    const response = await api.get("debts", auth);
    console.log(response)
    return response.data as IDebt[]
}