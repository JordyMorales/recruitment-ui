import Axios, { AxiosRequestConfig } from 'axios';
import firebase from '../lib/firebase';
import User from './userServices';
import Technology from './technologyServices';
import Tag from './tagServices';
import Candidate from './candidateServices';
import Process from './processServices';
import Job from './jobServices';
import Application from './applicationServices';
import Step from './stepServices';

const axios = Axios.create({
  baseURL: window.__RUNTIME_CONFIG__?.REACT_APP_SERVER_URI || process.env.REACT_APP_SERVER_URI,
});

axios.interceptors.request.use(
  async (config: AxiosRequestConfig) => {
    const currentUser = firebase.auth().currentUser;
    if (currentUser) {
      const token = await currentUser.getIdToken();
      config.headers.authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

const services = {
  axios,
  user: new User(axios),
  technology: new Technology(axios),
  tag: new Tag(axios),
  candidate: new Candidate(axios),
  process: new Process(axios),
  job: new Job(axios),
  application: new Application(axios),
  step: new Step(axios),
};

export default services;
