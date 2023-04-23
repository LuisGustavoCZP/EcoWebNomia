import { Fragment, useEffect, useState } from "react";
import { IDebt, UserProps } from "../../models";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { dateLocal } from "../../utils";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);
  
export const options = {
    responsive: true,
    plugins: {
        legend: {
        position: 'top' as const,
        },
    },
};

export function Main ({auth, debts} : UserProps)
{
    const [filter, setFilter] = useState("all");
    const [data, setData] = useState<any>({labels:[], datasets:[]});

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
            const date = new Date(debt.paymentDate);
            
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
        const dataMontlyDebts = values.map((debts => debts.reduce((t, debt) => t += (new Date(debt.paymentDate).addMonths(debt.installment.next-1) < today)? debt.payment.next : 0, 0)));

        return [labels, dataTotalDebts, dataAmortizedDebts, dataMontlyDebts]
    }

    useEffect(() => 
    {
        const [labels, dataDebtTotal, dataAmortizedDebts, dataMontlyDebts] = extractDebtsData(debts.list);

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
                    label: 'Amortizações',
                    data: dataAmortizedDebts,
                    borderColor: 'hsl(110, 50%, 50%)',
                    backgroundColor: 'hsl(110, 50%, 50%, 1)',
                },
                {
                    label: 'Payments',
                    data: dataMontlyDebts,
                    borderColor: 'hsl(54, 50%, 50%)',
                    backgroundColor: 'hsl(54, 50%, 50%, 1)',
                },
            ],
        };

        setData(data);
    }, []);

    return (
        <Fragment>
            <main>
                <h2>Olá, {auth.name}</h2>
                <div className="LineChart">
                    <Line options={options} data={data}/>
                </div>
            </main>
        </Fragment>
    );
}