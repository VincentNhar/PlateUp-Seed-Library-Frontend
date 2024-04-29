import React, { useState } from 'react';
import './AddMapComponent.css';
import axios from 'axios';

function AddMapComponent() {

  const [URL, setURL] = useState('https://plateup-seed-library-backend.onrender.com')

  const [selectedValue, setSelectedValue] = useState("");
  const [previewImage, setPreviewImage] = useState(null);
  const [selectedFileName, setSelectedFileName] = useState("No image selected");

  const [formData, setFormData] = useState ({
      imageBase64:'',
      seed:'',
      type:''
  })

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
        await axios.post(`${URL}/map/add`, formData);

        
        // Reset form data after successful submission
        setFormData({
          imageBase64: '',
          seed: '',
          type: ''
      });
      
      window.location.reload()

        
      setPreviewImage(null);
      setSelectedFileName('No image selected');

    } catch (error) {
        console.error('Error submitting form:', error);
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
            <a href="/"><h1>Vincent's PlateUp Seed Library</h1></a>
        </nav>
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
                  <label htmlFor="seed-textfield">Seed:</label>
                </div>
                <div>
                  <input id="seed-textfield" type='text' name='seed' onChange={handleChange} 
                         placeholder='A1B2C3D4' maxLength={8} required/>
                </div>
                <div>
                  <label htmlFor="type-textfield">Type:</label>
                </div>
                <div>
                  <select name='type' onChange={handleChange}
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
