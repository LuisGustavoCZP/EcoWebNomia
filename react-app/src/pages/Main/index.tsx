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
        const debtsOrdered = Array.from(debts);
        debtsOrdered.sort((a, b) => a["payment-date"] > b["payment-date"]? -1 : 1)
        
        const debtsByDate = debtsOrdered.reduce((l : [Date, IDebt[]][], debt) => 
        {
            const date = new Date(debt["payment-date"]);//.replace(/T.+/gi, '').split("-").reverse().join(" / ");
            
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
        const values = Object.values(debtsByDateObj).map((debts => debts.reduce((t, debt) => t += debt["cost-total"], 0)));

        return [labels, values]
    }

    useEffect(() => 
    {
        const [labels, values] = extractDebtsData(debts.list);

        const data = {
            labels: labels,
            datasets: [
                {
                    label: 'Dividas',
                    data: values,
                    borderColor: 'rgb(255, 100, 100)',
                    backgroundColor: 'rgba(255, 100, 100, 1)',
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