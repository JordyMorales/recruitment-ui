import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { toast } from 'react-toastify';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  Box,
  Grid,
  TextField,
  Switch,
  Typography,
  Divider,
} from '@mui/material';
import { RootState } from '../../../store/rootReducer';
import { technologyActions } from '../../../store/technology/actions';

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
              ? dispatch(technologyActions.updateTechnologyRequest(values))
              : dispatch(technologyActions.createTechnologyRequest(values));

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
              <Divider />
              <DialogContent>
                <Grid container spacing={3} sx={{ mt: 1 }}>
                  <Grid item lg={12} md={12} sm={12} xs={12}>
                    <TextField
                      autoFocus
                      error={Boolean(touched.name && errors.name)}
                      fullWidth
                      helperText={touched.name && errors.name}
                      label="Name"
                      name="name"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      required
                      value={values.name}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item lg={12} md={12} sm={12} xs={12}>
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
              <Divider />
              <Box sx={{ display: 'flex', mx: 3, mt: 1 }}>
                <Box sx={{ mt: 2 }}>
                  <Button color="primary" variant="text" size="large" onClick={props.handleClose}>
                    Cancel
                  </Button>
                </Box>
                <Box sx={{ flexGrow: 1 }} />
                <Box sx={{ mt: 2 }}>
                  <Button
                    color="primary"
                    disabled={isSubmitting}
                    type="submit"
                    variant="contained"
                    size="large"
                  >
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

export default TechnologyModal;
