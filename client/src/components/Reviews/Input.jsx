import React, { useState, useEffect, useContext } from 'react';
import { SiIfixit } from 'react-icons/si';
import { TiStarFullOutline, TiStarHalfOutline, TiStarOutline } from 'react-icons/ti';

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

  useEffect(() => {
    console.log(props.characteristics)
  })

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
    return(
      <div className='reviewOverlayRecommendations'>
        <input type='radio' name='yesRecommend'></input>
        <input type='radio' name='yesRecommend'></input>
      </div>
    )
  };

  const renderCharacteristics = (id) => {
    let characteristicButtons = [];
    for (let characteristic in props.characteristics) {
      for (let i = 1; i <= 5; i++) {
        characteristicButtons.push(<input type='radio' name={id} value={i} keyonChange={handleCharacteristicClick}></input>)
      }
    }
    return characteristicButtons.map((characteristic, index) => characteristic);
  };

  const renderCharacteristicsDescriptor = (characteristic) => {
    switch(characteristic) {
      case 'Size':
        return ['A size too small', 'A size too wide'];
      case 'Width':
        return ['Too narrow', 'Too wide'];
      case 'Comfort':
        return ['Uncomfortable', 'Perfect'];
      case 'Quality':
        return ['Poor', 'Perfect'];
      case 'Length':
        return ['Runs short', 'Runs long'];
      default:
        return ['Runs tight', 'Runs long'];
    }
  };

  const renderCharacteristicsSection = (characteristic, id) => {
    // console.log(typeof characteristic);
    // console.log(typeof id);
    return (
      <div className='reviewInputCharacteristicSection'>
        <h4>{characteristic}</h4>
        <div>
          {renderCharacteristics(id)}
        </div>
        <div>
          {renderCharacteristicsDescriptor(characteristic, id).map((descriptor) => <p key={descriptor+id}>{descriptor}</p>)}
        </div>
      </div>
    )
  };

  const renderAggregate = () => {
    let characteristicDiv = [];
    for (let characteristic in props.characteristics) {
      characteristicDiv.push(renderCharacteristicsSection(characteristic, props.characteristics[characteristic].id));
    }
    return characteristicDiv.map((characteristic, index) => characteristic);
  };

  const handleCharacteristicClick = (e) => {

  };

  // const renderStars = (e) => {
  //   // for (let)
  // }

  const test = (e) => {
    // console.log(props.characteristics);
    // console.log(e);
    // console.log(e.target);
    console.log('value: ', e.target.value);
    console.log('name: ', e.target.name);
  }

  return (
    <form className='reviewInput'>
      {/* <input type='radio' name='testy' value='2' onChange={test}></input>
      <input type='radio' name='testy' value='4' onChange={test}></input> */}
      <h3>Write Your Review</h3>
      <h4>About The {props.productName}</h4>
      <div onClick={props.handleOverlay}><SiIfixit /></div>
      {renderRecommendations()}
      {renderAggregate()}
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