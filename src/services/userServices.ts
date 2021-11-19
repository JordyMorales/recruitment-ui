import { AxiosInstance } from 'axios';

class User {
  axios: AxiosInstance;

  constructor(axios: AxiosInstance) {
    this.axios = axios;
  }

  createUser = async (payload: any): Promise<any> => {
    try {
      const res = await this.axios.post('/users', payload);
      console.log("🚀 ~ file: userServices.ts ~ line 14 ~ User ~ createUser= ~ res.data.user", res.data.user)
      return res.data.user;
    } catch (error) {
      throw error;
    }
  };

  getAllUsers = async (): Promise<any> => {
    try {
      const res = await this.axios.get('/users');
      console.log("🚀 ~ file: userServices.ts ~ line 23 ~ User ~ getAllUsers= ~ res.data.users", res.data.users)
      return res.data.users;
    } catch (error) {
      throw error;
    }
  };

  getCurrentUser = async (): Promise<any> => {
    try {
      const res = await this.axios.get('/users');
      return res.data.user;
    } catch (error) {
      throw error;
    }
  };

  getUserById = async (payload: any): Promise<any> => {
    try {
      const res = await this.axios.get(`/users/${payload.userId}`);
      return res.data.user;
    } catch (error) {
      throw error;
    }
  };

  register = async (payload: any): Promise<any> => {
    try {
      const res = await this.axios.post('/users', payload);
      return res.data.users;
    } catch (error) {
      throw error;
    }
  };

  updateUser = async (payload: any): Promise<any> => {
    try {
      await this.axios.put(`/users/${payload.userId}`, payload);
    } catch (error) {
      throw error;
    }
  };
}

export default User;
