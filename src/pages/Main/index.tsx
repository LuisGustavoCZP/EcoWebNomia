import { FormEvent, Fragment, useContext, useEffect, useState } from "react";
import mountNames from "../../assets/month-names.json";
import { DebtsContext } from '../../context';
import { LineGraphic, debtsPaymentByMonth, debtsTotalByMonth } from "../../features/graphics";
import { useFilter } from '../../hooks';
import { IDebt, UserProps } from "../../interfaces";

const now = new Date();
now.setDate(28);
now.setMonth(0);/* 

function extractDebtsData (debts : IDebt[])
{
    let today = new Date(Date.now()).addDays(10);
    if(today.getDate() > 2)
    {
        today = new Date(today.toISOString().replace(/\d{2}T\d{2}:\d{2}:\d{2}.\d{3}/, "02T00:00:00.000"));
        today.addMonths(1);
    }
    else today = new Date(today.toISOString().replace(/\d{2}T\d{2}:\d{2}:\d{2}.\d{3}/, "02T00:00:00.000"));

    console.log(today.toISOString());
    const debtsOrdered = Array.from(debts);
    debtsOrdered.sort((a, b) => a.paymentDate > b.paymentDate? -1 : 1)
    
    const debtsByDate = debtsOrdered.reduce((l : [Date, IDebt[]][], debt) => 
    {
        const date = debt.paymentDate;
        
        const group = l.filter(([d]) => date <= d);

        if(!group.some(([d]) => d === date))
        {
            const g : [Date, IDebt[]] = [date, []];
            l.push(g);
            group.push(g);
        }

        group.forEach(g => 
        {
            g[1].push(debt);
        });
        return l;
    }, []);

    debtsByDate.sort(([a], [b]) => a > b ? 1 : -1)
    console.log(debtsByDate);

    const debtsByDateJSON = debtsByDate.map(([date, list]) => [date.toLocaleDateString(), list]);
    const debtsByDateObj : {[key: string] : IDebt[]} = Object.fromEntries(debtsByDateJSON);
    const labels = Object.keys(debtsByDateObj);
    const values = Object.values(debtsByDateObj);
    const dataTotalDebts = values.map((debts => debts.reduce((t, debt) => t += debt.payment.rest, 0)));
    const dataAmortizedDebts = values.map((debts => debts.reduce((t, debt) => t += debt.payment.total, 0)));
    const dataMontlyDebts = values.map(((debts, mt) => debts.reduce((t, debt) => 
    {
        const m = mt - debt.paymentDate.getMonth();
        const p =  m;
        if(p < 0) return t;
        
        //const d = new Date(debt.paymentDate).addMonths(p);
        t += debt.installment.cost;

        console.log(`Pay ${debt.description} ${p}`, t);
        return t;
    }, 0)));

    return [labels, dataTotalDebts, dataAmortizedDebts, dataMontlyDebts]
} 
*/

export function Main ({auth} : UserProps)
{
    const debts = useContext(DebtsContext);
    const [filter, setFilter] = useFilter("main");
    /* const [status, setStatus] = useState("any");
    const [date, setDate] = useState(now); */
    const [data, setData] = useState<any>({labels:[], datasets:[]});

    function debtsData (debts : IDebt[])
    {
        const datesData = Array(17);
        for (let index = 0; index < datesData.length; index++) {
            const d = new Date(now).addMonths(index);
            const m = d.getMonth();
            const y = d.getFullYear();
            datesData[index] = [`${mountNames[m]} de ${y}`, `${y}-${m}`];
        }

        const dates = datesData.map(([,date]) => date);

        const dataTotalDebts = debtsTotalByMonth(debts, dates);
        const dataMontlyDebts = debtsPaymentByMonth(debts, dates);

        const datesLabels = datesData.map(([label]) => label);

        //console.log(datesLabels, dataTotalDebts)

        return [datesLabels, dataTotalDebts, dataMontlyDebts];
    }
    
    function filterList (list: IDebt[])
    {
        if(!filter) return list;
        const entries = Object.entries(filter);
        /* const statusAll = status === "any";

        if(statusAll)
        {
            list = list.filter((debt: IDebt) => 
            {
                const status = debt.status(date);
                return status !== "ok" && status !== "complete";
            });
        }
        else
        {
            list = list.filter((debt: IDebt) => debt.status(date) === status);
        } */

        if(entries.length === 0) 
        {
            return list;
        }

        return list.filter((debt : any) => entries.every(([key, value]) => debt[key] && debt[key] === value));
    }

    function renderUserFilter ()
    {
        const filterHandler = (e : FormEvent<HTMLSelectElement>) => 
        {
            const select = e.target as HTMLSelectElement;
            setFilter("creditor", select.value);
        }

        const creditorSet = new Set();
        const creditors = debts.list.filter(debt => 
        {
            if(creditorSet.has(debt.creditor)) return false;
            creditorSet.add(debt.creditor);
            return true;
        }).map((debt, i) => <option key={i} value={debt.creditor}>{debt.creditor}</option>)

        creditors.unshift(<option key={-1} value="any" defaultChecked>Todos</option>)

        // value={filter["creditor"]}
        return (
            <select onChange={filterHandler}>
                {creditors}
            </select>
        );
    }

    useEffect(() => 
    {
        const list = filterList(debts.list);
        const [labels, dataDebtTotal, dataMontlyDebts] = debtsData(list);

        const data = {
            labels: labels,
            datasets: [
                {
                    label: 'Dividas',
                    data: dataDebtTotal,
                    borderColor: 'rgb(255, 100, 100)',
                    backgroundColor: 'rgba(255, 100, 100, 1)',
                },
                {
                    label: 'Payments',
                    data: dataMontlyDebts,
                    borderColor: 'hsl(54, 50%, 50%)',
                    backgroundColor: 'hsl(54, 50%, 50%, 1)',
                },
                /* {
                    label: 'Amortizações',
                    data: dataAmortizedDebts,
                    borderColor: 'hsl(110, 50%, 50%)',
                    backgroundColor: 'hsl(110, 50%, 50%, 1)',
                },
                */
            ],
        };

        setData(data);
    }, [debts.list, filter]);

    return (
        <Fragment>
            <main>
                <span>
                    <h2>Olá, {auth.name}</h2>
                    { renderUserFilter() }
                </span>
                <div className="LineChart">
                    <LineGraphic data={data} />
                </div>
            </main>
        </Fragment>
    );
}