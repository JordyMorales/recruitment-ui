import React from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  Box,
  Grid,
  TextField,
} from '@mui/material';

export interface StepModalProps {
  isOpen: boolean;
  handleClose: any;
  values: any;
  onSave: (data: any) => void;
}

const StepModal: React.FC<StepModalProps> = (props) => {
  const { isOpen, handleClose, values, onSave, ...other } = props;

  return (
    <Dialog fullWidth maxWidth="md" open={isOpen} onClose={handleClose} {...other}>
      <Formik
        initialValues={{
          stepId: values.stepId || uuidv4(),
          name: values.name || '',
          description: values.description || '',
          submit: null,
        }}
        validationSchema={Yup.object().shape({
          name: Yup.string().max(100).required(),
          description: Yup.string().max(100),
        })}
        onSubmit={async (values): Promise<void> => {
          try {
            onSave(values);
            handleClose();
          } catch (error) {
            console.error(error);
            toast.error('Something went wrong!');
          }
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }): JSX.Element => (
          <form onSubmit={handleSubmit}>
            <Box sx={{ p: 3 }}>
              <DialogTitle id="form-dialog-title">Step</DialogTitle>
              <DialogContent>
                <Grid container spacing={3} sx={{ mt: 1 }}>
                  <Grid item md={12} xs={12}>
                    <TextField
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
                  <Grid item md={12} xs={12}>
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
              </DialogContent>
              <Box sx={{ display: 'flex', mx: 3, mt: 1 }}>
                <Box sx={{ mt: 2 }}>
                  <Button color="primary" variant="text" size="large" onClick={handleClose}>
                    Cancel
                  </Button>
                </Box>
                <Box sx={{ flexGrow: 1 }} />
                <Box sx={{ mt: 2 }}>
                  <Button color="primary" type="submit" size="large" variant="contained">
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

export default StepModal;
