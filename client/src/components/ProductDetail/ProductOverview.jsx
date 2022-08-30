import React, { useState, useEffect, useId } from 'react';
import { OrbitSpinner } from 'react-epic-spinners';
import { FaFacebook, FaTwitter, FaPinterest } from 'react-icons/fa';
import { FacebookShareButton, TwitterShareButton, PinterestShareButton } from 'react-share';
import { TiTick } from 'react-icons/ti';

function ProductOverview  ({ p1, currentProduct }) {
  const [loading, setLoading] = useState(true);
  const [shareQuote, setShareQuote] = useState(`Check this Awesome item! ${currentProduct.name}, $${currentProduct.default_price}`);
  const [shareHashtag, setShareHashtag] = useState([`Awesome:${currentProduct.category}`, `Reviews:${currentProduct.totalReviews}`]);
  const [shareUrl, setShareUrl] = useState(currentProduct.styles[0].photos[0].url);

  useEffect(() => {
    if(p1.length > 0) {
      setLoading(false);
    }
  }, [p1])

  useEffect(() => {
    setShareQuote(`Check this Awesome item! ${currentProduct.name}, only for.. $${currentProduct.default_price}`);
    setShareHashtag(`${currentProduct.category}`);
    setShareUrl(currentProduct.styles[0].photos[0].url);
  }, [currentProduct])

  return (
    <div>
      {!loading ?
      <div className='prodview-container'>

       <div className='prodview-text'>
        <h2>{currentProduct.slogan}</h2>
        <p>{currentProduct.description}</p>
        <div className='social'>
          <FacebookShareButton url={shareUrl} quote={shareQuote} hashtag={`#${shareHashtag}`}>
            <FaFacebook />
          </FacebookShareButton>
          <TwitterShareButton url={shareUrl} title={shareQuote}  hashtag={`${shareHashtag}`}>
            <FaTwitter />
          </TwitterShareButton>
          <PinterestShareButton  url={shareUrl} media={shareUrl} description={shareQuote} >
            <FaPinterest />
          </PinterestShareButton>
        </div>
      </div>

      <div className='prodview-line'></div>
      <div>
        {currentProduct.features.map((item) => {
          let id = Math.random();
          return (
            <div key={id}>
              <p><TiTick/>{item.feature}</p>
              <p><TiTick/>{item.value}</p>
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