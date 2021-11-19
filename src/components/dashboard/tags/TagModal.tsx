import React, { useState } from 'react';
import { styled } from '@mui/system';
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
import { CompactPicker, ChromePicker } from 'react-color';
import { RootState } from '../../../store/rootReducer';
import { tagActions } from '../../../store/tag/actions';
import { Typography } from '@material-ui/core';

export interface TagModalProps {
  isOpen: boolean;
  handleClose: any;
  updateForm: boolean;
}

const TagModal: React.FC<TagModalProps> = (props) => {
  const dispatch = useDispatch();
  const { tag } = useSelector((state: RootState) => state.tag);

  const [color, setColor] = useState(tag.color || '#FFF');
  const [displayColorPicker, setDisplayColorPicker] = useState(false);

  return (
    <Dialog fullWidth maxWidth="md" open={props.isOpen} onClose={props.handleClose}>
      <Formik
        initialValues={{
          tagId: tag.tagId || '',
          name: tag.name || '',
          isActive: tag.isActive,
          submit: null,
        }}
        validationSchema={Yup.object().shape({
          name: Yup.string().max(100).required(),
          isActive: Yup.string().max(100),
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }): Promise<void> => {
          try {
            tag.tagId
              ? dispatch(tagActions.updateTagRequest({ ...values, color }))
              : dispatch(tagActions.createTagRequest({ ...values, color }));

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
              <DialogTitle id="form-dialog-title">Tag</DialogTitle>
              <DialogContent>
                <Grid container spacing={3}>
                  <Grid item md={6} xs={12}>
                    <TextField
                      error={Boolean(touched.name && errors.name)}
                      fullWidth
                      helperText={touched.name && errors.name}
                      label="Tag"
                      name="name"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      required
                      value={values.name}
                      variant="standard"
                      InputProps={{
                        className: '#4BBE86',
                      }}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      fullWidth
                      label="Color"
                      name="color"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      required
                      value={color}
                      InputProps={{
                        classes: {
                          input: color,
                        },
                      }}
                      variant="standard"
                      onClick={() => setDisplayColorPicker(true)}
                    />
                    {displayColorPicker ? (
                      <div style={{ position: 'absolute', zIndex: '4' }}>
                        <div
                          style={{ position: 'fixed', top: '0px', right: '0px', bottom: '0px', left: '0px' }}
                        />
                        <CompactPicker
                          onChange={({ hex }: any) => {
                            setColor(hex);
                            setDisplayColorPicker(false);
                          }}
                        />
                      </div>
                    ) : null}
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <Typography variant="body2">Enable or Disable by toggling this.</Typography>
                    <Switch
                      checked={values.isActive}
                      color="primary"
                      edge="start"
                      name="isActive"
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

export default TagModal;
