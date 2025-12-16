import { createContext, useContext, useEffect, useState } from "react"
import { api, loginUser } from "../services/api"
import { jwtDecode } from "jwt-decode"

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    //use effect para setear el user si viene de localstorage
    useEffect(() => {
        const token = localStorage.getItem("token")
        if (token) {
            const decoded = jwtDecode(token)
            setUser(decoded)
            api.defaults.headers.common["Authorization"] = `Bearer ${token}`
        }
        setLoading(false)
    }, [])

    const login = async (email, password) => {
  try {
    const res = await loginUser({
      email,
      password
    });
    const { token } = res.data;
    const decoded = jwtDecode(token);

    setUser(decoded);
    localStorage.setItem("token", token);
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    return true;
  } catch (error) {
    console.error("Login error:", error);
    return false;
  }
};


    const logout = () => {
        setUser(null)
        localStorage.removeItem("token")
        api.defaults.headers.common["Authorization"]
    }

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () =>  useContext(AuthContext)
