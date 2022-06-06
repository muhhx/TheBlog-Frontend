import BASE_URL from "../../config/axios";
import { ILoginData } from "./types";

const fetchUser = async() => {
    const response = await BASE_URL.get("/session");
    
    return response.data;
};

const login = async (loginData: ILoginData) => {
    const response = await BASE_URL.post("/session", loginData);

    return response.data;
};

const logout = async () => {
    const response = await BASE_URL.delete("/session");

    return response.data;
};

const authService = {
    fetchUser,
    login,
    logout
}

export default authService;
