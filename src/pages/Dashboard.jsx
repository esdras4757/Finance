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
import AddModal from "../components/AddModal";

function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const [loaderDashboard, setLoaderDashboard] = useState(true);
  const [type, setType] = useState(1);
  const [selectedPerson, setSelectedPerson] = useState(null);;



  const [dashboardData, setDashboardData] = useState([]);

  const { user } = useUser();
  const [form] = useForm();




  const getDashboardData = async () => {
    console.log(user);
    if (!user || !user.id) {
      return;
    }
    try {
      setLoaderDashboard(true);
      setDashboardData(null);
      const response = await axios.get(
        `${import.meta.env.VITE_URL_BASE}/api/dashboard/byUserId/${user.id}`
      );
      if (response) {
        setDashboardData(response.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoaderDashboard(false);
    }
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
          { name: Contact.name, contactId: response.data.contactId },
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

        <ConditionalRendering isLoading={loaderDashboard} data={dashboardData}>
        <main className="grow">
          <div className="px-4 sm:px-6 lg:px-8 py-5 sm:py-8 w-full max-w-9xl mx-auto">
            {/* Dashboard actions */}
            <div className="sm:flex sm:justify-between sm:items-center mb-6 sm:mb-8">
              {/* Left: Title */}
              <div className="mb-5 sm:mb-0 flex justify-between align-middle items-center flex-wrap ">
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
              <DashboardCard01 data={dashboardData} />
              {/* Line chart (Acme Professional) */}
              <DashboardCard03 data={dashboardData} showLabel={true}/>
              {/* Line chart (Acme Advanced) */}
              <DashboardCard02 data={dashboardData} showLabel={true}/>
              {/* Bar chart (Direct vs Indirect) */}
              <DashboardCard04 data={dashboardData}/>
              {/* Card (Customers) */}
              <DashboardCard10 data={dashboardData?.recentMovements}/>
              {/* Line chart (Real Time Value) */}
              {/* <DashboardCard05 /> */}
              {/* Doughnut chart (Top Countries) */}
              {/* <DashboardCard06 /> */}
              {/* Table (Top Channels) */}
              {/* <DashboardCard07 /> */}
              {/* Line chart (Sales Over Time) */}
              {/* <DashboardCard08 /> */}
              {/* Stacked bar chart (Sales VS Refunds) */}
              {/* <DashboardCard09 /> */}

              {/* Card (Reasons for Refunds) */}
              {/* <DashboardCard11 /> */}
              {/* Card (Recent Activity) */}
              {/* <DashboardCard12 /> */}
              {/* Card (Income/Expenses) */}
              {/* <DashboardCard13 /> */}
            </div>
          </div>
        </main>
        </ConditionalRendering>
      </div>

      <AddModal addModal={addModal} setAddModal={setAddModal} onAdd={getDashboardData} setDashboardData={setDashboardData}/>

    </div>
  );
}

export default Dashboard;
