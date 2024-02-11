import React, { useState } from 'react';
import './ProfileData.css';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import ContactsIcon from '@mui/icons-material/Contacts';
import StoreIcon from '@mui/icons-material/Store';
import CreateIcon from '@mui/icons-material/Create';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import EmailIcon from '@mui/icons-material/Email';
import PublicIcon from '@mui/icons-material/Public';

const ProfileData = ({ avatarImage, handleAvatarImageUpdate }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const newImage = URL.createObjectURL(event.target.files[0]);
      handleAvatarImageUpdate(newImage);
    }
  };

  return (
    <div className="profile-container">
     
      
      <label htmlFor="imageInput" className="avatar-container" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
        <img src={avatarImage} alt="Avatar" className="avatar-image round-image" />
        {isHovered && (
          <div className="change-photo-overlay">
            <div className="camera-icon">
              <CameraAltIcon />
            </div>
            <div className="text"><p style={{ margin: "0 0 0 25px" }}> Change </p>
              <p>Profile Photo</p> </div>
          </div>
        )}
        <input
          id="imageInput"
          type="file"
          onChange={handleImageChange}
          accept="image/*"
          style={{ display: 'none' }}
        />
       
          
        
      </label>
      <div className="profile-details">
        <div className='sd'>
          <ContactsIcon />
          <span>S@i</span>
          <CreateIcon />
        </div>
        <div className='sd'>
          <StoreIcon />
          <span>Business Description</span>
          <CreateIcon />
        </div>
        <div className='sd'>
          <LocalOfferIcon />
          <span>Software</span>
          <CreateIcon />
        </div>
        <div className='sd'>
          <FmdGoodIcon />
          <span>Business Address</span>
          <CreateIcon />
        </div>
        <div className='sd'>
          <AccessTimeIcon />
          <span>Business Hours</span>
          <CreateIcon />
        </div>
        <div className='sd'>
          <EmailIcon />
          <span>Email Address</span>
          <CreateIcon />
        </div>
        <div className='sd'>
          <PublicIcon />
          <span>Website</span>
          <CreateIcon />
        </div>
      </div>
    </div>
  );
};

export default ProfileData;
