import { AxiosInstance } from 'axios';

class Tag {
  axios: AxiosInstance;

  constructor(axios: AxiosInstance) {
    this.axios = axios;
  }

  createTag = async (payload: any): Promise<any> => {
    try {
      const res = await this.axios.post('/tags', payload);
      return res.data.tag;
    } catch (error) {
      throw error;
    }
  };

  getAllTags = async (): Promise<any> => {
    try {
      const res = await this.axios.get('/tags');
      return res.data.tags;
    } catch (error) {
      throw error;
    }
  };

  getActiveTags = async (): Promise<any> => {
    try {
      const res = await this.axios.get('/tags/search?isActive=true');
      return res.data.tags;
    } catch (error) {
      throw error;
    }
  };

  updateTag = async (payload: any): Promise<any> => {
    try {
      await this.axios.put(`/tags/${payload.tagId}`, payload);
    } catch (error) {
      throw error;
    }
  };
}

export default Tag;
