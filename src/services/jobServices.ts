import { AxiosInstance } from 'axios';

class Job {
  axios: AxiosInstance;

  constructor(axios: AxiosInstance) {
    this.axios = axios;
  }

  createJob = async (payload: any): Promise<any> => {
    try {
      const res = await this.axios.post('/jobs', payload);
      return res.data.job;
    } catch (error) {
      throw error.response.data.message;
    }
  };

  getAllJobs = async (): Promise<any> => {
    try {
      const res = await this.axios.get('/jobs');
      return res.data.jobs;
    } catch (error) {
      throw error.response.data.message;
    }
  };

  getJobById = async (payload: any): Promise<any> => {
    try {
      const res = await this.axios.get(`/jobs/${payload.jobId}`);
      return res.data.job;
    } catch (error) {
      throw error.response.data.message;
    }
  };

  updateJob = async (payload: any): Promise<any> => {
    try {
      await this.axios.put(`/jobs/${payload.jobId}`, payload);
    } catch (error) {
      throw error.response.data.message;
    }
  };
}

export default Job;
