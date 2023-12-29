import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import axios from 'axios';
import { API_ENDPOINT, HEADER_TOKEN } from '../../../constants/constants';
import { toast } from 'react-toastify';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function SimpleDeleteDialog(props) {
  const {dopen, onQnDeleted, setDopen} = props
  const handleNo = ()=>{
    setDopen(false)
  }
  const handleYes = ()=>{
    onQnDeleted()
  }

  return (
    <div>
      <Dialog
        open={dopen}
        TransitionComponent={Transition}
        keepMounted
        onClose={()=>setDopen(false)}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Please Confirm!"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Are you sure you want to Delete this question?
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