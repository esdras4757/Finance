import React from 'react';
import BarChart from '../../charts/BarChart01';

// Import utilities
import { tailwindConfig } from '../../utils/Utils';

function DashboardCard04(props) {
const {data} = props;
const labelsExpenses = data.ExpensesGraph.labels;
const valuesExpenses = data.ExpensesGraph.amounts;
const labelsIncome = data.IncomesGraph.labels;
const valuesIncome = data.IncomesGraph.amounts;

  const chartData = {
    labels: labelsExpenses,
    datasets: [
      // Light blue bars
      {
        label: 'Egresos',
        data: valuesExpenses,
        backgroundColor: tailwindConfig().theme.colors.sky[500],
        hoverBackgroundColor: tailwindConfig().theme.colors.sky[600],
        barPercentage: 0.7,
        categoryPercentage: 0.7,
        borderRadius: 4,
      },
      // Blue bars
      {
        label: 'Ingresos',
        data: valuesIncome,
        backgroundColor: tailwindConfig().theme.colors.blue[500],
        hoverBackgroundColor: tailwindConfig().theme.colors.blue[600],
        barPercentage: 0.7,
        categoryPercentage: 0.7,
        borderRadius: 4,
      },
    ],
  };

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 bg-white dark:bg-gray-800 shadow-sm rounded-xl">
      <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60">
        <h2 className="font-semibold text-gray-800 dark:text-gray-100">Egresos vs Ingresos</h2>
      </header>
      {/* Chart built with Chart.js 3 */}
      {/* Change the height attribute to adjust the chart height */}
      <BarChart data={chartData} width={595} height={248} />
    </div>
  );
}

export default DashboardCard04;
