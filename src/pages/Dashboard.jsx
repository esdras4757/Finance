import React, { useEffect, useState } from "react";

import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import FilterButton from "../components/DropdownFilter";
import Datepicker from "../components/Datepicker";
import DashboardCard01 from "../partials/dashboard/DashboardCard01";
import DashboardCard02 from "../partials/dashboard/DashboardCard02";
import DashboardCard03 from "../partials/dashboard/DashboardCard03";
import DashboardCard04 from "../partials/dashboard/DashboardCard04";
import DashboardCard05 from "../partials/dashboard/DashboardCard05";
import DashboardCard06 from "../partials/dashboard/DashboardCard06";
import DashboardCard07 from "../partials/dashboard/DashboardCard07";
import DashboardCard08 from "../partials/dashboard/DashboardCard08";
import DashboardCard09 from "../partials/dashboard/DashboardCard09";
import DashboardCard10 from "../partials/dashboard/DashboardCard10";
import DashboardCard11 from "../partials/dashboard/DashboardCard11";
import DashboardCard12 from "../partials/dashboard/DashboardCard12";
import DashboardCard13 from "../partials/dashboard/DashboardCard13";
import { Input, Modal, Select, Tooltip } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";

const typesCatalog = [
  {
    name: "Ingreso",
    color: "green",
    id: 1,
  },
  {
    name: "Egreso",
    color: "red",
    id: 2,
  },
  {
    name: "Deuda",
    color: "blue",
    id: 3,
  },
];
const labelsCatalog = [
  {
    name: "Alimentación",
    id: 1,
  },
  {
    name: "Transporte",
    id: 2,
  },
  {
    name: "Salud",
    id: 3,
  },
  {
    name: "Educación",
    id: 4,
  },
  {
    name: "Entretenimiento",
    id: 5,
  },
];

const peopleCatalog = [
  {
    name: "Juan",
    id: 1,
  },
  {
    name: "Pedro",
    id: 2,
  },
  {
    name: "María",
    id: 3,
  },
  {
    name: "José",
    id: 4,
  },
  {
    name: "Ana",
    id: 5,
  },
];

const debtCatalog = [
  {
    concept: "Deuda 1",
    amountRemaining: 1000,
    id: 1,
  },
  {
    concept: "Deuda 2",
    amountRemaining: 2000,
    id: 2,
  },
  {
    concept: "Deuda 3",
    amountRemaining: 3000,
    id: 3,
  },
  {
    concept: "Deuda 4",
    amountRemaining: 4000,
    id: 4,
  },
  {
    concept: "Deuda 5",
    amountRemaining: 5000,
    id: 5,
  },
];

