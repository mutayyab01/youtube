export const YOUTUBE_VIDEO_API = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&chart=mostPopular&maxResults=50&regionCode=IN&key=${import.meta.env.VITE_YOUTUBE_API_KEY}`;
export const YOUTUBE_Search_API =`https://corsproxy.io/?key=${import.meta.env.VITE_CORS_API_KEY}&url=https://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q=`
export const YOUTUBE_MY_LIKED_VIDEO_API=`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&myRating=like&maxResults=50&key=${import.meta.env.VITE_YOUTUBE_API_KEY}`
export const YOUTUBE_COMMENTS_VIDEO_API=`https://www.googleapis.com/youtube/v3/commentThreads?key=${import.meta.env.VITE_YOUTUBE_API_KEY}&textFormat=plainText&part=snippet,replies&order=relevance`;
export const YOUTUBE_FETCH_VIDEO_DETAILS_API=`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&key=${import.meta.env.VITE_YOUTUBE_API_KEY}`;
export const YOUTUBE_FETCH_CHANNEL_DETAILS_API=`https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2Cstatistics&key=${import.meta.env.VITE_YOUTUBE_API_KEY}`;
export const YOUTUBE_SEARCH_RESULTS_API=`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&type=video&key=${import.meta.env.VITE_YOUTUBE_API_KEY}`
export const YOUTUBE_SUGGESTION_API=`https://corsproxy.io/?https://clients1.google.com/complete/search?client=youtube&gs_ri=youtube&ds=yt`;
export const LIVE_CHAT_OFFSET_LIMIT= 10;
export const RANDOM_USERNAME_API = `https://randomuser.me/api/`;
export const RANDOM_COMMENT_API = `https://dummyjson.com/comments?limit=10&skip=10&select=body,postId`;