import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { v4 as uuidv4 } from 'uuid';
import { Box, Card, CardContent, CardHeader, FormHelperText, Grid, TextField, MenuItem, Divider } from '@mui/material';
import useMounted from '../../../hooks/useMounted';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import LoadingButton from '@mui/lab/LoadingButton';
import MuiPhoneNumber from 'material-ui-phone-number';
import MultipleSelectChip from '../../MultipleSelectChip';
import MultiplePhones from '../../MultiplePhones';
import MultipleEmails from '../../MultipleEmails';
import { CountryRegionData } from 'react-country-region-selector';

import { EnglishLevel } from '../../../constants';
import { RootState } from '../../../store/rootReducer';
import { tagActions } from '../../../store/tag/actions';
import { technologyActions } from '../../../store/technology/actions';
import { candidateActions } from '../../../store/candidate/actions';
import { getRegionOptions } from '../../../utils';
import ScreenLoader from '../../ScreenLoader';

const CandidateForm: React.FC = (props) => {
  const mounted = useMounted();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();

  const { isLoading, isSuccessful, candidate } = useSelector((state: RootState) => state.candidate);
  console.log('🚀 ~ file: CandidateForm.tsx ~ line 33 ~ candidate', candidate);

  const {
    list: { tags },
  } = useSelector((state: RootState) => state.tag);

  const {
    list: { technologies },
  } = useSelector((state: RootState) => state.technology);

  useEffect(() => {
    if (mounted && params.candidateId && !candidate.candidateId) {
      dispatch(candidateActions.getCandidateByIdRequest({ candidateId: params.candidateId }));
    }
  }, [candidate.candidateId, dispatch, mounted, params.candidateId]);

  useEffect(() => {
    if (mounted) {
      dispatch(tagActions.getActiveTagsRequest());
      dispatch(technologyActions.getActiveTechnologiesRequest());
    }
  }, [dispatch, mounted]);

  useEffect(() => {
    if (!params.candidateId) {
      dispatch(candidateActions.clearCandidate());
    }
  }, [dispatch, mounted, params.candidateId]);

  useEffect(() => {
    if (mounted && isSuccessful) {
      dispatch(candidateActions.clearCandidate());
      navigate('/app/candidates');
    }
  }, [dispatch, isSuccessful, mounted, navigate]);

  if (isLoading) {
    return <ScreenLoader />;
  }

  return (
    <Formik
      initialValues={{
        user: {
          userId: params.candidateId ? candidate.personalData.userId || '' : '',
          firstName: params.candidateId ? candidate.personalData.firstName || '' : '',
          middleName: params.candidateId ? candidate.personalData.middleName || '' : '',
          lastName: params.candidateId ? candidate.personalData.lastName || '' : '',
          email: params.candidateId ? candidate.personalData.email || '' : '',
          phone: params.candidateId ? candidate.personalData.phone || '' : '',
          dateOfBirth: params.candidateId ? candidate.personalData.dateOfBirth || new Date() : new Date(),
          country: params.candidateId ? candidate.personalData.country || '' : '',
          city: params.candidateId ? candidate.personalData.city || '' : '',
          address: params.candidateId ? candidate.personalData.address || '' : '',
          photoUrl: params.candidateId ? candidate.personalData.photoUrl || '' : '',
          resumeUrl: params.candidateId ? candidate.personalData.resumeUrl || '' : '',
          role: params.candidateId ? candidate.personalData.role || 'CANDIDATE' : 'CANDIDATE',
          state: params.candidateId ? candidate.personalData.state || 'INACTIVE' : 'INACTIVE',
        },
        candidate: {
          candidateId: params.candidateId ? candidate.candidateId || '' : '',
          englishLevel: params.candidateId ? candidate.englishLevel || 'A1' : 'A1',
          engineeringLevel: params.candidateId ? candidate.engineeringLevel || 0.0 : 0.0,
          salaryPretension: params.candidateId ? candidate.salaryPretension || '' : '',
          contractPreference: params.candidateId ? candidate.contractPreference || '' : '',
          jobTitle: params.candidateId ? candidate.jobTitle || '' : '',
          company: params.candidateId ? candidate.company || '' : '',
          seniority: params.candidateId ? candidate.seniority || '' : '',
          availability: params.candidateId ? candidate.availability || '' : '',
          tags: params.candidateId ? candidate.tags || [] : [],
          links: params.candidateId ? candidate.links || [] : [],
          phones: params.candidateId ? candidate.phones || [] : [],
          emails: params.candidateId ? candidate.emails || [] : [],
          technologies: params.candidateId ? candidate.technologies || [] : [],
          referralBy: params.candidateId ? candidate.referralBy || '' : '',
          createdBy: params.candidateId ? candidate.createdBy || '' : '',
          updatedBy: params.candidateId ? candidate.updatedBy || '' : '',
          createdAt: params.candidateId ? candidate.createdAt : null,
          updatedAt: params.candidateId ? candidate.updatedAt : null,
        },
        submit: null,
      }}
      validationSchema={Yup.object().shape({
        user: Yup.object().shape({
          firstName: Yup.string().max(100).required(),
          middleName: Yup.string().max(100),
          lastName: Yup.string().max(255).required(),
          email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
          phone: Yup.string().max(50),
          dateOfBirth: Yup.date(),
          country: Yup.string().max(255),
          city: Yup.string().max(255),
          address: Yup.string().max(255),
          photoUrl: Yup.string().max(255),
          resumeUrl: Yup.string().max(300),
          role: Yup.string().required(),
          state: Yup.string().required(),
        }),
        candidate: Yup.object().shape({
          englishLevel: Yup.string().max(100),
          engineeringLevel: Yup.number(),
          salaryPretension: Yup.number(),
          contractPreference: Yup.string().max(255),
          jobTitle: Yup.string().max(150),
          company: Yup.string().max(50),
          seniority: Yup.string(),
          availability: Yup.string().max(255),
          tags: Yup.array(),
          links: Yup.array(),
          phones: Yup.array(),
          emails: Yup.array(),
          technologies: Yup.array(),
          referralBy: Yup.string(),
        }),
      })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }): Promise<void> => {
        try {
          const uuid = uuidv4();
          params.candidateId
            ? dispatch(
                candidateActions.updateCandidateRequest({
                  user: { ...values.user, userId: params.candidateId },
                  candidate: { ...values.candidate, userId: params.candidateId },
                }),
              )
            : dispatch(
                candidateActions.createCandidateRequest({
                  user: { ...values.user, userId: uuid },
                  candidate: { ...values.candidate, userId: uuid },
                }),
              );
        } catch (err) {
          console.error(err);
          toast.error('Something went wrong!');
          setStatus({ success: false });
          setErrors({ submit: err.message });
          setSubmitting(false);
        }
      }}
    >
      {({
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        isSubmitting,
        setFieldValue,
        touched,
        values,
      }): JSX.Element => (
        <form onSubmit={handleSubmit} {...props}>
          <Grid container spacing={3}>
            <Grid item lg={5} md={5} sm={12} xs={12}>
              <Card>
                <CardHeader title="Personal Information" />
                <Divider />
                <CardContent>
                  <Grid container spacing={3}>
                    <Grid item lg={7} md={7} sm={7} xs={12}>
                      <TextField
                        error={Boolean(touched.user?.firstName && errors.user?.firstName)}
                        fullWidth
                        helperText={touched.user?.firstName && errors.user?.firstName}
                        label="First name"
                        name="user.firstName"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        required
                        value={values.user.firstName}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item lg={5} md={5} sm={5} xs={12}>
                      <TextField
                        error={Boolean(touched.user?.middleName && errors.user?.middleName)}
                        fullWidth
                        helperText={touched.user?.middleName && errors.user?.middleName}
                        label="Middle Name"
                        name="user.middleName"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.user.middleName}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                      <TextField
                        error={Boolean(touched.user?.lastName && errors.user?.lastName)}
                        fullWidth
                        helperText={touched.user?.lastName && errors.user?.lastName}
                        label="Last Name"
                        name="user.lastName"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        required
                        value={values.user.lastName}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                      <TextField
                        error={Boolean(touched.user?.email && errors.user?.email)}
                        fullWidth
                        helperText={touched.user?.email && errors.user?.email}
                        label="Email address"
                        name="user.email"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        required
                        value={values.user.email}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item lg={7} md={7} sm={7} xs={12}>
                      <MuiPhoneNumber
                        label="Phone"
                        fullWidth
                        variant="outlined"
                        defaultCountry={'bo'}
                        value={values.user.phone}
                        onChange={(newValue) => setFieldValue('user.phone', newValue)}
                      />
                    </Grid>
                    <Grid item lg={5} md={5} sm={5} xs={12}>
                      <MobileDatePicker
                        label="Date of Birth"
                        value={values.user.dateOfBirth}
                        onChange={(newValue) => setFieldValue('user.dateOfBirth', newValue)}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            fullWidth
                            variant="outlined"
                            name="user.dateOfBirth"
                            error={Boolean(touched.user?.dateOfBirth && errors.user?.dateOfBirth)}
                            helperText={touched.user?.dateOfBirth && errors.user?.dateOfBirth}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                      <TextField
                        error={Boolean(touched.user?.country && errors.user?.country)}
                        fullWidth
                        helperText={touched.user?.country && errors.user?.country}
                        label="Country"
                        name="user.country"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.user.country}
                        variant="outlined"
                        select
                      >
                        {CountryRegionData.map((option) => {
                          return (
                            <MenuItem key={option[1]} value={option[0]}>
                              {option[0]}
                            </MenuItem>
                          );
                        })}
                      </TextField>
                    </Grid>
                    {values.user.country && (
                      <Grid item lg={12} md={12} sm={12} xs={12}>
                        <TextField
                          error={Boolean(touched.user?.city && errors.user?.city)}
                          fullWidth
                          helperText={touched.user?.city && errors.user?.city}
                          label="City"
                          name="user.city"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.user.city}
                          variant="outlined"
                          select
                        >
                          {values.user.country &&
                            getRegionOptions(CountryRegionData, values.user.country).map((option) => (
                              <MenuItem key={option} value={option}>
                                {option}
                              </MenuItem>
                            ))}
                        </TextField>
                      </Grid>
                    )}
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                      <TextField
                        error={Boolean(touched.user?.address && errors.user?.address)}
                        fullWidth
                        helperText={touched.user?.address && errors.user?.address}
                        label="Address"
                        name="user.address"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.user.address}
                        variant="outlined"
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
              {values.user.email && (
                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <Card sx={{ mt: 3 }}>
                    <CardHeader title="Extra Emails" />
                    <CardContent>
                      <Grid item lg={12} xs={12}>
                        <MultipleEmails
                          onChange={(value) => setFieldValue('candidate.emails', value)}
                          values={values.candidate.emails}
                        />
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
              )}
              {values.user.phone && (
                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <Card sx={{ mt: 3 }}>
                    <CardHeader title="Extra Phones" />
                    <CardContent>
                      <Grid item lg={12} xs={12}>
                        <MultiplePhones
                          onChange={(value) => setFieldValue('candidate.phones', value)}
                          values={values.candidate.phones}
                        />
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
              )}
            </Grid>

            <Grid item lg={7} md={7} sm={12} xs={12}>
              <Card>
                <CardHeader title="Professional Information" />
                <Divider />
                <CardContent>
                  <Grid container spacing={3}>
                    <Grid item lg={4} md={4} sm={4} xs={12}>
                      <TextField
                        error={Boolean(touched.candidate?.englishLevel && errors.candidate?.englishLevel)}
                        fullWidth
                        helperText={touched.candidate?.englishLevel && errors.candidate?.englishLevel}
                        name="candidate.englishLevel"
                        label="English Level"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        required
                        value={values.candidate.englishLevel}
                        variant="outlined"
                        select
                      >
                        {Object.keys(EnglishLevel).map((key) => (
                          <MenuItem key={key} value={key}>
                            {key}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>
                    <Grid item lg={4} md={4} sm={4} xs={12}>
                      <TextField
                        error={Boolean(touched.candidate?.availability && errors.candidate?.availability)}
                        fullWidth
                        helperText={touched.candidate?.availability && errors.candidate?.availability}
                        name="candidate.engineeringLevel"
                        label="Engineering Level"
                        onBlur={handleBlur}
                        value={values.candidate.engineeringLevel}
                        onChange={handleChange}
                        type="number"
                        variant="outlined"
                        InputProps={{ inputProps: { min: 0, max: 5, step: '0.1' } }}
                      />
                    </Grid>
                    <Grid item lg={4} md={4} sm={4} xs={12}>
                      <TextField
                        error={Boolean(
                          touched.candidate?.salaryPretension && errors.candidate?.salaryPretension,
                        )}
                        fullWidth
                        helperText={touched.candidate?.salaryPretension && errors.candidate?.salaryPretension}
                        name="candidate.salaryPretension"
                        label="Salary Pretension"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        type="number"
                        value={values.candidate.salaryPretension}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item md={12} xs={12}>
                      <MultipleSelectChip
                        id="tagId"
                        label="Tags"
                        defaultValue={values.candidate.tags}
                        options={tags}
                        onChange={(value) => setFieldValue('candidate.tags', value)}
                        placeholder="Tags"
                        withColor
                      />
                    </Grid>

                    <Grid item md={12} xs={12}>
                      <MultipleSelectChip
                        id="technologyId"
                        label="Technologies"
                        defaultValue={values.candidate.technologies}
                        options={technologies}
                        onChange={(value) => setFieldValue('candidate.technologies', value)}
                        placeholder="Technologies"
                      />
                    </Grid>
                    <Grid item lg={6} md={6} sm={6} xs={12}>
                      <TextField
                        error={Boolean(touched.candidate?.company && errors.candidate?.company)}
                        fullWidth
                        helperText={touched.candidate?.company && errors.candidate?.company}
                        label="Company"
                        name="candidate.company"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.candidate.company}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item lg={6} md={6} sm={6} xs={12}>
                      <TextField
                        error={Boolean(touched.candidate?.jobTitle && errors.candidate?.jobTitle)}
                        fullWidth
                        helperText={touched.candidate?.jobTitle && errors.candidate?.jobTitle}
                        label="Job Title"
                        name="candidate.jobTitle"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.candidate.jobTitle}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item lg={6} md={6} sm={6} xs={12}>
                      <TextField
                        error={Boolean(touched.candidate?.seniority && errors.candidate?.seniority)}
                        fullWidth
                        helperText={touched.candidate?.seniority && errors.candidate?.seniority}
                        label="Seniority"
                        name="candidate.seniority"
                        placeholder="Ej: Junior, Mid, Senior"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.candidate.seniority}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item lg={6} md={6} sm={6} xs={12}>
                      <TextField
                        error={Boolean(
                          touched.candidate?.contractPreference && errors.candidate?.contractPreference,
                        )}
                        fullWidth
                        helperText={
                          touched.candidate?.contractPreference && errors.candidate?.contractPreference
                        }
                        name="candidate.contractPreference"
                        label="Contract Preference"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.candidate.contractPreference}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item lg={6} md={6} sm={6} xs={12}>
                      <TextField
                        error={Boolean(touched.candidate?.availability && errors.candidate?.availability)}
                        fullWidth
                        helperText={touched.candidate?.availability && errors.candidate?.availability}
                        name="candidate.availability"
                        label="Availability"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.candidate.availability}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item lg={6} md={6} sm={6} xs={12}>
                      <TextField
                        error={Boolean(touched.candidate?.referralBy && errors.candidate?.referralBy)}
                        fullWidth
                        helperText={touched.candidate?.referralBy && errors.candidate?.referralBy}
                        label="Referral By"
                        name="candidate.referralBy"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.candidate.referralBy}
                        variant="outlined"
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
              {errors.submit && (
                <Box sx={{ mt: 3 }}>
                  <FormHelperText error>{errors.submit}</FormHelperText>
                </Box>
              )}
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
                <LoadingButton
                  color="primary"
                  loading={isLoading}
                  type="submit"
                  size="large"
                  variant="contained"
                >
                  {values.candidate.candidateId ? 'Save Changes' : 'Create Candidate'}
                </LoadingButton>
              </Box>
            </Grid>
          </Grid>
        </form>
      )}
    </Formik>
  );
};

export default CandidateForm;
