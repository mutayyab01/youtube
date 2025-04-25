  import React, { useState } from 'react';

  const Comment = ({ data }) => {
    const [showReplies, setShowReplies] = useState(false);
    const [replyText, setReplyText] = useState('');
    const [isReplying, setIsReplying] = useState(false);
    const [replies, setReplies] = useState(data.replies);
    const [likes, setLikes] = useState(data.likes);
    const [dislikes, setDislikes] = useState(0); // New state for dislikes
    const [userReaction, setUserReaction] = useState(null); // Track user's reaction

    const handleAddReply = () => {
      if (replyText.trim() === '') return;
      
      const newReply = {
        id: Math.max(...replies.map(r => r.id), 10) + 1,
        name: "You",
        text: replyText,
        time: "Just now",
        likes: 0,
        dislikes: 0,
        replies: []
      };
      
      setReplies([...replies, newReply]);
      setReplyText('');
      setIsReplying(false);
      if (!showReplies) setShowReplies(true);
    };

    const toggleLike = () => {
      if (userReaction === 'like') {
        setLikes(likes - 1);
        setUserReaction(null);
      } else {
        setLikes(likes + 1);
        if (userReaction === 'dislike') {
          setDislikes(dislikes - 1);
        }
        setUserReaction('like');
      }
    };

    const toggleDislike = () => {
      if (userReaction === 'dislike') {
        setDislikes(dislikes - 1);
        setUserReaction(null);
      } else {
        setDislikes(dislikes + 1);
        if (userReaction === 'like') {
          setLikes(likes - 1);
        }
        setUserReaction('dislike');
      }
    };

    return (
      <div className="flex">
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
            {data.name === "Misha Shaikh" && (
              <span className="text-xs bg-gray-100 px-2 py-0.5 rounded">Follow</span>
            )}
          </div>
          <div className="text-sm mt-1">{data.text}</div>
          
          <div className="flex items-center mt-1 text-xs text-gray-500 space-x-4">
            <button 
              className={`hover:text-gray-700 flex items-center ${userReaction === 'like' ? 'text-blue-500' : ''}`}
              onClick={toggleLike}
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
              </svg>
              {likes > 0 && likes}
            </button>
            
            <button 
              className={`hover:text-gray-700 flex items-center ${userReaction === 'dislike' ? 'text-blue-500' : ''}`}
              onClick={toggleDislike}
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" transform="rotate(180)">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
              </svg>
              {dislikes > 0 && dislikes}
            </button>
            
            <button 
              className="hover:text-gray-700"
              onClick={() => setIsReplying(!isReplying)}
            >
              Reply
            </button>
            <span className="text-gray-400">{data.time}</span>
          </div>
          
          {isReplying && (
            <div className="mt-2 flex">
              <div className="w-8 h-8 rounded-full bg-gray-300 overflow-hidden mr-2 flex-shrink-0">
                <img 
                  src="https://randomuser.me/api/portraits/men/1.jpg" 
                  alt="You" 
                  className="w-full h-full object-cover" 
                />
              </div>
              <div className="flex-1">
                <input
                  type="text"
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Write a reply..."
                  className="w-full border-b border-gray-300 pb-1 focus:outline-none focus:border-black text-sm"
                  onKeyPress={(e) => e.key === 'Enter' && handleAddReply()}
                />
              </div>
            </div>
          )}
          
          {replies.length > 0 && (
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
                {showReplies ? 'Hide replies' : `View all ${replies.length} ${replies.length === 1 ? 'reply' : 'replies'}`}
              </button>
              
              {showReplies && (
                <div className="mt-2 pl-4 border-l-2 border-gray-200 space-y-4">
                  {replies.map(reply => (
                    <Comment key={reply.id} data={reply} />
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