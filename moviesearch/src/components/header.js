import React from 'react'
import UserIcon from '../assets/user.png';

function header() {
  return (
    <div>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
          <a class="navbar-brand text-primary" href="#"><b>Movies HUB</b></a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="#">TV Shows</a>
              </li>
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="#">Movies</a>
              </li>
            </ul>
            <form class="d-flex">
              <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                <button class="btn btn-outline-success" type="submit">Search</button>
            </form>
            <img className='m-2' src={UserIcon} alt='show me' style={{width: '35px', height: '35px'}}/>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default header;
