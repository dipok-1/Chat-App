
    import Dialog from '@mui/material/Dialog';
    import DialogTitle from '@mui/material/DialogTitle';
    import DialogContent from '@mui/material/DialogContent';
    import DialogActions from '@mui/material/DialogActions';
    import Button from '@mui/material/Button';
    import { useState } from 'react';

function CreateRoom(){
const [open, setopen] = useState(false)

function dialogopen(){
    setopen(true)
}
function handleClose(){
    setopen(false)
}

    return(
        <>
        <button className='rounded border p-4 font-mono hover:bg-gray-50' onClick={dialogopen}>Create Room</button>
           <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Create Room</DialogTitle>
            <DialogContent className='flex flex-col items-center justify-center gap-10 font-mono'>
              <input type="text" placeholder='Enter Room Name...' className='border px-2 py-2 rounded'/>
              <input type="text" placeholder='Enter Room Id..' className='border px-2 py-2' />
              
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={handleClose}>Confirm</Button>
            </DialogActions>
          </Dialog>
          </>
    )
}
export default CreateRoom