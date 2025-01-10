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
import { Button, Form, Input, Modal, Select, Tooltip } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import { useAuth } from "../components/AuthProvider";
import { useUser } from "../providers/UserProvider";
import { useForm } from "antd/es/form/Form";
import axios from "axios";

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
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [debtType, setDebtType] = useState(null);
  const [showAddPersonModal, setShowAddPersonModal] = useState(false);
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  const [selectedDebt, setSelectedDebt] = useState(null);
  const [category, setCategory] = useState(null);
  const [newCategory, setNewCategory] = useState(null);
  const [amount, setAmount] = useState(null);
  const { user } = useUser();
  const [form] = useForm();
  useEffect(() => {
    if (selectedPerson === "new") {
      console.log("Agregar nueva persona");
    }
  }, [selectedPerson]);

  const handleExpenses = async (values) => {
    delete values.type;
    values.amount = parseFloat(values.amount.replace(/,/g, ""));
    try {
      if (user && user.id) {
        values.userId = user.id;
      }
      const response = await axios.post(
        "http://192.168.1.90:5000/api/expenses",
        values
      );
      if (response) {
        console.log("Registro guardado correctamente");
        setAddModal(false);
        form.resetFields();
      }
    } catch (error) {}
  };

  const handleIngress = async (values) => {
    delete values.type;
    values.amount = parseFloat(values.amount.replace(/,/g, ""));
    try {
      if (user && user.id) {
        values.userId = user.id;
      }
      const response = await axios.post(
        "http://192.168.1.90:5000/api/income",
        values
      );
      if (response) {
        console.log("Registro guardado correctamente");
        setAddModal(false);
        form.resetFields();
      }
    } catch (error) {}
  };

  const handleChange = (e) => {
    form.setFieldsValue({ amount: e.target.value.replace(/,/g, "") });

    let input = e.target.value;
    // Remover comas del valor actual
    const numericValue = input.replace(/,/g, "");

    // Validar que sea un número o un único punto decimal
    if (!/^\d*\.?\d*$/.test(numericValue)) return;

    // Formatear el valor con comas para miles
    const parts = numericValue.split(".");
    parts[0] = Number(parts[0]).toLocaleString("en-US"); // Formatear la parte entera

    const formattedValue =
      parts.length > 1 ? `${parts[0]}.${parts[1]}` : parts[0];
    setAmount(formattedValue);

    console.log(formattedValue);
  };

  const AddCategory= async()=>{
    try {
      if (!user || !user.id  || !newCategory) {
        return;
      }

      const response = await axios.post( "http://192.168.1.90:5000/api/categories", 
        {
          name:newCategory,
          userId:user.id
        });
      
    } catch (error) {
      
    }
  }

  const AddContact = async () => {
    try {
      if (!user || !user.id ) {
        return;
      }

      const response = await axios.post("http://192.168.1.90:5000/api/contacts",
        {
          name: newCategory,
          userId: user.id,
        }
      );
    } catch (error) {}
  };


  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/*  Site header */}
        <Header
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          user={user}
        />

        <main className="grow">
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            {/* Dashboard actions */}
            <div className="sm:flex sm:justify-between sm:items-center mb-8">
              {/* Left: Title */}
              <div className="mb-4 sm:mb-0 flex justify-between align-middle items-center flex-wrap ">
                <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold md:mr-4">
                  Dashboard
                </h1>

                <button
                  onClick={() => setAddModal(true)}
                  className="btn bg-gray-900 text-gray-100 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white md:mr-4"
                >
                  <span className="">+ Agregar</span>
                </button>

                <button
                  onClick={() => setAddModal(true)}
                  className="btn bg-gray-900 text-gray-100 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white"
                >
                  {/* <svg
                    className="fill-current shrink-0 xs:hidden"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                  >
                    <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
                  </svg> */}
                  <span className="">Administrar deuda</span>
                </button>
              </div>

              {/* Right: Actions */}
              <div className="grid grid-flow-col sm:auto-cols-max  sm:justify-end gap-2">
                {/* Filter button */}
                <FilterButton align="right" />
                {/* Datepicker built with React Day Picker */}
                <Datepicker align="right" />
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
        style={{ backgroundColor: "#111827" }}
        title="Agregar contacto"
        destroyOnClose
        onCancel={() => {
          setShowAddPersonModal(false);
          setSelectedPerson(null);
          form.resetFields();
          setAmount(null);
        }}
        onOk={() => {
          AddContact()
        }}
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
            <div className="w-1/2 flex flex-col">
              <label className="text-sm font-semibold text-gray-800 mb-2">
                Apellido*
              </label>
              <Input
                style={{
                  borderRadius: 5,
                  borderColor: "#ccc",
                  height: 32,
                  fontSize: 14,
                }}
                placeholder="Apellido"
                variant="outlined"
                className="border rounded-md  text-sm"
              />
            </div>
            
          </div>

          {/* Fila 2: Correo */}
          <div className="flex flex-row gap-4 mt-4 mb-2">
          <div className="flex flex-col w-1/2">
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
        </div>
      </Modal>

      <Modal
        open={showAddCategoryModal}
        style={{ backgroundColor: "#111827" }}
        title="Agregar categoría"
        destroyOnClose
        onCancel={() => {
          setShowAddCategoryModal(false);
          setSelectedPerson(null);
          form.resetFields();
          setAmount(null);
        }}
        onOk={() => {
          AddCategory();
        }}
        okButtonProps={{ disabled: !newCategory, style:{color:newCategory?'white':"gray"} }}
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
                value={newCategory}
                placeholder="Nombre"
                variant="outlined"
                className="border rounded-md  text-sm"
                onChange={(e) => setNewCategory(e.target.value)}
              />
            </div>


          </div>
        </div>
      </Modal>

      <Modal
        open={addModal}
        title="Agregar registro"
        destroyOnClose
        footer={null}
        onCancel={() => {
          setAddModal(false);
          setType(1);
          setCategory(null);
          setAmount(null);
          form.resetFields();
        }}
        centered
      >
        <Form
          form={form}
          onFinish={(e) => {
            if (e.type === 1) {
              handleExpenses(e);
            } else if (e.type === 2) {
              handleIngress(e);
            }
          }}
          layout="vertical"
          className="py-4"
        >
          {/* Tipo de Registro */}
          <Form.Item
            label="Tipo de Registro*"
            name="type"
            initialValue={1}
            rules={[
              { required: true, message: "Selecciona un tipo de registro" },
            ]}
          >
            <Select
              placeholder="Selecciona un tipo de registro"
              onChange={(value) => setType(value)}
            >
              <Select.Option value={1}>Ingreso</Select.Option>
              <Select.Option value={2}>Egreso</Select.Option>
              <Select.Option value={3}>Deuda</Select.Option>
            </Select>
          </Form.Item>

          {/* Monto */}
          <Form.Item
            label="Monto*"
            name="amount"
            initialValue={amount}
            rules={[{ required: true, message: "Ingresa el monto" }]}
          >
            <Input
              placeholder="Monto"
              type="text"
              value={amount}
              onChange={handleChange}
              style={{
                width: "100px",
                fontSize: "14px",
              }}
            />
            <span className="text-white">$</span>
          </Form.Item>

          {/* Campos adicionales para Deudas */}
          {type === 3 && (
            <>
              {/* Tipo de Deuda */}
              <Form.Item
                label="Tipo de Deuda*"
                name="debtType"
                initialValue={debtType}
                rules={[
                  { required: true, message: "Selecciona el tipo de deuda" },
                ]}
              >
                <Select
                value={debtType}
                  placeholder="Selecciona el tipo de deuda"
                  onChange={(value) => setDebtType(value)}
                >
                  <Select.Option value="por_pagar">Por Pagar</Select.Option>
                  <Select.Option value="por_cobrar">Por Cobrar</Select.Option>
                </Select>
              </Form.Item>

              {/* Persona */}
              <Form.Item
                label="Persona*"
                name="selectedPerson"
                rules={[{ required: true, message: "Selecciona una persona" }]}
              >
                <Select
                  showSearch
                  placeholder="Selecciona una persona o agrega nueva"
                  value={selectedPerson}
                  onChange={(value) => {
                    if (value === "nuevo") {
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
                  <Select.Option value="nuevo">
                    <div
                      style={{
                        background: "#2669bb",
                        color: "white",
                        padding: 5,
                        borderRadius: 10,
                        textAlign: "center",
                      }}
                    >
                      Agregar nuevo contacto
                    </div>
                  </Select.Option>
                </Select>
              </Form.Item>
            </>
          )}

          {/* Categoría */}
          <Form.Item label="Categoría (Opcional)" name="category">
            <Select
              placeholder="Selecciona una categoría"
              value={category}
              onChange={(value) => {
                if (value === "nuevo") {
                  setShowAddCategoryModal(true);
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
              {!showAddCategoryModal && (
                <Select.Option value="nuevo">
                  <div
                    style={{
                      background: "#2669bb",
                      color: "white",
                      padding: 5,
                      borderRadius: 10,
                      textAlign: "center",
                    }}
                  >
                    Agregar categoría
                  </div>
                </Select.Option>
              )}
            </Select>
          </Form.Item>

          {/* Concepto */}
          <Form.Item label="Concepto (Opcional)" name="concept">
            <Input.TextArea
              placeholder="Concepto"
              rows={1}
              style={{
                borderRadius: 5,
                borderColor: "#ccc",
                fontSize: 14,
                minHeight: 39,
              }}
            />
          </Form.Item>

          {/* Botón de enviar */}
          <Form.Item className="flex buttonsFooter justify-end">
            <Button
              type="default"
              className="mr-4 mb-0"
              onClick={() => {
                setAddModal(false);
                form.resetFields();
                setAmount(null);
              }}
            >
              Cancelar
            </Button>
            <Button type="primary" htmlType="submit">
              Guardar
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default Dashboard;
