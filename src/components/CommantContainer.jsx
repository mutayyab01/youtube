import React, { useState, useEffect } from 'react';
import Comment from './Comment';
import { YOUTUBE_COMMENTS_VIDEO_API } from '../utils/Constants';

const CommentContainer = ({ videoId, commentCount }) => {
  const [comments, setComments] = useState([]);
  const [nextPageToken, setNextPageToken] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  // Fetch initial comments
  useEffect(() => {
    const fetchComments = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const response = await fetch(
          `${YOUTUBE_COMMENTS_VIDEO_API}&videoId=${videoId}&maxResults=20`
        );
        
        if (!response.ok) {
          throw new Error('Failed to fetch comments');
        }
        
        const data = await response.json();
        setComments(data.items || []);
        setNextPageToken(data.nextPageToken || '');
        setHasMore(!!data.nextPageToken);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (videoId) {
      fetchComments();
    }
  }, [videoId]);

  const loadMoreComments = async () => {
    if (isLoading || !hasMore) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch(
        `${YOUTUBE_COMMENTS_VIDEO_API}&videoId=${videoId}&maxResults=20&pageToken=${nextPageToken}`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch more comments');
      }
      
      const data = await response.json();
      setComments(prev => [...prev, ...(data.items || [])]);
      setNextPageToken(data.nextPageToken || '');
      setHasMore(!!data.nextPageToken);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Process comments data
  const processComments = (items) => {
    return items.map(item => {
      const topLevelComment = item.snippet.topLevelComment.snippet;
      return {
        id: item.id,
        name: topLevelComment.authorDisplayName,
        text: topLevelComment.textDisplay,
        time: formatTime(topLevelComment.publishedAt),
        likes: topLevelComment.likeCount,
        replies: item.replies?.comments?.map(reply => ({
          id: reply.id,
          name: reply.snippet.authorDisplayName,
          text: reply.snippet.textDisplay,
          time: formatTime(reply.snippet.publishedAt),
          likes: reply.snippet.likeCount,
          replies: []
        })) || []
      };
    });
  };

  // Format timestamp
  const formatTime = (timestamp) => {
    const now = new Date();
    const commentDate = new Date(timestamp);
    const diffInSeconds = Math.floor((now - commentDate) / 1000);
    
    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)}d ago`;
    if (diffInSeconds < 31536000) return `${Math.floor(diffInSeconds / 2592000)}mo ago`;
    return `${Math.floor(diffInSeconds / 31536000)}y ago`;
  };

  const processedComments = processComments(comments);

  return (
    <div className="mt-6 max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">{commentCount || processedComments.length} Comments</h2>
      </div>
      
      {error && (
        <div className="text-red-500 mb-4">
          Error loading comments: {error}
        </div>
      )}
      
      {isLoading && !processedComments.length ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {processedComments.map(comment => (
              <Comment key={comment.id} data={comment} />
            ))}
          </div>
          
          {hasMore && (
            <div className="flex justify-center mt-4">
              <button 
                onClick={loadMoreComments}
                disabled={isLoading}
                className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 cursor-pointer"
              >
                {isLoading ? 'Loading...' : 'Load More Comments'}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CommentContainer;