import React from 'react'
import { useState } from 'react'
import SearchIcon from '../assets/searchicon.png'

function MovieApp() {
    const [searchQuery, setSearchQuery] = useState('')

    return (
        <div>
            <div className='text-center m-2 p-2'>
                <h1 className='text-success'>Movies Hub</h1>
            </div>
            <div className='container d-flex align-items-center justify-content-center border p-2 text-decoration-none shadow-none'>
                <input className='search-input form-control m-2 rounded-pill shadow-none' placeholder='Enter city name' value={searchQuery} type='text'></input>
                <img className='search-icon' src={SearchIcon} />
            </div>
        </div>
    )
}

export default MovieApp
