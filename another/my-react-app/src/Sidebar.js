
import React, { useState } from 'react';
import './Sidebar.css';
import { Avatar, IconButton } from '@material-ui/core';
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import SearchIcon from '@mui/icons-material/Search';
import ChatIcon from '@mui/icons-material/Chat';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Sideview from './Sideview';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ProfileData from './ProfileData';
import { useEffect } from 'react';
function Sidebar({ openChat, getLastMessage, chatRooms,lastSeen }) {
  const [searchInput, setSearchInput] = useState('');
  const [selectedChatRoom, setSelectedChatRoom] = useState(null);
  const [showProfile, setShowProfile] = useState(false);
  const [avatarImage, setAvatarImage] = useState('https://media-tir3-1.cdn.whatsapp.net/v/t61.24694-24/390623810_667453992146465_5514439720709249715_n.jpg?ccb=11-4&oh=01_AdRa8xCcaykRpE2J7JPo69iYoVWMu4IGykLsu_mxsj-iuw&oe=654D8152&_nc_sid=000000&_nc_cat=103' );
  const handleAvatarClick = (room) => {
    setSelectedChatRoom(room);
    setShowProfile(true);
  };
 
  const handleAvatarImageUpdate = (newImage) => {
    setAvatarImage(newImage);
    localStorage.setItem('avatarImage', newImage);
  };
  const handleBackClick = () => {
    setShowProfile(false);
  };

  const handleSearch = (e) => {
    setSearchInput(e.target.value);
  };

  // const filteredChatRooms = Object.keys(chatRooms).filter((room) =>
  //   room.toLowerCase().includes(searchInput.toLowerCase())
  // );
  const filteredChatRooms = Object.keys(chatRooms).filter((room) => {
    if (!searchInput) {
      return true; // Return all chat rooms if search input is empty
    } else {
      return room.toLowerCase().includes(searchInput.toLowerCase()); // Check if the room title includes the search input
    }
  });
  
  
  const openSpecificChat = (room) => {
    setSelectedChatRoom(room);
    openChat(room, getImageForRoom(room));
  };
  
  
  // useEffect(() => {
  //   if (selectedChatRoom) {
  //     const filteredRooms = Object.keys(chatRooms).filter((r) => r !== selectedChatRoom);
  //     const updatedChatRooms = { [selectedChatRoom]: chatRooms[selectedChatRoom], ...chatRooms };
  //     setChatRooms(updatedChatRooms);
  //   }
  // },  [selectedChatRoom, setChatRooms]);


  useEffect(() => {
    const storedAvatarImage = localStorage.getItem('avatarImage');
    if (storedAvatarImage) {
      setAvatarImage(storedAvatarImage);
    }
  }, []);
  

  
  
  const getImageForRoom = (room) => {
    if (room === 'Dance Room') {
      return 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtudpRNH_fgmZvkuICT584OP9YlYulbB8_MMBtAYGEhspkZjj85mdYxeQMJo33ZUyh9RU&usqp=CAU';
    } else if (room === 'Dev Room') {
      return 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvlMRzmAMrWfj_UVURzKPO0FQAZrIAmIynHw&usqp=CAU';
    } else if (room === '3k Room') {
      return 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoChrtL6XHUBzSFgdPyn_jVaWsi8LRcEoOFA&usqp=CAU';
    } else if (room === 'Pandu') {
      return 'https://media-maa2-2.cdn.whatsapp.net/v/t61.24694-24/389790489_229742369905217_3042211263337277822_n.jpg?ccb=11-4&oh=01_AdTXW2E7n2bhsrG8WT700eqj4OJqSYAIBITDULcF6OzR6A&oe=65484170&_nc_sid=000000&_nc_cat=108';
    } else if (room === 'chakri') {
      return 'https://pps.whatsapp.net/v/t61.24694-24/390113770_350542077451299_1661402800631021763_n.jpg?ccb=11-4&oh=01_AdRCp9giCcXj6xvEX5FyZqTv3o7i_bsKQhE35UxsOGZZ4Q&oe=65472E2D&_nc_sid=000000&_nc_cat=107';
    }
    else if (room === 'manju') {
      return 'https://media-maa2-2.cdn.whatsapp.net/v/t61.24694-24/395189754_706782547998927_6331460922837176806_n.jpg?ccb=11-4&oh=01_AdRiDxeU3dyfKZ4skAZwvIZYqBUMxzyCcFqSPbFGEHCLgw&oe=6548F652&_nc_sid=000000&_nc_cat=109';
    }
    else if (room === 'ganesh') {
      return 'https://media-maa2-2.cdn.whatsapp.net/v/t61.24694-24/386324743_283298327982593_7894834032479487852_n.jpg?ccb=11-4&oh=01_AdRS2bDin_kpyMf8KpMgebAIR7ng199bLUC147ynLq5_Gg&oe=65486A4B&_nc_sid=000000&_nc_cat=103';
    } 
    else if(room==='prem')
    {
      return 'https://media-maa2-1.cdn.whatsapp.net/v/t61.24694-24/323078017_748101186928311_7854778566524885489_n.jpg?ccb=11-4&oh=01_AdRmV_HpTKoKPkbO6di5TtPa8GZiG1hyZd-mOEvEihBHbw&oe=6548F556&_nc_sid=000000&_nc_cat=100';
    }
    else if(room==='adarsh')
    {
      return 'https://media-maa2-1.cdn.whatsapp.net/v/t61.24694-24/368049723_2579025272250696_5144065370511852225_n.jpg?ccb=11-4&oh=01_AdTC7KIPktj8jiwAU7hWHMGPzehy2TyzUOnsehpVZ55zNw&oe=6549025D&_nc_sid=000000&_nc_cat=100'
    }
    else if(room==='john')
    {
      return  'https://pps.whatsapp.net/v/t61.24694-24/328623578_801175471810239_8867911794478049408_n.jpg?ccb=11-4&oh=01_AdRGJSu33o7pqW1qqc2Pgl_p0AFF_qLnUM-zseGGOS9U3g&oe=654F5717&_nc_sid=e6ed6c&_nc_cat=103'
    }
    // Add similar conditions for other chat rooms
  };

  return (
    <div className='sidebar'>
      <div className='sidebar_header'style={{ backgroundColor: showProfile ? '#01796F' : 'white' }}>
      {showProfile ? (
         <div style={{ display: 'flex', alignItems: 'center' }}>
          <IconButton onClick={handleBackClick} style={{ marginTop: "20px" }}>
            <ArrowBackIcon />
          </IconButton>
          <h3 style={{ marginLeft: "20px", marginTop:"20px", color:"white",fontSize: '20px' }}>Profile</h3>
          </div>
          
        ) : (
          <Avatar 
            src={avatarImage} className='avatar1'
            alt='Avatar'
            onClick={() => handleAvatarClick(selectedChatRoom)}
          />
        )}
         {!showProfile && (
         <div className='sidebar_header_right'>

    <IconButton>
    <DonutLargeIcon/>
    </IconButton>
       <IconButton>
       <ChatIcon/>
       </IconButton>
       <IconButton>
       <MoreVertIcon/>
       </IconButton>
    </div>
         )}
      </div>  
      {showProfile ? (
        <ProfileData   avatarImage={avatarImage} handleAvatarImageUpdate={handleAvatarImageUpdate}
       /> // Conditionally render the ProfileData component
      ) : (
      <div>
      <div className='search_visible'>
        <div className='search_box'>
          <SearchIcon style={{ fontSize: '23px', color: 'rgba(0, 0, 0, 0.5)' }} />
          <input
            type='search'
            className='search_ok'
            placeholder='Search or start a new chat'
            value={searchInput}
            onChange={handleSearch}
          />
        </div>
      </div>
      
      <div className='sidebarchat_side'>
        {filteredChatRooms.map((room) => (
          <Sideview
            key={room}
            image={getImageForRoom(room)}
            title={room}
            description={getLastMessage(room) ? getLastMessage(room).message : 'Click here for info'}
            onClick={() => openSpecificChat(room)}  
            lastSeen={getLastMessage(room) ? getLastMessage(room).timestamp : 'Not available'}
          />
          
        ))}

      </div>
    </div>
      )}
    </div>
  );
}

export default Sidebar;

