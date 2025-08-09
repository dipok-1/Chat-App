import {WebSocketServer,WebSocket} from 'ws';
import {randUserName } from '@ngneat/falso'
const wss = new WebSocketServer({port:8080});

interface Workspace{
    roomName:string,
    roomid:string
}

interface User {
    socket : WebSocket,
    roomId: string
}

let allrooms: Workspace[] = []
    
let allsockets:  User[] = []
wss.on("connection",(socket)=>{
    const username = randUserName ();
    (socket as any).id = username

    
    socket.on("message",(data)=>{
    
        const parsedsocket = JSON.parse(data.toString());
        if(parsedsocket.type == "createroom"){
            console.log("Room created")
            const roomexists = allrooms.find((e)=>e.roomid == parsedsocket.payload.roomid );
            if(roomexists){
                socket.send(`Room is already available`)
                return 
            }
            let roomName = parsedsocket.payload.roomname
            let roomid =  parsedsocket.payload.roomid
            allrooms.push({
                roomName:parsedsocket.payload.roomname,
                roomid:parsedsocket.payload.roomid
            })
            
            socket.send(`Room created:${roomName} and id:${roomid}`);
            console.log(`Room created:${roomName} and id:${roomid}`)
        }


       if(parsedsocket.type=="join"){
        console.log("user joined")
         allsockets.push({
         socket,
         roomId:parsedsocket.payload.roomid
       })
   }
   
      
   if(parsedsocket.type == "chat"){
    console.log("usser send msg")
    const sendername = (socket as any).id
    
      const currentuserRoomid = allsockets.find((e)=> e.socket == socket)?.roomId
      allsockets.forEach((e)=>{
        if(e.roomId == currentuserRoomid ){
            e.socket.send(JSON.stringify({
                socketId:sendername,
                msg:parsedsocket.payload.msg
            }))
        }
      })

   }
    })

    socket.on("close",()=>{
         allsockets = allsockets.filter(user => user.socket !== socket);
    })

})