import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@material-ui/core';

const ConfirmDialog = memo(function ConfirmDialog({
  closeConfirm,
  options: {
    actions = <Button onClick={closeConfirm}>Ok</Button>,
    open,
    title,
    content,
    disableBackdropClick = false
  },
}) {
  return (
    <Dialog
      open={open}
      onClose={closeConfirm}
      maxWidth="xs"
      disableBackdropClick={disableBackdropClick}
    >
      {title && <DialogTitle>{title}</DialogTitle>}
      {content && <DialogContent>{content}</DialogContent>}
      {actions && <DialogActions>{actions}</DialogActions>}
    </Dialog>
  );
});

ConfirmDialog.propTypes = {
  closeConfirm: PropTypes.func,
  options: PropTypes.object,
};

export default ConfirmDialog;
