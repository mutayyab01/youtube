import React, { useEffect, useState } from 'react'
import { YOUTUBE_VIDEO_API } from '../utils/Constants';
import VideoCard from './VideoCard';
import { Link } from 'react-router-dom';

const VideoContainer = () => {
  const [video, setVideos] = useState([])
  useEffect(() => {
    getVideos();
  }, []);

  const getVideos = async () => {
    const data = await fetch(YOUTUBE_VIDEO_API)
    const json = await data.json();
    setVideos(json.items);
  }

  return (
    <div className="flex flex-wrap gap-3 ">
      {video.length > 0 && video.map((item) => (
        <Link key={item.id} to={"/watch?v=" + item.id}>
          <VideoCard  info={item} />
        </Link>
      ))}
    </div>
  )
}

export default VideoContainer