import React from 'react';
import { TiStarFullOutline, TiStarHalfOutline, TiStarOutline } from 'react-icons/ti';

function ProductInformation ({selectedProduct, handleLocalClick, localName, styles, handleLocalSave}) {

    return (
      <div className='info-container'>
        <div>
          <TiStarFullOutline className='star' />
          <TiStarFullOutline className='star' />
          <TiStarFullOutline className='star' />
          <TiStarHalfOutline className='star' />
          <TiStarOutline className='star' />
          <a href=''>Read all reviews</a>
        </div>
        <h4>{selectedProduct.category}</h4>
        <h2>{selectedProduct.name}</h2>
        <p>${selectedProduct.default_price}</p>
        <div>
      <div className='style-title'>
        <h4> STYLE > </h4>
        <h4>{localName}</h4>
      </div>
      <div className='style-container'>
        {/* style selector */}

        {styles[0].photos.map(pic => {
          let idR = Math.random();
          return <img key={idR}  name={name} onClick={handleLocalClick} className='style-entry'></img>
        })}

      {/* <img id={id} name={name} onClick={handleClick} src={url} className='style-entry'></img> */}


        {/* {styles.map(style => {
          return <Style handleClick={handleLocalClick} key={style.style_id} obj={style}
           id={style.style_id}
           name={style.name}
           url={style.photos[0].thumbnail_url}
           className='style-entry'/>
        })} */}


      </div>
    </div>

    <div className='add-container'>
      <select>
        <option value="0">Select SIZE:</option>
        <option value="1">Audi</option>
        <option value="2">BMW</option>
        <option value="3">Citroen</option>
        <option value="4">Ford</option>
      </select>

      <select>
        <option value="0">QUANTITY: 42</option>
        <option value="1">Audi</option>
        <option value="2">BMW</option>
        <option value="3">Citroen</option>
        <option value="4">Ford</option>
      </select>

      <button>ADD TO CART</button>
      <button onClick={handleLocalSave}><TiStarFullOutline /></button>
    </div>

      </div>
    )

}

export default ProductInformation;