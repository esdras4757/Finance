import { Input, Modal } from 'antd';
import React from 'react'
import { AddCategoryModalProps, AddContactModalProps } from '../../types/modalsTypes';
import { AddContactType } from '../../types/contactsTypes';

const AddContactModal = ( props : AddContactModalProps ) => {
    const {setShowAddContactModal, showAddContactModal, onOk , onCancel} = props;
    const [newContact, setNewContact] = React.useState<AddContactType>();
    const [name, setName] = React.useState<string>("");
    const [lastName, setLastName] = React.useState<string>("");
    const [email, setEmail] = React.useState<string>("");
    const [phone, setPhone] = React.useState<string>("");
    const [error, setError] = React.useState<string>("");

  return (
    <Modal
        open={showAddContactModal}
        style={{ backgroundColor: "#111827" }}
        title="Agregar contacto"
        destroyOnClose
        onCancel={() => {
            setName("");
            setLastName("");
            setEmail("");
            setPhone("");
            setShowAddContactModal(false);
            onCancel();
        }}
        onOk={() => {
          if (!name || name === "") {
            setError("El nombre es requerido");
            return;
          }
          onOk({name, lastName, email, phone});
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
                value={name}
                style={{
                  borderRadius: 5,
                  borderColor: "#ccc",
                  height: 32,
                  fontSize: 14,
                }}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nombre"
                variant="outlined"
                className="border rounded-md  text-sm"
              />
            </div>
            <div className="w-1/2 flex flex-col">
              <label className="text-sm font-semibold text-gray-800 mb-2">
                Apellido
              </label>
              <Input
                value={lastName}
                style={{
                  borderRadius: 5,
                  borderColor: "#ccc",
                  height: 32,
                  fontSize: 14,
                }}
                onChange={(e) => setLastName(e.target.value)}
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
              value={email}
              style={{
                borderRadius: 5,
                borderColor: "#ccc",
                height: 32,
                fontSize: 14,
              }}
              onChange={(e) => setEmail(e.target.value)}
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
                value={phone}
                style={{
                  borderRadius: 5,
                  borderColor: "#ccc",
                  height: 32,
                  fontSize: 14,
                }}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Teléfono"
                variant="outlined"
                className="border rounded-md  text-sm"
              />
            </div>
            </div>
            {error!="" &&<span className="text-red-500 text-sm">{error}</span>}
        </div>
      </Modal>
  )
}

export default AddContactModal
