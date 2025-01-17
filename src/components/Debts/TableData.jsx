import React from "react";

import Image01 from "../../images/user-36-05.jpg";
import Image02 from "../../images/user-36-06.jpg";
import Image03 from "../../images/user-36-07.jpg";
import Image04 from "../../images/user-36-08.jpg";
import Image05 from "../../images/user-36-09.jpg";
import {
  RiseOutlined,
  SwapOutlined,
  FallOutlined,
  EditOutlined,
  DeleteOutlined,
  UserOutlined,
  CheckOutlined,
  UpCircleOutlined,
  DownCircleOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import { Button } from "antd";
function TableData({ data, setData, deleteFN, editFN }) {
  return (
    <div className="col-span-full xl:col-span-6 bg-white dark:bg-gray-800 shadow-sm rounded-xl">
      <div className="p-3">
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            {/* Table header */}
            <thead className="text-xs font-semibold uppercase text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-700 dark:bg-opacity-50">
              <tr>
                {/* <th className="p-2 whitespace-nowrap" style={{width:'60px'}}>
                  <div className="font-semibold text-center text-gray-100" >Tipo</div>
                </th> */}
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left text-gray-100">
                    Concepto
                  </div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left text-gray-100">
                    Contacto
                  </div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left text-gray-100">
                    Monto
                  </div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-center text-gray-100">
                    Categoria
                  </div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-center text-gray-100">
                    Status
                  </div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-center text-gray-100">
                    Fecha
                  </div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-center text-gray-100">
                    Ultima actualizacion
                  </div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-center text-gray-100">
                    Acciones
                  </div>
                </th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody className="text-sm divide-y divide-gray-100 dark:divide-gray-700/60">
              {data &&
                data.map((movement) => {
                  let amountColor = "text-green-500";
                  let icon = (
                    <RiseOutlined
                      className="text-green-500"
                      style={{ fontSize: 20 }}
                    />
                  );
                  let textType = "";
                  let status = "-";
                  console.log(movement);
                  switch (movement.type) {
                    case "to-receive":
                      amountColor = "text-green-500";
                      icon = (
                        <RiseOutlined
                          className="text-green-500"
                          style={{ fontSize: 20 }}
                        />
                      );
                      break;
                    case "to-pay":
                      amountColor = "text-red-500";
                      icon = (
                        <FallOutlined
                          className="text-red-500"
                          style={{ fontSize: 20 }}
                        />
                      );
                      break;

                    default:
                      break;
                  }
                  switch (movement.isPaid) {
                    case true:
                      status = "Pagado";
                      break;
                    case false:
                      status = "Pendiente";
                      break;

                    default:
                      break;
                  }

                  return (
                    <tr key={movement.id}>
                      {/* <td className="p-2 whitespace-nowrap">
                        
                        <div className="flex items-center">
                        <div className="w-0 h-10 shrink-0  sm:mr-0">
                          <div className="flex items-center justify-center w-10 h-10">
                            {icon}
                            </div>
                          </div>
                        </div>
                      </td> */}
                      <td className="p-2 whitespace-nowrap">
                        <div className="text-left text-gray-100">
                          {movement?.concept}
                        </div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className={`text-left font-medium`}>
                          {" "}
                          {
                            <UserOutlined
                              className="text-blue-400 mr-1"
                              style={{ fontSize: 16 }}
                            />
                          }{" "}
                          {movement?.contact
                            ? movement?.contact?.name ?? ""
                            : "-"}{" "}
                          {movement?.contact
                            ? movement?.contact?.lastName ?? ""
                            : "-"}
                        </div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className={`text-left font-medium ${amountColor}`}>
                          $ {movement?.amount?.toLocaleString()}
                        </div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className={`text-center font-medium`}>
                          {movement?.category ? movement.category.name : "-"}
                        </div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div
                          className={`text-center font-medium ${
                            movement.isPaid ? "text-green-600" : "text-red-500"
                          }`}
                        >
                          {status}
                        </div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="text-sm text-center">
                          {dayjs(movement?.creation_date).format("DD-MM-YYYY")}
                        </div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="text-sm text-center">
                          {dayjs(movement?.last_update).format("DD-MM-YYYY")}
                        </div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="flex justify-center space-x-5">

                          <div className="text-center">
                          <UpCircleOutlined
                            title="Aumentar deuda"
                            onClick={() => deleteFN(movement.debtId)}
                            className="text-red-400"
                            style={{ fontSize: 16 }}
                          />
                          <div className="text-center mt-1 text-sm xs:hidden text-wrap text-red-400" style={{fontSize:10}}>Incrementar</div>
                          </div>

                          <div className="text-center ">
                          <DownCircleOutlined
                            title="Reducir deuda"
                            onClick={() => deleteFN(movement.debtId)}
                            className="text-blue-600"
                            style={{ fontSize: 16 }}
                          />
                          <div className="text-center mt-1 text-sm xs:hidden text-wrap text-blue-600" style={{fontSize:10}}>Abonar</div>
                          </div>

                          <div className="text-center">
                          <CheckOutlined
                            title="Marcar como pagado"
                            onClick={() => deleteFN(movement.debtId)}
                            className="text-green-500"
                            style={{ fontSize: 16 }}
                          />
                          <div className="text-center mt-1 text-sm xs:hidden text-wrap text-green-500" style={{fontSize:10}}>Completar</div>
                          </div>


                          <div className="text-center">
                          <EditOutlined
                            title="Editar"
                            onClick={() => editFN()}
                            className="text-blue-400"
                            style={{ fontSize: 18 }}
                          />
                          <div className="text-center mt-1 text-sm xs:hidden text-wrap text-blue-400" style={{fontSize:10}}>Editar</div>
                          </div>
                          
                          <div className="text-center">
                          <DeleteOutlined
                            title="Eliminar"
                            onClick={() => deleteFN(movement.debtId)}
                            className="text-red-500"
                            style={{ fontSize: 16 }}
                          />
                          <div className="text-center mt-1 text-sm xs:hidden text-wrap text-red-500" style={{fontSize:10}}>Eliminar</div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default TableData;
