import React from 'react'
import searchIcon from '../Assets/search.png'
function Search() {
  return (
    <div className='search'>
        <label htmlFor="search-chat"><img src={searchIcon} alt="search" width={'20px'} /></label>
      <input type="text" placeholder='Start or search a new chat' id='search-chat'/>
    </div>
  )
}

export default Search