function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const [type, setType] = useState(1);
  const [selectedPerson, setSelectedPerson] = useState(0);
  const [debtType, setDebtType] = useState(0);
  const [showAddPersonModal, setShowAddPersonModal] = useState(false);
  const [selectedDebt, setSelectedDebt] = useState(null);
  const [category, setCategory] = useState(null);
  useEffect(() => {
    if (selectedPerson === "new") {
      console.log("Agregar nueva persona");
    }
  }, [selectedPerson]);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="grow">
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            {/* Dashboard actions */}
            <div className="sm:flex sm:justify-between sm:items-center mb-8">
              {/* Left: Title */}
              <div className="mb-4 sm:mb-0">
                <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold">
                  Dashboard
                </h1>
              </div>

              {/* Right: Actions */}
              <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
                {/* Filter button */}
                <FilterButton align="right" />
                {/* Datepicker built with React Day Picker */}
                <Datepicker align="right" />
                {/* Add view button */}
                <button
                  onClick={() => setAddModal(true)}
                  className="btn bg-gray-900 text-gray-100 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white"
                >
                  <svg
                    className="fill-current shrink-0 xs:hidden"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                  >
                    <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
                  </svg>
                  <span className="max-xs:sr-only">+ Agregar</span>
                </button>
                <button
                  onClick={() => setAddModal(true)}
                  className="btn bg-gray-900 text-gray-100 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white"
                >
                  <svg
                    className="fill-current shrink-0 xs:hidden"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                  >
                    <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
                  </svg>
                  <span className="max-xs:sr-only">Administrar deuda</span>
                </button>
              </div>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-12 gap-6">
              {/* Line chart (Acme Plus) */}
              <DashboardCard01 />
              {/* Line chart (Acme Professional) */}
              <DashboardCard03 />
              {/* Line chart (Acme Advanced) */}
              <DashboardCard02 />
              {/* Bar chart (Direct vs Indirect) */}
              <DashboardCard04 />
              {/* Card (Customers) */}
              <DashboardCard10 />
              {/* Line chart (Real Time Value) */}
              {/* <DashboardCard05 /> */}
              {/* Doughnut chart (Top Countries) */}
              <DashboardCard06 />
              {/* Table (Top Channels) */}
              <DashboardCard07 />
              {/* Line chart (Sales Over Time) */}
              <DashboardCard08 />
              {/* Stacked bar chart (Sales VS Refunds) */}
              <DashboardCard09 />

              {/* Card (Reasons for Refunds) */}
              <DashboardCard11 />
              {/* Card (Recent Activity) */}
              <DashboardCard12 />
              {/* Card (Income/Expenses) */}
              <DashboardCard13 />
            </div>
          </div>
        </main>
      </div>

      <Modal
        open={showAddPersonModal}
        style={{backgroundColor: '#111827'}}
        title="Agregar contacto"
        destroyOnClose
        onCancel={() => setShowAddPersonModal(false)}
      >
        <div className="flex flex-col bg-gray-800 gap-4 py-2">
          {/* Fila 1: Nombre y Teléfono */}
          <div className="flex flex-row gap-4">
            {/* Nombre */}
            <div className="w-1/2 flex flex-col">
              <label className="text-sm font-semibold text-gray-800 mb-2">
                Nombre*
              </label>
              <Input
                style={{
                  borderRadius: 5,
                  borderColor: "#ccc",
                  height: 32,
                  fontSize: 14,
                }}
                placeholder="Nombre"
                variant="outlined"
                className="border rounded-md  text-sm"
              />
            </div>
            {/* Teléfono */}
            <div className="w-1/2 flex flex-col">
              <label className="text-sm font-semibold text-gray-800 mb-2">
                Teléfono (Opcional)
              </label>
              <Input
                style={{
                  borderRadius: 5,
                  borderColor: "#ccc",
                  height: 32,
                  fontSize: 14,
                }}
                placeholder="Teléfono"
                variant="outlined"
                className="border rounded-md  text-sm"
              />
            </div>
          </div>

          {/* Fila 2: Correo */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-800 mb-2">
              Correo (Opcional)
            </label>
            <Input
              style={{
                borderRadius: 5,
                borderColor: "#ccc",
                height: 32,
                fontSize: 14,
              }}
              type="email"
              placeholder="Correo"
              variant="outlined"
              className="border rounded-md text-sm"
            />
          </div>
        </div>
      </Modal>

      <Modal
        open={addModal}
        title="Agregar registro"
        destroyOnClose
        onCancel={() => {
          setAddModal(false)
          setType(1)
          setCategory(null)
        }  
        }
        centered
      >
        <div className="flex flex-col py-4">
          {/* Selección de Tipo de Registro */}
          <div className="mb-4 w-full flex flex-col">
            <label className="text-sm font-semibold text-gray-800 mb-2">
              Tipo de Registro*
            </label>
            <Select
              placeholder="Selecciona un tipo de registro"
              onChange={(value) => setType(value)}
              defaultValue={1}
            >
              <Select.Option value={1}>Ingreso</Select.Option>
              <Select.Option value={2}>Egreso</Select.Option>
              <Select.Option value={3}>Deuda</Select.Option>
            </Select>
          </div>

          {/* Campos comunes: Monto */}
          <div className="mb-4 w-full flex flex-col">
            <label className="text-sm font-semibold text-gray-800 mb-2">
              Monto*
            </label>
            <Input
              placeholder="Monto"
              type="number"
              variant="outlined"
              style={{
                borderRadius: 5,
                borderColor: "#ccc",
                width: 150,
                height: 32,
                fontSize: 14,
              }}
            />
          </div>

          {/* Campos adicionales para Deudas */}
          {type === 3 && (
            <>
              {/* Tipo de Deuda */}
              <div className="mb-4 w-full flex flex-col">
                <label className="text-sm font-semibold text-gray-800 mb-2">
                  Tipo de Deuda*
                </label>
                <Select
                  placeholder="Selecciona el tipo de deuda"
                  onChange={(value) => setDebtType(value)}
                >
                  <Select.Option value="por_pagar">Por Pagar</Select.Option>
                  <Select.Option value="por_cobrar">Por Cobrar</Select.Option>
                </Select>
              </div>

              {/* Selección de Persona */}
              <div className="mb-4 w-full flex flex-col">
                <label className="text-sm font-semibold text-gray-800 mb-2">
                  Persona*
                </label>
                <Select
                  showSearch
                  placeholder="Selecciona una persona o agrega nueva"
                  value={selectedPerson}
                  onChange={(value) => {
                    if (value === "new") {
                      setShowAddPersonModal(true);
                      return;
                    }
                    setSelectedPerson(value);
                  }}
                >
                  {peopleCatalog.map((person) => (
                    <Select.Option key={person.id} value={person.name}>
                      {person.name}
                    </Select.Option>
                  ))}
                  <Select.Option value="new"><div style={{background:'#2669bb', color:'white', padding: 5, borderRadius:10, textAlign:'center'}}>Agregar nuevo contacto </div></Select.Option>
                </Select>
              </div>

              {/* Selección de Deuda Existente o Nueva
              {debtType === "por_pagar" && (
                <div className="mb-4 w-full flex flex-col">
                  <label className="text-sm font-semibold text-gray-800 mb-2">
                    Deuda Existente
                    <Tooltip 
                    className="ml-2"
                    title="Selecciona una deuda existente para registrar un pago o registra una nueva deuda">
                      <InfoCircleOutlined />
                    </Tooltip>
                  </label>
                  <Select
                    placeholder="Selecciona una deuda existente o registra nueva"
                    value={selectedDebt}
                    onChange={(value) => setSelectedDebt(value)}
                  >
                    {debtCatalog.map((debt) => (
                      <Select.Option key={debt.id} value={debt.id}>
                        {debt.concept} - ${debt.amountRemaining}
                      </Select.Option>
                    ))}
                    <Select.Option value="new">Nueva Deuda</Select.Option>
                  </Select>
                </div>
              )} */}
            </>
          )}

          {/* Categoría */}
          {<div className="mb-4 w-full flex flex-col">
            <label className="text-sm font-semibold text-gray-800 mb-2">
              Categoría (Opcional)
            </label>
            <Select
              placeholder="Selecciona una categoría"
              value={category}
              onChange={(value) => {
                if (value === "new") {
                  setShowAddPersonModal(true);
                  return;
                }
                setCategory(value);
              }}
            >
              {labelsCatalog.map((label) => (
                <Select.Option key={label.id} value={label.name}>
                  {label.name}
                </Select.Option>
              ))}
              <Select.Option value="new"><div style={{background:'#2669bb', color:'white', padding: 5, borderRadius:10, textAlign:'center'}}>Agregar categoria </div></Select.Option>
            </Select>
          </div>}

          {/* Concepto */}
          <div className="mb-4 w-full flex flex-col">
            <label className="text-sm font-semibold text-gray-800 mb-2">
              Concepto (Opcional)
            </label>
            <Input.TextArea
              placeholder="Concepto"
              variant="outlined"
              style={{ borderRadius: 5, borderColor: "#ccc", fontSize: 14 }}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default Dashboard;
