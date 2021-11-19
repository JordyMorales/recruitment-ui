import { AxiosInstance } from 'axios';

class Technology {
  axios: AxiosInstance;

  constructor(axios: AxiosInstance) {
    this.axios = axios;
  }

  createTechnology = async (payload: any): Promise<any> => {
    try {
      const res = await this.axios.post('/technologies', payload);
      console.log(
        '🚀 ~ file: TechnologyServices.ts ~ line 14 ~ Technology ~ createTechnology= ~ res.data.Technology',
        res.data.Technology,
      );
      return res.data.Technology;
    } catch (error) {
      throw error;
    }
  };

  getAllTechnologies = async (): Promise<any> => {
    try {
      const res = await this.axios.get('/technologies');
      console.log(
        '🚀 ~ file: TechnologyServices.ts ~ line 23 ~ Technology ~ getAllTechnologys= ~ res.data.technologies',
        res.data.technologies,
      );
      return res.data.technologies;
    } catch (error) {
      throw error;
    }
  };

  getTechnologyById = async (payload: any): Promise<any> => {
    try {
      const res = await this.axios.get(`/technologies/${payload.technologyId}`);
      return res.data.Technology;
    } catch (error) {
      throw error;
    }
  };

  updateTechnology = async (payload: any): Promise<any> => {
    try {
      await this.axios.put(`/technologies/${payload.technologyId}`, payload);
    } catch (error) {
      throw error;
    }
  };
}

export default Technology;
