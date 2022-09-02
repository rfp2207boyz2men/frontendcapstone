import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import Parse from '../../parse';
import { OrbitSpinner } from 'react-epic-spinners';
import { TiStarFullOutline, TiStarHalfOutline, TiStarOutline } from 'react-icons/ti';

/* --------------------  styled-components  --------------------*/

const InfoContainer = styled.div`
  margin: 0 30px;
  width: 250px;
  scroll-behavior: smooth;
`
const StyleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`

const AddContainer = styled.div`
  margin: 30px 10px;
`

const StyleTitle = styled.div`
  display: inline-flex;
`

const Title = styled.h1`
  font-size: 24px;
  letter-spacing: 1px;
  font-weight: bolder;
  color: black;
`

const StyleText = styled.h4`
  font-size: 17px;
  margin-right: 5px;
  color: black;
  font-weight: 400;
  ${props =>
    props.primary &&
    css`
      font-weight: bold;
    `};
`

const Category = styled.h4`
  line-height: 14px;
  text-decoration: underline;
  margin-top: 20px;
  padding: 0;
  font-size: 15px;
  color: black;
`

const StyleEntry = styled.img`
  cursor: pointer;
  border-radius: 30px;
  border: solid 0.5px #333;
  object-fit: cover;
  height: 50px;
  width: 50px;
  margin: 5px;
  background-color: #94B49F;
`

const Price = styled.h2`
  font-size: 14px;

  ${props => {
    if (props.primary) {
      return `
        text-decoration: line-through;
    `
    } else if (props.secondary) {
      return `
      color: #850E35;
    `
    }
  }}
`;

const Button = styled.button`
  background: transparent;
  border-radius: 3px;
  border: 2px solid #256D85;
  color: #256D85;
  padding: 10px 10px;
  margin: 5px 7px;

  ${props =>
    props.primary &&
    css`
      background: #256D85;
      color: white;
      &:hover {
    border: 2px solid white;
    transition: ease-in-out 0.5s;
    background-color: black;
  }
    `};
`
const Reviews = styled.a`
  margin-left: 10px;
  text-decoration: underline;
  color: #256D85;
  &:hover {
    transition: all 0.5s;
    background-color: black;
    color: white;
  }
`

/* --------------------  ProductInformation  --------------------*/
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
    setSizeSelected(true);
  }


  async function addToCart(skusId) {
    let params = { sku_id: skusId };
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
        <InfoContainer>
          <div>
            {renderAvgStars()}
            <Reviews href='' onClick={relatedLink}>Read all {product.totalReviews} reviews</Reviews>
          </div>

          <Category>{product.category}</Category>
          <Title>{product.name}</Title>
          {currentStyle.sale_price !== null ?
            <div>
              <Price primary>${currentStyle.original_price}</Price>
              <Price secondary>${currentStyle.sale_price}</Price>
            </div>

            : <Price>${product.default_price}</Price>}

          <div>
            <StyleTitle>
              <StyleText primary> STYLE: </StyleText>
              <StyleText>{product.styles[0].photos[0].thumbnail_url === null ? 'No style available' : currentStyle.name}</StyleText>
            </StyleTitle>
            <StyleContainer>

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
                    return (
                      <StyleEntry key={id}
                        id={item.style_id}
                        name={item.name}
                        onClick={(e, url, prod) => {
                          handleLocalClick(e);
                          handleStyleClick(e, item.url, item);
                        }}
                        src={item.photos[0].thumbnail_url} ></StyleEntry>
                    )
                  }

                })}

            </StyleContainer>
          </div>

          <AddContainer>

            <Button as='select' value={qty} onChange={handleSize}>
              <Button as='option' value="0">Select A Size</Button>
              {currentStyle &&
                Object.values(currentStyle.skus).map((item => {
                  let idR = Math.random();
                  return <Button as='option' id={item.size} value={item.quantity} key={idR}>{item.size}</Button>
                }))}
            </Button>

            <Button as='select' onChange={handleQty}>
              {qty ? <Button as='option'>1</Button> : <Button as='option' value="-">-</Button>}
              {qty && renderQty(qty)}
            </Button>

            <Button primary onClick={(e) => { handleLocalSave(e); handleAddToCart(e); }}>ADD TO CART</Button>
            <Button onClick={handleLocalSave}><TiStarFullOutline /></Button>
          </AddContainer>

        </InfoContainer>
        :
        <OrbitSpinner color="teal" />
      }
    </div>



  )

}

export default ProductInformation;