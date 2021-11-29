import {
  uiStuffTypes,
  createJobTypes,
  getAllJobsTypes,
  getJobByIdTypes,
  updateJobTypes,
  applyForJobTypes,
  updateApplicationTypes,
  getJobApplicationsTypes,
} from './constants';

import { JobState, emptyApplication, emptyJob } from './types';

const initialState: JobState = {
  isLoading: false,
  isSuccessful: false,
  error: '',
  job: emptyJob,
  application: emptyApplication,
  applications: {
    initialLoading: true,
    isLoading: false,
    applications: [],
  },
  list: {
    initialLoading: true,
    isLoading: false,
    totalItems: 0,
    jobs: [],
    totalPages: 0,
    currentPage: 0,
  },
};

const jobReducer = (state = initialState, action: any) => {
  const { type, payload } = action;

  switch (type) {
    case uiStuffTypes.SET_JOB:
      return {
        ...state,
        job: { ...state.job, ...payload },
      };

    case uiStuffTypes.CLEAR_JOB:
      return {
        ...state,
        job: emptyJob,
        isSuccessful: false,
      };

    case createJobTypes.REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case createJobTypes.SUCCESS:
      return {
        ...state,
        job: payload,
        list: {
          ...state.list,
          totalItems: state.list.totalItems + 1,
          jobs: [payload, ...state.list.jobs],
        },
        isLoading: false,
        isSuccessful: true,
      };

    case createJobTypes.FAILURE:
      return {
        ...state,
        error: payload,
        isLoading: false,
      };

    case getAllJobsTypes.REQUEST:
      return {
        ...state,
        list: {
          ...initialState.list,
          isLoading: true,
        },
      };

    case getAllJobsTypes.SUCCESS:
      return {
        ...state,
        list: {
          jobs: payload,
          isLoading: false,
          initialLoading: false,
        },
      };

    case getAllJobsTypes.FAILURE:
      return {
        ...state,
        error: payload,
        list: {
          ...initialState.list,
          isLoading: false,
        },
      };

    case getJobByIdTypes.REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case getJobByIdTypes.SUCCESS:
      return {
        ...state,
        job: payload,
        isLoading: false,
      };

    case getJobByIdTypes.FAILURE:
      return {
        ...state,
        error: payload,
        isLoading: false,
      };

    case updateJobTypes.REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case updateJobTypes.SUCCESS:
      const index = state.list.jobs.findIndex((job) => job.jobId === payload.jobId);
      return {
        ...state,
        job: emptyJob,
        list: {
          ...state.list,
          jobs: [
            ...state.list.jobs.slice(0, index),
            { ...state.list.jobs[index], ...payload },
            ...state.list.jobs.slice(index + 1),
          ],
        },
        isLoading: false,
        isSuccessful: true,
      };

    case updateJobTypes.FAILURE:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };

    case applyForJobTypes.REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case applyForJobTypes.SUCCESS:
      return {
        ...state,
        application: emptyApplication,
        applications: {
          ...state.applications,
          applications: [payload, ...state.applications.applications],
        },
        isLoading: false,
        isSuccessful: true,
      };

    case applyForJobTypes.FAILURE:
      return {
        ...state,
        error: payload,
        isLoading: false,
      };

    case updateApplicationTypes.REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case updateApplicationTypes.SUCCESS:
      const applicationIndex = state.applications.applications.findIndex(
        (application) => application.applicationId === payload.applicationId,
      );

      return {
        ...state,
        application: emptyApplication,
        applications: {
          ...state.applications,
          applications: [
            ...state.applications.applications.slice(0, applicationIndex),
            { ...state.applications.applications[applicationIndex], ...payload },
            ...state.applications.applications.slice(applicationIndex + 1),
          ],
        },
        isLoading: false,
        isSuccessful: true,
      };

    case updateApplicationTypes.FAILURE:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };

    case getJobApplicationsTypes.REQUEST:
      return {
        ...state,
        applications: {
          ...initialState.applications,
          isLoading: true,
        },
      };

    case getJobApplicationsTypes.SUCCESS:
      return {
        ...state,
        applications: {
          applications: payload,
          isLoading: false,
          initialLoading: false,
        },
      };

    case getJobApplicationsTypes.FAILURE:
      return {
        ...state,
        error: payload,
        applications: {
          ...initialState.applications,
          isLoading: false,
        },
      };

    default:
      return state;
  }
};

export default jobReducer;
