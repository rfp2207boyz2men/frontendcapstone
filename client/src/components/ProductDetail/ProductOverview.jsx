import React, { useState, useEffect, useId } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { OrbitSpinner } from 'react-epic-spinners';
import { FcCheckmark } from 'react-icons/fc';
import { FaFacebook, FaTwitter, FaPinterest } from 'react-icons/fa';
import { FacebookShareButton, TwitterShareButton, PinterestShareButton } from 'react-share';
import { TiTick } from 'react-icons/ti';




/* --------------------  ProductOverview  --------------------*/

function ProductOverview({ product, currentPhoto, currentStyle }) {
  const [loading, setLoading] = useState(true);
  const [shareQuote, setShareQuote] = useState();
  const [shareHashtag, setShareHashtag] = useState();
  const [shareUrl, setShareUrl] = useState();

  useEffect(() => {
    if (currentStyle) {
      setShareQuote(`Check this Awesome item! ${product.name}, $${product.default_price}`);
      setShareHashtag([`Awesome:${product.category}`, `Reviews:${product.totalReviews}`]);
      // set loading was moved to product useEffect
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

  return (
    <div>
      {!loading ?
        <div className='prodview-container'>
          <div className='prodview-text'>
            <h2>{product.slogan}</h2>
            <p>{product.description}</p>
          </div>
          <div className='prodview-line'></div>
          <div>
            {product.features.map(item => {
              let id = Math.random();
              return (
                <div className='feature' key={id}>
                  {item.value ? <p><FcCheckmark className='check' />{item.feature}: {item.value}</p> : <p><FcCheckmark className='check' />{item.feature}</p>}
                </div>
              )
            })}
          </div>
        </div>
        :
        <OrbitSpinner color="teal" />
      }
    </div>
  )
}


export default ProductOverview;

