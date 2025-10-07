import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3000/',
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

export const signin = (formData: { email: string; password: string }) => {
  return API.post('/user/signin', formData, { withCredentials: true });
}

export const fetchUser = async () => {
  return await API.get('/user/data', { withCredentials: true });
}

export const logout = async () => {
  return API.post('/user/logout', {}, { withCredentials: true });
}