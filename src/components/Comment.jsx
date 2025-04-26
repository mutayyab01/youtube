import React, { useState } from 'react';

const Comment = ({ data }) => {
  const [showReplies, setShowReplies] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
  const [likeCount, setLikeCount] = useState(data.likes);

  const toggleLike = () => {
    if (isLiked) {
      setLikeCount(likeCount - 1);
      setIsLiked(false);
    } else {
      setLikeCount(likeCount + 1);
      setIsLiked(true);
      if (isDisliked) {
        setIsDisliked(false);
      }
    }
  };

  const toggleDislike = () => {
    if (isDisliked) {
      setIsDisliked(false);
    } else {
      setIsDisliked(true);
      if (isLiked) {
        setLikeCount(likeCount - 1);
        setIsLiked(false);
      }
    }
  };

  return (
    <div className="flex mb-4">
      <div className="w-10 h-10 rounded-full bg-gray-300 overflow-hidden mr-3 flex-shrink-0">
        <img 
          src={`https://ui-avatars.com/api/?name=${data.name.replace(' ', '+')}&background=random`} 
          alt={data.name} 
          className="w-full h-full object-cover" 
        />
      </div>
      
      <div className="flex-1">
        <div className="flex items-center">
          <span className="font-medium text-sm mr-2">{data.name}</span>
        </div>
        <div className="text-sm mt-1">{data.text}</div>
        
        <div className="flex items-center mt-1 text-xs text-gray-500 space-x-4">
          <button 
            className={`hover:text-gray-700 flex items-center ${isLiked ? 'text-blue-500' : ''}`}
            onClick={toggleLike}
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
            </svg>
            {likeCount > 0 && likeCount}
          </button>
          
          <button 
            className={`hover:text-gray-700 flex items-center ${isDisliked ? 'text-blue-500' : ''}`}
            onClick={toggleDislike}
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" transform="rotate(180)">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
            </svg>
          </button>
          
          <span className="text-gray-400">{data.time}</span>
        </div>
        
        {data.replies.length > 0 && (
          <div className="mt-2">
            <button 
              onClick={() => setShowReplies(!showReplies)}
              className="flex items-center text-blue-500 text-xs font-medium hover:text-blue-700"
            >
              <svg 
                className={`w-3 h-3 mr-1 transform ${showReplies ? 'rotate-90' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              {showReplies ? 'Hide replies' : `View ${data.replies.length} ${data.replies.length === 1 ? 'reply' : 'replies'}`}
            </button>
            
            {showReplies && (
              <div className="mt-2 pl-4 border-l-2 border-gray-200 space-y-4">
                {data.replies.map((reply,index) => (
                  <Comment key={index} data={reply} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Comment;