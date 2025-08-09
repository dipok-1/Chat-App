
import './App.css'
import CreateRoom from "./component/Dialogbox"
import JoinChat from './component/Dialogbox2'
import { useState,useEffect } from 'react'
import Chatmessage from './component/ChatMessage'

interface ChatData {
  socketId: string;
  msg: string;
}

function App() {
const [msg,setmsg] = useState("")
const [data,setdata] = useState<ChatData[]>([])
const [socket,setsocket] = useState<WebSocket | null>(null)

  useEffect(()=>{
   const ws = new WebSocket("ws://localhost:8080")

   ws.onopen = () =>{
       console.log('WebSocket connection established.');
   }

   ws.onmessage = (event)=>{
       console.log("message from server: "+event.data);
       const parseddata = JSON.parse(event.data)
      setdata((prev)=>[...prev,parseddata])
   }





      ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    setsocket(ws)

     return () => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.close();
      }
    };
  },[])

  function closeconnection(){
 if (socket?.readyState === WebSocket.OPEN) {
    socket.close();
    console.log("WebSocket closed manually");
  }
  }

  function sendmsg(){
    if(socket && socket.readyState === WebSocket.OPEN){
      socket.send(JSON.stringify({
        type:"chat",
        payload:{
            msg
        }
      }))
      setmsg("")
    }else{
      console.warn('WebSocket is not open. Cannot send message.');
    }
  }


  return (
    <>
      <div className='flex items-center justify-center gap-10 p-10'>
        <CreateRoom/>
        <JoinChat socket={socket}/>
        <button className='border rounded p-4 font-mono' onClick={closeconnection}>Leave</button>
      </div>
      <div className='flex flex-col items-center justify-center gap-10'>
        <div className='bg-gray-50 h-96 rounded-2xl border-2 p-4 w-72 sm:w-96'>
                  {data.map((m,i)=>(
           <Chatmessage key={i} data={m} />
        ))}
        </div>

        <div className='flex gap-10'>
            <input className='border-2 px-4 py-2 font-mono' type="text" placeholder='type message...' value={msg} onChange={(e)=>setmsg(e.target.value)} />
            <button className='border p-4 bg-blue-500 text-xl font-mono hover:bg-blue-400' onClick={sendmsg}>Send</button>
        </div>
        
      </div>

    </>
  )
}
 
export default App
