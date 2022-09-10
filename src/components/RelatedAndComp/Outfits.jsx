import React, { useState, useEffect, useContext } from 'react';
import Parse from '../../parse.js';
import ProductCard from './ProductCard.jsx';
import OutfitCard from './OutfitCard.jsx';
import { OrbitSpinner } from 'react-epic-spinners';
import { BsPlusCircle } from 'react-icons/bs';
import { RiArrowRightSLine, RiArrowLeftSLine } from 'react-icons/ri'

const Outfits = ({ outfits, current, outfitAdd, outfitRemove, avgRating, styleId, starRender, trackClick }) => {

  const [outfitHover, setOutfitHover] = useState(false);
  const [carousel, setCarousel] = useState([]);
  const [left, setLeft] = useState([]);
  const [right, setRight] = useState([]);
  const [view, setView] = useState([])

  useEffect(() => {
    if (outfits.length > 3) {
      setCarousel([...outfits.slice(0, 3)]);
      setRight([...outfits.slice(3)]);
      setView([...outfits.slice(0, 3)])
    } else {
      setCarousel([...outfits])
    }
  }, [])

  const handleOutfitClick = () => {
    outfitAdd(current)
    if (outfits.filter(outfit => outfit.id === current.id).length === 0) {
      setCarousel([...outfits, current])
    }
  }

  const handleOutfitRemove = (outfitId) => {
    let updatedList = [...outfits]
    updatedList.splice(updatedList.map(outfit => outfit.id).indexOf(outfitId), 1)
    setCarousel([...updatedList])
  }

  useEffect(() => {

  }, [carousel])

  const shiftLeft = () => {
    setLeft([...left, view[0]]);
    setCarousel([view[1], view[2], right[0]])
    setView([view[1], view[2], right[0]]);
    setRight(right.slice(1))
  }

  const shiftRight = () => {
    setRight([view[2], ...right])
    setCarousel([left[left.length - 1], view[0], view[1]]);
    setView([left[left.length - 1], view[0], view[1]]);
    setLeft([...left.slice(0, left.length - 1)]);
  }

  const renderMask = {WebkitMaskImage: left.length >= 1 ? `-webkit-gradient(linear, left center, center center,
    from(rgba(0,0,0,0.2)), to(rgba(0,0,0,1)))` : null};

  return (
    <div onClick={trackClick}>
      <div className='sectionTitle'><h2>YOUR OUTFIT</h2></div>
      <div className="carousel">
        <div className="rightArrow" onClick={shiftLeft}>{right.length ? <RiArrowRightSLine /> : null}</div>
        <div className="leftArrow" onClick={shiftRight}>{left.length ? <RiArrowLeftSLine /> : null}</div>
        <div className="outfits">
          <div style={renderMask} className='productCard'>
            <div className='plusCardArea' onClick={handleOutfitClick}>
              <div className='plusSymbol'><BsPlusCircle /></div>
            </div>
            <div>
              <div className='plusSymbolText'>
                <div><p>ADD TO OUTFIT</p></div>
              </div>
            </div>
          </div>
          {
            carousel.length ? carousel.map((outfit, index) => {
              return <OutfitCard
                key={outfit.id}
                product_id={outfit.id}
                removeApp={outfitRemove}
                removeOutfit={handleOutfitRemove}
                styleId={styleId}
                starRender={starRender}
                carousel={carousel}
                left={left}
                right={right}
                placement={index} />
            }) : null
          }
        </div>
      </div>
    </div>
  )
}

export default Outfits;