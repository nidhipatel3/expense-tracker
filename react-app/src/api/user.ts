import axios from 'axios';

const API = axios.create({
  baseURL: "http://localhost:8001/",
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token && config.headers) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const signup = async (data: {
  fullName: string;
  email: string;
  password: string;
  profileImageURL: File | null;
}) => {

  const formData = new FormData();
  formData.append("fullName", data.fullName);
  formData.append("email", data.email);
  formData.append("password", data.password);

  if (data.profileImageURL) {
    formData.append("profileImage", data.profileImageURL);
  }

  const response = await API.post("/user/signup", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export const signin = async (formData: { email: string; password: string }) => {
  const res = await API.post("/user/signin", formData);
  const { user, token } = res.data;
  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(user));
  return { user, token };
}

export const fetchUser = async () => {
  const res = await API.get("/user/data");
  return res.data;
}

export const logout = async () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  return API.post('/user/logout', {});
}

export default API;