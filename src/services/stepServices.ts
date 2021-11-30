import { AxiosInstance } from 'axios';

class Step {
  axios: AxiosInstance;

  constructor(axios: AxiosInstance) {
    this.axios = axios;
  }

  getStepApplications = async (payload: any): Promise<any> => {
    try {
      const res = await this.axios.get(`/steps/${payload.stepId}/${payload.jobId}/applications`);
      return res.data.applications;
    } catch (error) {
      throw error.response.data.message;
    }
  };
}

export default Step;
