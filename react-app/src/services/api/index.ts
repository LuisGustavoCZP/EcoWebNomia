import type { IAuth, IResponse } from "../../models";
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

    async get (path : APIPath, auth? : IAuth)
    {
        const options : RequestInit = {
            method:"GET"
        }

        let authString = '';
        if(auth) 
            authString = Object.entries(auth).map(([key, value]) => `${key}=${value}`).join("&");

        const response = await fetch(`${this.url}?sheet=${path}${authString?`&${authString}`:''}`, options)
        .then(resp => resp.json())
        .catch(err => console.log(err));

        return response as IResponse;
    }

    async post (path : APIPath, body : Object, auth? : IAuth)
    {
        const formData = FormParser.formify(body);

        const options : RequestInit = {
            method:"POST",
            body: formData
        }

        let authString = '';
        if(auth) 
            authString = Object.entries(auth).map(([key, value]) => `${key}=${value}`).join("&");

        const response = await fetch(`${this.url}?sheet=${path}${authString?`&${authString}`:''}`, options)
        .then(resp => resp.json())
        /* .then((resp : IResponse) => {
            if(resp.result !== "success")
            {
                throw new Error(resp.error!);
                
            } 
            return resp;
        }) */
        .catch(err => console.log(err));
        
        return response as IResponse;
    }
}
const baseAPI = "AKfycbxNkxHe4p1E45Tiuo-4lyy7Vb2nQMVwqy4ZdwG5UzoKXhEUtTlClGL2ILYhSfXDUV22AQ";
export const api = new API(baseAPI);