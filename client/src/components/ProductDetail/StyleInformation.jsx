import React, { useState, useEffect } from 'react';
import Parse from '../../parse';
import { OrbitSpinner } from 'react-epic-spinners';
import { TiStarFullOutline, TiStarHalfOutline, TiStarOutline } from 'react-icons/ti';

function ProductInformation({
  product,
  currentStyle,
  renderStars,
  handleStyleClick,
  handleLocalClick,
  localName,
  localId,
  handleLocalSave,
}) {
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState();
  const [sizeSelected, setSizeSelected] = useState(false);
  const [skusId, setSkusId] = useState();


  useEffect(() => {
    if (product) {
      setLoading(false);
    }
  }, [product])

  let renderAvgStars = () => {
    return renderStars(product.averageRating).map((star => star))
  };


  let findDuplicates = [];

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
  }

  const renderQty = (qty) => {
    let result = [];

    if (qty > 15) {
      for (let i = 2; i <= 15; i++) {
        let idR = Math.random();
        result.push(<option value={qty} key={idR}>{i}</option>);
      }
    } else {
      for (let i = 2; i <= qty; i++) {
        let idR = Math.random();
        result.push(<option value={qty} key={idR}>{i}</option>);
      }
    }
    return result;
  }

  const handleQty = (e) => {
    console.log('rdy to post??');
    setSizeSelected(true);
  }


  // pending to use api to add to card
  async function addToCart(skusId) {
    let params = skusId;
    const request = await Parse.create('cart', undefined, params);
    console.log(request.data);
  }

  const handleAddToCart = (e) => {
    e.preventDefault();
    if (sizeSelected) {
      addToCart(skusId);
    }
  }


  const relatedLink = (e) => {
    e.preventDefault();
    window.location.replace("/#related");
  }

  return (
    <div>
      {!loading ?
        <div className='info-container'>
          <div>
            {renderAvgStars()}
            <a href='' className='reviews' onClick={relatedLink}>Read all {product.totalReviews} reviews</a>
          </div>

          <h4>{product.category}</h4>
          <h2>{product.name}</h2>
          {currentStyle.sale_price !== null ?
            <div>
              <h2 style={{ textDecoration: 'line-through', fontSize: '14px' }}>${currentStyle.original_price}</h2>
              <h2 style={{ color: '#FF0000' }}>${currentStyle.sale_price}</h2>
            </div>

            : <h2>${product.default_price}</h2>}

          <div>
            <div className='style-title'>
              <h4> STYLE > </h4>
              <h4>{currentStyle.name}</h4>
            </div>
            <div className='style-container'>

              {
                product.styles.map(item => {
                  let id = Math.random();
                  if (findDuplicates.includes(item.photos[0].thumbnail_url)) {
                    return;
                  } else {
                    findDuplicates.push(item.photos[0].thumbnail_url);
                    return (
                      <img key={id}
                        id={item.style_id}
                        name={item.name}
                        onClick={(e, url, prod) => {
                          handleLocalClick(e);
                          handleStyleClick(e, item.url, item);
                        }}
                        src={item.photos[0].thumbnail_url} className='style-entry'></img>
                    )
                  }

                })}

            </div>
          </div>

          <div className='add-container'>

            <select value={qty} onChange={handleSize}>
              <option value="0">Select Size</option>
              {currentStyle &&
                Object.values(currentStyle.skus).map((item => {
                  let idR = Math.random();
                  return <option id={item.size} value={item.quantity} key={idR}>{item.size}</option>
                }))}
            </select>

            <select onChange={handleQty}>
              {qty ? <option value="1">1</option> : <option value="-">-</option>}
              {qty && renderQty(qty)}
            </select>

            <button onClick={(e) => { handleLocalSave(e); handleAddToCart(e); }}>ADD TO CART</button>
            <button onClick={handleLocalSave}><TiStarFullOutline /></button>
          </div>

        </div>
        :
        <OrbitSpinner color="teal" />
      }
    </div>



  )

}

export default ProductInformation;