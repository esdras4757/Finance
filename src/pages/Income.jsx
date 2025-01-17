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
import AddCategoryModal from "../components/Modals/AddCategoryModal";
import AddContactModal from "../components/Modals/AddContactModal";
import ConditionalRendering from "../components/ConditionalRendering";
import dayjs, { Dayjs } from "dayjs";
import TableData from "../components/Ingresos/TableData";

function Egresos() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const [loaderDashboard, setLoaderDashboard] = useState(true);
  const [type, setType] = useState(1);
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [debtType, setDebtType] = useState(null);
  const [showAddPersonModal, setShowAddPersonModal] = useState(false);
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  const [selectedDebt, setSelectedDebt] = useState(null);
  const [category, setCategory] = useState(null);
  const [newCategory, setNewCategory] = useState(null);
  const [categoryCatalog, setCategoryCatalog] = useState([]);
  const [contactsCatalog, setContactsCatalog] = useState([]);
  const [dashboardData, setDashboardData] = useState([]);
  const [amount, setAmount] = useState(null);
  const [graph, setGraph] = useState(null);
  const { user } = useUser();
  const [form] = useForm();

  useEffect(() => {
    if (selectedPerson === "new") {
      console.log("Agregar nueva persona");
    }
  }, [selectedPerson]);

  useEffect(() => {
    if (addModal === true) {
      setAmount(null);
      setType(1);
      setCategory(null);
      setSelectedPerson(null);
      form.resetFields();
      form.setFields[
        ({ name: "category", value: null },
        { name: "selectedPerson", value: null })
      ];
      form.setFields;
    }
  }, [addModal]);

  const getDashboardData = async () => {
    console.log(user);
    if (!user || !user.id) {
      return;
    }
    try {
      setLoaderDashboard(true);
      setDashboardData(null);
      const response = await axios.get(
        `${import.meta.env.VITE_URL_BASE}/api/income/byUserId/${user.id}`
      );
      if (response) {
        setDashboardData(response?.data?.result);
        setGraph(response?.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoaderDashboard(false);
    }
  };

  const editFN = () => {
    try {
      const response = axios.put();
    } catch (error) {}
  };

  const deleteFN = (id) => {
    try {
      const response = axios.delete(
        `${import.meta.env.VITE_URL_BASE}/api/income/${id}`
      );
      if (response) {
        setDashboardData(dashboardData.filter((item) => item.incomeId !== id));
      }
    } catch (error) {}
  };

  const handleExpenses = async (values) => {
    delete values.type;
    values.amount = parseFloat(values.amount.replace(/,/g, ""));
    try {
      if (user && user.id) {
        values.userId = user.id;
      }
      const response = await axios.post(
        `${import.meta.env.VITE_URL_BASE}/api/expenses`,
        values
      );
      if (response) {
        console.log("Registro guardado correctamente");
        setAddModal(false);
        form.setFields([{ name: "category", value: null }]);
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
        `${import.meta.env.VITE_URL_BASE}/api/income`,
        values
      );
      if (response) {
        console.log("Registro guardado correctamente");
        setAddModal(false);
        form.resetFields();
      }
    } catch (error) {}
  };

  const handleDebt = async (values) => {
    if (values.category) {
      values.categoryId = categoryCatalog.find(
        (category) => category.name === values.category
      ).categoryId;
    }
    values.contactId = contactsCatalog.find(
      (contact) => contact.name === values.selectedPerson
    ).contactId;
    delete values.type;
    values.type = values.debtType;
    delete values.selectedPerson;
    delete values.category;
    delete values.debtType;
    values.amount = parseFloat(values.amount.replace(/,/g, ""));
    try {
      console.log(values);
      if (user && user.id) {
        values.userId = user.id;
      }
      const response = await axios.post(
        `${import.meta.env.VITE_URL_BASE}/api/debts`,
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

  const AddCategory = async (name) => {
    try {
      if (!user || !user.id || !name) {
        return;
      }

      const response = await axios.post(
        `${import.meta.env.VITE_URL_BASE}/api/categories`,
        {
          name,
          userId: user.id,
        }
      );

      if (response) {
        setCategory(name);
        setShowAddCategoryModal(false);
        form.setFields([{ name: "category", value: name }]);
        setCategoryCatalog([
          ...categoryCatalog,
          { name, categoryId: response.data.categoryId },
        ]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const AddContact = async (Contact) => {
    try {
      if (!user || !user.id || !Contact) {
        return;
      }
      const response = await axios.post(
        `${import.meta.env.VITE_URL_BASE}/api/contacts`,
        { ...Contact, userId: user.id }
      );
      if (response) {
        setSelectedPerson(Contact.name);
        setShowAddPersonModal(false);
        form.setFields([{ name: "selectedPerson", value: Contact.name }]);
        setContactsCatalog([
          ...contactsCatalog,
          { name: Contact.name, id: response.data.contactId },
        ]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const GetCategoriesCatalog = async () => {
    try {
      if (!user || !user.id) {
        return;
      }
      const response = await axios.get(
        `${import.meta.env.VITE_URL_BASE}/api/categories/byUserId/${user.id}`
      );
      if (response) {
        console.log(response.data);
        setCategoryCatalog(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const GetContactsCatalog = async () => {
    try {
      if (!user || !user.id) {
        return;
      }
      const response = await axios.get(
        `${import.meta.env.VITE_URL_BASE}/api/contacts/byUserId/${user.id}`
      );
      if (response) {
        console.log(response.data);
        setContactsCatalog(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDashboardData();
  }, []);

  useEffect(() => {
    if (addModal) {
      GetCategoriesCatalog();
      GetContactsCatalog();
    }
  }, [addModal]);

  return (
    <div className="flex h-screen overflow-hidden" style={{ height: "100dvh" }}>
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
          <div className="px-4 sm:px-6 lg:px-8 py-5 w-full max-w-9xl mx-auto">
            {/* Dashboard actions */}
            <div className="sm:flex sm:justify-between sm:items-center mb-5 sm:mb-6">
              {/* Left: Title */}
              <div className="mb-2 sm:mb-0 flex justify-between align-middle items-center flex-wrap w-full">
                <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold md:mr-4">
                  Ingresos
                </h1>
                <button
                  onClick={() => setAddModal(true)}
                  className="btn bg-gray-900 text-white-900 hover:bg-gray-800 dark:bg-blue-600 dark:text-white dark:hover:bg-blue-500 md:mr-4"
                >
                  <span className="w-full">+ Agregar</span>
                </button>
              </div>

              
            </div>

            <div>{/* <DashboardCard01 /> */}</div>

            <ConditionalRendering
              isLoading={loaderDashboard}
              data={dashboardData}
            >
              <>
              <div className="w-full flex flex-wrap gap-4 mb-5">
                <div className="w-full">
                  <DashboardCard03 data={graph} />
                </div>
              </div>
              {/* Right: Actions */}
              <div className="grid grid-flow-col sm:auto-cols-max  sm:justify-end gap-2 mb-4">
                {/* Filter button */}
                <FilterButton align="right" />
                {/* Datepicker built with React Day Picker */}
                <Datepicker align="right" />
              </div>
                <TableData data={dashboardData} deleteFN={deleteFN} />
              </>
            </ConditionalRendering>
          </div>
        </main>
      </div>

      <AddContactModal
        showAddContactModal={showAddPersonModal}
        setShowAddContactModal={setShowAddPersonModal}
        onOk={(contact) => {
          console.log(contact, "contact");
          AddContact(contact);
        }}
        onCancel={() => {
          console.log("onCancel");
          setSelectedPerson(null);
          setShowAddPersonModal(false);
          form.setFieldValue("selectedPerson", null);
          setNewCategory(null);
        }}
      />

      <AddCategoryModal
        showAddCategoryModal={showAddCategoryModal}
        setShowAddCategoryModal={setShowAddCategoryModal}
        onOk={(newCategory) => {
          console.log(newCategory, "newCategory");
          AddCategory(newCategory);
        }}
        onCancel={() => {
          console.log("onCancel");
          setCategory(null);
          setShowAddCategoryModal(false);
          form.setFieldValue("category", null);
          setNewCategory(null);
        }}
      />

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
          form.setFields;
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
            } else if (e.type === 3) {
              handleDebt(e);
            }
          }}
          layout="vertical"
          className="py-4"
        >
          {/* Tipo de Registro */}

          <div className="flex justify-between items-center gap-3">
            <Form.Item
              className="w-1/2"
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

            <Form.Item
              className="w-1/2"
              label="Fecha"
              initialValue={dayjs().format("YYYY-MM-DD")}
              name="creation_date"
              rules={[{ required: true, message: "Ingresa la fecha" }]}
            >
              <Input
                defaultValue={dayjs().format("YYYY-MM-DD")}
                onChange={(e) => {
                  console.log(e.target.value);
                }}
                style={{
                  height: "34px",
                  borderBottom: "1px solid #ccc",
                  fontSize: "13px",
                }}
                type="date"
                formattedValue={new Date()}
              />
            </Form.Item>
          </div>
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
                  <Select.Option value="to-pay">Por Pagar</Select.Option>
                  <Select.Option value="to-receive">Por Cobrar</Select.Option>
                </Select>
              </Form.Item>

              {/* Persona */}
              <Form.Item
                label="Persona*"
                name="selectedPerson"
                initialValue={selectedPerson}
                rules={[{ required: true, message: "Selecciona una persona" }]}
              >
                <Select
                  showSearch
                  placeholder="Selecciona una persona o agrega nueva"
                  value={selectedPerson}
                  onChange={(value) => {
                    if (value === "nuevo") {
                      setShowAddPersonModal(true);
                    }
                    setSelectedPerson(value);
                  }}
                >
                  {!showAddPersonModal && (
                    <Select.Option value="nuevo">
                      <div
                        style={{
                          background: "#2669bb",
                          color: "white",
                          padding: 5,
                          borderRadius: 10,
                          textAlign: "center",
                          marginBottom: 5,
                          marginTop: 5,
                        }}
                      >
                        Agregar nuevo contacto
                      </div>
                    </Select.Option>
                  )}
                  {contactsCatalog &&
                    contactsCatalog.length > 0 &&
                    contactsCatalog.map((person) => (
                      <Select.Option key={person.contactId} value={person.name}>
                        {person.name} {person.lastName}
                      </Select.Option>
                    ))}
                </Select>
              </Form.Item>
            </>
          )}

          {/* Categoría */}
          <Form.Item
            label="Categoría (Opcional)"
            initialValue={category}
            name="category"
          >
            <Select
              showSearch
              placeholder="Selecciona una categoría"
              value={category}
              onChange={(value) => {
                if (value === "nuevo") {
                  setShowAddCategoryModal(true);
                }
                setCategory(value);
              }}
            >
              {!showAddCategoryModal && (
                <Select.Option value="nuevo">
                  <div
                    style={{
                      background: "#2669bb",
                      color: "white",
                      padding: 5,
                      borderRadius: 10,
                      textAlign: "center",
                      marginTop: 5,
                      marginBottom: 5,
                    }}
                  >
                    Agregar categoría nueva
                  </div>
                </Select.Option>
              )}
              {categoryCatalog &&
                categoryCatalog.length > 0 &&
                categoryCatalog.map((label) => (
                  <Select.Option key={label.categoryId} value={label.name}>
                    {label.name}
                  </Select.Option>
                ))}
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

export default Egresos;
