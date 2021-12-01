import React, { useState } from 'react';
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
import { SketchPicker } from 'react-color';
import { RootState } from '../../../store/rootReducer';
import { tagActions } from '../../../store/tag/actions';

export interface TagModalProps {
  isOpen: boolean;
  handleClose: any;
  updateForm: boolean;
}

const TagModal: React.FC<TagModalProps> = (props) => {
  const dispatch = useDispatch();
  const { tag } = useSelector((state: RootState) => state.tag);

  const [displayColorPicker, setDisplayColorPicker] = useState(false);

  return (
    <Dialog fullWidth maxWidth="md" open={props.isOpen} onClose={props.handleClose}>
      <Formik
        initialValues={{
          tagId: tag.tagId || '',
          name: tag.name || '',
          color: tag.color || '#FFF',
          isActive: tag.isActive,
          submit: null,
        }}
        validationSchema={Yup.object().shape({
          name: Yup.string().max(100).required(),
          color: Yup.string().max(15).required(),
          isActive: Yup.string().max(100),
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }): Promise<void> => {
          try {
            tag.tagId
              ? dispatch(tagActions.updateTagRequest(values))
              : dispatch(tagActions.createTagRequest(values));

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
            <Box sx={{ p: 3 }}>
              <DialogTitle id="form-dialog-title">Tag</DialogTitle>
              <Divider />
              <DialogContent>
                <Grid container spacing={3} sx={{ mt: 1 }}>
                  <Grid item lg={6} md={6} sm={12} xs={12}>
                    <TextField
                      autoFocus
                      error={Boolean(touched.name && errors.name)}
                      fullWidth
                      helperText={touched.name && errors.name}
                      label="Tag"
                      name="name"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      required
                      value={values.name}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item lg={6} md={6} sm={12} xs={12}>
                    <TextField
                      fullWidth
                      label="Color"
                      name="color"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      required
                      value={values.color}
                      variant="outlined"
                      onClick={() => setDisplayColorPicker(true)}
                      sx={{ input: { color: values.color } }}
                    />
                    {displayColorPicker ? (
                      <div style={{ position: 'fixed', zIndex: '3' }}>
                        <div
                          style={{ position: 'fixed', top: '0px', right: '0px', bottom: '0px', left: '0px' }}
                          onClick={() => setDisplayColorPicker(false)}
                        />
                        <SketchPicker
                          color={values.color}
                          onChange={({ hex }) => setFieldValue('color', hex)}
                        />
                      </div>
                    ) : null}
                  </Grid>
                  <Grid item lg={12} md={12} sm={12} xs={12}>
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
              <Divider />
              <Box sx={{ display: 'flex', mx: 3, mt: 1 }}>
                <Button color="primary" variant="text" size="large" onClick={props.handleClose}>
                  Cancel
                </Button>
                <Box sx={{ flexGrow: 1 }} />
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
          </form>
        )}
      </Formik>
    </Dialog>
  );
};

export default TagModal;
