import { AxiosInstance } from 'axios';

class Process {
  axios: AxiosInstance;

  constructor(axios: AxiosInstance) {
    this.axios = axios;
  }

  createProcess = async (payload: any): Promise<any> => {
    try {
      const res = await this.axios.post('/processes', payload);
      console.log("🚀 ~ file: processServices.ts ~ line 14 ~ Process ~ createProcess= ~ res.data.process", res.data.process)
      return res.data.process;
    } catch (error) {
      throw error.response.data.message;
    }
  };

  getAllProcesses = async (): Promise<any> => {
    try {
      const res = await this.axios.get('/processes');
      return res.data.processes;
    } catch (error) {
      throw error.response.data.message;
    }
  };

  getProcessById = async (payload: any): Promise<any> => {
    try {
      const res = await this.axios.get(`/processes/${payload.processId}`);
      return res.data.process;
    } catch (error) {
      throw error.response.data.message;
    }
  };

  updateProcess = async (payload: any): Promise<any> => {
    try {
      await this.axios.put(`/processes/${payload.processId}`, payload);
    } catch (error) {
      throw error.response.data.message;
    }
  };
}

export default Process;
