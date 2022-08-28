import React, { useState, useEffect, useContext } from 'react';
import { SiIfixit } from 'react-icons/si';

const Input = (props) => {
  const [textInputs, setTextInputs] = useState({
    summary: '',
    body: '',
    nickname: '',
    email: ''
  });
  const [recommendation, setRecommendation] = useState(undefined);
  const [characteristics, setCharacteristics] = useState({});
  const [photos, setPhotos] = useState([]);

  const handlePhotoInput = () => {

  };

  const handleOnChange = (e) => {
    //prevState when used in a setState returns the state before invoking the setState
    //Spread operator on an object works such that ({...object}) returns the object
    //  ({...object, key: value}) assigns the object's key to that value
    //  Therefore, assigning [e.target.name] will override the prevState's object key:value pair
    setTextInputs((prevState) => {
      return ({...prevState, [e.target.name]: e.target.value})
    });
    // console.log(textInputs);
  };

  const handleSubmit = () => {

  };

  const renderRecommendations = () => {

  };

  const renderCharacteristics = () => {

  };

  return (
    <form className='reviewInput'>
      <h3>Write Your Review</h3>
      <h4>About The {props.productName}</h4>
      <div onClick={props.handleOverlay}><SiIfixit /></div>
      {/* {renderRecommendations()} */}
      {/* {renderCharacteristics()} */}
      <textarea name='summary' placeholder='Example: Best purchase ever!' maxLength='60' onChange={handleOnChange}></textarea>
      <textarea name='body' placeholder='Why did you like the product or not?' maxLength='1000' onChange={handleOnChange}></textarea>
      {textInputs.body.length < 50
      ?<p>Minimum required characters left: [{50 - textInputs.body.length}]</p>
      :<p>Minimum reached</p>}
      <input type='file'></input>
      <input type='text' name='nickname' placeholder='Example: jackson11!' maxLength='60' onChange={handleOnChange}></input>
      <p>For privacy reasons, do not use your full name or email address</p>
      <input type='text' name='email' placeholder='Example: jackson11@email.com' maxLength='60' onChange={handleOnChange}></input>
      <p>For authentication reasons, you will not be emailed</p>
      <button type='submit'>Submit Form</button>
    </form>
  );
};

export default Input;

/*
What needs to be in Input:
  Star ratings:
    Five outline stars
    Clicking a star will fill that star and the ones left of it
    Clicking a star will show text to the right of the stars indicating the meaning of the star
      1 - Poor
      2 - Fair
      3 - Average
      4 - Good
      5 - Great

  Recommendation:
    Two radio buttons

  Characteristics:
    5 radio buttons for each characteristic
      Above each button is the meaning for each button respective to its characteristic
      Default for each characteristic is no button selected

  -Review summary (optional):
    -Text input of up to 60 characters.
    -Placeholder: "Example: Best purchase ever!"

  -Review body:
    -Text input of up to 1000 characters.
    -Placeholder: "Why did you like the product or not?"
    -Must be at least 50 characters.
      -Below input is a counter of how many characters remaining to reach 50
        -"Minimum required characters left: [##]"
        -Updates as user types
        -After reaching 50 characters, counter is replaced with message "Minimum reached"

  Photos (optional):
    Button
      Open separate window where photo can be selected
    After uploading a photo, a thumbnail should appear
    User can add up to five photos
      After five photos, button disappears
    URL.createObjectURL(e.target.files[0])

  -Nickname:
    -Text input of up to 60 characters.
    -Placeholder: "Example: jackson11!"
    -Below input is message: "For privacy reasons, do not use your full name or email address"

  -Email:
    -Text input of up to 60 characters.
    -Placeholder: "Example: jackson11@email.com"
    -Below input is message: "For authentication reasons, you will not be emailed"

  Submit button:
    Validate the form's inputs before submitting form
    Any invalid entries will prevent submission
      Show warning message titled "You must enter the following: ..."

*/