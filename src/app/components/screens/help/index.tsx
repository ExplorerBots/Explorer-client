import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:8080');

const HelpScreen = () => {
   const [message, setMessage] = useState('');
   const [receivedMessage, setReceivedMessage] = useState('');
   useEffect(() => {
      socket.on('received_message', (data) => {
         setReceivedMessage(data);
         console.log(data);
      });
   }, []);

   const sendMessage = async () => {
      const response = await socket.emit('new_message', message);
   };

   return (
      <>
         <input
            value={message}
            type="text"
            placeholder="message"
            onChange={(e) => {
               setMessage(e.currentTarget.value);
               console.log(message);
            }}
         />
         <button onClick={sendMessage}>Отправить</button>
         <p>{receivedMessage}</p>
      </>
   );
};
export default HelpScreen;
