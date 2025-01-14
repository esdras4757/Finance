import React from 'react';
import { Link } from 'react-router-dom';
import LineChart from '../../charts/LineChart01';
import { chartAreaGradient } from '../../charts/ChartjsConfig';
import EditMenu from '../../components/DropdownEditMenu';

// Import utilities
// ts-ignore
import { tailwindConfig, hexToRGB } from '../../utils/Utils';

function DashboardCard01(
  props
) {
const {data} = props;

const labels = data.TotalBalanceGraph.labels;
// const values = [...data.ExpensesGraph.amounts, ...data.IncomesGraph.amounts];
// const values = all.reduce((acc, curr) => acc + curr, 0);
const values=[] 
data.TotalBalanceGraph.amounts.reduce(( acc, curr)=>{
  values.push(acc + curr)
  return acc + curr;
}, 0);

console.log(values)


console.log(values)

  const chartData = {
    labels,
    datasets: [
      // Indigo line
      {
        data: values,
        fill: true,
        backgroundColor: function(context) {
          const chart = context.chart;
          const {ctx, chartArea} = chart;
          return chartAreaGradient(ctx, chartArea, [
            { stop: 0, color: `rgba(${hexToRGB(tailwindConfig().theme.colors.blue[500])}, 0)` },
            { stop: 1, color: `rgba(${hexToRGB(tailwindConfig().theme.colors.blue[500])}, 0.2)` }
          ]);
        },            
        borderColor: tailwindConfig().theme.colors.blue[500],
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 3,
        pointBackgroundColor: tailwindConfig().theme.colors.blue[500],
        pointHoverBackgroundColor: tailwindConfig().theme.colors.blue[500],
        pointBorderWidth: 0,
        pointHoverBorderWidth: 0,
        clip: 20,
        tension: 0.2,
      },
      // Gray line
      {
        data: [
          732000000, 610000, 61000000, 500000000004
        ],
        borderColor: `rgba(${hexToRGB(tailwindConfig().theme.colors.gray[500])}, 0.25)`,
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 3,
        pointBackgroundColor: `rgba(${hexToRGB(tailwindConfig().theme.colors.gray[500])}, 0.25)`,
        pointHoverBackgroundColor: `rgba(${hexToRGB(tailwindConfig().theme.colors.gray[500])}, 0.25)`,
        pointBorderWidth: 0,
        pointHoverBorderWidth: 0,
        clip: 20,
        tension: 0.2,
      },
    ],
  };

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-gray-800 shadow-sm rounded-xl">
      <div className="px-5 pt-5">
        <header className="flex flex-col justify-between items-start mb-2">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-0">Saldo total</h2>      
          {/* Menu button */}
          {/* <EditMenu align="right" className="relative inline-flex">
            <li>
              <Link className="font-medium text-sm text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-200 flex py-1 px-3" to="#0">
                Option 1
              </Link>
            </li>
            <li>
              <Link className="font-medium text-sm text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-200 flex py-1 px-3" to="#0">
                Option 2
              </Link>
            </li>
            <li>
              <Link className="font-medium text-sm text-red-500 hover:text-red-600 flex py-1 px-3" to="#0">
                Remove
              </Link>
            </li>
          </EditMenu> */}
        </header>
        {/* <div className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase mb-1">Sales</div> */}
        <div className="flex items-start">
        <div className = {`text-3xl font-bold ${ data.totalBalance<0? 'dark:text-red-700':'dark:text-gray-100' } mr-2`}>${data?.totalBalance?.toLocaleString()}</div>
          {/* <div className="text-sm font-medium text-green-700 px-1.5 bg-green-500/20 rounded-full">+49% </div> */}
        </div>
        <div className="flex items-center justify-between my-1"> 
          <h2 className="font-semibold text-gray-500 dark:text-yellow-600 mb-2" style={{fontSize:13}}>Saldo despues de deudas:</h2>
          <span className=' font-semibold text-gray-500 dark:text-yellow-600 mb-2' style={{fontSize:13}}>{(data.totalBalance - data.totalDebts).toLocaleString()}</span>
          </div>
      </div>
      
      {/* Chart built with Chart.js 3 */}
      <div className="grow max-sm:max-h-[128px] xl:max-h-[128px]">
        {/* Change the height attribute to adjust the chart height */}
        <LineChart data={chartData} width={389} height={128} />
      </div>
    </div>
  );
}

export default DashboardCard01;
