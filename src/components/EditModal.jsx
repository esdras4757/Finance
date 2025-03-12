import { Button, Form, Input, Modal, Select, Spin } from "antd";
import { useForm } from "antd/es/form/Form";
import React, { useState } from "react";
import { useEffect } from "react";
import AddContactModal from "./Modals/AddContactModal";
import AddCategoryModal from "./Modals/AddCategoryModal";
import dayjs, { Dayjs } from "dayjs";
import { useUser } from "../providers/UserProvider";
import axios from "axios";

const EditModal = (props) => {
  const {
    editModal,
    setEditModal,
    processType = null,
    setDashboardData,
    onAdd,
    itemSelected,
    getDashboardData
  } = props;

  const [categoryCatalog, setCategoryCatalog] = useState([]);
  const [contactsCatalog, setContactsCatalog] = useState([]);
  const [showAddPersonModal, setShowAddPersonModal] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  const [debtType, setDebtType] = useState(null);
  const [category, setCategory] = useState(null);
  const [newCategory, setNewCategory] = useState(null);
  const [addLogin, setAddLogin] = useState(false);
  const [type, setType] = useState(0);
  const [amount, setAmount] = useState(null);
  const [form] = useForm();
  const { user } = useUser();

  useEffect(() => {
    if (itemSelected) {
      console.log(itemSelected);
      form.setFieldsValue({
        amount: Math.abs(+itemSelected.amount),
        creation_date: dayjs(itemSelected?.creation_date).format("YYYY-MM-DD"),
        category: itemSelected?.category?.name,
        concept: itemSelected?.concept,
        selectedPerson: itemSelected?.contact?.name,
        debtType: itemSelected?.type,
      });
      setDebtType(itemSelected.type);
      setAmount( Math.abs(+itemSelected?.amount));
      setSelectedPerson(itemSelected?.contact?.name);
      setCategory(itemSelected?.category?.name);
      if (itemSelected?.expenseId) {
        setType(2);
        console.log("Egreso");
        form.setFields([{ name: "type", value: 2 }]);
      } else if (itemSelected.incomeId) {
        setType(1);
        form.setFields([{ name: "type", value: 1 }]);
      } else if (itemSelected.debtId) {
        setType(3);
        form.setFields([{ name: "type", value: 3 }]);
      }
    }
  }, [itemSelected, editModal]);

  useEffect(() => {
    if (selectedPerson === "new") {
      console.log("Agregar nueva persona");
    }
  }, [selectedPerson]);

  const handleExpenses = async (values) => {
    delete values.type;
    console.log(values);
    if (typeof values.amount === "string") {
      values.amount = parseFloat(values.amount.replace(/,/g, ""));
    }
    // values.amount = parseFloat(values.amount.replace(/,/g, ""));
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_URL_BASE}/api/expenses/${
          itemSelected.expenseId
        }`,
        values
      );
      if (response) {
        console.log("Registro guardado correctamente");
        setEditModal(false);
        getDashboardData();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setAddLogin(false);
    }
  };

  const handleIngress = async (values) => {
    delete values.type;
    delete values.userId;
    console.log(values);
    if (typeof values.amount === "string") {
      values.amount = parseFloat(values.amount.replace(/,/g, ""));
    }
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_URL_BASE}/api/income/${itemSelected.incomeId}`,
        values
      );
      if (response) {
        console.log("Registro guardado correctamente");
        setEditModal(false);
        form.resetFields();
        setDashboardData((prev) => {
          return [response.data, ...prev];
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setAddLogin(false);
    }
  };

  const handleDebt = async (values) => {
    delete values.userId;
    if (values.category) {
      values.categoryId = categoryCatalog.find(
        (category) => category.name === values.category
      ).categoryId;
    }
    values.contactId = contactsCatalog.find(
      (contact) => contact.name === values.selectedPerson
    ).contactId;
    console.log(values);
    delete values.type;
    values.type = values.debtType;
    delete values.selectedPerson;
    delete values.category;
    delete values.debtType;
    values.amount = parseFloat(values.amount.replace(/,/g, ""));
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_URL_BASE}/api/debts/${itemSelected.debtId}`,
        values
      );
      if (response) {
        console.log("Registro guardado correctamente");
        setEditModal(false);
        form.resetFields();
        onAdd();
      }
    } catch (error) {
    } finally {
      setAddLogin(false);
    }
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

  const AddCategory = async (name, setLoading) => {
    setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  const AddContact = async (Contact, setLoading) => {
    setLoading(true);
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
    } finally {
      setLoading(false);
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
    if (editModal) {
      GetCategoriesCatalog();
      GetContactsCatalog();
    }
  }, [editModal]);

  return (
    <>
      <AddContactModal
        showAddContactModal={showAddPersonModal}
        setShowAddContactModal={setShowAddPersonModal}
        onOk={(contact, setLoading) => {
          console.log(contact, "contact");
          AddContact(contact, setLoading);
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
        okB
        onOk={(newCategory, setLoading) => {
          console.log(newCategory, "newCategory");
          AddCategory(newCategory, setLoading);
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
        open={editModal}
        title={"Editar Registro"}
        destroyOnClose
        footer={null}
        onCancel={() => {
          setEditModal(false);
          //   setType(1);
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
            const currentTime = dayjs().format("HH:mm:ss");
            e.creation_date =
              dayjs(e.creation_date).format("YYYY-MM-DD") + " " + currentTime;
            e.type = type;
            console.log(e);
            setAddLogin(true);
            if (e.type === 2) {
              handleExpenses(e);
            } else if (e.type === 1) {
              handleIngress(e);
            } else if (e.type === 3) {
              handleDebt(e);
            }
          }}
          layout="vertical"
          className="py-4"
        >
          {/* Tipo de Registro */}

          {processType === null && (
            <Form.Item
              label="Tipo de Registro*"
              name="type"
              rules={[
                { required: true, message: "Selecciona un tipo de registro" },
              ]}
            >
              <Select
                placeholder="Selecciona un tipo de registro"
                defaultValue={type}
                onChange={(value) => setType(value)}
              >
                <Select.Option value={1}>Ingreso</Select.Option>
                <Select.Option value={2}>Egreso</Select.Option>
                <Select.Option value={3}>Deuda</Select.Option>
              </Select>
            </Form.Item>
          )}

          <div className="flex justify-between items-center gap-3">
            {/* Monto */}
            <Form.Item
              label="Monto*"
              className="w-1/2"
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
                  width: "210px",
                  fontSize: "14px",
                }}
              />
              <span className="text-white">$</span>
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
                  //   height: "34px",
                  borderBottom: "1px solid #ccc",
                  fontSize: "13px",
                }}
                type="date"
                formattedValue={new Date()}
              />
            </Form.Item>
          </div>

          {/* Campos adicionales para Deudas */}
          {type == 3 && (
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
                  allowClear
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
                setEditModal(false);
              }}
            >
              Cancelar
            </Button>
            <Button type="primary" htmlType="submit" disabled={addLogin}>
              {addLogin ? <Spin size="small"></Spin> : "Guardar"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default EditModal;
