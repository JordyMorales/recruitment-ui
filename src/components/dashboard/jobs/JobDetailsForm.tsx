import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Button,
  Box,
  Card,
  CardHeader,
  CardContent,
  FormHelperText,
  TextField,
  Typography,
  Grid,
  MenuItem,
} from '@mui/material';
import * as Yup from 'yup';
import { Formik } from 'formik';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import useMounted from '../../../hooks/useMounted';
import { technologyActions } from '../../../store/technology/actions';
import { RootState } from '../../../store/rootReducer';
import MultipleSelectChip from '../../MultipleSelectChip';
import { jobStates } from '../../../constants';
import { jobActions } from '../../../store/job/actions';

interface ProcessFormProps {
  onBack?: () => void;
  onNext?: () => void;
}

const JobDetailsForm: React.FC<ProcessFormProps> = (props) => {
  const { onBack, onNext, ...other } = props;

  const mounted = useMounted();
  const dispatch = useDispatch();

  const { job } = useSelector((state: RootState) => state.job);

  const {
    list: { technologies },
  } = useSelector((state: RootState) => state.technology);

  useEffect(() => {
    if (mounted) {
      dispatch(technologyActions.getActiveTechnologiesRequest());
    }
  }, [dispatch, mounted]);

  return (
    <Formik
      initialValues={{
        name: job.name || '',
        technologies: job.technologies || [],
        vacancies: job.vacancies || 1,
        state: job.state || 'DRAFF',
        startDate: job.startDate || new Date(),
        submit: null,
      }}
      validationSchema={Yup.object().shape({
        name: Yup.string().min(3, 'Must be at least 3 characters').max(100).required('Required'),
        technologies: Yup.array().min(1).required('Required'),
        vacancies: Yup.number().required('Required'),
        startDate: Yup.date(),
        state: Yup.string().required('Required'),
      })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }): Promise<void> => {
        try {
          dispatch(jobActions.setJob(values));
          if (onNext) {
            onNext();
          }
        } catch (err) {
          console.error(err);
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
        <form onSubmit={handleSubmit} {...other}>
          <Grid container spacing={3}>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <Card sx={{ p: 3 }}>
                <CardHeader
                  title={
                    <Typography color="textPrimary" variant="h6">
                      Job details
                    </Typography>
                  }
                  subheader={
                    <Typography color="textSecondary" variant="body1">
                      Proin tincidunt lacus sed ante efficitur efficitur. Quisque aliquam fringilla velit sit
                      amet euismod.
                    </Typography>
                  }
                />
                <CardContent>
                  <Grid container spacing={3}>
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                      <TextField
                        autoFocus
                        error={Boolean(touched.name && errors.name)}
                        fullWidth
                        helperText={touched.name && errors.name}
                        label="Job Title"
                        name="name"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.name}
                        variant="outlined"
                        required
                      />
                    </Grid>
                    <Grid item lg={12} xs={12}>
                      <MultipleSelectChip
                        id="technologyId"
                        label="Technologies"
                        defaultValue={values.technologies}
                        error={Boolean(touched.technologies && errors.technologies)}
                        options={technologies}
                        onChange={(value) => setFieldValue('technologies', value)}
                        placeholder="Technologies"
                      />
                      {Boolean(touched.technologies && errors.technologies) && (
                        <Box sx={{ ml: 2 }}>
                          <FormHelperText error>{errors.technologies}</FormHelperText>
                        </Box>
                      )}
                    </Grid>

                    <Grid item lg={6} md={6} sm={6} xs={12}>
                      <TextField
                        error={Boolean(touched.vacancies && errors.vacancies)}
                        fullWidth
                        helperText={touched.vacancies && errors.vacancies}
                        name="vacancies"
                        label="Vacancies"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        type="number"
                        value={values.vacancies}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item lg={6} md={6} sm={6} xs={12}>
                      <MobileDatePicker
                        label="Start Date"
                        value={values.startDate}
                        onChange={(newValue) => setFieldValue('startDate', newValue)}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            fullWidth
                            variant="outlined"
                            name="startDate"
                            error={Boolean(touched.startDate && errors.startDate)}
                            helperText={touched.startDate && errors.startDate}
                          />
                        )}
                      />
                    </Grid>

                    <Grid item lg={12} md={12} sm={12} xs={12}>
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
                        required
                      >
                        {jobStates.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>
                  </Grid>
                </CardContent>
                <Box sx={{ mt: 2 }}>
                  {Boolean(touched.startDate && errors.startDate) && (
                    <Box sx={{ mt: 2 }}>
                      <FormHelperText error>{errors.startDate}</FormHelperText>
                    </Box>
                  )}
                </Box>
                <Box sx={{ display: 'flex', mx: 2, mt: 3 }}>
                  {onBack && (
                    <Button color="primary" onClick={onBack} size="large" variant="text">
                      Previous
                    </Button>
                  )}
                  <Box sx={{ flexGrow: 1 }} />
                  <Button
                    color="primary"
                    disabled={isSubmitting}
                    type="submit"
                    size="large"
                    variant="contained"
                  >
                    Next
                  </Button>
                </Box>
              </Card>
            </Grid>
          </Grid>
        </form>
      )}
    </Formik>
  );
};

export default JobDetailsForm;
