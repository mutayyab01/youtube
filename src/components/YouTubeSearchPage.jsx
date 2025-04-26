import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Search from '../components/Search';
import { YOUTUBE_SEARCH_RESULTS_API } from '../utils/Constants';

const YouTubeSearchPage = () => {
    const [searchResults, setSearchResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false); // Added loading state
    const [error, setError] = useState(null);        // Added error state
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const searchQuery = searchParams.get('q');

    useEffect(() => {
        const getResults = async () => {
            if (!searchQuery) return;

            setIsLoading(true);
            setError(null);
            setSearchResults([]);

            try {
                const apiUrl = `${YOUTUBE_SEARCH_RESULTS_API}&q=${searchQuery}`;
                const response = await fetch(apiUrl);

                if (!response.ok) {
                    const errorData = await response.json();
                    console.error("Error fetching search results:", errorData);
                    setError(`Failed to load search results: ${response.status} - ${errorData.message || response.statusText}`);
                    return;
                }

                const data = await response.json();
                const mappedResults = data.items.map(item => ({
                    type: 'video', 
                    id: item.id,
                    videoId: item.id.videoId,
                    title: item.snippet.title,
                    description: item.snippet.description,
                    thumbnail: item.snippet.thumbnails.medium.url,
                    channelTitle: item.snippet.channelTitle,
                    publishedAt: item.snippet.publishedAt,
                }));
                setSearchResults(mappedResults);

            } catch (err) {
                console.error("Error fetching search results:", err);
                setError("Failed to load search results. Please check your network or the API key.");
            } finally {
                setIsLoading(false);
            }
        };

        getResults();
    }, [searchQuery]);

    return (
        <div className="max-w-6xl mt-20 ml-20 p-4">
            <div>
                {isLoading && <p>Loading...</p>}
                {error && <p className="text-red-500">{error}</p>}
                {!isLoading && !error && searchResults.length === 0 && <p>No video results found for "{searchQuery}".</p>}
                {!isLoading && !error && searchResults.length > 0 && (
                    <div className="space-y-6">
                        {searchResults.map((result) => (
                            <Link to={"/watch?v=" + result.videoId} key={result.videoId} className="flex items-start gap-5 p-5 hover:bg-gray-100 rounded-lg">
                                {/* Video Thumbnail */}
                                <div className="w-64 h-36 bg-gray-200 rounded-lg flex-shrink-0 overflow-hidden">
                                    {result.thumbnail && <img src={result.thumbnail} alt={result.title} className="object-cover w-full h-full" />}
                                    {!result.thumbnail && 'No Thumbnail'}
                                </div>
                                {/* Video Details */}
                                <div className="flex-1">
                                    <h3 className="text-lg font-medium text-gray-900">{result.title}</h3>
                                    <div className="text-sm text-gray-600 mt-1">{result.channelTitle}</div>
                                    <div className="text-sm text-gray-500 mt-1">{new Date(result.publishedAt).toLocaleDateString()}</div>
                                    <p className="text-sm text-gray-600 mt-2">{result.description}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default YouTubeSearchPage;