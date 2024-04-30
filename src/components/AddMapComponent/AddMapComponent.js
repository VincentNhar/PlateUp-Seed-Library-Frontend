import React, { useState } from 'react';
import { FaCheck, FaTimesCircle } from "react-icons/fa";
import './AddMapComponent.css';
import axios from 'axios';

function AddMapComponent() {

  const [URL, setURL] = useState('https://plateup-seed-library-backend.onrender.com')
  const [showAlertBox, setShowAlertBox] = useState(false);
  const [alertStatus, setAlertStatus] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  const [selectedValue, setSelectedValue] = useState("");
  const [previewImage, setPreviewImage] = useState(null);
  const [selectedFileName, setSelectedFileName] = useState("No image selected");

  const [formData, setFormData] = useState ({
      imageBase64:'',
      seed:'',
      type:''
  })

  const alertBox = (type, message) => {
    switch (type){
      case 'success':
        return (
          <>
            <div className='message-container success-box'>
              <div className='alert-icon'>
                  <FaCheck />
              </div>
              <div>
                  <span className='alert-type'>Success: </span>
                  <span className='message-text'>{message}</span>
              </div>
            </div>
          </>
        );
      case 'error':
        return (
          <>
            <div className='message-container error-box'>
              <div>
                <div className='alert-icon'>
                  <FaTimesCircle />
                </div>
              </div>
              <div>
                  <span className='alert-type'>Error: </span>
                  <span className='message-text'>{message}</span>
              </div>
            </div>
          </>
        );
    }
  }

  const handleChange = (event) => {
      setSelectedValue(event.target.value);

      console.log(event.target)

      const { name, value } = event.target;

      setFormData({
        ...formData,
        [name]: value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {

        console.log("before submit: ",formData);
        const response = await axios.post(`${URL}/map/add`, formData);

        if (response.status === 201){
          setAlertStatus("success")
          setAlertMessage("New seed has been successfully added")
        }

        setShowAlertBox(true);

        console.log("HTTP Response:", response)
        
        // Reset form data after successful submission
        setFormData({
          imageBase64: '',
          seed: '',
          type: ''
        });

        // Clear input values
        document.getElementById('seedInput').value = '';
        document.getElementById('typeInput').value = '';
      
        
      setPreviewImage(null);
      setSelectedFileName('No image selected');

    } catch (error) {
        console.error('Error submitting form:', error)
        if (error.response.data.code === 11000){
          setAlertStatus("error")
          setAlertMessage(`Map with seed "${error.response.data.keyValue.seed}" already exists`)
          setShowAlertBox(true);
        }
    }
  };
  
  const handleImgUpload = (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewImage(reader.result);

          setFormData({
            ...formData,
            imageBase64: reader.result
          })
          
        };
        reader.readAsDataURL(file);
        setSelectedFileName(file.name);
      }
  };

  function truncateMiddle(text, maxLength = 20) {
    if (text.length <= maxLength) {
      return text;
    }
  
    const startLength = Math.floor((maxLength - 3) / 2);
    const endLength = Math.ceil((maxLength - 3) / 2);
  
    return text.substr(0, startLength) + '...' + text.substr(text.length - endLength);
  }

  return (
    <>
    <header>
        <nav>
            <a href="/">
              <h1>
                <span>PlateUp Seed Library </span> 
                <span>created by Vincent Nhar</span>
              </h1>
            </a>
        </nav>

        <div className='alertbox-container'>
        {showAlertBox && alertBox(alertStatus, alertMessage)}
        </div>

    </header>
    <main className='addmap-main'>
        <div className='content-header'>
        </div>
        <div className='content-body'> 
          <form onSubmit={handleSubmit}>
            <div className='left-content'>
              <h1>Add New Map</h1>
              <h3>Please enter the seed's information</h3>
              <div className='seed-container'>
                <div>
                  <label htmlFor="seedInput">Seed:</label>
                </div>
                <div>
                  <input id="seedInput" type='text' name='seed' onChange={handleChange} 
                         placeholder='A1B2C3D4' maxLength={8} required/>
                </div>
                <div>
                  <label htmlFor="typeInput">Type:</label>
                </div>
                <div>
                  <select id="typeInput" name='type' onChange={handleChange}
                          className={`custom-select ${selectedValue ? '' : 'placeholder-text'}`}
                          defaultValue="">
                    <option value="" disabled>Select Type (w x h)</option>
                    <option value="Huge">Huge (16 x 12)</option>
                    <option value="Large">Large (13 x 9)</option>
                    <option value="Medium">Medium (14 x 6)</option>
                    <option value="Basic">Basic (10 x 7)</option>
                  </select>
                </div>
                <div>
                  <input className='submit-button' name='submitButton' type='submit' value='Submit' />
                </div>
              </div>
            </div>
            <div className='right-content'>
              <h1>Upload Image</h1>
              <h3>Please upload the seed's image</h3>
              <div>
                <div>
                  {previewImage ? <img src={previewImage} alt="Preview" /> : <img></img>}
                </div>
                <div className='upload-input'>
                  <label htmlFor="upload-image" className="custom-file-upload">Upload Image </label>
                  <label className='file-name'>{truncateMiddle(selectedFileName)}</label>
                  <input type='file' id='upload-image' accept='image/*' onChange={handleImgUpload}></input>
                </div>
              </div>
            </div>
          </form>
        </div>
    </main>
    </>
  );
};

export default AddMapComponent;
