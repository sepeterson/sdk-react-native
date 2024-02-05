import React, { createContext, useContext, useState } from 'react';

interface VideoContextProps {
  show: boolean;
  videoUrl: string;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  setVideoUrl: React.Dispatch<React.SetStateAction<string>>;
}

const initialVideoState = {
  show: false,
  videoUrl: '',
};

const VideoContext = createContext<VideoContextProps | undefined>(undefined);

export const VideoProvider: React.FC = ({ children }) => {
  const [show, setShow] = useState(initialVideoState.show);
  const [videoUrl, setVideoUrl] = useState(initialVideoState.videoUrl);

  return (
    <VideoContext.Provider value={{ show, videoUrl, setShow, setVideoUrl }}>
      {children}
    </VideoContext.Provider>
  );
};

export const useVideo = () => {
  const context = useContext(VideoContext);
  if (!context) {
    throw new Error('useVideo must be used within a VideoProvider');
  }
  return context;
};
