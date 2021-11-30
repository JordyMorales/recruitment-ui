import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { Box, Card, CardContent, CardHeader, Divider, FormHelperText, Grid, TextField } from '@mui/material';
import { toast } from 'react-toastify';
import useMounted from '../../../hooks/useMounted';
import LoadingButton from '@mui/lab/LoadingButton';
import MultipleSelectChip from '../../MultipleSelectChip';
import MultiplePhones from '../../MultiplePhones';
import MultipleEmails from '../../MultipleEmails';
import ScreenLoader from '../../ScreenLoader';

import { RootState } from '../../../store/rootReducer';
import { userActions } from '../../../store/user/actions';
import { candidateActions } from '../../../store/candidate/actions';
import { technologyActions } from '../../../store/technology/actions';

const ProfessionalInformation: React.FC = (props) => {
  const mounted = useMounted();

  const dispatch = useDispatch();

  const { profile } = useSelector((state: RootState) => state.user);
  const { isLoading, account } = useSelector((state: RootState) => state.candidate);

  const {
    list: { technologies },
  } = useSelector((state: RootState) => state.technology);

  useEffect(() => {
    if (mounted && !profile.userId) {
      dispatch(userActions.getCurrentUserRequest());
    }
  }, [dispatch, mounted, profile]);

  useEffect(() => {
    if (mounted && profile.userId) {
      dispatch(candidateActions.getCandidateProfileRequest({ candidateId: profile.userId }));
    }
  }, [dispatch, mounted, profile]);

  useEffect(() => {
    if (mounted) {
      dispatch(technologyActions.getActiveTechnologiesRequest());
    }
  }, [dispatch, mounted]);

  if (isLoading) {
    return <ScreenLoader />;
  }

  return (
    <Grid container spacing={3} {...props}>
      <Grid item lg={12} md={12} xl={12} xs={12}>
        <Formik
          enableReinitialize
          initialValues={{
            candidateId: account.candidateId || '',
            englishLevel: account.englishLevel || null,
            engineeringLevel: account.engineeringLevel || null,
            salaryPretension: account.salaryPretension || '',
            contractPreference: account.contractPreference || '',
            jobTitle: account.jobTitle || '',
            company: account.company || '',
            seniority: account.seniority || '',
            availability: account.availability || '',
            tags: account.tags || [],
            links: account.links || [],
            phones: account.phones || [],
            emails: account.emails || [],
            technologies: account.technologies || [],
            referralBy: account.referralBy || '',
            createdBy: account.createdBy || '',
            updatedBy: account.updatedBy || '',
            createdAt: account.createdAt || null,
            updatedAt: account.updatedAt || new Date(),
            submit: null,
          }}
          validationSchema={Yup.object().shape({
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
          })}
          onSubmit={async (values, { setErrors, setStatus, setSubmitting }): Promise<void> => {
            try {
              values.candidateId
                ? dispatch(candidateActions.updateCandidateProfileRequest(values))
                : dispatch(candidateActions.createCandidateRequest({ ...values, userId: profile.userId }));

              setStatus({ success: true });
              setSubmitting(false);
              toast.success('Profile updated!');
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
            setFieldValue,
            touched,
            values,
          }): JSX.Element => (
            <form onSubmit={handleSubmit}>
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <Card>
                  <CardHeader title="Professional Information" />
                  <Divider />
                  <CardContent>
                    <Grid container spacing={3}>
                      <Grid item md={12} xs={12}>
                        <MultipleSelectChip
                          id="technologyId"
                          label="Technologies"
                          defaultValue={values.technologies}
                          options={technologies}
                          onChange={(value) => setFieldValue('technologies', value)}
                          placeholder="Technologies"
                        />
                      </Grid>
                      <Grid item lg={6} md={6} sm={6} xs={12}>
                        <TextField
                          error={Boolean(touched.company && errors.company)}
                          fullWidth
                          helperText={touched.company && errors.company}
                          label="Company"
                          name="company"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.company}
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item lg={6} md={6} sm={6} xs={12}>
                        <TextField
                          error={Boolean(touched.jobTitle && errors.jobTitle)}
                          fullWidth
                          helperText={touched.jobTitle && errors.jobTitle}
                          label="Job Title"
                          name="jobTitle"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.jobTitle}
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item lg={6} md={6} sm={6} xs={12}>
                        <TextField
                          error={Boolean(touched.seniority && errors.seniority)}
                          fullWidth
                          helperText={touched.seniority && errors.seniority}
                          label="Seniority"
                          name="seniority"
                          placeholder="Ej: Junior, Mid, Senior"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.seniority}
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item lg={6} md={6} sm={6} xs={12}>
                        <TextField
                          error={Boolean(touched.contractPreference && errors.contractPreference)}
                          fullWidth
                          helperText={touched.contractPreference && errors.contractPreference}
                          name="contractPreference"
                          label="Contract Preference"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.contractPreference}
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item lg={6} md={6} sm={6} xs={12}>
                        <TextField
                          error={Boolean(touched.availability && errors.availability)}
                          fullWidth
                          helperText={touched.availability && errors.availability}
                          name="availability"
                          label="Availability"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.availability}
                          variant="outlined"
                        />
                      </Grid>

                      <Grid item lg={6} md={6} sm={6} xs={12}>
                        <TextField
                          error={Boolean(touched.salaryPretension && errors.salaryPretension)}
                          fullWidth
                          helperText={touched.salaryPretension && errors.salaryPretension}
                          name="salaryPretension"
                          label="Salary Pretension"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          type="number"
                          value={values.salaryPretension}
                          variant="outlined"
                        />
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>

                <Grid container spacing={3}>
                  <Grid item lg={6} md={6} sm={12} xs={12}>
                    <Card sx={{ mt: 3 }}>
                      <CardHeader title="Extra Emails" />
                      <CardContent>
                        <Grid item lg={12} xs={12}>
                          <MultipleEmails
                            onChange={(value) => setFieldValue('emails', value)}
                            values={values.emails}
                          />
                        </Grid>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item lg={6} md={6} sm={12} xs={12}>
                    <Card sx={{ mt: 3 }}>
                      <CardHeader title="Extra Phones" />
                      <CardContent>
                        <Grid item lg={12} xs={12}>
                          <MultiplePhones
                            onChange={(value) => setFieldValue('phones', value)}
                            values={values.phones}
                          />
                        </Grid>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>

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
                    Save Changes
                  </LoadingButton>
                </Box>
              </Grid>
            </form>
          )}
        </Formik>
      </Grid>
    </Grid>
  );
};

export default ProfessionalInformation;
