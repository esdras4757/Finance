import React from 'react';

import Image01 from '../../images/user-36-05.jpg';
import Image02 from '../../images/user-36-06.jpg';
import Image03 from '../../images/user-36-07.jpg';
import Image04 from '../../images/user-36-08.jpg';
import Image05 from '../../images/user-36-09.jpg';
import { RiseOutlined, SwapOutlined , FallOutlined} from '@ant-design/icons';

function DashboardCard10({data}) {

  const customers = [
    {
      id: '0',
      image: Image01,
      name: 'Alex Shatov',
      email: 'alexshatov@gmail.com',
      location: '🇺🇸',
      spent: '$2,890.66',
    },
    {
      id: '1',
      image: Image02,
      name: 'Philip Harbach',
      email: 'philip.h@gmail.com',
      location: '🇩🇪',
      spent: '$2,767.04',
    },
    {
      id: '2',
      image: Image03,
      name: 'Mirko Fisuk',
      email: 'mirkofisuk@gmail.com',
      location: '🇫🇷',
      spent: '$2,996.00',
    },
    {
      id: '3',
      image: Image04,
      name: 'Olga Semklo',
      email: 'olga.s@cool.design',
      location: '🇮🇹',
      spent: '$1,220.66',
    },
    {
      id: '4',
      image: Image05,
      name: 'Burak Long',
      email: 'longburak@gmail.com',
      location: '🇬🇧',
      spent: '$1,890.66',
    },
  ];

  return (
    <div className="col-span-full xl:col-span-6 bg-white dark:bg-gray-800 shadow-sm rounded-xl">
      <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60">
        <h2 className="font-semibold text-gray-800 dark:text-gray-100">Ultimos movimientos</h2>
      </header>      
      <div className="p-3">

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            {/* Table header */}
            <thead className="text-xs font-semibold uppercase text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-700 dark:bg-opacity-50">
              <tr>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left text-gray-100">Tipo</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left text-gray-100">Concepto</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left text-gray-100">Monto</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-center text-gray-100">Fecha</div>
                </th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody className="text-sm divide-y divide-gray-100 dark:divide-gray-700/60">
              {
                data.map(movement => {
                  let amountColor = '#ccc';
                  let icon
                  let textType = ''
                  switch (movement.type) {
                    case 'income':
                      amountColor = 'text-green-500';
                      icon = <RiseOutlined className='text-green-500' style={{fontSize:20}}/>;
                      textType = 'Ingreso'
                      break;
                    case 'expense':
                      amountColor = 'text-red-400';
                      icon = <FallOutlined className='text-red-400' style={{fontSize:20}}/>
                      textType = 'Egreso'
                      break;
                    case 'debt':
                      amountColor = 'text-blue-300';
                      icon = <SwapOutlined className='text-blue-300' style={{fontSize:20}}/> 
                      textType = 'Deuda'
                      break;
                    default:
                      amountColor = 'gray'
                      break;
                  }

                  return (
                    <tr key={movement.id}>
                      <td className="p-2 whitespace-nowrap">
                        
                        <div className="flex items-center">
                        <div className="w-10 h-10 shrink-0 mr-2 sm:mr-0">
                          <div className="flex items-center justify-center w-10 h-10">
                            {icon}
                            </div>
                          </div>
                          <div className="font-medium text-gray-800 dark:text-gray-100">{textType}</div>
                        </div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="text-left text-gray-100">{movement?.concept}</div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className={`text-left font-medium ${amountColor}`}>$ {movement.amount}</div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="text-sm text-center">{movement.creation_date}</div>
                      </td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>

        </div>

      </div>
    </div>
  );
}

export default DashboardCard10;
