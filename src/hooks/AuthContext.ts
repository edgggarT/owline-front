import { createContext, useContext } from "react";



// DEFINIR UN CONTRATO PARA ALMACENAR LA INFORMACION DEL USUARIO LOGUEADO
export interface UserInfo {
    name: string;
    email: string;
}

export interface RegisterResult {
    success: boolean;
    type?: 'network' | 'conflict' | 'unknown';
}


// DEFINIMOS EL CONTRATO PARA TODO EL CONTEXTO
export interface AuthContextType {
    authToken: string | null;
    isAuth: boolean;
    isLoading: boolean;
    userInfo: UserInfo | null;
    login: (email: string, password: string) => Promise<boolean>;
    logout: () => void;
    updateUserInfo: (info: UserInfo) => void;
    register: (name: string, email: string, password: string) => Promise<RegisterResult>;
}


// CREAMOS EL CONTEXTO PARA EL LOGIN
export const AuthContext = createContext<AuthContextType | undefined>(undefined)


// DEFINIMOS EL CONSUMO DEL CONTRATO
export const useAuth = () => {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error('useAuth debe ser usado dentro de un AuthProvider')
    }
    return context;
};