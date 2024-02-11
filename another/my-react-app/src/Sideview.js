import React from 'react';
import { Avatar } from '@material-ui/core';
import './Sideview.css';

function Sideview({ image, title, description, onClick, lastSeen }) {
  return (
    <div className='sideView' onClick={onClick}>
      <Avatar src={image} alt="not found" />
      <div className='sideView_info'>
        <h4>{title}</h4>
        <p>{description}</p>
        <p className="lastSeenText">{lastSeen}</p>
      </div>
    </div>
  );
}

export default Sideview;
