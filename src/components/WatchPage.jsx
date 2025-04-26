import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import CommantContainer from './CommantContainer';
import { FormatViews } from './FormatViews';
import RelativeTime from './RelativeTime';
import LiveChat from './LiveChat';
import { YOUTUBE_FETCH_CHANNEL_DETAILS_API, YOUTUBE_FETCH_VIDEO_DETAILS_API } from '../utils/Constants';

// VideoPlayer component remains the same
const VideoPlayer = ({ videoId }) => {
  return (
    <div className="w-full aspect-video bg-black rounded-xl overflow-hidden">
      <iframe
        className="w-full h-full"
        src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};

// Updated VideoInfo component to match reference style
const VideoInfo = ({ data }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const truncateDescription = (text, maxLength = 150) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <div className="mt-4">
      <h1 className="text-2xl font-bold">{data?.snippet?.title}</h1>
      <div className="flex items-center mt-2 text-gray-600 text-sm flex-wrap">
        <span>{FormatViews(data?.statistics?.viewCount)} views</span>
        <span className="mx-2">•</span>
        <span><RelativeTime isoTime={data?.snippet?.publishedAt} /></span>
      </div>

      {/* Description with show more/less functionality */}
      <div className="mt-4 p-5 bg-gray-100 rounded-2xl">
        <div className="flex items-start">
          <div
            className="flex-1 cursor-pointer"
            onClick={() => data?.snippet?.description?.length > 150 && setIsExpanded(!isExpanded)}
          >
            <div className={`whitespace-pre-line text-sm text-gray-500 ${isExpanded ? '' : 'line-clamp-3'}`}>
              <p className="my-2">{data?.snippet?.description}</p>
            </div>
            {data?.snippet?.description?.length > 150 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsExpanded(!isExpanded);
                }}
                className="text-sm font-medium text-gray-600 hover:text-gray-900 mt-1"
              >
                {isExpanded ? 'Show less' : 'Show more'}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Tags - only show if available */}
      {data?.snippet?.tags?.length > 0 && (
        <div className="flex mt-4 space-x-2 flex-wrap">
          {data?.snippet?.tags?.slice(0, 5).map((tag) => (
            <span key={tag} className="px-2 py-1 bg-gray-100 rounded-full text-sm text-gray-700 mb-1">
              #{tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

const ChannelInfo = ({ data }) => {
  return (
    <div className="flex items-center justify-between mt-4 py-4 border-t border-b border-gray-200">
      <div className="flex items-center">
        <div className="w-12 h-12 rounded-full bg-white ">
          <img
            src={"/assests/youtube.png"}
            alt="Channel"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="ml-3">
          <h3 className="font-medium">{data?.snippet?.title}</h3>
          <p className="text-sm text-gray-600">
            {FormatViews(data?.statistics?.subscriberCount)} subscribers
          </p>
        </div>
      </div>
      <button className="px-4 py-2 bg-black text-white rounded-full font-medium hover:bg-gray-800 transition cursor-pointer hover:bg-pink-500 transition duration-100 ease-in-out">
        Subscribe
      </button>
    </div>
  );
};

const WatchPage = () => {
  const [searchParams] = useSearchParams();
  const videoId = searchParams.get("v");
  const [videoDetails, setVideoDetails] = useState(null);
  const [channelDetails, setChannelDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchVideoDetails = async () => {
      try {
        setLoading(true);
        // Fetch video details
        const response = await fetch(`${YOUTUBE_FETCH_VIDEO_DETAILS_API}&id=${videoId}`);
        const data = await response.json();
        setVideoDetails(data.items[0]);

        // Fetch channel details
        if (data.items[0]?.snippet?.channelId) {
          const channelResponse = await fetch(`${YOUTUBE_FETCH_CHANNEL_DETAILS_API}&id=${data.items[0].snippet.channelId}`);
          const channelData = await channelResponse.json();
          setChannelDetails(channelData.items[0]);
        }
      } catch (error) {
        console.error("Error fetching video details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideoDetails();
  }, [videoId]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading video...</div>;
  }

  if (!videoDetails) {
    return <div className="flex justify-center items-center h-screen">Video not found</div>;
  }

  return (
    <div className="bg-white min-h-screen mt-15 ml-15 w-full">
      <div className="w-full  mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row">
          {/* Main content */}
          <div className="lg:w-2/3 lg:pr-8">
            <VideoPlayer videoId={videoId} />
            <VideoInfo
              data={videoDetails}
              channelStatistics={channelDetails?.statistics}
            />
            {channelDetails && <ChannelInfo data={channelDetails} />}
            <CommantContainer videoId={videoId} commentCount={videoDetails.statistics.commentCount} />
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/3 mt-8 lg:mt-0">
            <LiveChat />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WatchPage;