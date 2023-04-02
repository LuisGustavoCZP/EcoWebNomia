import type { IReponse } from "../../models";
import { FormParser } from "../../utils";

type APIPath = "users" | "debts" | "gains" | "shopping" | "login";

export class API 
{
    url : string;
    constructor (url : string)
    {
        this.url = `https://script.google.com/macros/s/${url}/exec`;
    }

    tables = [
        "users",
        "debts",
        "gains",
        "shopping",
    ]

    async get (path : APIPath, token? : string)
    {
        const options : RequestInit = {
            method:"GET"
        }

        const response = await fetch(`${this.url}?sheet=${path}${token?`&token=${token}`:''}`, options)
        .then(resp => resp.json())
        .catch(err => console.log(err));

        return response as IReponse;
    }

    async post (path : APIPath, body : Object, token? : string)
    {
        const formData = FormParser.formify(body);

        const options : RequestInit = {
            method:"POST",
            body: formData
        }

        const response = await fetch(`${this.url}?sheet=${path}${token?`&token=${token}`:''}`, options)
        .then(resp => resp.json())
        .catch(err => console.log(err));

        return response as IReponse;
    }
}
const baseAPI = "AKfycbxNkxHe4p1E45Tiuo-4lyy7Vb2nQMVwqy4ZdwG5UzoKXhEUtTlClGL2ILYhSfXDUV22AQ";
export const api = new API(baseAPI);