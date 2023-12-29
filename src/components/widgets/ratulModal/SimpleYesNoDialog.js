import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function SimpleYesNoDialog({show, message, onNoResponse, onYesResponse, setShow}) {
  const handleNo = ()=>{
    onNoResponse()
  }
  const handleYes = ()=>{
    onYesResponse()
  }

  return (
    <div>
      <Dialog
        open={show}
        TransitionComponent={Transition}
        keepMounted
        onClose={()=>setShow(false)}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>Please Confirm!</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
           {message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleNo}>No</Button>
          <Button onClick={handleYes}>Yes</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}