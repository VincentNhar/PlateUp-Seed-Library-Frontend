import React, { useState,useEffect } from 'react'
import { FaAngleLeft, FaAngleRight, FaPlus, FaCopy } from "react-icons/fa6";
import "./Home.css"
import axios from 'axios';

function HomeComponent() {

  const [URL, setURL] = useState('https://cute-plum-sea-lion-wrap.cyclic.app')

  const [seedData, setSeedData] = useState([]);
  const [popularSeed, setPopularSeed] = useState([]);
  const [hugeSeed, setHugeSeed] = useState([]);
  const [largeSeed, setLargeSeed] = useState([]);
  const [mediumSeed, setMediumSeed] = useState([]);
  const [basicSeed, setBasicSeed] = useState([]);

  const [popularStartIndex, setPopularStartIndex] = useState(0);
  const [hugeStartIndex, setHugeStartIndex] = useState(0);
  const [largeStartIndex, setLargeStartIndex] = useState(0);
  const [mediumStartIndex, setMediumStartIndex] = useState(0);
  const [basicStartIndex, setBasicStartIndex] = useState(0);

  const itemsPerPage = 4;

  const handleRightArrow = (section) => {
    console.log("right arrow clicked");
    switch (section) {
      case "popular":
        console.log(`${popularStartIndex + itemsPerPage} < ${popularSeed.length}`)
        if (popularStartIndex + itemsPerPage < popularSeed.length){
          console.log("popularStartIndex: ",popularStartIndex)
          console.log("itemsPerPage + index: ",itemsPerPage + popularStartIndex)
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
    console.log("left arrow clicked");
    let startIndexSetter;
    switch (section) {
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

      const response = await axios.put(`https://cute-plum-sea-lion-wrap.cyclic.app/map/${data._id}`, {
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

  const fetchData = async () =>{
    try{
      console.log('Fetching a list of seed data');
      const response = await axios.get(`${URL}/map/map-list`)
      const seedDataList = response.data

      //Sorted by number of copyCount
      const sortedPopularSeed = [...seedDataList].sort((a, b) => b.copyCount - a.copyCount);

      //Filtered by type: Huge
      const hugeSeedList = seedDataList.filter(seed => seed.type === "Huge");

      //Filtered by type: Large
      const largeSeedList = seedDataList.filter(seed => seed.type === "Large");

      //Filtered by type: Medium
      const mediumSeedList = seedDataList.filter(seed => seed.type === "Medium");

      //Filtered by type: Basic
      const basicSeedList = seedDataList.filter(seed => seed.type === "Basic");

      setSeedData(seedDataList);
      setPopularSeed(sortedPopularSeed);
      setHugeSeed(hugeSeedList);
      setLargeSeed(largeSeedList)
      setMediumSeed(mediumSeedList)
      setBasicSeed(basicSeedList)

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
    </main>
    </>
  )
}

export default HomeComponent;
