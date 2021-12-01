import { AxiosInstance } from 'axios';

class User {
  axios: AxiosInstance;

  constructor(axios: AxiosInstance) {
    this.axios = axios;
  }

  createUser = async (payload: any): Promise<any> => {
    try {
      const res = await this.axios.post('/users', payload);
      return res.data.user;
    } catch (error) {
      throw error.response.data.message;
    }
  };

  getAllUsers = async (): Promise<any> => {
    try {
      const res = await this.axios.get('/users');
      return res.data.users;
    } catch (error) {
      throw error.response.data.message;
    }
  };

  getCurrentUser = async (): Promise<any> => {
    try {
      const res = await this.axios.get('/users/me');
      return res.data.user;
    } catch (error) {
      throw error.response.data.message;
    }
  };

  getUserById = async (payload: any): Promise<any> => {
    try {
      const res = await this.axios.get(`/users/${payload.userId}`);
      return res.data.user;
    } catch (error) {
      throw error.response.data.message;
    }
  };

  register = async (payload: any): Promise<any> => {
    try {
      const res = await this.axios.post('/register', payload);
      return res.data.user;
    } catch (error) {
      throw error.response.data.message;
    }
  };

  updateUser = async (payload: any): Promise<any> => {
    try {
      await this.axios.put(`/users/${payload.userId}`, payload);
    } catch (error) {
      throw error.response.data.message;
    }
  };
}

export default User;
