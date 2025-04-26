import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { cacheResults } from '../utils/SearchSlice';
import { YOUTUBE_SUGGESTION_API } from '../utils/Constants';

const Search = ({ initialQuery = '' }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const searchRef = useRef(null);
    const searchCache = useSelector((store) => store.search);
    const dispatch = useDispatch();

    useEffect(() => {
        setSearchQuery(initialQuery);
    }, [initialQuery]);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (searchQuery.trim() !== '') {
                if (searchCache[searchQuery]) {
                    setSuggestions(searchCache[searchQuery]);
                } else {
                    getSearchSuggestions();
                }
            } else {
                setSuggestions([]);
                setShowSuggestions(false);
            }
        }, 200);

        return () => clearTimeout(timer);
    }, [searchQuery]);

    useEffect(() => {
        setShowSuggestions(false);
        function handleClickOutside(event) {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setShowSuggestions(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const getSearchSuggestions = async () => {
        try {
            const response = await fetch(`${YOUTUBE_SUGGESTION_API}&q=${searchQuery}`);
            const text = await response.text();

            // Extract JSON from the JSONP-like response
            const jsonpData = text.match(/window\.google\.ac\.h\((.*)\)/);
            if (!jsonpData || !jsonpData[1]) {
                throw new Error('Invalid response format');
            }
            const data = JSON.parse(jsonpData[1]);
            const suggestions = data[1].map(item => item[0]);

            setSuggestions(suggestions || []);
            setShowSuggestions(true);
            dispatch(cacheResults({
                [searchQuery]: suggestions,
            }));
        } catch (error) {
            console.error('Error fetching search suggestions:', error);
            setSuggestions([]);
        }
    };

    const handleSearch = () => {
        setShowSuggestions(false);
    };

    const handleClearSearch = () => {
        setSearchQuery('');
        setSuggestions([]);
        setShowSuggestions(false);
    };

    return (
        <div className='relative w-full max-w-xl' ref={searchRef}>
            <form className='flex w-full'>
                <input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => searchQuery && setShowSuggestions(true)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && searchQuery.trim()) {
                            handleSearch();
                        }
                    }}
                    type="text"
                    placeholder="Search"
                    className="w-full px-4 py-2 border border-gray-300 rounded-l-full focus:outline-none focus:border-blue-500"
                />
                {searchQuery && (
                    <button
                        className="absolute right-15 top-0 w-10 h-10 flex items-center  justify-center  bg-transparent hover:bg-gray-200 hover:rounded-2xl cursor-pointer  transition-colors duration-200"
                        onClick={handleClearSearch}
                        aria-label="Clear search"
                    >
                        <svg
                            className="w-4 h-4 text-gray-600"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M18 6L6 18" />
                            <path d="M6 6L18 18" />
                        </svg>
                    </button>

                )}
                <Link
                    to={`/search?q=${encodeURIComponent(searchQuery)}`}
                    onClick={handleSearch}
                    className="px-5 py-2 bg-gray-100 border border-l-0 border-gray-300 rounded-r-full hover:bg-gray-200 flex items-center justify-center"
                >
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="11" cy="11" r="8" />
                        <path d="m21 21-4.3-4.3" />
                    </svg>
                </Link>
            </form>

            {showSuggestions && suggestions.length > 0 && (
                <div className="absolute w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                    <ul>
                        {suggestions.map((suggestion, index) => (
                            <li
                                key={index}
                                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                onClick={() => {
                                    setSearchQuery(suggestion);
                                    handleSearch();
                                }}
                            >
                                <Link
                                    to={`/search?q=${encodeURIComponent(suggestion)}`}
                                    className="flex items-center w-full"
                                >
                                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                                        <circle cx="11" cy="11" r="8" />
                                        <path d="m21 21-4.3-4.3" />
                                    </svg>
                                    {suggestion}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Search;