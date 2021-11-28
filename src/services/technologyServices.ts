import { AxiosInstance } from 'axios';

class Technology {
  axios: AxiosInstance;

  constructor(axios: AxiosInstance) {
    this.axios = axios;
  }

  createTechnology = async (payload: any): Promise<any> => {
    try {
      const res = await this.axios.post('/technologies', payload);
      return res.data.Technology;
    } catch (error) {
      throw error.response.data.message;
    }
  };

  getAllTechnologies = async (): Promise<any> => {
    try {
      const res = await this.axios.get('/technologies');
      return res.data.technologies;
    } catch (error) {
      throw error.response.data.message;
    }
  };

  getActiveTechnologies = async (): Promise<any> => {
    try {
      const res = await this.axios.get('/technologies/search?isActive=true');
      return res.data.technologies;
    } catch (error) {
      throw error.response.data.message;
    }
  };

  updateTechnology = async (payload: any): Promise<any> => {
    try {
      await this.axios.put(`/technologies/${payload.technologyId}`, payload);
    } catch (error) {
      throw error.response.data.message;
    }
  };
}

export default Technology;
