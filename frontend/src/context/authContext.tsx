import { createContext, useContext, useState, useMemo, type ReactNode } from 'react'
import type { AuthContextType } from '../types/AuthContextType'


const AuthContext = createContext<AuthContextType | null>(null)


type AuthProviderProps = {
    children : ReactNode
}


export const AuthProvider = ({ children } : AuthProviderProps) => {
    const[accessToken, setAccessToken] = useState< string | null>(null) 

    const login = (accessToken : string) => setAccessToken(accessToken) // 토큰 저장
    const logout = () => setAccessToken(null)   // 토큰 제거
    const isAuthenticated = !!accessToken;  //로그인 여부 판단


    const value = useMemo (
        () => ({
            accessToken,
            login,
            logout,
            isAuthenticated,
        }), [accessToken]
    )
    return (
        <AuthContext.Provider value = { value }>
            { children }
        </AuthContext.Provider>
    )
}


// AuthProvider 내부에서만 사용 가능
export const useAuthContext = () => {
    const context = useContext(AuthContext)
    if(context === null){
        throw new Error("use with AuthProvider")
    }

    return context
}