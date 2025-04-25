import React from 'react'
import { FormatViews } from './FormatViews'
import RelativeTime from './RelativeTime'

const VideoCard = ({ info }) => {
  const { snippet, statistics } = info
  const { channelTitle, thumbnails, publishedAt, title } = snippet
  const { viewCount } = statistics

  return (
    <div className="
       relative
      w-[380px] 
      p-2
      rounded-xl
      transition-all
      duration-300
      ease-in-out
      hover:bg-[#DDE8EB]
      dark:hover:bg-cyan-900/20
      hover:shadow-md
      hover:shadow-cyan-200/50
      dark:hover:shadow-cyan-800/20
      group
      overflow-hidden
      will-change-transform
    ">
      {/* Glow effect overlay (hidden by default) */}
      <div className="
        absolute
        inset-0
        bg-cyan-500/0
        group-hover:bg-cyan-500/10
        transition-all
        duration-500
        rounded-xl
        pointer-events-none
      "/>
      
      {/* Thumbnail Container */}
      <div className="
        relative
        w-full
        rounded-lg
        overflow-hidden
        mb-3
        transition-all
        duration-300
        group-hover:rounded-lg
      ">
        <img
          src={thumbnails.medium?.url || thumbnails.high.url}
          alt={title}
          className="
            w-full
            aspect-video
            object-cover
            transition-transform
            duration-500
            group-hover:scale-105
          "
        />
        <div className="
          absolute
          bottom-2
          right-2
          bg-black/80
          text-white
          text-xs
          px-1.5
          py-0.5
          rounded
        ">
          10:30
        </div>
      </div>

      {/* Video Info */}
      <div className="flex gap-3 px-1">
        <div className="flex-1 min-w-0">
          <h3 className="
            text-sm
            font-medium
            mb-1
            line-clamp-2
            text-gray-900
            dark:text-gray-100
            group-hover:text-cyan-700
            dark:group-hover:text-cyan-400
            transition-colors
            duration-300
          ">
            {title}
          </h3>
          <p className="
            text-xs
            text-gray-600
            dark:text-gray-400
            group-hover:text-cyan-600
            dark:group-hover:text-cyan-300
            transition-colors
            duration-300
            mb-1
          ">
            {channelTitle}
          </p>
          <p className="
            text-xs
            text-gray-500
            dark:text-gray-400
            group-hover:text-cyan-500
            dark:group-hover:text-cyan-400
            transition-colors
            duration-300
          ">
            {FormatViews(viewCount)} views • <RelativeTime isoTime={publishedAt} />
          </p>
        </div>
      </div>
    </div>
  )
}

export default VideoCard