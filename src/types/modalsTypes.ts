import { AddContactType } from "./contactsTypes";

export interface AddCategoryModalProps {
    showAddCategoryModal: boolean;
    setShowAddCategoryModal: (value: boolean) => void;
    newCategory: string;
    setNewCategory: (value: string) => void;
    onOk: (value:string) => void;
    onCancel: () => void;
}

export interface AddContactModalProps {
    showAddContactModal: boolean;
    setShowAddContactModal: (value: boolean) => void;
    newContact: AddContactType;
    setNewContact: (value: AddContactType) => void;
    onOk: (value:AddContactType) => void;
    onCancel: () => void;
}