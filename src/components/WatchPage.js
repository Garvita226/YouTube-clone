import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { closeMenu } from '../utils/appSlice';
import { useSearchParams } from 'react-router-dom';

const WatchPage = () => {
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams()
    const query = searchParams.get('v');

    useEffect(() => {
        dispatch(closeMenu())
    }, [])

    return (
        <div className='px-5 mt-2'>
            <iframe className='border-none rounded-lg' width="800" height="400" src={"https://www.youtube.com/embed/" + query} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
        </div>
    )
}

export default WatchPage
