import { AxiosInstance } from 'axios';

class Candidate {
  axios: AxiosInstance;

  constructor(axios: AxiosInstance) {
    this.axios = axios;
  }

  createCandidate = async (payload: any): Promise<any> => {
    try {
      const res = await this.axios.post('/candidates', payload);
      return res.data.candidate;
    } catch (error) {
      throw error;
    }
  };

  getAllCandidates = async (): Promise<any> => {
    try {
      const res = await this.axios.get('/candidates');
      return res.data.candidates;
    } catch (error) {
      throw error;
    }
  };

  getCandidateById = async (payload: any): Promise<any> => {
    try {
      const res = await this.axios.get(`/candidates/${payload.candidateId}`);
      return res.data.candidate;
    } catch (error) {
      throw error;
    }
  };

  updateCandidate = async (payload: any): Promise<any> => {
    try {
      await this.axios.put(`/candidates/${payload.candidateId}`, payload);
    } catch (error) {
      throw error;
    }
  };
}

export default Candidate;
