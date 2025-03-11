import { destroyCookie, setCookie } from 'nookies';
import React, { useState, useContext, createContext } from 'react';

import api from 'services/api';

import UserService from 'services/UserService';

import { AuthResponse, Administrator } from 'interfaces/Auth';
import { Company } from 'interfaces/Companies';

interface ILoginRequest {
    email: string;
    password: string;
}

interface AuthContextData {
    user: Administrator | Company | null;
    userType: string | null;
    login: (data: ILoginRequest) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
    const [user, setUser] = useState<Administrator | Company | null>(null);
    const [userType, setUserType] = useState<string | null>(null);

    const login = async (data: ILoginRequest) => {
        try {
            const response: AuthResponse = await UserService.login(data);

            setCookie(undefined, '@app:token', response.token);
            api.defaults.headers.common = {
                Authorization: `Bearer ${response.token}`
            };

            if (response.administrator) {
                setUser(response.administrator);
                setCookie(undefined, '@app:userId', response.administrator.id);
                setCookie(undefined, '@app:userType', 'adm');
                setUserType('adm');
            }
            if (response.company) {
                setUser(response.company);
                setCookie(undefined, '@app:userId', response.company.id);
                setCookie(undefined, '@app:userType', 'company');
                setUserType('company');
            }
        } catch (error) {
            console.error('Erro ao fazer login:', error);
        }
    };

    const logout = () => {
        destroyCookie(undefined, '@app:token');
        destroyCookie(undefined, '@app:useId');
        destroyCookie(undefined, '@app:userType');
        setUser(null);
        setUserType(null);
    };

    return (
        <AuthContext.Provider value={{ user, userType, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default () => useContext(AuthContext);
