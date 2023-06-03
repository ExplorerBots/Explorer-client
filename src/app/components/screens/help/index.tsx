import { useState } from 'react';

const HelpScreen = () => {
   const [message, setMessage] = useState('');
   const [receivedMessage, setReceivedMessage] = useState('');

   // useEffect(() => {
   //    socket.on('received_message', (data) => {
   //       setReceivedMessage(data);
   //    });
   // }, []);

   // const sendMessage = async () => {
   //    socket.emit('new_message', message);
   // };

   return (
      <>
         {/* <input
            value={message}
            type="text"
            placeholder="message"
            onChange={(e) => setMessage(e.currentTarget.value)}
         />
         <button onClick={sendMessage}>Отправить</button>
         <p>{receivedMessage}</p> */}
      </>
   );
};
export default HelpScreen;
