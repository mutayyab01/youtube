  import React, { useEffect, useState, useCallback } from 'react';
  import { YOUTUBE_VIDEO_API, YOUTUBE_MY_LIKED_VIDEO_API } from '../utils/Constants';
  import VideoCard from './VideoCard';
  import { Link } from 'react-router-dom';
  import { useDispatch, useSelector } from 'react-redux';
  import { addVideos } from '../utils/VideoSlice';

  const VideoContainer = () => {
    const dispatch = useDispatch();
    const videoList = useSelector((state) => state.video.videoList);
    const [isFetching, setIsFetching] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [fetchLikedVideos, setFetchLikedVideos] = useState(false);

    // Memoized fetch functions
    const getVideos = useCallback(async () => {
      if (isFetching || !hasMore) return;
      
      setIsFetching(true);
      try {
        const apiUrl = fetchLikedVideos ? YOUTUBE_MY_LIKED_VIDEO_API : YOUTUBE_VIDEO_API;
        const data = await fetch(apiUrl);
        const json = await data.json();
        
        if (json.items && json.items.length > 0) {
          dispatch(addVideos(json.items));
          
          // After first load of regular videos, switch to liked videos for next load
          if (!fetchLikedVideos) {
            setFetchLikedVideos(true);
          }
        } else {
          setHasMore(false);
        }
      } catch (error) {
        console.error("Error fetching videos:", error);
      } finally {
        setIsFetching(false);
      }
    }, []);

    // Scroll handler with debounce built-in
    const handleScroll = useCallback(() => {
      if (isFetching || !hasMore) return;
      
      // Check if we're near bottom (within 300px)
      if (window.innerHeight + document.documentElement.scrollTop + 300 >= 
          document.documentElement.offsetHeight) {
        getVideos();
      }
    }, []);

    useEffect(() => {
      // Initial load
      if (videoList.length === 0) {
        getVideos();
      }
      
      // Add scroll listener with 200ms debounce
      const debouncedScroll = debounce(handleScroll, 200);
      window.addEventListener('scroll', debouncedScroll);
      
      return () => {
        window.removeEventListener('scroll', debouncedScroll);
        dispatch(addVideos([])); // Clear video list on unmount
      };
    }, []);

    // Simple debounce function
    function debounce(func, delay) {
      let timeout;
      return function() {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, arguments), delay);
      };
    }

    return (
      <div className="flex flex-wrap gap-5 mx-19 mt-30 w-[94%] justify-center overflow-x-hidden">
        {videoList.map((item,index) => (
          <Link key={index} to={"/watch?v=" + item.id}>
            <VideoCard info={item} />
          </Link>
        ))}
        {isFetching && <div className="w-full text-center py-4">Loading more videos...</div>}
        {!hasMore && <div className="w-full text-center py-4">No more videos to load</div>}
      </div>
    );
  };

  export default VideoContainer;