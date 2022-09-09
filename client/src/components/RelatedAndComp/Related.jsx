import React, { useState, useEffect, useContext } from 'react';
import Parse from '../../parse.js';
import ProductCard from './ProductCard.jsx';
import Outfits from './Outfits.jsx';
import { RiArrowRightSLine, RiArrowLeftSLine } from 'react-icons/ri'

const Related = ({ selectedProduct, addToOutfit, selectStyle, avgRating, starRender, trackClick }) => {

  const [relatedIds, setRelatedIds] = useState([]);
  const [carousel, setCarousel] = useState([]);
  const [left, setLeft] = useState([]);
  const [right, setRight] = useState([]);
  const [view, setView] = useState([])

  useEffect(() => {
    Parse.getAll('products', `/${selectedProduct.id}/related`)
      .then((relatedProducts) => {
        let cleanedData = [];
        relatedProducts.data.forEach(id => {
          if (!cleanedData.includes(id) && id !== selectedProduct.id) {
            cleanedData.push(id)
          }
        })
        if (cleanedData.length > 4) {
          setCarousel(cleanedData.slice(0, 4))
          setView(cleanedData.slice(0, 4))
          setRight(cleanedData.slice(4))
        } else {
          setCarousel(cleanedData)
        }
      })
  }, [])

  const shiftLeft = () => {
    setLeft([...left, view[0]]);
    setCarousel([view[1], view[2], view[3], right[0]])
    setView([view[1], view[2], view[3], right[0]]);
    setRight(right.slice(1))
  }

  const shiftRight = () => {
    setRight([view[3], ...right])
    setCarousel([left[left.length - 1], view[0], view[1], view[2]]);
    setView([left[left.length - 1], view[0], view[1], view[2]]);
    setLeft([...left.slice(0, left.length - 1)]);
  }

  return (
    <div>
      <div className='sectionTitle'><h2>RELATED PRODUCTS</h2></div>
      <div className='carousel'>
        <div className="rightArrow" onClick={shiftLeft}>{right.length ? <RiArrowRightSLine /> : null}</div>
        <div className="leftArrow" onClick={shiftRight}>{left.length ? <RiArrowLeftSLine /> : null}</div>
        <div className='related'>
          {carousel.map(ids => {
            return <ProductCard
              key={ids}
              product_id={ids}
              addOutfit={addToOutfit}
              select={selectStyle}
              current={selectedProduct}
              avgStars={avgRating}
              starRender={starRender} />
          })}
        </div>
      </div>
    </div>
  )
}

export default Related;