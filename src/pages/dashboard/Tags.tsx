import React, { useCallback, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useSelector, useDispatch } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Breadcrumbs, Button, Container, Grid, Link, Typography } from '@mui/material';
import { RootState } from '../../store/rootReducer';
import { tagActions } from '../../store/tag/actions';
import { TagListTable, TagModal } from '../../components/dashboard/tags';

import useMounted from '../../hooks/useMounted';
import useSettings from '../../hooks/useSettings';
import ChevronRightIcon from '../../icons/ChevronRight';
import PlusIcon from '../../icons/Plus';

const TagList: React.FC = () => {
  const dispatch = useDispatch();

  const mounted = useMounted();
  const { settings } = useSettings();

  const {
    isOpen,
    shouldClose,
    list: { tags, isLoading },
  } = useSelector((state: RootState) => state.tag);

  useEffect(() => {
    if (mounted) {
      dispatch(tagActions.getAllTagsRequest());
    }
  }, [dispatch, mounted]);

  const handleClose = useCallback(() => {
    dispatch(tagActions.hiModal());
  }, [dispatch]);

  useEffect(() => {
    if (shouldClose) {
      handleClose();
    }
  }, [handleClose, shouldClose]);

  return (
    <>
      <Helmet>
        <title>Dashboard: Tag List</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 8,
        }}
      >
        <Container maxWidth={settings.compact ? 'xl' : false}>
          <Grid container justifyContent="space-between" spacing={3}>
            <Grid item>
              <Typography color="textPrimary" variant="h5">
                Tags
              </Typography>
            </Grid>
            <Grid item>
              <Box sx={{ m: -1 }}>
                <Button
                  color="primary"
                  startIcon={<PlusIcon />}
                  sx={{ m: 1 }}
                  onClick={() => dispatch(tagActions.showModal())}
                  variant="contained"
                >
                  New Tag
                </Button>
              </Box>
            </Grid>
          </Grid>
          <Box>
            <Breadcrumbs
              aria-label="breadcrumb"
              separator={<ChevronRightIcon fontSize="small" />}
              sx={{ mt: 1 }}
            >
              <Link color="textPrimary" component={RouterLink} to="/app" variant="subtitle2">
                App
              </Link>
              <Link color="textPrimary" component={RouterLink} to="/app" variant="subtitle2">
                Settings
              </Link>
              <Typography color="textSecondary" variant="subtitle2">
                Tags
              </Typography>
            </Breadcrumbs>
          </Box>
          <Box sx={{ mt: 3 }}>
            <TagListTable tags={tags} isLoading={isLoading}/>
          </Box>
        </Container>
      </Box>
      <TagModal isOpen={isOpen} handleClose={handleClose} updateForm={false} />
    </>
  );
};

export default TagList;
