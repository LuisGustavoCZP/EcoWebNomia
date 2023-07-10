import { FormEvent, Fragment, useContext, useEffect, useState } from "react";
import mountNames from "../../assets/month-names.json";
import { DebtsContext } from '../../context';
import { LineGraphic, debtsPaymentByMonth, debtsTotalByMonth } from "../../features/graphics";
import { useFilter } from '../../hooks';
import { IDebt, UserProps } from "../../interfaces";

const now = new Date();
now.setDate(28);
now.setMonth(0);

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