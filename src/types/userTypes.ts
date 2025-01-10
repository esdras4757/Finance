export type user = {
    id: string;
    name: string;
    email: string;
    createdAt: string;
    updatedAt: string;
    lastName: string;
    isBlocked: boolean;
  };
  
export interface UserContextType {
    user: user | null;
    updateUser: (value:user) => void;
  }