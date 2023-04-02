import { api } from '../../services';

export async function loginUser (username : string, password : string)
{
    return await api.post("login", {username, password});
}