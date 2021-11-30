import React from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { toast } from 'react-toastify';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  FormHelperText,
  Grid,
  TextField,
} from '@mui/material';
import useAuth from '../../../hooks/useAuth';

const SecuritySettings: React.FC = (props) => {
  const { updatePassword } = useAuth();
  return (
    <Formik
      initialValues={{
        password: '',
        passwordConfirm: '',
        submit: null,
      }}
      validationSchema={Yup.object().shape({
        password: Yup.string()
          .required('Please Enter your password')
          .matches(
            /^(?=.{6,}$)(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[\u0021-\u002b\u003c-\u0040])/,
            'Must Contain 6 Characters, One Uppercase, One Lowercase, One Number and one special case Character',
          ),
        passwordConfirm: Yup.string()
          .oneOf([Yup.ref('password'), null], 'Passwords must match')
          .required('Required'),
      })}
      onSubmit={async (values, { resetForm, setErrors, setStatus, setSubmitting }): Promise<void> => {
        try {
          const response = await updatePassword(values.password);
          if (response) {
            resetForm();
            setStatus({ success: true });
            setSubmitting(false);
            toast.success('Password updated!');
          }
        } catch (error) {
          toast.error(error.message);
          setStatus({ success: false });
          setErrors({ submit: 'Could not change password' });
          setSubmitting(false);
        }
      }}
    >
      {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }): JSX.Element => (
        <form onSubmit={handleSubmit} {...props}>
          <Card>
            <CardHeader title="Change Password" />
            <Divider />
            <CardContent>
              <Grid container spacing={3}>
                <Grid item md={4} sm={6} xs={12}>
                  <TextField
                    error={Boolean(touched.password && errors.password)}
                    fullWidth
                    helperText={touched.password && errors.password}
                    label="Password"
                    name="password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="password"
                    value={values.password}
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={4} sm={6} xs={12}>
                  <TextField
                    error={Boolean(touched.passwordConfirm && errors.passwordConfirm)}
                    fullWidth
                    helperText={touched.passwordConfirm && errors.passwordConfirm}
                    label="Password Confirmation"
                    name="passwordConfirm"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="password"
                    value={values.passwordConfirm}
                    variant="outlined"
                  />
                </Grid>
              </Grid>
              {errors.submit && (
                <Box sx={{ mt: 3 }}>
                  <FormHelperText error>{errors.submit}</FormHelperText>
                </Box>
              )}
            </CardContent>
            <Divider />
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                p: 2,
              }}
            >
              <Button color="primary" disabled={isSubmitting} type="submit" variant="contained">
                Change Password
              </Button>
            </Box>
          </Card>
        </form>
      )}
    </Formik>
  );
};

export default SecuritySettings;
