import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import Parse from '../../parse';
import { FaCheckCircle } from 'react-icons/fa';
import { FaFacebook, FaTwitter, FaPinterest } from 'react-icons/fa';
import { FacebookShareButton, TwitterShareButton, PinterestShareButton } from 'react-share';
import { OrbitSpinner } from 'react-epic-spinners';
import { TiStarFullOutline, TiStarHalfOutline, TiStarOutline } from 'react-icons/ti';


function StyleInformation({
  product,
  currentStyle,
  currentPhoto,
  renderStars,
  handleStyleClick,
  handleLocalClick,
  localName,
  localId,
  handleLocalSave,
  getCart,
  outfitAdd,
  outfits,
}) {
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState();
  const [sizeSelected, setSizeSelected] = useState(false);
  const [sizeClick, setSizeClick] = useState(false);
  const [skusId, setSkusId] = useState();
  const [shareQuote, setShareQuote] = useState();
  const [shareHashtag, setShareHashtag] = useState();
  const [shareUrl, setShareUrl] = useState();
  const [haveStock, setHaveStock] = useState(true);

  useEffect(() => {
    if (currentStyle) {
      setShareQuote(`Check this Awesome item! ${product.name}, $${product.default_price}`);
      setShareHashtag([`Awesome:${product.category}`, `Reviews:${product.totalReviews}`]);
      if (currentStyle.skus.null) {
        setHaveStock(false);
      }
    }
  }, [currentStyle])

  useEffect(() => {
    setShareUrl(currentPhoto);
  }, [currentPhoto]);



  useEffect(() => {
    if (product) {
      setLoading(false);
    }
  }, [product])

  let renderAvgStars = () => {
    return renderStars(product.averageRating).map((star => star))
  };


  let findDuplicates = [];
  let sizeRenderList = [];

  const handleSize = (e) => {
    let keys = [];
    const index = e.target.selectedIndex;
    const el = e.target.childNodes[index]
    const option = el.getAttribute('id');

    for (let key in currentStyle.skus) {
      keys.push(key);
    }

    for (let i = 0; i < keys.length; i++) {
      if (currentStyle.skus[keys[i]].size === option) {
        setSkusId(parseInt(keys[i]));
      }
    }
    setQty(parseInt(e.target.value));
    if (e.target.value === '0') {
      setSizeClick(true);
    }
    if (e.target.value !== '0') {
      setSizeClick(false);
    }
  }

  const renderQty = (qty) => {

    let items = [...Array(qty)].map((e, i) => {
      if (i < 2 || i > 15) {
        return;
      } else {
        return <option value={e} key={i}>{i}</option>;
      }
    })

    return items;
  }

  const handleQty = (e) => {
    setSizeClick(false);
    setSizeSelected(true);
  }


  async function addToCart(skusId) {
    let params = { sku_id: skusId };
    const request = await Parse.create('cart', undefined, params);
    getCart();
  }

  const handleAddToCart = (e) => {
    e.preventDefault();
    if (sizeSelected) {
      addToCart(skusId);
    }
  }


  const relatedLink = (e) => {
    e.preventDefault();
    window.location.replace("/#reviews");
  }

  const handleOutfitClick = () => {
    outfitAdd(product)
  }

  return (
    <div>
      {!loading ?
        <div className='info-container'>
          <div>
            {renderAvgStars()}
            <a href='' onClick={relatedLink}>Read all {product.totalReviews} reviews</a>
          </div>

          <h4 className='style-category'>{product.category}</h4>
          <h2 className='style-name'>{product.name}</h2>
          {currentStyle.sale_price !== null ?
            <div>
              <h2 className='price price-sale'>${currentStyle.sale_price}</h2>
              <h2 className='price price-line'>${currentStyle.original_price}</h2>
            </div>

            : <h2 className='price'>${product.default_price}</h2>}

          <div>
            <div className='style-title'>
              <h4 className='style-text style'> Style: </h4>
              <h4 className='style-text'>{product.styles[0].photos[0].thumbnail_url === null ? 'No style available' : currentStyle.name}</h4>
            </div>
            <div className='style-container'>

              {
                product.styles.map(item => {
                  let id = Math.random();
                  if (findDuplicates.includes(item.photos[0].thumbnail_url)) {
                    return;
                  } else {
                    findDuplicates.push(item.photos[0].thumbnail_url);
                    if (item.photos[0].thumbnail_url === null) {
                      return;
                    }
                    if (currentStyle.photos[0].url === item.photos[0].url) {
                      return (
                        <div className='style-container-active' key={id}>
                          <img className='style-entry-active' key={id}
                            id={item.style_id}
                            name={item.name}
                            onClick={(e, url, prod) => {
                              handleStyleClick(e, item.url, item);
                            }}
                            src={item.photos[0].thumbnail_url}
                            alt='Style Thumbnail'></img>
                          <FaCheckCircle className='check-active' />
                        </div>
                      )
                    } else {
                      return (
                        <img className='style-entry' key={id}
                          id={item.style_id}
                          name={item.name}
                          onClick={(e, url, prod) => {
                            handleStyleClick(e, item.url, item);
                          }}
                          src={item.photos[0].thumbnail_url}
                          alt='Style Thumbnail'></img>
                      )
                    }
                  }

                })}

            </div>
          </div>
          {!haveStock ?
            <div className='add-container'>
              <div className='out-of-stock'>out of stock :(</div>
            </div>
            :
            <div className='add-container'>
              {sizeClick ? <div className='select-size-please'>Please select a size</div> : <></>}
              <select className='select select-size-dropdown' value={qty} onChange={handleSize}>
                <option className='select' value="0">SELECT SIZE</option>
                {currentStyle &&
                  Object.values(currentStyle.skus).map((item => {
                    let idR = Math.random();
                    if (sizeRenderList.includes(item.size)) {
                      return;
                    } else {
                      sizeRenderList.push(item.size);
                      return <option className='select' id={item.size} value={item.quantity} key={idR}>{item.size}</option>
                    }
                  }))}
              </select>

              <select className='select select-quantity' onChange={handleQty}>
                {qty ? <option className='option'>1</option> : <option className='option' value="-">-</option>}
                {qty && renderQty(qty)}
              </select>

              <button className='add-cart' onClick={(e) => { handleLocalSave(e); handleAddToCart(e); }}>ADD TO CART</button>
              <button className='select select-star' aria-label='Add Outfit' onClick={handleOutfitClick}><TiStarFullOutline /></button>
            </div>
          }

          <div className='social'>
            <FacebookShareButton className='social-btn' url={shareUrl} quote={shareQuote} hashtag={`#${shareHashtag}`}>
              <FaFacebook />
            </FacebookShareButton>
            <TwitterShareButton className='social-btn' url={shareUrl} title={shareQuote} hashtag={`${shareHashtag}`}>
              <FaTwitter />
            </TwitterShareButton>
            <PinterestShareButton className='social-btn' url={shareUrl} media={shareUrl} description={shareQuote} >
              <FaPinterest />
            </PinterestShareButton>
          </div>
        </div>
        :
        <OrbitSpinner color="teal" />
      }
    </div>



  )

}

export default StyleInformation;