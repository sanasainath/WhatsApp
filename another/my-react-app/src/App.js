// App.js
import './App.css';
import Sidebar from './Sidebar';
import Chat from './Chat';
import { useEffect, useState } from 'react';
import Pusher from 'pusher-js';
import instance from './axios';
import axios from 'axios';

function App() {
  const [chatRooms, setChatRooms] = useState({});
  const [activeRoom, setActiveRoom] = useState('');
  const [image, setImage] = useState(null);
  const [isChatOpen, setIsChatOpen] = useState(true);
  const [chatDataChanged, setChatDataChanged] = useState(false);
  const [lastSeen, setLastSeen] = useState('');
  const [isBlocked, setIsBlocked] = useState(false); 
  
  const [blockStatus, setBlockStatus] = useState({});

  const toggleChat = (title, image) => {
    setIsChatOpen(true);
    setActiveRoom(title);
    setImage(image);
    if (chatRooms[title]) {
      const lastMessage = chatRooms[title][chatRooms[title].length - 1];
      setLastSeen(lastMessage.timestamp);
    } else {
      setLastSeen('Click here for info');
    }
  };

  // useEffect(() => {
    
  //   const storedChatRooms = JSON.parse(localStorage.getItem('chatRooms'));
  //   if (storedChatRooms) {
  //     setChatRooms(storedChatRooms);
  //   } else {
  //     instance.get('/messages/sync').then((response) => {
  //       const initialChatData = response.data;
  //       const chatRoomData = {};
  //       initialChatData.forEach((message) => {
  //         const roomTitle = message.roomTitle;
  //         if (!chatRoomData[roomTitle]) {
  //           chatRoomData[roomTitle] = [];
  //         }
  //         chatRoomData[roomTitle].push(message);
  //       });
  //       setChatRooms(chatRoomData);
  //       localStorage.setItem('chatRooms', JSON.stringify(chatRoomData));
  //     });
  //   }
  // }, []);

  useEffect(() => {
    const storedChatRooms = JSON.parse(localStorage.getItem('chatRooms'));
    if (storedChatRooms) {
      setChatRooms(storedChatRooms);
    } else {
      if (!isBlocked) {
        instance.get('/messages/sync').then((response) => {
          const initialChatData = response.data;
          const chatRoomData = {};
          initialChatData.forEach((message) => {
            const roomTitle = message.roomTitle;
            if (!chatRoomData[roomTitle]) {
              chatRoomData[roomTitle] = [];
            }
            chatRoomData[roomTitle].push(message);
          });
          setChatRooms(chatRoomData);
          localStorage.setItem('chatRooms', JSON.stringify(chatRoomData));
        });
      }
    }
  }, [isBlocked]);
  
  
  useEffect(() => {
    if (!isBlocked) {
      const pusher = new Pusher('b23d9a8e17fbcbb1d555', {
        cluster: 'eu',
      });
  
      const channel = pusher.subscribe('messages');
      channel.bind('inserted', (data) => {
        const roomTitle = data.roomTitle;
        const updatedChatRooms = { ...chatRooms };
        if (updatedChatRooms[roomTitle]) {
          updatedChatRooms[roomTitle].push(data);
        } else {
          updatedChatRooms[roomTitle] = [data];
        }
        setChatRooms(updatedChatRooms);
        setChatDataChanged(true);
        localStorage.setItem('chatRooms', JSON.stringify(updatedChatRooms));
      });
  
      return () => {
        channel.unbind_all();
        channel.unsubscribe();
      };
    }
  }, [chatRooms, isBlocked]);
  

  const getLastMessage = (roomTitle) => {
    if (chatRooms[roomTitle] && chatRooms[roomTitle].length > 0) {
      return chatRooms[roomTitle][chatRooms[roomTitle].length - 1];
    }
    return null;
  };
  const deleteChat = async (roomTitle) => {
    try {
      const response = await axios.delete(`http://localhost:3000/messages/delete/${roomTitle}`);
      console.log(response.data);

      const updatedChatRooms = { ...chatRooms };
      delete updatedChatRooms[roomTitle];
      setChatRooms(updatedChatRooms);
      const storedChatRooms = JSON.parse(localStorage.getItem('chatRooms'));
      if (storedChatRooms) {
        delete storedChatRooms[roomTitle];
        localStorage.setItem('chatRooms', JSON.stringify(storedChatRooms));
      }
      setActiveRoom('');
     
      setIsChatOpen(true);
      console.log("Updated chat rooms:", updatedChatRooms);
      console.log("Stored chat rooms:", storedChatRooms);
      console.log("Active room:", activeRoom);
      console.log("Image:", image);
      console.log("Is chat open:", isChatOpen);
      
    } catch (error) {
      console.error('Error deleting chat:', error);
    }
  };




  return (
    <div className="App">
      <div className="app__body">
        <Sidebar openChat={toggleChat} getLastMessage={getLastMessage} chatRooms={chatRooms} lastSeen={lastSeen} />
        {isChatOpen && (
          <Chat
            messages={chatRooms[activeRoom] || []}
            title={activeRoom}
            image={image}
            roomTitle={activeRoom}
            chatDataChanged={chatDataChanged}
            lastSeen={lastSeen}
            deleteChat={deleteChat}
           isBlocked={blockStatus[activeRoom] || false}
            setIsBlocked={(value) =>
              setBlockStatus((prev) => ({
                ...prev,
                [activeRoom]: value,
              }))
            }
          />
        )}
      </div>
    </div>
  );
}

export default App;
