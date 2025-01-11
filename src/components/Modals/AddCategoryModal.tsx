import { Input, Modal } from 'antd';
import React from 'react'
import { AddCategoryModalProps } from '../../types/modalsTypes';

const AddCategoryModal = ( props : AddCategoryModalProps) => {
    const {showAddCategoryModal, setShowAddCategoryModal, onOk , onCancel} = props;
    const [newCategory, setNewCategory] = React.useState<string>("");
    const [error, setError] = React.useState<string>("");
  return (
    <Modal
        open={showAddCategoryModal}
        style={{ backgroundColor: "#111827" }}
        title="Agregar categoría"
        destroyOnClose
        onCancel={() => {
            setNewCategory("");
            setShowAddCategoryModal(false);
            onCancel();
        }}
        onOk={() => {
            if (!newCategory || newCategory === "") {
                setError("El nombre de la categoria es requerido");
                return;
            }
            onOk(newCategory);
        }}
        // okButtonProps={{ disabled: !newCategory, style:{color:newCategory?'white':"gray"} }}
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

        {error && (
          <div className="text-red-500 text-sm mt-2">{error}</div>
        )}
      </Modal>
  )
}

export default AddCategoryModal
