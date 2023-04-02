import { api } from '../../services';

export async function registerUser (username : string, password : string, name: string)
{
    return await api.post("users", {username, password, name});
}