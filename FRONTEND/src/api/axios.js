import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5000/api", // ❗your backend URL
    withCredentials: true, // ❗send cookies automatically
});

// Auto redirect to login on 401
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error?.response?.status === 401) {
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);

export default api;
