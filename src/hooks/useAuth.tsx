import { destroyCookie, setCookie, parseCookies } from 'nookies';
import React, { useState, useContext, createContext, useEffect } from 'react';

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
    userId: string | null;
    login: (data: ILoginRequest) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
    const [user, setUser] = useState<Administrator | Company | null>(null);
    const [userType, setUserType] = useState<string | null>(null);
    const [userId, setUserId] = useState<string | null>(null);

    useEffect(() => {
        const cookies = parseCookies();
        const userTypeCookie = cookies['@app:userType'];
        const userIdCookie = cookies['@app:userId'];
        if (userTypeCookie) {
            setUserType(userTypeCookie);
        }
        if (userIdCookie) {
            setUserId(userIdCookie);
        }
    }, []);

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
                setUserId(response.administrator.id);
            }
            if (response.company) {
                setUser(response.company);
                setCookie(undefined, '@app:userId', response.company.id);
                setCookie(undefined, '@app:userType', 'company');
                setUserType('company');
                setUserId(response.company.id);
            }
        } catch (error) {
            console.error('Erro ao fazer login:', error);
            throw error;
        }
    };

    const logout = () => {
        destroyCookie(undefined, '@app:token');
        destroyCookie(undefined, '@app:userId');
        destroyCookie(undefined, '@app:userType');
        setUser(null);
        setUserType(null);
        setUserId(null);
    };

    return (
        <AuthContext.Provider value={{ user, userType, userId, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default () => useContext(AuthContext);
