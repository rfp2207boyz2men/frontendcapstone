import React, { useState, useEffect, useId } from 'react';
import { OrbitSpinner } from 'react-epic-spinners';
import { FcCheckmark } from 'react-icons/fc';
import { FaFacebook, FaTwitter, FaPinterest } from 'react-icons/fa';
import { FacebookShareButton, TwitterShareButton, PinterestShareButton } from 'react-share';
import { TiTick } from 'react-icons/ti';

function ProductOverview  ({ product }) {
  const [loading, setLoading] = useState(true);
  const [shareQuote, setShareQuote] = useState();
  const [shareHashtag, setShareHashtag] = useState();
  const [shareUrl, setShareUrl] = useState();

  useEffect(() => {
    if (product) {
      console.log('prod?', product);
      setShareQuote(`Check this Awesome item! ${product.name}, $${product.default_price}`);
      setShareHashtag([`Awesome:${product.category}`, `Reviews:${product.totalReviews}`]);
      setLoading(false);
    }
  }, [product])

  // useEffect(() => {
  //   setShareQuote(`Check this Awesome item! ${currentProduct.name}, only for.. $${currentProduct.default_price}`);
  //   setShareHashtag(`${currentProduct.category}`);

  //   if (currentProduct.styles.length > 0) {
  //     setShareUrl(currentProduct.styles[0].photos[0].url);
  //   } else {
  //     setShareUrl('no photo');
  //   }
  // }, [currentProduct])

  // useEffect(() => {
  //   if(p1.length > 0) {
  //     setLoading(false);
  //   }
  // }, [p1])

  return (
    <div>
      {!loading ?
      <div className='prodview-container'>

       <div className='prodview-text'>
        <h2>{product.slogan}</h2>
        <p>{product.description}</p>
        <div className='social'>
          {/* <FacebookShareButton url={shareUrl} quote={shareQuote} hashtag={`#${shareHashtag}`}>
            <FaFacebook />
          </FacebookShareButton>
          <TwitterShareButton url={shareUrl} title={shareQuote}  hashtag={`${shareHashtag}`}>
            <FaTwitter />
          </TwitterShareButton>
          <PinterestShareButton  url={shareUrl} media={shareUrl} description={shareQuote} >
            <FaPinterest />
          </PinterestShareButton> */}
        </div>
      </div>

      <div className='prodview-line'></div>
      <div>
        {product.features.map(item => {
           let id = Math.random();
           return (
             <div key={id}>
               <p><FcCheckmark />{item.feature}</p>
               <p><FcCheckmark />{item.value}</p>
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