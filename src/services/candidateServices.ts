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
      throw error.response.data.message;
    }
  };

  getAllCandidates = async (): Promise<any> => {
    try {
      const res = await this.axios.get('/candidates');
      return res.data.candidates;
    } catch (error) {
      throw error.response.data.message;
    }
  };

  getCandidateById = async (payload: any): Promise<any> => {
    try {
      const res = await this.axios.get(`/candidates/${payload.candidateId}`);
      return res.data.candidate;
    } catch (error) {
      throw error.response.data.message;
    }
  };

  updateCandidate = async (payload: any): Promise<any> => {
    try {
      const res = await this.axios.put(`/candidates/${payload.candidateId}`, payload);
      return res.data.candidate;
    } catch (error) {
      throw error.response.data.message;
    }
  };

  getCandidateApplications = async (payload: any): Promise<any> => {
    console.log("🚀 ~ file: candidateServices.ts ~ line 47 ~ Candidate ~ getCandidateApplications= ~ payload", payload)
    try {
      const res = await this.axios.get(`/candidates/${payload.candidateId}/applications`);
      return res.data.applications;
    } catch (error) {
      throw error.response.data.message;
    }
  };
}

export default Candidate;
