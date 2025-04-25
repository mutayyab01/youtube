import React, { useState } from 'react';
import Comment from './Comment';

const commentsData = [
  {
    id: 1,
    name: "Anusha Ibrahim",
    text: "Yeh karachi k creator ne banaya ha?",
    time: "3d",
    likes: 11,
    replies: [
      {
        id: 2,
        name: "Misha Shaikh",
        text: "Anusha Ibrahim Singer is from Hyderabad",
        time: "3d",
        likes: 0,
        replies: []
      },
      {
        id: 3,
        name: "Bilal A K Khan",
        text: "Anusha Ibrahim kissii pilley ne",
        time: "3d",
        likes: 0,
        replies: []
      },
      {
        id: 4,
        name: "Arsalan Irfan",
        text: "Anusha Ibrahim g shooting area gulastan e johar or 4 minar bahadurabad",
        time: "3d",
        likes: 0,
        replies: []
      }
    ]
  },
  {
    id: 5,
    name: "Minhaj Paracha",
    text: "Anusha Ibrahim han g mukaami gana ha😂 😊",
    time: "3d",
    likes: 22,
    replies: []
  },
  {
    id: 6,
    name: "Miran Hussain",
    text: "Anusha Ibrahim Hyderabad sy ha check out his other songs videos shot in Hyderabad",
    time: "3d",
    likes: 0,
    replies: []
  },
  {
    id: 7,
    name: "Tariq Khan",
    text: "Anusha Ibrahim hes from Hyderabad",
    time: "3d",
    likes: 0,
    replies: []
  },
  {
    id: 8,
    name: "Abdull Hannan Abbasi",
    text: "Anusha Ibrahim nae tw or 😊",
    time: "3d",
    likes: 0,
    replies: []
  }
];

const CommentContainer = ({videoId,commentCount}) => {
  const [comments, setComments] = useState(commentsData);
  const [newComment, setNewComment] = useState('');

  const handleAddComment = () => {
    if (newComment.trim() === '') return;
    
    const comment = {
      id: Math.max(...comments.map(c => c.id)) + 1,
      name: "You",
      text: newComment,
      time: "Just now",
      likes: 0,
      replies: []
    };
    
    setComments([...comments, comment]);
    setNewComment('');
  };

  return (
    <div className="mt-6 max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">{commentCount} Comments</h2>
      </div>
      
      <div className="flex mb-6">
        <div className="w-10 h-10 rounded-full bg-gray-300 overflow-hidden mr-3 flex-shrink-0">
          <img 
            src="https://randomuser.me/api/portraits/men/1.jpg" 
            alt="User" 
            className="w-full h-full object-cover" 
          />
        </div>
        <div className="flex-1">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            className="w-full border-b border-gray-300 pb-2 focus:outline-none focus:border-black"
            onKeyPress={(e) => e.key === 'Enter' && handleAddComment()}
          />
        </div>
      </div>
      
      <div className="space-y-4">
        {comments.map(comment => (
          <Comment key={comment.id} data={comment} />
        ))}
      </div>
    </div>
  );
};

export default CommentContainer;