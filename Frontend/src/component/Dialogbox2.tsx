
    import Dialog from '@mui/material/Dialog';
    import DialogTitle from '@mui/material/DialogTitle';
    import DialogContent from '@mui/material/DialogContent';
    import DialogActions from '@mui/material/DialogActions';
    import Button from '@mui/material/Button';
    import { useState } from 'react';


    interface JoinRoomProps {
  socket: WebSocket | null;
}


function JoinChat({socket}:JoinRoomProps){
    const [open,setopen] = useState(false);
    const [roomid,setroomid] = useState("")
    
    function opendialog(){
          setopen(true)
    }
    function closedialog(){  
          setopen(false)
    }
    function joinRoom(){
       if(socket && socket.readyState === WebSocket.OPEN){
        socket.send(JSON.stringify({
            type:"join",
            payload:{roomid}
        }))
       }else{
        console.warn('WebSocket is not open. Cannot send message.');
       }
       setopen(false)
    }
    

   return(
    <>
    <button className='rounded border p-4 font-mono hover:bg-gray-50' onClick={opendialog}>Join</button>
    <Dialog open={open}>
        <DialogTitle>Join Room</DialogTitle>
        <DialogContent>
            <input type="text" placeholder='Enter Room Id..' className='border rounded px-2 py-2 font-mono' value={roomid} onChange={(e)=>setroomid(e.target.value)} />
        </DialogContent>
        <DialogActions>
            <Button onClick={closedialog}>Cancel</Button>
            <Button onClick={joinRoom}>Confirm</Button>
        </DialogActions>
    </Dialog>
    </>
   )
}

export default JoinChat