import React from 'react';
import * as Yup from 'yup';
import { Avatar, Divider, Card, Grid, Paper, TextField, CardContent, Box } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Formik } from 'formik';
import { toast } from 'react-toastify';

const CandidateComments: React.FC = () => {
  const imgLink = 'https://ui-avatars.com/api/?background=random';
  return (
    <div className="App">
      <Formik
        initialValues={{
          userId: '',
          comment: '',
          submit: null,
        }}
        validationSchema={Yup.object().shape({
          comment: Yup.string().max(100).required(),
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }): Promise<void> => {
          try {
            // await dispatch(userActions.updateCurrentUserRequest(values));
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
              <CardContent>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                  <TextField
                    error={Boolean(touched.comment && errors.comment)}
                    fullWidth
                    multiline
                    maxRows={4}
                    helperText={touched.comment && errors.comment}
                    label="Comment"
                    name="comment"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    required
                    value={values.comment}
                    variant="outlined"
                  />
                </Grid>
              </CardContent>
            </Card>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  p: 2,
                }}
              >
                <LoadingButton
                  color="primary"
                  loading={isSubmitting}
                  loadingPosition="end"
                  type="submit"
                  size="large"
                  variant="contained"
                >
                  Add Comment
                </LoadingButton>
              </Box>
          </form>
        )}
      </Formik>
      <h1>Comments</h1>
      <Paper style={{ padding: '40px 20px' }}>
        <Grid container wrap="nowrap" spacing={2}>
          <Grid item>
            <Avatar alt="Remy Sharp" src={imgLink} />
          </Grid>
          <Grid justifyContent="left" item xs zeroMinWidth>
            <h4 style={{ margin: 0, textAlign: 'left' }}>Michel Michel</h4>
            <p style={{ textAlign: 'left' }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean luctus ut est sed faucibus. Duis
              bibendum ac ex vehicula laoreet. Suspendisse congue vulputate lobortis. Pellentesque at interdum
              tortor. Quisque arcu quam, malesuada vel mauris et, posuere sagittis ipsum. Aliquam ultricies a
              ligula nec faucibus. In elit metus, efficitur lobortis nisi quis, molestie porttitor metus.
              Pellentesque et neque risus. Aliquam vulputate, mauris vitae tincidunt interdum, mauris mi
              vehicula urna, nec feugiat quam lectus vitae ex.{' '}
            </p>
            <p style={{ textAlign: 'left', color: 'gray' }}>posted 1 minute ago</p>
          </Grid>
        </Grid>
        <Divider variant="fullWidth" style={{ margin: '30px 0' }} />
        <Grid container wrap="nowrap" spacing={2}>
          <Grid item>
            <Avatar alt="Remy Sharp" src={imgLink} />
          </Grid>
          <Grid justifyContent="left" item xs zeroMinWidth>
            <h4 style={{ margin: 0, textAlign: 'left' }}>Michel Michel</h4>
            <p style={{ textAlign: 'left' }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean luctus ut est sed faucibus. Duis
              bibendum ac ex vehicula laoreet. Suspendisse congue vulputate lobortis. Pellentesque at interdum
              tortor. Quisque arcu quam, malesuada vel mauris et, posuere sagittis ipsum. Aliquam ultricies a
              ligula nec faucibus. In elit metus, efficitur lobortis nisi quis, molestie porttitor metus.
              Pellentesque et neque risus. Aliquam vulputate, mauris vitae tincidunt interdum, mauris mi
              vehicula urna, nec feugiat quam lectus vitae ex.{' '}
            </p>
            <p style={{ textAlign: 'left', color: 'gray' }}>posted 1 minute ago</p>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default CandidateComments;
