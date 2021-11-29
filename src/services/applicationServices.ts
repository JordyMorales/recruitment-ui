import { AxiosInstance } from 'axios';

class Application {
  axios: AxiosInstance;

  constructor(axios: AxiosInstance) {
    this.axios = axios;
  }

  getApplicationById = async (payload: any): Promise<any> => {
    try {
      const res = await this.axios.get(`/jobs/applications/${payload.applicationId}`);
      return res.data.application;
    } catch (error) {
      throw error.response.data.message;
    }
  };

  updateApplication = async (payload: any): Promise<any> => {
    try {
      const res = await this.axios.put(`/jobs/applications/${payload.applicationId}`, payload);
      return res.data.application;
    } catch (error) {
      throw error.response.data.message;
    }
  };
}

export default Application;
