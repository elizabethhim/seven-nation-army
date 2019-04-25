import React from 'react';

import '../../styles/Login.scss';

export default function Video() {
  return (
    <div className="fullscreen-bg">
      <video
        loop
        muted
        autoPlay
        poster={require('../../media/images/BackgroundVidStill.png')}
        className="fullscreen-bg__video"
      >
        <source
          src={require('../../media/videos/OceanBackground.mp4')}
          type="video/mp4"
        />
        <source
          src={require('../../media/videos/OceanBackground.ogv')}
          type="video/ogg"
        />
      </video>
    </div>
  );
}
