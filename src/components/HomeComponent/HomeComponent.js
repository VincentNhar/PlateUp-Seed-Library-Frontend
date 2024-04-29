import React, { useState,useEffect } from 'react'
import { FaAngleLeft, FaAngleRight, FaPlus, FaCopy } from "react-icons/fa6";
import { BeatLoader } from "react-spinners"
import "./Home.css"
import axios from 'axios';

function HomeComponent() {

  const [isLoading, setIsLoading] = useState(true);
  const [URL, setURL] = useState('https://plateup-seed-library-backend.onrender.com')

  const [seedData, setSeedData] = useState([]);
  const [newSeed, setNewSeed] = useState([]);
  const [popularSeed, setPopularSeed] = useState([]);
  const [hugeSeed, setHugeSeed] = useState([]);
  const [largeSeed, setLargeSeed] = useState([]);
  const [mediumSeed, setMediumSeed] = useState([]);
  const [basicSeed, setBasicSeed] = useState([]);

  const [newSeedStartIndex, setNewSeedStartIndex] = useState(0);
  const [popularStartIndex, setPopularStartIndex] = useState(0);
  const [hugeStartIndex, setHugeStartIndex] = useState(0);
  const [largeStartIndex, setLargeStartIndex] = useState(0);
  const [mediumStartIndex, setMediumStartIndex] = useState(0);
  const [basicStartIndex, setBasicStartIndex] = useState(0);

  const itemsPerPage = 4;

  const handleRightArrow = (section) => {
    switch (section) {
      case "new":
        if (newSeedStartIndex + itemsPerPage < newSeed.length){
          setNewSeedStartIndex(newSeedStartIndex + 1)
        }
        break;
      case "popular":
        if (popularStartIndex + itemsPerPage < popularSeed.length){
          setPopularStartIndex(popularStartIndex + 1)
        }
        break;
      case "huge":
        if (hugeStartIndex + itemsPerPage < hugeSeed.length){
          setHugeStartIndex(hugeStartIndex + 1)
        }
        break;
      case "large":
        if (largeStartIndex + itemsPerPage < largeSeed.length){
          setLargeStartIndex(largeStartIndex + 1)
        }
        break;
      case "medium":
        if (mediumStartIndex + itemsPerPage < mediumSeed.length){
          setMediumStartIndex(mediumStartIndex + 1)
        }
        break;
      case "basic":
        if (basicStartIndex + itemsPerPage < basicSeed.length){
          setBasicStartIndex(basicStartIndex + 1)
        }
        break;
      default:
        console.error("No section found")
    }
  }

  const handleLeftArrow = (section) => {
    switch (section) {
      case "new":
        if (newSeedStartIndex > 0){
          setNewSeedStartIndex(newSeedStartIndex - 1)
        }
        break;
      case "popular":
        if (popularStartIndex > 0) {
          setPopularStartIndex(popularStartIndex - 1);
        }
        break;
      case "huge":
        if (hugeStartIndex > 0) {
          setHugeStartIndex(hugeStartIndex - 1);
        }
        break;
      case "large":
        if (largeStartIndex > 0) {
          setLargeStartIndex(largeStartIndex - 1);
        }
        break;
      case "medium":
        if (mediumStartIndex > 0) {
          setMediumStartIndex(mediumStartIndex - 1);
        }
        break;
      case "basic":
        if (basicStartIndex > 0) {
          setBasicStartIndex(basicStartIndex - 1);
        }
        break;
      default:
        console.error("No section found")
    }
  };
  
  const copyToClipboard = (data) => {
    console.log("Copy Data:", data.seed);
    navigator.clipboard.writeText(data.seed);
    alert(`${data.seed} has been copied successfully`);
  
    // Increment the copyCount and update seed data if seed matches
    setSeedData(prevSeedData => {
      const updatedSeedData = prevSeedData.map(seed => {
        if (seed.seed === data.seed) {
          // Increment copyCount
          const updatedSeed = {
            ...seed,
            copyCount: seed.copyCount + 1
          };
          // Call updateData for the matching seed
          updateData(updatedSeed);
          return updatedSeed;
        }
        return seed; // Return unchanged seed if it doesn't match
      });
      return updatedSeedData;
    });
  };
  
  const updateData = async (data) => {
    try {

      const response = await axios.put(`${URL}/map/${data._id}`, {
        copyCount: parseInt(data.copyCount)
      });

      console.log(response.status)

      if (response.status === 200){
        window.location.reload()
      }

      return response.data;
    } catch (error) {
      console.error("Error updating data:", error);
      throw error;
    }
  }

  const convertDate = (dataObj) => {
    // Loops through objects
    for (const key in dataObj){
      if(dataObj.hasOwnProperty(key)){
        //converts type of date from String to Date Object
        let date = Date.parse(dataObj[key].createdAt);
        dataObj[key]['createdAt'] = date;
      }
    }
    return dataObj;
  }

  const durationText = (date) => {
    const dateObj = new Date(date);
    const today = new Date();
    const duration = today - dateObj
    
    const seconds = Math.floor(duration / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(weeks / 4.345)

    if (months > 0) {
      return `Added ${weeks} month${months > 1 ? 's' : ''} ago`;
    } else if (weeks > 0) {
      return `Added ${weeks} week${weeks > 1 ? 's' : ''} ago`;
    } else if (days > 0) {
      return `Added ${days} day${days > 1 ? 's' : ''} ago`;
    } else if (hours > 0) {
        return `Added ${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else if (minutes > 0) {
        return `Added ${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else {
        return `Added ${seconds} second${seconds !== 1 ? 's' : ''} ago`;
    }
  }

  const fetchData = async () =>{
    try{
      console.log('Fetching a list of seed data');
      const start = new Date()
      const response = await axios.get(`${URL}/map/map-list`)
      const end = new Date()
      console.log(`Fetched complete! It took ${end - start} ms`)
      const seedDataList = response.data

      //Sorted by date of creation
      const newSeedList = convertDate(seedDataList)
      const sortedNewSeedList = [...newSeedList].sort((a,b) => a.createdAt + b.createdAt)

      //Sorted by number of copyCount
      const sortedPopularSeedList = [...seedDataList].sort((a, b) => b.copyCount - a.copyCount);

      //Filtered by type: Huge
      const hugeSeedList = seedDataList.filter(seed => seed.type === "Huge");

      //Filtered by type: Large
      const largeSeedList = seedDataList.filter(seed => seed.type === "Large");

      //Filtered by type: Medium
      const mediumSeedList = seedDataList.filter(seed => seed.type === "Medium");

      //Filtered by type: Basic
      const basicSeedList = seedDataList.filter(seed => seed.type === "Basic");
      
      setSeedData(seedDataList);
      setNewSeed(sortedNewSeedList)
      setPopularSeed(sortedPopularSeedList);
      setHugeSeed(hugeSeedList);
      setLargeSeed(largeSeedList)
      setMediumSeed(mediumSeedList)
      setBasicSeed(basicSeedList)

      setIsLoading(false)
    }catch(error){
      console.error('Error occured while fetching data',error);
    }
  }

  useEffect(() => {
    fetchData()
  }, []);

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
          <a href="#popular-seed">Popular Map</a>
        </li>
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
      <div className='add-button-container'>
        <a href="/add">
          <span><FaPlus /></span>
          <span>Add Map</span>
        </a>
      </div>
      {isLoading ? <BeatLoader 
                      className='loading-spinner' 
                      color="#FF9900"
                      size={30} /> :
      <>
        {/* NEW SEED */}
        <section id="new-seed">
          <div className='section-title'>
            <h2>Newly Added Seed</h2>
            <hr></hr>
          </div>
          <div className='section-content'>
            <div className='left-arrow' onClick={() => handleLeftArrow("new")}><FaAngleLeft /></div>

            <div className='section-data'>
              {Object.keys(newSeed)
                .slice(newSeedStartIndex, newSeedStartIndex + itemsPerPage)
                .map(key => (
                <>
                  <div key={key} className='data-container'>
                    <div className='time-tag'>{durationText(newSeed[key].createdAt)}</div>
                    <img src={newSeed[key].imageBase64} onClick={() => copyToClipboard(newSeed[key])} 
                          style={{height: 380, width: 300}} alt={newSeed[key].seed}></img>
                    <div className='stats-container'>
                      <span><FaCopy /></span>
                      <span>{newSeed[key].copyCount}</span>
                    </div>
                  </div>
                </>
              ))}
            </div>

            <div className='right-arrow' onClick={() => handleRightArrow("new")}><FaAngleRight /></div>
          </div>
        </section>

        {/* POPULAR SEED */}
        <section id="popular-seed">
          <div className='section-title'>
            <h2>Popular Seed</h2>
            <hr></hr>
          </div>
          <div className='section-content'>
            
            <div className='left-arrow' onClick={() => handleLeftArrow("popular")}><FaAngleLeft /></div>
            
            <div className='section-data'>
              {Object.keys(popularSeed)
                .slice(popularStartIndex, popularStartIndex + itemsPerPage)
                .map(key => (
                <>
                  <div key={key} className='data-container'>
                    <div className='type-tag'>{popularSeed[key].type}</div>
                    <img src={popularSeed[key].imageBase64} onClick={() => copyToClipboard(popularSeed[key])} 
                          style={{height: 380, width: 300}} alt={popularSeed[key].seed}></img>
                    <div className='stats-container'>
                      <span><FaCopy /></span>
                      <span>{popularSeed[key].copyCount}</span>
                    </div>
                  </div>
                </>
              ))}
            </div>
            
            <div className='right-arrow' onClick={() => handleRightArrow("popular")}><FaAngleRight /></div>
          
          </div>
        </section>
        
        {/* HUGE SEED */}
        <section id="huge-seed">
          <div  className='section-title'>
            <h2>Huge Seed</h2>
            <hr></hr>
          </div>
          <div className='section-content'>

            <div className='left-arrow' onClick={() => handleLeftArrow("huge")}><FaAngleLeft /></div>

            <div className='section-data'>
              {Object.keys(hugeSeed)
                .slice(hugeStartIndex, hugeStartIndex + itemsPerPage)
                .map(key => (
                <>
                  <div key={key} className='data-container'>
                    <img src={hugeSeed[key].imageBase64} onClick={() => copyToClipboard(hugeSeed[key])} 
                          style={{height: 380, width: 300}} alt={hugeSeed[key].seed}></img>
                    <div className='stats-container'>
                      <span><FaCopy /></span>
                      <span>{hugeSeed[key].copyCount}</span>
                    </div>
                  </div>
                </>
              ))}
            </div>

            <div className='right-arrow' onClick={() => handleRightArrow("huge")}><FaAngleRight /></div>

          </div>
        </section>

        {/* LARGE SEED */}
        <section id="large-seed">
          <div  className='section-title'>
            <h2>Large Seed</h2>
            <hr></hr>
          </div>
          <div className='section-content'>

            <div className='left-arrow' onClick={() => handleLeftArrow("large")}><FaAngleLeft /></div>

            <div className='section-data'>
              {Object.keys(largeSeed)
                .slice(largeStartIndex, largeStartIndex + itemsPerPage)
                .map(key => (
                <>
                  <div key={key} className='data-container'>
                    <img src={largeSeed[key].imageBase64} onClick={() => copyToClipboard(largeSeed[key])} 
                          style={{height: 380, width: 300}} alt={largeSeed[key].seed}></img>
                    <div className='stats-container'>
                      <span><FaCopy /></span>
                      <span>{largeSeed[key].copyCount}</span>
                    </div>
                  </div>
                </>
              ))}
            </div>

            <div className='right-arrow' onClick={() => handleRightArrow("large")}><FaAngleRight /></div>

          </div>
        </section>
        
        {/* MEDIUM SEED */}
        <section id="medium-seed">
          <div  className='section-title'>
            <h2>Medium Seed</h2>
            <hr></hr>
          </div>
          <div className='section-content'>

            <div className='left-arrow' onClick={() => handleLeftArrow("medium")}><FaAngleLeft /></div>

            <div className='section-data'>
              {Object.keys(mediumSeed)
                .slice(mediumStartIndex, mediumStartIndex+itemsPerPage)
                .map(key => (
                <>
                  <div key={key} className='data-container'>
                    <img src={mediumSeed[key].imageBase64} onClick={() => copyToClipboard(mediumSeed[key])} 
                          style={{height: 380, width: 300}} alt={mediumSeed[key].seed}></img>
                    <div className='stats-container'>
                      <span><FaCopy /></span>
                      <span>{mediumSeed[key].copyCount}</span>
                    </div>
                  </div>
                </>
              ))}
            </div>

            <div className='right-arrow' onClick={() => handleRightArrow("medium")}><FaAngleRight /></div>

          </div>
        </section>
        
        {/* BASIC SEED */}
        <section id="basic-seed">
          <div  className='section-title'>
            <h2>Basic Seed</h2>
            <hr></hr>
          </div>
          <div className='section-content'>

            <div className='left-arrow' onClick={() => handleLeftArrow("basic")}><FaAngleLeft /></div>

            <div className='section-data'>
              {Object.keys(basicSeed)
                .slice(basicStartIndex, basicStartIndex + itemsPerPage)
                .map(key => (
                <>
                  <div key={key} className='data-container'>
                    <img src={basicSeed[key].imageBase64} onClick={() => copyToClipboard(basicSeed[key])} 
                          style={{height: 380, width: 300}} alt={basicSeed[key].seed}></img>
                    <div className='stats-container'>
                      <span><FaCopy /></span>
                      <span>{basicSeed[key].copyCount}</span>
                    </div>
                  </div>
                </>
              ))}
            </div>

            <div className='right-arrow' onClick={() => handleRightArrow("basic")}><FaAngleRight /></div>

          </div>
        </section>
      </>}
    </main>
    </>
  )
}

export default HomeComponent;
