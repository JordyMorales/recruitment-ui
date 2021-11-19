import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { toast } from 'react-toastify';
import { CountryRegionData } from 'react-country-region-selector';
import { DatePicker } from '@mui/lab';
import {
  Dialog,
  DialogTitle,
  DialogActions,
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

  const [data, setData] = useState({
    phone: user.phone || '',
    dateOfBirth: user.dateOfBirth || new Date(),
  });

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
              ? dispatch(userActions.updateUserRequest({ ...values, ...data }))
              : dispatch(userActions.createUserRequest({ ...values, ...data }));

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
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }): JSX.Element => (
          <form onSubmit={handleSubmit}>
            <Box sx={{ p: 3 }}>
              <DialogTitle id="form-dialog-title">User</DialogTitle>
              <DialogContent>
                <Grid container spacing={3}>
                  <Grid item md={6} xs={12}>
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
                  <Grid item md={6} xs={12}>
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
                  <Grid item md={6} xs={12}>
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
                  <Grid item md={6} xs={12}>
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
                      variant="standard"
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <MuiPhoneNumber
                      label="Phone"
                      fullWidth
                      defaultCountry={'bo'}
                      value={data.phone}
                      onChange={(newValue) => {
                        setData({ ...data, phone: newValue });
                      }}
                      // renderInput={(params) => <TextField {...params} variant="standard" fullWidth />}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <DatePicker
                      label="Date of Birth"
                      value={data.dateOfBirth}
                      onChange={(newValue) => {
                        setData({ ...data, dateOfBirth: newValue });
                      }}
                      renderInput={(params) => <TextField {...params} variant="standard" fullWidth />}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
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
                  <Grid item md={6} xs={12}>
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
                        getRegionOptions(values.country).map((option) => (
                          <MenuItem key={option} value={option}>
                            {option}
                          </MenuItem>
                        ))}
                    </TextField>
                  </Grid>
                  <Grid item md={6} xs={12}>
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

                  <Grid item md={6} xs={12}>
                    <TextField
                      error={Boolean(touched.role && errors.role)}
                      fullWidth
                      helperText={touched.role && errors.role}
                      label="Role"
                      name="role"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.role}
                      variant="standard"
                      select
                    >
                      {roles.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>

                  <Grid item md={6} xs={12}>
                    <TextField
                      error={Boolean(touched.state && errors.state)}
                      fullWidth
                      helperText={touched.state && errors.state}
                      label="State"
                      name="state"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.state}
                      variant="standard"
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
              <DialogActions>
                <Box sx={{ mt: 2 }}>
                  <Button color="secondary" variant="contained" onClick={props.handleClose}>
                    Cancel
                  </Button>
                </Box>
                <Box sx={{ mt: 2 }}>
                  <Button color="primary" disabled={isSubmitting} type="submit" variant="contained">
                    Save
                  </Button>
                </Box>
              </DialogActions>
            </Box>
          </form>
        )}
      </Formik>
    </Dialog>
  );
};

export default UserModal;
