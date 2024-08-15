import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toggleMenu } from '../utils/appSlice';
import { YOUTUBE_SEARCH_API } from '../utils/constants';
import { cacheResults } from '../utils/searchSlice';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const dispatch = useDispatch();
  const searchCache = useSelector(store => store.search)

  const toggleSidebar = () => {
    dispatch(toggleMenu());
  }

  const getSearchQuery = async () => {
    if (searchQuery.trim() === '') {
      setSuggestions([]);
    };

    // console.log('API Call - ' + searchQuery);
    const data = await fetch(YOUTUBE_SEARCH_API + searchQuery);
    const json = await data.json();
    // console.log(json)
    setSuggestions(json[1])
    dispatch(cacheResults({
      [searchQuery]: json[1]
    }))
    // console.log(suggestions)
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      if(searchCache[searchQuery]) {
        setSuggestions(searchCache[searchQuery])
      }
      else {
        getSearchQuery()
      }
    }, 200);

    return () => {
      clearTimeout(timer)
    }
  }, [searchQuery])

  return (
    <div className='grid grid-flow-col p-3 text-center shadow-lg'>
      <div className='flex col-span-1 items-center'>
        <img onClick={() => toggleSidebar()} className='h-8 cursor-pointer' src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Hamburger_icon.svg/1200px-Hamburger_icon.svg.png" alt="hamburger" />
        <a href="/"><img className='h-8 ml-2 cursor-pointer' src="logo.jpg" alt="youtube-logo" /></a>
      </div>

      <div className='col-span-10 items-center'>
        <div>
        <input onChange={(e) => setSearchQuery(e.target.value)} type="text" className='w-1/2 border border-gray-500 p-2 rounded-l-full px-5' onFocus={() => setShowSuggestions(true)} onBlur={() => setShowSuggestions(false)}/>
        <button className='border border-gray-500 py-2 rounded-r-full bg-gray-100 px-5'>🔍</button>
        </div>

        {showSuggestions && suggestions.length > 0 && (<div className='p-2 absolute left-[27rem] w-[29rem] bg-white border border-gray-100 shadow-lg rounded-lg'>
          <ul>
            {suggestions.map((s) => {
              return <li className='text-left p-2 shadow-sm hover:bg-gray-200' key={s}> 🔍 {s}</li>
            })}
          </ul>
        </div>)}
      </div>

      <div className='col-span-1 items-center'>
        <img className='h-8' src="https://cdn-icons-png.flaticon.com/512/552/552721.png" alt="user-icon" />
      </div>
    </div>
  )
}

export default Header
