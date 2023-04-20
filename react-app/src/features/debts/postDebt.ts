import { api } from '../../services';
import { IAuth } from "../../models";

export async function postDebt (debt: any, auth: IAuth)
{
    const response = await api.post("debts", debt, auth);
    console.log(response)
    return response
}