import React, { useEffect } from 'react'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { openMenu } from '../utils/appSlice'

const Body = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(openMenu());
  }, [])

  return (
    <div className='flex'>
        <Sidebar/>
        <Outlet/>
    </div>
  )
}

export default Body
