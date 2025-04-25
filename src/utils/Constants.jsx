export const YOUTUBE_VIDEO_API = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&chart=mostPopular&maxResults=50&regionCode=IN&key=${import.meta.env.VITE_YOUTUBE_API_KEY}`;
export const YOUTUBE_Search_API =`https://corsproxy.io/?key=${import.meta.env.VITE_CORS_API_KEY}&url=https://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q=`
export const YOUTUBE_MY_LIKED_VIDEO_API=`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&myRating=like&maxResults=50&key=${import.meta.env.VITE_YOUTUBE_API_KEY}`
export const LIVE_CHAT_OFFSET_LIMIT= 10;
export const RANDOM_USERNAME_API = `https://randomuser.me/api/`;
export const RANDOM_COMMENT_API = `https://dummyjson.com/comments?limit=10&skip=10&select=body,postId`;