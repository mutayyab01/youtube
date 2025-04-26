import { useState, useRef, useEffect } from 'react';
import ChatMessege from './ChatMessege';
import { useDispatch, useSelector } from 'react-redux';
import { addMessage } from '../utils/ChatSlice';
import { RANDOM_COMMENT_API, RANDOM_USERNAME_API } from '../utils/Constants';

const LiveChat = () => {

    const [newMessage, setNewMessage] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const chatContainerRef = useRef(null);
    const dispatch = useDispatch();
    const chatMesseges = useSelector((store) => store.chat.messages);


    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [chatMesseges]);

    useEffect(() => {
        const intervalId = setInterval(() => {
            Promise.all([
                fetch(RANDOM_USERNAME_API).then(res => res.json()),
                fetch(RANDOM_COMMENT_API).then(res => res.json())
            ])
                .then(([userData, commentData]) => {
                    const username = `${userData.results[0].name.first} ${userData.results[0].name.last}`;
                    const comments = commentData.comments;
                    const randomIndex = Math.floor(Math.random() * comments.length);
                    const randomComment = comments[randomIndex].body;
                    dispatch(addMessage({
                        name: username,
                        message: randomComment,
                    }));
                })
                .catch(error => {
                    // console.error('Error fetching data:', error);
                });
        }, 1500);

        return () => clearInterval(intervalId);
    }, []);



    const handleSendMessage = (e) => {
        e.preventDefault();
        if (newMessage.trim() && isLoggedIn) {
            const newMsg = {
                id: messages.length + 1,
                username: 'You',
                content: newMessage,
                isHighlighted: false
            };
            setMessages([...messages, newMsg]);
            setNewMessage('');
        }
    };

    return (
        <div className="flex flex-col h-full bg-white border border-gray-200 rounded-lg overflow-hidden w-full">
            {/* Chat header with action buttons */}
            <div className="bg-gray-100 p-3 border-b border-gray-200 flex justify-between items-center">
                <h2 className="font-semibold text-lg">Top chat</h2>
                <div className="flex space-x-2">
                    <button className="text-gray-600 hover:text-gray-900 p-1 rounded-full hover:bg-gray-200">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                        </svg>
                    </button>
                    <button className="text-gray-600 hover:text-gray-900 p-1 rounded-full hover:bg-gray-200">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                        </svg>
                    </button>
                    <button className="text-gray-600 hover:text-gray-900 p-1 rounded-full hover:bg-gray-200">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
                            <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
                        </svg>
                    </button>
                    <button className="text-gray-600 hover:text-gray-900 p-1 rounded-full hover:bg-gray-200">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </button>
                    <button className="text-gray-600 hover:text-gray-900 p-1 rounded-full hover:bg-gray-200">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Messages container */}
            <div
                ref={chatContainerRef}
                className="flex flex-col-reverse overflow-y-auto p-3 space-y-3"
                style={{ maxHeight: '400px' }}
            >
                {chatMesseges.length > 0 && chatMesseges.map((message, index) => (
                    <ChatMessege
                        key={index}
                        name={message.name}
                        message={message.message}
                    />
                ))}

            </div>
                {/* Welcome message */}
                <div className="mt-4 pt-4 border-t border-gray-100 text-center text-sm text-gray-500">
                    <p>Welcome to live chat! Remember to guard your privacy and abide by our community guidelines.</p>
                </div>

                {/* Learn more section */}
                <div className="text-center text-sm text-gray-500 mt-4">
                    <p className="font-medium">Learn more</p>
                </div>

            {/* Sign in / Message input */}
            {!isLoggedIn ? (
                <div className="p-3 bg-gray-50 border-t border-gray-200 text-center">
                    <button
                        onClick={() => setIsLoggedIn(true)}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium"
                    >
                        Sign in to chat
                    </button>
                    <p className="text-xs text-gray-500 mt-1">
                        All messages you send will appear publicly
                    </p>
                </div>
            ) : (
                <div className="p-3 border-t border-gray-200">
                    <form className="flex" onSubmit={(e) => {
                        e.preventDefault();
                        dispatch(addMessage({
                            name: "Mutayyab Imran",
                            message: newMessage,
                        }))
                        setNewMessage('');
                    }}>
                        <input
                            type="text"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            placeholder="Send a message"
                            className="flex-1 border border-gray-300 rounded-l-full px-4 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-r-full"
                        >
                            Send
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default LiveChat;