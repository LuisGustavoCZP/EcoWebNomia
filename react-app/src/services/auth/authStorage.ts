import { IAuth } from "../../models";

export function readAuth ()
{
    const token = localStorage.getItem("token")!;
    const name = localStorage.getItem("name")!;
    const id = parseInt(localStorage.getItem("id")!);

    return {token, id, name} as IAuth
}

export function writeAuth ({token, name, id} : IAuth)
{
    localStorage.setItem("token", token);
    localStorage.setItem("name", name);
    localStorage.setItem("id", id.toString());
}

export function eraseAuth ()
{
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    localStorage.removeItem("id");
}