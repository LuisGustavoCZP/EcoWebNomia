export interface IPayment {
    id: number,
    "creation-date": string,
    "payment-date": string,
    debtID: number,
    currency: string,
    value: number,
    description: string
}