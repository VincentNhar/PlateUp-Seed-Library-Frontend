import React, { useState,useEffect } from 'react'
import "./Home.css"

function HomeComponent() {


  const fetchData = () =>{
    
  }

  return (
    <>
    <header>
        <nav>
            <a href="/"><h1>Vincent's PlateUp Seed Library</h1></a>
        </nav>
    </header>
    <aside>
      <ul>
        <li>
          <a href="#huge-seed">Huge Map</a>
        </li>
        <li>
          <a href="#large-seed">Large Map</a>
        </li>
        <li>
          <a href="#medium-seed">Medium Map</a>
        </li>
        <li>
          <a href="#basic-seed">Basic Map</a>
        </li>
      </ul>
    </aside>
    <main className='home-main'>
      <section>
        <div id="huge-seed" className='section-title'>
          <h2>Huge Seeds</h2>
          <hr></hr>
        </div>
        <div className='section-content'>

          <div className='left-arrow'>
            <img id="test" src="" alt='browse-left'></img>
          </div>

          <div className='arrow-right'>

          </div>
        </div>
      </section>
    </main>
    </>
  )
}

export default HomeComponent;
