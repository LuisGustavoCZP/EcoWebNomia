import { IDebt } from "../../interfaces";

export function debtsTotalByMonth (debts : IDebt[], dates : string[])
{
    return dates.map((date) => 
    {
        const [year, month] = date.trim().split("-").map(s => Number(s));
        const dateType = new Date(year, month, 30);

        return debts.reduce((t, debt) => 
        {
            if(debt.paymentDate > dateType) return t;

            const d = new Date(dateType.getTime() - debt.paymentDate.getTime());
            const y = d.getFullYear() - 1970;
            let mt = d.getMonth() + (y * 12);

            if(mt > debt.installment.total) return t;

            t += debt.installment.cost * (debt.installment.total - mt);

            return t;
        }, 0)
    });
}

export function debtsPaymentByMonth (debts : IDebt[], dates : string[])
{
    return dates.map((date) => 
    {
        const [year, month] = date.trim().split("-").map(s => Number(s));
        const dateType = new Date(year, month, 29);

        return debts.reduce((t, debt) => 
        {
            if(debt.paymentDate > dateType) return t;

            const d = new Date(dateType.getTime() - debt.paymentDate.getTime());
            const y = d.getFullYear() - 1970;
            let mt = d.getMonth() + 1 + (y * 12);

            if(mt > debt.installment.total) return t;

            t += debt.installment.cost;

            return t;
        }, 0)
    });
}