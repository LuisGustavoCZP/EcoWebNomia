export interface IResponse
{
    result: 'success' | 'error',
    data?: any
    error?: string
}