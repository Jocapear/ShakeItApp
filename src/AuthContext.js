import React, { useContext } from 'react'

const AuthContext = React.createContext({
    isLoggedIn: false,
    isLoadingAuth: true,
    user: null,
})

export default AuthContext
export const AuthContextProvider = AuthContext.Provider
export const AuthContextConsumer = AuthContext.Consumer
export const useAuth = () => useContext(AuthContext)
