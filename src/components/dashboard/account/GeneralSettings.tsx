import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { isEqual } from 'lodash';

import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  Link,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import useMounted from '../../../hooks/useMounted';
import DatePicker from '@mui/lab/DatePicker';
import MuiPhoneNumber from 'material-ui-phone-number';
import { CountryRegionData } from 'react-country-region-selector';
import { toast } from 'react-toastify';
import { getRegionOptions } from '../../../utils';
import { RootState } from '../../../store/rootReducer';
import { userActions } from '../../../store/user/actions';
import ScreenLoader from '../../ScreenLoader';

const GeneralSettings: React.FC = (props) => {
  const mounted = useMounted();

  const dispatch = useDispatch();

  const { isLoading, profile } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (mounted && !profile.userId) {
      dispatch(userActions.getCurrentUserRequest());
    }
  }, [dispatch, mounted, profile]);

  if (isLoading) {
    return <ScreenLoader />;
  }

  return (
    <Grid container spacing={3} {...props}>
      <Grid item xs={12} sm={4} md={3} lg={3} xl={3}>
        <Card>
          <CardContent>
            <Box
              sx={{
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'column',
                textAlign: 'center',
              }}
            >
              <Box
                sx={{
                  p: 1,
                  border: (theme) => `1px dashed ${theme.palette.divider}`,
                  borderRadius: '50%',
                }}
              >
                <Avatar
                  src={profile.photoUrl}
                  sx={{
                    height: 100,
                    width: 100,
                  }}
                />
              </Box>
              <Typography color="textPrimary" sx={{ mt: 1 }} variant="subtitle2">
                {`${profile.firstName} ${profile.lastName}`}
              </Typography>
              <Typography color="textSecondary" variant="body2">
                Role:{' '}
                <Link color="primary" component={RouterLink} to="/dashboard/account">
                  {profile.role}
                </Link>
              </Typography>
            </Box>
          </CardContent>
          <CardActions>
            <Button color="primary" fullWidth variant="text">
              Remove Picture
            </Button>
          </CardActions>
        </Card>
      </Grid>
      <Grid item xs={12} sm={8} md={9} lg={9} xl={9}>
        <Formik
          initialValues={{
            userId: profile.userId || '',
            firstName: profile.firstName || '',
            middleName: profile.middleName || '',
            lastName: profile.lastName || '',
            email: profile.email || '',
            phone: profile.phone || '',
            dateOfBirth: profile.dateOfBirth || new Date(),
            country: profile.country || '',
            city: profile.city || '',
            address: profile.address || '',
            photoUrl: profile.photoUrl || '',
            resumeUrl: profile.resumeUrl || '',
            state: profile.state || 'ACTIVE',
            role: profile.role || 'CANDIDATE',
            submit: null,
          }}
          validationSchema={Yup.object().shape({
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
            state: Yup.string().required(),
          })}
          onSubmit={async (values, { setErrors, setStatus, setSubmitting }): Promise<void> => {
            try {
              await dispatch(userActions.updateCurrentUserRequest(values));
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
            isSubmitting,
            setFieldValue,
            touched,
            values,
          }): JSX.Element => (
            <form onSubmit={handleSubmit}>
              <Card>
                <CardHeader title="Personal Information" />
                <CardContent>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                      <TextField
                        error={Boolean(touched.firstName && errors.firstName)}
                        fullWidth
                        helperText={touched.firstName && errors.firstName}
                        label="First name"
                        name="firstName"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        required
                        value={values.firstName}
                        variant="standard"
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                      <TextField
                        error={Boolean(touched.middleName && errors.middleName)}
                        fullWidth
                        helperText={touched.middleName && errors.middleName}
                        label="Middle Name"
                        name="middleName"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.middleName}
                        variant="standard"
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                      <TextField
                        error={Boolean(touched.lastName && errors.lastName)}
                        fullWidth
                        helperText={touched.lastName && errors.lastName}
                        label="Last Name"
                        name="lastName"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        required
                        value={values.lastName}
                        variant="standard"
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                      <TextField
                        error={Boolean(touched.email && errors.email)}
                        fullWidth
                        helperText={
                          touched.email && errors.email
                            ? errors.email
                            : 'We will use this email to contact you'
                        }
                        label="Email address"
                        name="email"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        required
                        value={values.email}
                        variant="standard"
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                      <MuiPhoneNumber
                        label="Phone"
                        fullWidth
                        defaultCountry={'bo'}
                        value={values.phone}
                        onChange={(newValue) => setFieldValue('phone', newValue)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                      <DatePicker
                        label="Date of Birth"
                        value={values.dateOfBirth}
                        inputFormat="YYYY/MM/DD"
                        onChange={(newValue) => setFieldValue('dateOfBirth', newValue)}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            fullWidth
                            variant="standard"
                            name="dateOfBirth"
                            error={Boolean(touched.dateOfBirth && errors.dateOfBirth)}
                            helperText={touched.dateOfBirth && errors.dateOfBirth}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                      <TextField
                        error={Boolean(touched.address && errors.address)}
                        fullWidth
                        helperText={touched.address && errors.address}
                        label="Address"
                        name="address"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.address}
                        variant="standard"
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                      <TextField
                        error={Boolean(touched.country && errors.country)}
                        fullWidth
                        helperText={touched.country && errors.country}
                        label="Country"
                        name="country"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.country}
                        variant="standard"
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
                    {values.country && (
                      <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                        <TextField
                          error={Boolean(touched.city && errors.city)}
                          fullWidth
                          helperText={touched.city && errors.city}
                          label="City"
                          name="city"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.city}
                          variant="standard"
                          select
                        >
                          {values.country &&
                            getRegionOptions(CountryRegionData, values.country).map((option) => (
                              <MenuItem key={option} value={option}>
                                {option}
                              </MenuItem>
                            ))}
                        </TextField>
                      </Grid>
                    )}
                  </Grid>
                </CardContent>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    p: 2,
                  }}
                >
                  <LoadingButton
                    color="primary"
                    loading={isLoading}
                    loadingPosition="end"
                    disabled={isEqual(profile, values)}
                    type="submit"
                    variant="contained"
                  >
                    Save Changes
                  </LoadingButton>
                </Box>
              </Card>
            </form>
          )}
        </Formik>
      </Grid>
    </Grid>
  );
};

export default GeneralSettings;