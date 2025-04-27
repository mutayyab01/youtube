import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { YOUTUBE_SEARCH_RESULTS_API } from '../utils/Constants';

const YouTubeSearchPage = () => {
    const [searchResults, setSearchResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [nextPageToken, setNextPageToken] = useState(null);
    const [hasMore, setHasMore] = useState(true);
    const observer = useRef();
    
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const searchQuery = searchParams.get('q');

    const processResults = (items) => {
        const uniqueVideos = {};
        const processedResults = [];
        
        items.forEach((item, index) => {
            const videoId = item.id?.videoId;
            if (!videoId) return;
            
            // Create a unique key by combining videoId with index if needed
            const uniqueKey = `${videoId}_${index}`;
            
            if (!uniqueVideos[videoId]) {
                uniqueVideos[videoId] = true;
                processedResults.push({
                    type: 'video',
                    id: item.id,
                    videoId,
                    uniqueKey, // Add unique key for React
                    title: item.snippet.title,
                    description: item.snippet.description,
                    thumbnail: item.snippet.thumbnails?.medium?.url,
                    channelTitle: item.snippet.channelTitle,
                    publishedAt: item.snippet.publishedAt,
                });
            }
        });
        
        return processedResults;
    };

    const fetchResults = useCallback(async (pageToken = null) => {
        if (!searchQuery || !hasMore) return;

        setIsLoading(true);
        setError(null);

        try {
            let apiUrl = `${YOUTUBE_SEARCH_RESULTS_API}&q=${searchQuery}`;
            if (pageToken) {
                apiUrl += `&pageToken=${pageToken}`;
            }

            const response = await fetch(apiUrl);

            if (!response.ok) {
                const errorData = await response.json();
                console.error("Error fetching search results:", errorData);
                setError(`Failed to load search results: ${response.status} - ${errorData.message || response.statusText}`);
                return;
            }

            const data = await response.json();
            
            setNextPageToken(data.nextPageToken || null);
            setHasMore(!!data.nextPageToken);

            const newResults = processResults(data.items || []);

            if (pageToken) {
                setSearchResults(prev => [...prev, ...newResults]);
            } else {
                setSearchResults(newResults);
            }

        } catch (err) {
            console.error("Error fetching search results:", err);
            setError("Failed to load search results. Please check your network or the API key.");
        } finally {
            setIsLoading(false);
        }
    }, [searchQuery, hasMore]);

    // Initial load and when search query changes
    useEffect(() => {
        setSearchResults([]);
        setNextPageToken(null);
        setHasMore(true);
        fetchResults();
    }, [searchQuery, fetchResults]);

    // Infinite scroll implementation
    const lastResultRef = useCallback(node => {
        if (isLoading) return;
        if (observer.current) observer.current.disconnect();
        
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                fetchResults(nextPageToken);
            }
        });
        
        if (node) observer.current.observe(node);
    }, [isLoading, hasMore, nextPageToken, fetchResults]);

    return (
        <div className="max-w-6xl mt-20 ml-20 p-4">
            <div>
                {isLoading && searchResults.length === 0 && <p>Loading...</p>}
                {error && <p className="text-red-500">{error}</p>}
                {!isLoading && !error && searchResults.length === 0 && (
                    <p>No video results found for "{searchQuery}".</p>
                )}
                
                {searchResults.length > 0 && (
                    <div className="space-y-6">
                        {searchResults.map((result, index) => {
                            const isLastItem = index === searchResults.length - 1;
                            const linkElement = (
                                <Link 
                                    to={"/watch?v=" + result.videoId} 
                                    className="flex items-start gap-5 p-5 hover:bg-gray-100 rounded-lg"
                                >
                                    <div className="w-64 h-36 bg-gray-200 rounded-lg flex-shrink-0 overflow-hidden">
                                        {result.thumbnail ? (
                                            <img src={result.thumbnail} alt={result.title} className="object-cover w-full h-full" />
                                        ) : (
                                            'No Thumbnail'
                                        )}
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-lg font-medium text-gray-900">{result.title}</h3>
                                        <div className="text-sm text-gray-600 mt-1">{result.channelTitle}</div>
                                        <div className="text-sm text-gray-500 mt-1">
                                            {new Date(result.publishedAt).toLocaleDateString()}
                                        </div>
                                        <p className="text-sm text-gray-600 mt-2">{result.description}</p>
                                    </div>
                                </Link>
                            );

                            return isLastItem ? (
                                <div ref={lastResultRef} key={result.uniqueKey}>
                                    {linkElement}
                                </div>
                            ) : (
                                <div key={result.uniqueKey}>
                                    {linkElement}
                                </div>
                            );
                        })}
                        {isLoading && searchResults.length > 0 && (
                            <div className="flex justify-center py-4">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default YouTubeSearchPage;