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
import { Button, Form, Input, Modal, Select, Tabs, Tooltip } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import { useAuth } from "../components/AuthProvider";
import { useUser } from "../providers/UserProvider";
import { useForm } from "antd/es/form/Form";
import axios from "axios";
import AddCategoryModal from "../components/Modals/AddCategoryModal";
import AddContactModal from "../components/Modals/AddContactModal";
import ConditionalRendering from "../components/ConditionalRendering";
import dayjs, { Dayjs } from "dayjs";
import TableData from "../components/Debts/TableData";
import DashboardCard03Debts from "../partials/dashboard/DashboardCard03Debts";
import AddModal from "../components/AddModal";
import EditModal from "../components/EditModal";

function Debts() {
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
  const [debsToReceive, setDebsToReceive] = useState([]);
  const [debsToPay, setDebsToPay] = useState(null);
  const [graphToPay, setGraphToPay] = useState(null);
  const [graphToReceive, setGraphToReceive] = useState(null);
  const [amount, setAmount] = useState(null);
  const { user } = useUser();
  const [form] = useForm();
  const [editModal, setEditModal] = useState(false);
  const [itemSelected, setItemSelected] = useState(null);

  const onChange = (key) => {
    console.log(key);
  };

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

  const getDebtsToRecibe = async () => {
    console.log(user);
    if (!user || !user.id) {
      return;
    }
    try {
      setLoaderDashboard(true);
      setDebsToReceive(null);
      const response = await axios.get(
        `${import.meta.env.VITE_URL_BASE}/api/debts/byUserId/${
          user.id
        }/type/to-receive`
      );
      if (response) {
        setDebsToReceive(response?.data?.result);
        const totalDebt = response?.data?.DebtsGraph?.amounts.reduce(
          (acc, curr) => acc + curr,
          0
        );
        setGraphToReceive({
          labels: response?.data?.DebtsGraph?.labels,
          amounts: response?.data?.DebtsGraph?.amounts,
          totalDebt,
          name: "cobrar",
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoaderDashboard(false);
    }
  };

  const getDebtsTopay = async () => {
    console.log(user);
    if (!user || !user.id) {
      return;
    }
    try {
      setLoaderDashboard(true);
      setDebsToPay(null);
      const response = await axios.get(
        `${import.meta.env.VITE_URL_BASE}/api/debts/byUserId/${
          user.id
        }/type/to-pay`
      );
      if (response) {
        const totalDebt = response?.data?.DebtsGraph?.amounts.reduce(
          (acc, curr) => acc + curr,
          0
        );
        setDebsToPay(response?.data?.result);
        setGraphToPay({
          labels: response?.data?.DebtsGraph?.labels,
          amounts: response?.data?.DebtsGraph?.amounts,
          totalDebt,
          name: "pagar",
        });
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

  const deleteFN = async (id) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_URL_BASE}/api/debts/${id}`
      );
      if (response && response.status === 200) {
        getDebtsTopay();
        getDebtsToRecibe();
      }
    } catch (error) {}
  };

  const incrementDebt = async (id, amount) => {
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_URL_BASE}/api/debts/increment/${id}`,
        { amount }
      );
      if (response && response.status === 200) {
        getDebtsTopay();
        getDebtsToRecibe();
      }
    } catch (error) {}
  };

  const changeStatusDebt = async (id, isPaid) => {

    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_URL_BASE}/api/debts/${id}`,
        { isPaid }
      );
      if (response && response.status === 200) {
        getDebtsTopay();
        getDebtsToRecibe();
      }
    } catch (error) {}
  };


  const decrementDebt = async (id, amount) => {
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_URL_BASE}/api/debts/decrement/${id}`,
        { amount }
      );
      if (response && response.status === 200) {
        getDebtsTopay();
        getDebtsToRecibe();
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

  const getAll= async () => {
    await getDebtsTopay();
    await getDebtsToRecibe();
  }

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
    getDebtsTopay();
    getDebtsToRecibe();
  }, []);

  useEffect(() => {
    if (addModal) {
      GetCategoriesCatalog();
      GetContactsCatalog();
    }
  }, [addModal]);



  const items = [
    {
      key: "1",
      label: <span className="text-red-400 text-base">Deudas por pagar</span>,
      children: (
        <>
            <>
              <ConditionalRendering
                isLoading={loaderDashboard}
                data={debsToPay}
              >
                <ConditionalRendering
                  isLoading={loaderDashboard}
                  data={graphToPay}
                >
                  <div className="w-full mb-4">
                    <DashboardCard03Debts data={graphToPay} />
                  </div>
                </ConditionalRendering>
                {/* Right: Actions */}
                <div className="grid grid-flow-col sm:auto-cols-max mb-4 sm:justify-end gap-2">
                  {/* Filter button */}
                  <FilterButton align="right" />
                  {/* Datepicker built with React Day Picker */}
                  <Datepicker align="right" />
                </div>

                <TableData setEditModal={setEditModal} setItemSelected={setItemSelected} data={debsToPay} deleteFN={deleteFN} incrementDebt={incrementDebt} decrementDebt={decrementDebt} changeStatusDebt={changeStatusDebt} />
              </ConditionalRendering>
            </>
          
        </>
      ),
    },
    {
      key: "2",
      label: (
        <span className="text-green-600 text-base">Deudas por cobrar</span>
      ),
      children: (
        <>
            <>
              <ConditionalRendering
                isLoading={loaderDashboard}
                data={debsToReceive}
              >
                <div className="w-full mb-4">
                  <DashboardCard03Debts data={graphToReceive} />
                </div>
                <div className="grid grid-flow-col sm:auto-cols-max mb-4 sm:justify-end gap-2">
                  {/* Filter button */}
                  <FilterButton align="right" />
                  {/* Datepicker built with React Day Picker */}
                  <Datepicker align="right" />
                </div>
                <TableData setEditModal={setEditModal} setItemSelected={setItemSelected} data={debsToReceive} deleteFN={deleteFN} incrementDebt={incrementDebt} decrementDebt={decrementDebt} changeStatusDebt={changeStatusDebt}/>
              </ConditionalRendering>
            </>
        </>
      ),
    },
  ];

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
          <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8 w-full max-w-9xl mx-auto">
            {/* Dashboard actions */}
            <div className="sm:flex sm:justify-between sm:items-center mb-0 sm:mb-2">
              {/* Left: Title */}
              <div className="mb-2 sm:mb-0 flex justify-between align-middle items-center flex-wrap w-full">
                <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold md:mr-4">
                  Deudas
                </h1>
                <button
                  onClick={() => setAddModal(true)}
                  className="btn bg-gray-900 text-white-900 hover:bg-gray-800 dark:bg-blue-600 dark:text-white dark:hover:bg-blue-500 md:mr-4"
                >
                  <span className="w-full">+ Agregar</span>
                </button>
              </div>
            </div>

            <Tabs
              defaultActiveKey="1"
              centered
              style={{ color: "white" }}
              indicator={{
                width: "100%",
                align: "center",
              }}
              items={items}
              onChange={onChange}
            />
          </div>
        </main>
      </div>

      <AddModal  addModal={addModal} setAddModal={setAddModal} processType={'debt'} onAdd={getAll}/>
      <EditModal editModal={editModal}  setEditModal={setEditModal} itemSelected={itemSelected} getDashboardData={getAll}/>
    </div>
  );
}

export default Debts;
