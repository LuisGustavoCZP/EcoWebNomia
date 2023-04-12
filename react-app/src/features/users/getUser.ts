import { IAuth, IBaseUser } from '../../models';
import { api } from '../../services';

export async function getUsers (auth : IAuth)
{
    const response = await api.get("users", auth);
    return response.data as IBaseUser[]
}