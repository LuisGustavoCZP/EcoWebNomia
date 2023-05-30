import { api } from '../../services';
import { writeAuth } from "../../services";

export async function loginUser (username : string, password : string)
{
    const response = await api.post("login", {username, password});
    if(response.result === "success")
    {
        //console.log("Login realizado com sucesso!", response.data);
        writeAuth(response.data);
        return "";
    }
    else 
    {
        console.error(response.error!);
        return response.error!;
    }
}