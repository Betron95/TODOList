import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';


function RemoveDialog({closeDialog, removeHandler}: { closeDialog: any, removeHandler: any}) {

  const handleClose = () => {
    closeDialog();
  };

  return (
      <Dialog
        open={true}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{"Are you sure you want to delete this?"}</DialogTitle>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            No
          </Button>
          <Button onClick={removeHandler} color="primary">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
  );
}

export default RemoveDialog;