export interface IReponse
{
    result: 'success' | 'error',
    data?: any
    error?: string
}