import React from 'react'

const ChatMessege = ({name,message}) => {
    return (
        <div className={`flex `} >
            <img 
            src={`https://ui-avatars.com/api/?name=${name.replace(' ', '+')}&background=random`} 
            alt="User" 
            className="flex-shrink-0 w-8 h-8 bg-white rounded-full flex items-center justify-center text-white font-medium"          />
            <div className="ml-2">
                <p className="font-medium text-sm text-gray-900">{name}</p>
                <p className="text-sm text-gray-700">{message}</p>
            </div>
        </div>
    )
}

export default ChatMessege