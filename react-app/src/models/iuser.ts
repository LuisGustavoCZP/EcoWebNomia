export interface IBaseUser 
{
    id: number
    name: string
}

export interface IUser extends IBaseUser
{
    token?: string,
    username?: string,
    password?: string
}