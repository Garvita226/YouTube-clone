import React from 'react'

const VideoCard = ({ info }) => {
    // console.log(info)
    const { snippet, statistics } = info;
    const {channelTitle, thumbnails, title} = snippet;

    return (
        <div className='m-2 p-2 w-64 shadow-lg'>
            <img className='rounded-lg' src={thumbnails.medium.url} alt="" />
            <ul>
                <li className='font-bold py-2'>{title.slice(0,52)}</li>
                <li className='text-sm text-gray-500'>{channelTitle}</li>
                <li className='text-sm text-gray-500'>{statistics.viewCount} views</li>
            </ul>
        </div>
    )
}

export default VideoCard
