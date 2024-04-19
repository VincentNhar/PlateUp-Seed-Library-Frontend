import React, { useState,useEffect } from 'react'
import "./Home.css"
import axios from 'axios';

function HomeComponent() {

  const [seedData, setSeedData] = useState([]);
  const [popularSeed, setPopularSeed] = useState([]);
  const [hugeSeed, setHugeSeed] = useState([]);
  const [largeSeed, setLargeSeed] = useState([]);
  const [mediumSeed, setMediumSeed] = useState([]);
  const [basicSeed, setBasicSeed] = useState([]);

  const copyToClipboard = (data) => {
    navigator.clipboard.writeText(data.seed)
    alert(`${data.seed} has been copied successfully`)

    // Increment the copyCount
    const updatedSeedData = seedData.map(seed => {
      if (seed.seed === data.seed) {
        return {
          ...seed,
          copyCount: seed.copyCount + 1
        };
        
      }
      return seed;
    });

    setSeedData(updatedSeedData);

    updatedSeedData.map(seed => {
      if(seed.seed = data.seed){
        updateData(seed)
      }
    })
    window.location.reload();
  }

  const updateData = async (data) => {
    try {
      const response = await axios.put(`http://localhost:3001/map/${data._id}`, {
        copyCount: parseInt(data.copyCount)
      });
      return response.data;
    } catch (error) {
      console.error("Error updating data:", error);
      throw error;
    }
  }

  const fetchData = async () =>{
    try{
      console.log('Fetching a list of seed data');
      const response = await axios.get('http://localhost:3001/map/map-list')
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
          <img src="" alt="+"></img>
          <span>Add Map</span>
        </a>
      </div>

      <section id="popular-seed">
        <div className='section-title'>
          <h2>Popular Seed</h2>
          <hr></hr>
        </div>
        <div className='section-content'>
        {/* Needs to be implemented by using react library icons */}
          <div className='left-arrow'></div>

          
          <div className='section-data'>
            {Object.keys(popularSeed).map(key => (
              <>
                <div key={key} className='data-container'>
                  <div className='type-tag'>{popularSeed[key].type}</div>
                  <img src={popularSeed[key].imageBase64} onClick={() => copyToClipboard(popularSeed[key])} 
                        style={{height: 400, width: 350}} alt={popularSeed[key].seed}></img>
                </div>
              </>
            ))}
          </div>
          

        {/* Needs to be implemented by using react library icons */}
          <div className='arrow-right'></div>
        </div>
      </section>

      <section id="huge-seed">
        <div  className='section-title'>
          <h2>Huge Seed</h2>
          <hr></hr>
        </div>
        <div className='section-content'>
        {/* Needs to be implemented by using react library icons */}
          <div className='left-arrow'></div>

          
          <div className='section-data'>
            {Object.keys(hugeSeed).map(key => (
              <>
                <div key={key} className='data-container'>
                  <img src={hugeSeed[key].imageBase64} onClick={() => copyToClipboard(hugeSeed[key])} 
                        style={{height: 400, width: 350}} alt={hugeSeed[key].seed}></img>
                </div>
              </>
            ))}
          </div>
          
        {/* Needs to be implemented by using react library icons */}
          <div className='arrow-right'></div>
        </div>
      </section>


      <section id="large-seed">
        <div  className='section-title'>
          <h2>Large Seed</h2>
          <hr></hr>
        </div>
        <div className='section-content'>
        {/* Needs to be implemented by using react library icons */}
          <div className='left-arrow'></div>

          
          <div className='section-data'>
            {Object.keys(largeSeed).map(key => (
              <>
                <div key={key} className='data-container'>
                  <img src={largeSeed[key].imageBase64} onClick={() => copyToClipboard(largeSeed[key])} 
                        style={{height: 400, width: 350}} alt={largeSeed[key].seed}></img>
                </div>
              </>
            ))}
          </div>
          
        {/* Needs to be implemented by using react library icons */}
          <div className='arrow-right'></div>
        </div>
      </section>

      <section id="medium-seed">
        <div  className='section-title'>
          <h2>Medium Seed</h2>
          <hr></hr>
        </div>
        <div className='section-content'>
        {/* Needs to be implemented by using react library icons */}
          <div className='left-arrow'></div>

          
          <div className='section-data'>
            {Object.keys(mediumSeed).map(key => (
              <>
                <div key={key} className='data-container'>
                  <img src={mediumSeed[key].imageBase64} onClick={() => copyToClipboard(mediumSeed[key])} 
                        style={{height: 400, width: 350}} alt={mediumSeed[key].seed}></img>
                </div>
              </>
            ))}
          </div>
          
        {/* Needs to be implemented by using react library icons */}
          <div className='arrow-right'></div>
        </div>
      </section>

      <section id="basic-seed">
        <div  className='section-title'>
          <h2>Basic Seed</h2>
          <hr></hr>
        </div>
        <div className='section-content'>
        {/* Needs to be implemented by using react library icons */}
          <div className='left-arrow'></div>

          
          <div className='section-data'>
            {Object.keys(basicSeed).map(key => (
              <>
                <div key={key} className='data-container'>
                  <img src={basicSeed[key].imageBase64} onClick={() => copyToClipboard(basicSeed[key])} 
                        style={{height: 400, width: 350}} alt={basicSeed[key].seed}></img>
                </div>
              </>
            ))}
          </div>
          
        {/* Needs to be implemented by using react library icons */}
          <div className='arrow-right'></div>
        </div>
      </section>
    </main>
    </>
  )
}

export default HomeComponent;
