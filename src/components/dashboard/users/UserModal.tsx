import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';
import { CountryRegionData } from 'react-country-region-selector';
import { DatePicker } from '@mui/lab';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  Box,
  Grid,
  TextField,
  MenuItem,
} from '@mui/material';
import MuiPhoneNumber from 'material-ui-phone-number';
import { RootState } from '../../../store/rootReducer';
import { userActions } from '../../../store/user/actions';
import { roles, states } from '../../../constants';

export interface UserModalProps {
  isOpen: boolean;
  handleClose: any;
  updateForm: boolean;
}

const UserModal: React.FC<UserModalProps> = (props) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.user);

  const getRegionOptions = (country) => {
    const index = CountryRegionData.findIndex((region) => region[0] === country);
    return CountryRegionData[index][2].split('|').map((region) => region.substring(0, region.indexOf('~')));
  };

  return (
    <Dialog fullWidth maxWidth="md" open={props.isOpen} onClose={props.handleClose}>
      <Formik
        initialValues={{
          userId: user.userId || '',
          firstName: user.firstName || '',
          middleName: user.middleName || '',
          lastName: user.lastName || '',
          email: user.email || '',
          phone: user.phone || '',
          dateOfBirth: user.dateOfBirth || '',
          country: user.country || '',
          city: user.city || '',
          address: user.address || '',
          photoUrl: user.photoUrl || '',
          resumeUrl: user.resumeUrl || '',
          jobTitle: user.jobTitle || '',
          role: user.role || 'CANDIDATE',
          state: user.state || 'INACTIVE',
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
          jobTitle: Yup.string().max(150),
          role: Yup.string().required(),
          state: Yup.string().required(),
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }): Promise<void> => {
          try {
            user.userId
              ? dispatch(userActions.updateUserRequest(values))
              : dispatch(userActions.createUserRequest({ ...values, userId: uuidv4() }));

            setStatus({ success: true });
            setSubmitting(false);
          } catch (error) {
            console.error(error);
            toast.error('Something went wrong!');
            setStatus({ success: false });
            setErrors({ submit: error.message });
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
            <Box sx={{ p: 3 }}>
              <DialogTitle id="form-dialog-title">User</DialogTitle>
              <DialogContent>
                <Grid container spacing={3} sx={{ mt: 1 }}>
                    <Grid item lg={7} md={7} sm={7} xs={12}>
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
                      variant="outlined"
                    />
                  </Grid>
                    <Grid item lg={5} md={5} sm={5} xs={12}>
                    <TextField
                      error={Boolean(touched.middleName && errors.middleName)}
                      fullWidth
                      helperText={touched.middleName && errors.middleName}
                      label="Middle Name"
                      name="middleName"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.middleName}
                      variant="outlined"
                    />
                  </Grid>
                    <Grid item lg={12} md={12} sm={12} xs={12}>
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
                      variant="outlined"
                    />
                  </Grid>
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                    <TextField
                      error={Boolean(touched.email && errors.email)}
                      fullWidth
                      helperText={touched.email && errors.email}
                      label="Email address"
                      name="email"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      required
                      value={values.email}
                      variant="outlined"
                    />
                  </Grid>
                    <Grid item lg={7} md={7} sm={7} xs={12}>
                    <MuiPhoneNumber
                      label="Phone"
                      fullWidth
                      variant="outlined"
                      defaultCountry={'bo'}
                      value={values.phone}
                      onChange={(newValue) => setFieldValue('phone', newValue)}
                    />
                  </Grid>
                    <Grid item lg={5} md={5} sm={5} xs={12}>
                    <DatePicker
                      label="Date of Birth"
                      value={values.dateOfBirth}
                      inputFormat="YYYY/MM/DD"
                      onChange={(newValue) => setFieldValue('dateOfBirth', newValue)}
                      renderInput={(params) => <TextField {...params} variant="outlined" fullWidth />}
                    />
                  </Grid>
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                    <TextField
                      error={Boolean(touched.country && errors.country)}
                      fullWidth
                      helperText={touched.country && errors.country}
                      label="Country"
                      name="country"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.country}
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
                      <Grid item lg={12} md={12} sm={12} xs={12}>
                    <TextField
                      error={Boolean(touched.city && errors.city)}
                      fullWidth
                      helperText={touched.city && errors.city}
                      label="City"
                      name="city"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.city}
                      variant="outlined"
                      select
                    >
                      {values.country &&
                        getRegionOptions(values.country).map((option) => (
                          <MenuItem key={option} value={option}>
                            {option}
                          </MenuItem>
                        ))}
                    </TextField>
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
                      variant="outlined"
                    />
                  </Grid>

                  <Grid item lg={6} md={6} sm={6} xs={12}>
                    <TextField
                      error={Boolean(touched.role && errors.role)}
                      fullWidth
                      helperText={touched.role && errors.role}
                      label="Role"
                      name="role"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.role}
                      variant="outlined"
                      select
                    >
                      {roles.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>

                  <Grid item lg={6} md={6} sm={6} xs={12}>
                    <TextField
                      error={Boolean(touched.state && errors.state)}
                      fullWidth
                      helperText={touched.state && errors.state}
                      label="State"
                      name="state"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.state}
                      variant="outlined"
                      select
                    >
                      {states.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                </Grid>
              </DialogContent>
              <Box sx={{ display: 'flex', mx: 3, mt: 1 }}>
                <Box sx={{ mt: 2 }}>
                  <Button color="primary" variant="text" size="large" onClick={props.handleClose}>
                    Cancel
                  </Button>
                </Box>
                <Box sx={{ flexGrow: 1 }} />
                <Box sx={{ mt: 2 }}>
                  <Button color="primary" disabled={isSubmitting} type="submit" variant="contained" size="large">
                    Save
                  </Button>
                </Box>
              </Box>
            </Box>
          </form>
        )}
      </Formik>
    </Dialog>
  );
};

export default UserModal;
