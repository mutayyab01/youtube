import React, { useState } from 'react';
import Comment from './Comment';
import { Link } from 'react-router-dom';

const commentsData = [
  {
    id: 1,
    name: "Mutayyab Imran",
    text: "I am a Full Stack .NET Developer.",
    time: "3d",
    likes: 11,
    replies: [
      {
        id: 2,
        name: "Misha Shaikh",
        text: "Hi Mutayyab Imran, I am also a Full Stack .NET Developer.",
        time: "2d",
        likes: 2,
        replies: []
      },
      {
        id: 3,
        name: "Bilal Ali Khan",
        text: "I am a Full Stack .NET Developer too.",
        time: "2d",
        likes: 1,
        replies: [
          {
            id: 4,
            name: "Miran Hussain",
            text: "That's great!",
            time: "1d",
            likes: 10,
            replies: []
          }
        ]
      },
      {
        id: 4,
        name: "Arsalan Irfan",
        text: "Entity Framework is a great tool.",
        time: "3d",
        likes: 0,
        replies: [
          {
            id: 5,
            name: "Fayaz Ahmed",
            text: "ASP.NET Core is the future.",
            time: "3d",
            likes: 0,
            replies: []
          },
          {
            id: 6,
            name: "Tariq Khan",
            text: "C# is a powerful language.",
            time: "3d",
            likes: 0,
            replies: []
          }
        ]
      }
    ]
  },
  {
    id: 5,
    name: "Minhaj Paracha",
    text: "React is a great library for building user interfaces.",
    time: "3d",
    likes: 10,
    replies: [
      {
        id: 6,
        name: "Anusha Ibrahim",
        text: "I love React!",
        time: "2d",
        likes: 1,
        replies: [
          {
            id: 7,
            name: "Abdull Hannan Abbasi",
            text: "React is awesome!",
            time: "3d",
            likes: 0,
            replies: [
              {
                id: 8,
                name: "Miran Hussain",
                text: "I prefer Vue.js.",
                time: "1d",
                likes: 0,
                replies: []
              },
              {
                id: 9,
                name: "Tariq Khan",
                text: "Angular is better.",
                time: "1d",
                likes: 0,
                replies: []
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 6,
    name: "Hussain",
    text: "I can help you with your project.",
    time: "1d",
    likes: 1,
    replies: []
  },
  {
    id: 7,
    name: "Tariq Khan",
    text: "Node.js is a great choice for backend development.",
    time: "3d",
    likes: 1,
    replies: []
  },
  {
    id: 8,
    name: "Abdull Hannan Abbasi",
    text: "Next.js is a great framework for server-side rendering.",
    time: "3d",
    likes: 1,
    replies: []
  }
];

const CommentContainer = ({ videoId, commentCount }) => {
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
      <Link to={"/"} className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 mt-5 mx-[50%] cursor-pointer">
        <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent justify-center align-middle ">
          Load More
        </span>
      </Link>

    </div>
  );
};

export default CommentContainer;