import React, { useState, useEffect, useContext, useRef } from 'react';
import { SiIfixit } from 'react-icons/si';
import { TiStarFullOutline, TiStarHalfOutline, TiStarOutline } from 'react-icons/ti';
import { BsPlusCircle } from 'react-icons/bs';

const Input = (props) => {
  const [textInputs, setTextInputs] = useState({
    summary: '',
    body: '',
    nickname: '',
    email: ''
  });
  const [rating, setRating] = useState(0);
  const [recommendation, setRecommendation] = useState(undefined);
  const [characteristics, setCharacteristics] = useState({});
  const [photos, setPhotos] = useState([]);
  const hiddenFileInput = useRef(null);
  const [loading, setLoading] = useState(false);


  // useEffect(() => {
  //   console.log(props.characteristics)
  // })

  const handleOnChange = (e) => {
    //prevState when used in a setState returns the state before invoking the setState
    //Spread operator on an object works such that ({...object}) returns the object
    //  ({...object, key: value}) assigns the object's key to that value
    //  Therefore, assigning [e.target.name] will override the prevState's object key:value pair
    setTextInputs((prevTextInputs) => {
      return ({...prevTextInputs, [e.target.name]: e.target.value})
    });
    // console.log(textInputs);
  };

  const renderStars = () => {
    let stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(renderStar(i))
    }
    return (
      <div className='reviewInputStarSection'>
        {stars.map((star) => star)}
        <p>{renderStarIndicator()}</p>
      </div>
    )
  };

  const renderStar = (value) => {
    if (rating - value >= 0) {
      return <div key={value}><TiStarFullOutline className='ratingInputStar star' size={20} onClick={()=>{handleStarClick(value)}}/></div>;
    } else {
      return <div key={value}><TiStarOutline className='ratingInputStar star' size={20} onClick={()=>{handleStarClick(value)}}/></div>;
    }
  };

  const renderStarIndicator = () => {
    switch(rating) {
      case 1:
        return 'Poor';
        break;
      case 2:
        return 'Fair';
        break;
      case 3:
        return 'Average';
        break;
      case 4:
        return 'Good';
        break;
      case 5:
        return 'Great';
        break;
      default:
        return;
    }
  };

  const handleStarClick = (value) => {
    setRating(value);
  };

  const renderRecommendations = () => {
    return(
      <div className='reviewInputRecommendations'>
        <input type='radio' name='recommendation' value='true'></input>
        <p>Yes</p>
        <input type='radio' name='recommendation' value='false'></input>
        <p>No</p>
      </div>
    )
  };

  const renderCharacteristics = (id) => {
    let characteristicButtons = [];
    for (let i = 1; i <= 5; i++) {
      characteristicButtons.push(<input type='radio' name={id} value={i} key={id+i} onChange={handleCharacteristicClick}></input>)
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
    return (
      <div className='reviewInputCharacteristicSection' key={characteristic}>
        <h4 className='reviewInputCharacteristicLabel'>{characteristic}</h4>
        <div className='reviewInputCharacteristicButtons'>
          {renderCharacteristics(id)}
        </div>
        <div className='reviewInputCharacteristicsDescriptors'>
          {renderCharacteristicsDescriptor(characteristic, id).map((descriptor) => <p key={descriptor+id}>{descriptor}</p>)}
        </div>
      </div>
    )
  };

  const renderCharacteristicsAggregate = () => {
    let characteristicAggregate = [];
    for (let characteristic in props.characteristics) {
      characteristicAggregate.push(renderCharacteristicsSection(characteristic, props.characteristics[characteristic].id));
    }
    return (
      <div className='reviewInputCharacteristicsAggregate'>
        {characteristicAggregate.map((characteristic, index) => characteristic)}
      </div>
      );
  };

  const handleCharacteristicClick = (e) => {
    setCharacteristics((prevCharacteristics) => ({...prevCharacteristics, [e.target.name]:e.target.value}));
  };

  const renderPhotos = () => {
    //render photo gallery up to 5 images (button will disappear after 5 images)
    //Upload button onClick refers to a button that clicks useRef that is referred to by the file input
    //  This allows making a button that's stylized instead of the default file input button
    return(
      <div className='reviewInputPhotoSection'>
        {photos.map((photo) => <img className='reviewInputPhotoThumbnail' src={photo}/>)}
        {photos.length < 5 &&
          <div className='reviewInputPhotoButton' onClick={handlePhotoClick}>
            <BsPlusCircle className='reviewInputPhotoButtonPlus'/>
            <p className='reviewInputPhotoButtonText'>Upload</p>
          </div>}
        <input type='file' style={{display:'none'}} ref={hiddenFileInput} onChange={handlePhotoInput}></input>
      </div>
    )
  };

  const handlePhotoClick = () => {
    // console.log('clicked!');
    hiddenFileInput.current.click();
  }

  const handlePhotoInput = (e) => {
    console.log(e.target.files);
    console.log(URL.createObjectURL(e.target.files[0]))
    let newPhotos = photos.slice();
    newPhotos.push(URL.createObjectURL(e.target.files[0]))
    console.log(newPhotos);
    setPhotos(newPhotos);
  };

  const handleSubmit = () => {

  };

  const test = (e) => {
    // console.log(props.characteristics);
    // console.log(e);
    // console.log(e.target);
    console.log('value: ', e.target.value);
    console.log('name: ', e.target.name);
  }

  return (
    <form className='reviewInput'>
      <SiIfixit className='reviewInputExit' size={30} onClick={props.handleOverlay}/>
      <h2>Write Your Review</h2>
      <h4>About The <u>{props.productName}</u></h4>
      <h3>Overall rating<span style={{color:'red'}}>*</span></h3>
      {renderStars()}
      <h3>Do you recommend this product?<span style={{color:'red'}}>*</span></h3>
      {renderRecommendations()}
      <h3>Characteristics<span style={{color:'red'}}>*</span></h3>
      {renderCharacteristicsAggregate()}
      <h3>Review summary</h3>
      <textarea name='summary' placeholder='Example: Best purchase ever!' maxLength='60' onChange={handleOnChange}></textarea>
      <h3>Review body<span style={{color:'red'}}>*</span></h3>
      <textarea name='body' placeholder='Why did you like the product or not?' maxLength='1000' onChange={handleOnChange}></textarea>
      {textInputs.body.length < 50
      ?<p>Minimum required characters left: [{50 - textInputs.body.length}]</p>
      :<p>Minimum reached</p>}
      <h3>Upload your photos</h3>
      {renderPhotos()}
      {/* <input type='file'></input> */}
      <h3>What is your nickname<span style={{color:'red'}}>*</span></h3>
      <input type='text' className='reviewTextInput' name='nickname' placeholder='Example: jackson11!' maxLength='60' onChange={handleOnChange}></input>
      <p>For privacy reasons, do not use your full name or email address</p>
      <h3>Your email<span style={{color:'red'}}>*</span></h3>
      <input type='text' className='reviewTextInput' name='email' placeholder='Example: jackson11@email.com' maxLength='60' onChange={handleOnChange}></input>
      <p>For authentication reasons, you will not be emailed</p>
      <button className='reviewSubmit' type='submit'>Submit review</button>
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