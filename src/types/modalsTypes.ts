export interface AddCategoryModalProps {
    showAddCategoryModal: boolean;
    setShowAddCategoryModal: (value: boolean) => void;
    newCategory: string;
    setNewCategory: (value: string) => void;
    onOk: (value:string) => void;
    onCancel: () => void;
}