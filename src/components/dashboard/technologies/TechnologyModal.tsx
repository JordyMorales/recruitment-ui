import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { toast } from 'react-toastify';
import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Button,
  Box,
  Grid,
  TextField,
  Switch,
} from '@mui/material';
import { RootState } from '../../../store/rootReducer';
import { technologyActions } from '../../../store/technology/actions';
import { Typography } from '@material-ui/core';

export interface TechnologyModalProps {
  isOpen: boolean;
  handleClose: any;
  updateForm: boolean;
}

const TechnologyModal: React.FC<TechnologyModalProps> = (props) => {
  const dispatch = useDispatch();
  const { technology } = useSelector((state: RootState) => state.technology);

  return (
    <Dialog fullWidth maxWidth="md" open={props.isOpen} onClose={props.handleClose}>
      <Formik
        initialValues={{
          technologyId: technology.technologyId || '',
          name: technology.name || '',
          isActive: technology.isActive,
          submit: null,
        }}
        validationSchema={Yup.object().shape({
          name: Yup.string().max(100).required(),
          isActive: Yup.string().max(100),
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }): Promise<void> => {
          try {
            technology.technologyId
              ? dispatch(technologyActions.updateTechnologyRequest({ ...values }))
              : dispatch(technologyActions.createTechnologyRequest({ ...values }));

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
              <DialogTitle id="form-dialog-title">Technology</DialogTitle>
              <DialogContent>
                <Grid container spacing={3}>
                  <Grid item md={6} xs={12}>
                    <TextField
                      error={Boolean(touched.name && errors.name)}
                      fullWidth
                      helperText={touched.name && errors.name}
                      label="First name"
                      name="name"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      required
                      value={values.name}
                      variant="standard"
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <Typography variant="body2">Enable or Disable by toggling this.</Typography>
                    <Switch
                      color="primary"
                      edge="start"
                      name="isActive"
                      checked={values.isActive}
                      onChange={handleChange}
                    />
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

export default TechnologyModal;
