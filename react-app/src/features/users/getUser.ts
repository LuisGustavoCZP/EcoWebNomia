import { IBaseUser } from '../../models';
import { api } from '../../services';

export async function getUsers (token : string)
{
    const response = await api.get("users", token);
    return response.data as IBaseUser[]
}