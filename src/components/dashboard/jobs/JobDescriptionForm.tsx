import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Button, Card, CardHeader, CardContent, FormHelperText, Paper, Typography } from '@mui/material';
import QuillEditor from '../../QuillEditor';
import * as Yup from 'yup';
import { Formik } from 'formik';
import useMounted from '../../../hooks/useMounted';
import { RootState } from '../../../store/rootReducer';
import { jobActions } from '../../../store/job/actions';
import { toast } from 'react-toastify';

interface JobDescriptionFormProps {
  onBack?: () => void;
  onComplete?: () => void;
}

const JobDescriptionForm: React.FC<JobDescriptionFormProps> = (props) => {
  const { onBack, onComplete, ...other } = props;

  const mounted = useMounted();
  const dispatch = useDispatch();

  const { isSuccessful, job } = useSelector((state: RootState) => state.job);

  useEffect(() => {
    if (mounted && isSuccessful) {
      onComplete();
      toast.success('The job was saved successfully');
    }
  }, [isSuccessful, mounted, onComplete]);

  return (
    <Formik
      initialValues={{
        description: job.description || '',
        submit: null,
      }}
      validationSchema={Yup.object().shape({
        description: Yup.string().required('Required'),
      })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }): Promise<void> => {
        try {
          dispatch(jobActions.createJobRequest({ ...job, ...values }));
        } catch (err) {
          console.error(err);
          setStatus({ success: false });
          setErrors({ submit: err.message });
          setSubmitting(false);
        }
      }}
    >
      {({ errors, handleSubmit, isSubmitting, setFieldValue, touched, values }): JSX.Element => (
        <form onSubmit={handleSubmit} {...other}>
          <Card sx={{ p: 3 }}>
            <CardHeader
              title={
                <Typography color="textPrimary" variant="h6">
                  Job description
                </Typography>
              }
              subheader={
                <Typography color="textSecondary" variant="body1">
                  Please, fill in the following field with the job description.
                </Typography>
              }
            />
            <CardContent>
              <Paper sx={{ mt: 3 }} variant="outlined">
                <QuillEditor
                  onChange={(value) => setFieldValue('description', value)}
                  placeholder="Write something"
                  sx={{ height: 400 }}
                  value={values.description}
                />
                {/* <MarkdownEditor title="Foo" code={values.description} /> */}
              </Paper>
              {Boolean(touched.description && errors.description) && (
                <Box sx={{ ml: 2 }}>
                  <FormHelperText error>{errors.description}</FormHelperText>
                </Box>
              )}
            </CardContent>
            <Box sx={{ display: 'flex', mx: 2, mt: 3 }}>
              {onBack && (
                <Button color="primary" onClick={onBack} size="large" variant="text">
                  Previous
                </Button>
              )}
              <Box sx={{ flexGrow: 1 }} />
              <Button color="primary" disabled={isSubmitting} type="submit" size="large" variant="contained">
                Complete
              </Button>
            </Box>
          </Card>
        </form>
      )}
    </Formik>
  );
};

export default JobDescriptionForm;
