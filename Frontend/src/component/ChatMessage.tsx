

interface ChatData {
  socketId: string;
  msg: string;
}

function Chatmessage({ data }: { data: ChatData }) {
  return (<>
    
      <p className="font-bold text-blue-600">{data.socketId}</p>
      <p className="text-gray-800">{data.msg}</p>
      </>
  );
}

export default Chatmessage;
