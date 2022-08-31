import React, { useState, useEffect, useRef, useId } from "react";
import {
  TiArrowSortedDown,
  TiArrowSortedUp,
  TiArrowLeftThick,
  TiArrowRightThick,
  TiArrowMaximise,
  TiArrowMinimise,
} from "react-icons/ti";
import "./overview.css";
import { OrbitSpinner } from "react-epic-spinners";
import Parse from "../../parse";

function imageGallery({
  product,
  expand,
  currentPhoto,
  arrowDown,
  arrowUp,
  handleThumbClick,
  handleLeftClick,
  handleRightClick,
  handleDownClick,
  handleUpClick,
  handleExpandedView,
  handleSelectedProduct,
}) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (product) {
      setLoading(false);
    }
  }, [product]);

  return (
    <div>
      {!loading ? (
        <div className="image-container">
          <div className="g-container">
            {arrowUp && (
              <TiArrowSortedUp onClick={handleUpClick} className="arrow" />
            )}

            {product.styles.map((style) => {
              let id = Math.random();

              console.log("style, ", style);

              if (currentPhoto === style.photos[0].url || JSON.stringify(style).includes(currentPhoto)) {
                if (style.photos[0].url === null) {
                  return;
                }
                return <img onClick={e => handleThumbClick(e, style)} id={style.photos[0].url} key={id} src={style.photos[0].thumbnail_url} className='g-entry g-border'></img>
              } else {
                if (style.photos[0].url === null) {
                  return;
                }
                return <img onClick={e => handleThumbClick(e, style)} id={style.photos[0].url} key={id} src={style.photos[0].thumbnail_url} className='g-entry'></img>
              }

            })}

            {arrowDown && (
              <TiArrowSortedDown onClick={handleDownClick} className="arrow" />
            )}
          </div>

          {expand ? (
            <div className="pv-container-active">
              {/* <TiArrowLeftThick onClick={handleLeftClick} className='arrow' />
            <img className='pv-active' onClick={handleExpandedView} src={currentPhoto || `https://via.placeholder.com/500`} alt={selectedProduct.name}></img>
            <TiArrowRightThick onClick={handleRightClick} className='arrow' />
            <TiArrowMinimise onClick={handleExpandedView} className='expand' /> */}
            </div>
          ) : (
            <div className="pv-container">
              <TiArrowLeftThick onClick={handleLeftClick} className='arrow' />
              <img className='pv-img' onClick={handleExpandedView} src={currentPhoto || `https://via.placeholder.com/500`} alt={product.name}></img>
              <TiArrowRightThick onClick={handleRightClick} className='arrow' />
              <TiArrowMaximise onClick={handleExpandedView} className='expand' />
            </div>
          )}
        </div>
      ) : (
        <OrbitSpinner color="teal" />
      )}
    </div>
  );
}

export default imageGallery;
