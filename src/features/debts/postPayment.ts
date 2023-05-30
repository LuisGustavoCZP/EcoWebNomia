import { api } from '../../services';
import { IAuth } from "../../interfaces";

export async function postPayment (payment: any, auth: IAuth)
{
    const response = await api.post("payments", payment, auth);
    console.log(payment, response)
    return response
}