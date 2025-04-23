import React from 'react'
import { useParams, useSearchParams } from 'react-router-dom'

const WatchPage = () => {
    const [useSearchParam] = useSearchParams()
    console.log(useSearchParam.get("v"));
    
    return (
        <div>WatchPage</div>
    )
}

export default WatchPage