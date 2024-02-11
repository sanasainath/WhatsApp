
import React, { useState } from 'react';
import './Chat.css';
import { Avatar, IconButton } from '@material-ui/core';
import SearchIcon from '@mui/icons-material/Search';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import MicIcon from '@mui/icons-material/Mic';
import axios from 'axios';
import { useRef } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import StarRateIcon from '@mui/icons-material/StarRate';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ToggleOffIcon from '@mui/icons-material/ToggleOff';
import AvTimerIcon from '@mui/icons-material/AvTimer';
import LockIcon from '@mui/icons-material/Lock';
import BlockIcon from '@mui/icons-material/Block';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import DeleteIcon from '@mui/icons-material/Delete';
import TapAndPlayIcon from '@mui/icons-material/TapAndPlay';
import LaptopMacSharpIcon from '@mui/icons-material/LaptopMacSharp';
import { useEffect } from 'react';
function Chat({ messages, title, image, roomTitle, lastSeen ,deleteChat, isBlocked,setIsBlocked}) {
  const [y, setY] = useState('');
  const chatViewRef = useRef(null);
  const [isChatSidebarOpen, setChatSidebarOpen] = useState(false);
  const [activeChatRoom, setActiveChatRoom] = useState(null);

  useEffect(() => {
    const storedIsBlocked = localStorage.getItem('isBlocked') === 'true';
    setIsBlocked(storedIsBlocked);
  }, []);
  const searchButton = async (e) => {
    e.preventDefault();
    if (!isBlocked) {
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const messageData = {
      message: y,
      name: 'sai',
      timestamp: timestamp,
      roomTitle: roomTitle,
      received: true,
      lastSeen,
    };
    await axios.post('http://localhost:3000/messages/new', messageData);
    setY('');
    if (chatViewRef.current) {
      chatViewRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
  };
  useEffect(() => {
    if (activeChatRoom && activeChatRoom !== title) {
      setChatSidebarOpen(false);
    }
  }, [title, activeChatRoom]);
  useEffect(() => {
    const storedIsBlocked = localStorage.getItem(`blockStatus_${roomTitle}`);
    if (storedIsBlocked) {
      setIsBlocked(storedIsBlocked === 'true');
    }
  }, [roomTitle]);
  
  const openChatSidebar = () => {
    setActiveChatRoom(title);
    setChatSidebarOpen(true);
  };

  const closeChatSidebar = () => {
    setActiveChatRoom(null); 
    setChatSidebarOpen(false);
  };




  if (!roomTitle) {
    return (
      <div className="default-chat-body">
        <div className='picturetop'>
        <TapAndPlayIcon style={{ fontSize: 100,transform: 'rotate(40deg)',marginRight:40,fontWeight:'lighter',color:"#6D7B8D",stroke:"transparent" }}/>
        <LaptopMacSharpIcon style={{fontSize:110, fontWeight:"revert-layer",transform:'rotate(340 deg)',color:"#6D7B8D",stroke:"transparent"}}/>

        </div>
   
       <p className='check12'>WhatsApp Web</p>
        <p className='third'>Send and receive messages without keeping your phone online.</p>
        <p className='third'>Use WhatsApp on up to 4 linked devices and 1 phone at the same time</p>
        <p className='last2' ><LockIcon style={{marginBottom:-5}}/> Your personal messages are end-to-end encrypted</p>
       
   
      </div>
    );
  }

  //block
  const handleBlock = async (roomTitle) => {
    // Update the UI to reflect the blocked status for the specific room
    setIsBlocked(true);
    localStorage.setItem(`blockStatus_${roomTitle}`, true);
    console.log(`Block status for ${roomTitle} set to true`);
  };
//unblock
const handleUnblock = async (roomTitle) => {
  try {
    const response = await axios.put(`http://localhost:3000/messages/unblock/${roomTitle}`);
    if (response.status === 200) {
      // Update the UI to reflect the unblocked status for the specific room
      setIsBlocked(false);
localStorage.setItem(`blockStatus_${roomTitle}`, false);
console.log(`Block status for ${roomTitle} set to false`);

    }
  } catch (error) {
    console.error('Error unblocking user:', error);
    // Handle the error in an appropriate manner
  }
};


//group messages by time


  return (
 
    <div className="chat_head" style={{ flex: isChatSidebarOpen ? '0.375' : '0.65' }}>
      <div className="cha_start">
        <Avatar className="avatar" src={image} onClick={openChatSidebar} />
        <div className="chat_info">
          <h4>{title}</h4>
          <p>last seen: {lastSeen}</p>
        </div>
        <div className="chat_right">
          <IconButton>
            <SearchIcon />
          </IconButton>
          <IconButton>
            <AttachFileIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className={`chat_body ${isChatSidebarOpen ? 'reduce_chat' : ''}`} >
        {messages.map((message, index) => (
          <p key={index} className={`chat_message ${message.received ? 'chat_receiver' : ''}`}>
            <span className="chat_name">{message.name}</span>
            {message.message}
            <span className="time">{message.timestamp}</span>
          </p>
        ))}
      </div>
      <div className="Arrange" style={{ width: isChatSidebarOpen ? '96%' : '97%' }}>
      {isBlocked ? (
    <p style={{ margin: 0, flex: '1', textAlign:'center'}}>Can't send a message to blocked contact {title}</p>
  ) : (
    <>
        <InsertEmoticonIcon />
        <form>
          <input
            value={y}
            onChange={(e) => setY(e.target.value)}
            type="text"
            className="footer_search"
            placeholder="Type a message"
          />
          <button onClick={searchButton} type="submit">
            Send a message
          </button>
        </form>
        <IconButton>
          <MicIcon />
        </IconButton>
        </>
  )}
      </div>
      {isChatSidebarOpen &&  activeChatRoom === title && (
        <div className="sidebarnew"  style={{ width: '433px', height: '90%',marginRight:"40px",marginTop:"12px"}}>
          <div className='colorit'>
          <CloseIcon className="close-sidebar" onClick={closeChatSidebar} >
          
          </CloseIcon>
         <h2 className='contact'> Contact Info</h2>
         </div>
         <div className='imagerightside'>
         <img className="imgright"src={image} alt='not found' width="200px" height="200px"/>
         <h2 className='contact1'>{title}</h2>

         </div>
         <div className="forcolors" >
         <div className="media">
          <p className="media1">Media,links and docs</p>
          <ChevronRightIcon/>
    
         </div>
         <div className='starred'>
          <StarRateIcon/>
          <p className='starred1'>Starred messages</p>
          <ChevronRightIcon/>
         </div>
         <div className='starred'>
          <NotificationsIcon/>
          <p className='starred1'>Mute notifications</p>
         <ToggleOffIcon/>
         </div>
         <div className='starred3'>
          <AvTimerIcon/>
          <p className='starred2'> Disappearing messages</p>
        <ChevronRightIcon/>
         </div>
         <div className='starred4'>
          <LockIcon/>
          <p className='encry'>Encryption</p>



         </div>
         <div className='starred4' style={{color:"red"}} onClick={() => (isBlocked ? handleUnblock(roomTitle) : handleBlock(roomTitle))}>
          <BlockIcon/>
          <p className='encry'>{isBlocked?'Unblock':'Block'}  {title} </p>
         </div>
         <div className='starred4' style={{color:"red"}}>
          <ThumbDownIcon/>
          <p className='encry'>Report {title}</p>
         </div>
         <div className='starred4' style={{color:"red"}}onClick={() => deleteChat(roomTitle)}>
         <DeleteIcon  />
          <p className='encry'>Delete chat</p>
         </div>
      



         </div>
        

         
         
        </div>
      )}
    </div>
    
  );
}

export default Chat;


