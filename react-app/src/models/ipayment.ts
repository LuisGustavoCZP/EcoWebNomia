export interface IPayment {
    id: number,
    "creation-date": string,
    "payment-date": string,
    "debt-id": number,
    "type": string,
    currency: string,
    value: number,
    description: string
}