import axios from "axios";
import Config from "react-native-config";


const api = axios.create({
    baseURL: Config.API_URL
})
const register = async (name: string, email: string, password: string) => {
    const response = await api.post(
        "/api/v1/auth/register" ,{
            name,
            email,
            password
        }
    )
    return response.data;
}

const login = async (email: string, password: string) => {
    const response = await api.post(
        "/api/v1/auth/login" ,{
            email,
            password
        }
    )
    
    return response.data;
}

const info = async (token: string) => {
    const response = await api.get(
        "/api/v1/auth/me",
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    )
    return response.data;
}

const forgotPassword = async (email: string) => {
    const response = await api.post(
        "/api/v1/auth/forgotpassword" ,{
            email
        }
    )
    return response.data;
}

export default {
    register,
    login,
    info,
    forgotPassword
}