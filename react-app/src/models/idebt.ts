export interface IDebt {
    "creation-date":Date,
    "update-date":Date,
    category:string,
    name:string,
    owner:string,
    creditor:string,
    state:string,
    total:number,
    current:number,
    cost:number,
    parcel:number,
    "last-payment":Date,
    "next-payment":Date,
}