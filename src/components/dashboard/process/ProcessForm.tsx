import React, { useEffect } from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Card, CardContent, CardHeader, Divider, FormHelperText, Grid, TextField } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import useMounted from '../../../hooks/useMounted';
import { processActions } from '../../../store/process/actions';
import { RootState } from '../../../store/rootReducer';
import Steps from './Steps';

const ProcessForm: React.FC = (props) => {
  const mounted = useMounted();
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();

  const { isLoading, process } = useSelector((state: RootState) => state.process);

  useEffect(() => {
    if (mounted && params.processId && !process.processId) {
      dispatch(processActions.getProcessByIdRequest({ processId: params.processId }));
    }
  }, [process.processId, dispatch, mounted, params.processId]);

  return (
    <Formik
      initialValues={{
        processId: params.processId ? process.processId : '',
        code: params.processId ? process.code : '',
        name: params.processId ? process.name : '',
        description: params.processId ? process.description : '',
        steps: params.steps ? process.steps : [],
        submit: null,
      }}
      validationSchema={Yup.object().shape({
        code: Yup.string().max(100).required(),
        name: Yup.string().max(100).required(),
        description: Yup.string().max(255),
        steps: Yup.array().min(1),
      })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }): Promise<void> => {
        try {
          const steps = values.steps.map((step, index) => ({ ...step, order: index }));

          params.processId
            ? dispatch(processActions.updateProcessRequest({ ...values, steps }))
            : await dispatch(processActions.createProcessRequest({ ...values, steps }));

          if (!isLoading) {
            //   setStatus({ success: true });
            //   setSubmitting(false);
            navigate('/app/processes');
            toast.success('Success!');
          }
        } catch (err) {
          console.error(err);
          toast.error('Something went wrong!');
          setStatus({ success: false });
          setErrors({ submit: err.message });
          setSubmitting(false);
        }
      }}
    >
      {({ errors, handleBlur, handleChange, handleSubmit, setFieldValue, touched, values }): JSX.Element => (
        <form onSubmit={handleSubmit} {...props}>
          <Grid container spacing={3}>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <Card>
                <CardHeader title="Process Information" />
                <Divider />
                <CardContent>
                  <Grid container spacing={3}>
                    <Grid item lg={8} md={8} sm={8} xs={12}>
                      <TextField
                        autoFocus
                        error={Boolean(touched.name && errors.name)}
                        fullWidth
                        helperText={touched.name && errors.name}
                        name="name"
                        label="Name"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.name}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item lg={4} md={4} sm={4} xs={12}>
                      <TextField
                        error={Boolean(touched.code && errors.code)}
                        fullWidth
                        helperText={touched.code && errors.code}
                        name="code"
                        label="Code"
                        onBlur={handleBlur}
                        value={values.code}
                        onChange={handleChange}
                        variant="outlined"
                        InputProps={{ inputProps: { min: 0, max: 5, step: '0.1' } }}
                      />
                    </Grid>
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                      <TextField
                        error={Boolean(touched.description && errors.description)}
                        fullWidth
                        helperText={touched.description && errors.description}
                        label="Description"
                        name="description"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.description}
                        variant="outlined"
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <Steps steps={values.steps} onChange={(newValue) => setFieldValue('steps', newValue)} />
              {Boolean(touched.steps && errors.steps) && (
                <Box sx={{ ml: 2 }}>
                  <FormHelperText error>{errors.steps}</FormHelperText>
                </Box>
              )}
              {errors.submit && (
                <Box sx={{ mt: 3 }}>
                  <FormHelperText error>{errors.submit}</FormHelperText>
                </Box>
              )}
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
                <LoadingButton color="primary" loading={isLoading} type="submit" variant="contained">
                  {params.processId ? 'Save Changes' : 'Create Process'}
                </LoadingButton>
              </Box>
            </Grid>
          </Grid>
        </form>
      )}
    </Formik>
  );
};

export default ProcessForm;
