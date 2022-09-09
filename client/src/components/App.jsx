import React, { useState, useEffect, useContext } from 'react';
import styled, { ThemeProvider } from "styled-components";
import moment from 'moment';
import Parse from '../parse.js';
import ClickTracker from './ClickTracker.jsx';
import Header from './Header.jsx';
import Overview from './ProductDetail/Overview.jsx';
import Related from './RelatedAndComp/Related.jsx';
import Outfits from './RelatedAndComp/Outfits.jsx';
import QandA from './QandA/QandA.jsx';
import Reviews from './Reviews/Reviews.jsx';
import FourOhFour from './404.jsx';
import { TiStarFullOutline, TiStarHalfOutline, TiStarOutline } from 'react-icons/ti';
import { GiTriquetra } from 'react-icons/gi'
import { OrbitSpinner } from 'react-epic-spinners';
import { BsSearch, BsBag } from 'react-icons/bs'
import { GoSearch } from 'react-icons/go';
import { MdLightMode, MdDarkMode } from 'react-icons/md';
import { AppContext } from './AppContext.js';
import { lightTheme, darkTheme, GlobalStyles } from '../themes.js';

const StyledApp = styled.div`
`;

const App = () => {

  const [outfits, setOutfits] = useState([]);
  const [styles, setStyles] = useState([]);
  const [localName, setLocalName] = useState('No Style Selected');
  const [localId, setLocalId] = useState(0);
  const [reviewsData, setReviewsData] = useState([]);
  const [metaData, setMetaData] = useState({});
  const [averageRating, setAverageRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);
  const [cart, setCart] = useState([]);
  const [interactions, setInteractions] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState({});
  const [loading, setLoading] = useState(false);
  const [theme, setTheme] = useState('light');
  const [crashed, setCrashed] = useState(false);

  const themeToggler = () => {
    theme === 'light' ? setTheme('dark') : setTheme('light');
    theme === 'light' ? localStorage.setItem('theme', 'dark') : localStorage.setItem('theme', 'light');
  }

  useEffect(() => {
    if (!localStorage.getItem('helpfulReviews')) {
      localStorage.setItem('helpfulReviews', JSON.stringify({}));
    }
    if (!localStorage.getItem('searchStars')) {
      localStorage.setItem('searchStars', JSON.stringify({ 1: false, 2: false, 3: false, 4: false, 5: false }));
    }
    if (!localStorage.getItem('sort')) {
      localStorage.setItem('sort', 'relevant');
    }



    if (!localStorage.getItem('helpfulReviews')) {
      localStorage.setItem('helpfulReviews', JSON.stringify({}));
    }
    if (!localStorage.getItem('searchStars')) {
      localStorage.setItem('searchStars', JSON.stringify({ 1: false, 2: false, 3: false, 4: false, 5: false }));
    }
    if (!localStorage.getItem('sort')) {
      localStorage.setItem('sort', 'relevant');
    }

    if (!localStorage.getItem('theme')) {
      localStorage.setItem('theme', 'light');
    }

    Parse.getAll(`products/`)
      .then((products) => {
        updateSelectedProduct(products.data[0].id);
      })
      .catch((err) => {
        console.log(err);
        return setCrashed(true);
      });
    retrieveStorage();
    getCart();
  }, []);

  const resetToFirstProduct = () => {
    setLoading(false);
    setCrashed(false);
    Parse.getAll(`products/`)
      .then((products) => {
        updateSelectedProduct(products.data[0].id);
      })
      .catch((err) => {
        console.log(err);
        setCrashed(true);
      });
  };

  const getAverageRating = (ratings) => {
    let ratingValues = Object.values(ratings);
    let totalRatings = ratingValues.reduce((prev, cur) => prev + parseInt(cur), 0);
    let ratingStrengths = ratingValues.map((rating, index) => rating * (index + 1));
    let averageRatingTotal = (ratingStrengths.reduce((prev, cur) => prev + cur, 0)) / totalRatings;
    return averageRatingTotal.toFixed(1);
  };

  const getAverage = (reviewsArray) => {
    let ratings = reviewsArray.map(review => review.rating);
    let starRating = (ratings.reduce((total, rating) => total += rating, 0) / (ratings.length));
    return starRating;
  };

  const getTotalReviews = (recommended) => {
    let recommendValues = Object.values(recommended);
    let totalRecommended = recommendValues.reduce((prev, cur) => prev + parseInt(cur), 0);
    return totalRecommended;
  };

  const unloadComponents = (product_id) => {
    setLoading(false);
    updateSelectedProduct(product_id);
  };

  const updateSelectedProduct = (product_id) => {
    let params = `?product_id=${product_id}`;
    Parse.getAll(`products/`, `${product_id}`)
      .then((product) => {
        setSelectedProduct(product.data);
        return Parse.getAll(`reviews/meta/`, params);
      })
      .then((meta) => {
        setMetaData(meta.data);
        setAverageRating(getAverageRating(meta.data.ratings));
        setTotalReviews(getTotalReviews(meta.data.recommended));
        setLoading(true);
      })
      .catch((err) => {
        console.log(err);
        return setCrashed(true);
      });
  }

  const handleSelectedProduct = (id) => {
  }

  const retrieveStorage = () => {
    const storage = localStorage
    let storedOutfits = []
    for (let key in storage) {
      if (key.startsWith('o')) {
        storedOutfits.push(JSON.parse(storage.getItem(key)))
      }
    }
    let lastTheme = storage.getItem('theme');
    setTheme(lastTheme);
    setOutfits(storedOutfits);
  }

  const handleLocalClick = (e) => {
    e.preventDefault();
    setLocalName(e.target.name);
    setLocalId(e.target.id);
  }


  const handleLocalSave = (e) => {
    e.preventDefault();
    let styleObj = styles.filter((style => {
      return style.style_id === localId;
    }));

    if (!localStorage.getItem(localName)) {
      const jsonObj = JSON.stringify(styleObj);
      localStorage.setItem(localId, jsonObj);
      console.log('item saved in localStorage');
    }
  }

  const removeStorage = (e) => {
    localStorage.removeItem(e.target.id);
  };

  const renderStars = (rating) => {
    let ratingCopy = rating;
    let stars = [];
    for (let i = 0; i < 5; i++) {
      if (ratingCopy >= 0 && ratingCopy < 0.33 || ratingCopy < 0) {
        stars.push(<TiStarOutline className='star' key={i} />);
      } else if (ratingCopy >= 0.33 && ratingCopy <= 0.67) {
        stars.push(<TiStarHalfOutline className='star' key={i} />);
      } else {
        stars.push(<TiStarFullOutline className='star' key={i} />);
      }
      ratingCopy--;
    }
    return stars;
  };

  const handleOutfitAdds = (outfitData) => {
    if (outfits.filter(outfit => outfit.id === outfitData.id).length === 0) {
      setOutfits([...outfits, outfitData])
      if (!localStorage.getItem('o' + JSON.stringify(outfitData.id))) {
        let outfitObj = JSON.stringify(outfitData)
        localStorage.setItem('o' + JSON.stringify(outfitData.id), outfitObj)
      }
    }
  }

  const handleOutfitRemoval = (outfitData) => {
    localStorage.removeItem('o' + JSON.stringify(outfitData));
    let updatedList = [...outfits]
    updatedList.splice(updatedList.map(outfit => outfit.id).indexOf(outfitData), 1)
    setOutfits([...updatedList])
  }

  async function getCart() {
    const request = await Parse.getAll('cart', undefined);
    setCart(request.data);
  }

  const OverviewTrack = ClickTracker(Overview, 'Product Detail')
  const RelatedTrack = ClickTracker(Related, 'Related');
  const OutfitsTrack = ClickTracker(Outfits, 'Outfits');
  const ReviewsTrack = ClickTracker(Reviews, 'Reviews');
  const QandATrack = ClickTracker(QandA, 'Questions & Answers');
  const HeaderTrack = ClickTracker(Header, 'Header');

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <GlobalStyles />
      <AppContext.Provider value={{
        selectedProduct,
        localName,
        outfits,
        metaData,
        handleSelectedProduct,
        handleLocalClick,
        handleLocalSave,
        getAverageRating,
        getTotalReviews,
        renderStars,
        getCart,
        handleOutfitAdds,
      }}>
        {loading &&
          <StyledApp>
            <HeaderTrack
              theme={theme}
              cart={cart}
              themeToggler={themeToggler}
              onClick={resetToFirstProduct}
            />
            <div className="main">
              <div>
                <OverviewTrack
                />
              </div>
              <div className='relatedSection'>
                <RelatedTrack
                  selectedProduct={selectedProduct}
                  addToOutfit={handleOutfitAdds}
                  selectStyle={unloadComponents}
                  avgRating={getAverageRating}
                  starRender={renderStars} />
              </div>
              <div className='outfitsSection'>
                <OutfitsTrack
                  outfits={outfits}
                  current={selectedProduct}
                  outfitAdd={handleOutfitAdds}
                  outfitRemove={handleOutfitRemoval}
                  avgRating={getAverageRating}
                  styleId={localId}
                  starRender={renderStars} />
              </div>
              <div className="questionsSection">
                <QandATrack
                  selectedProduct={selectedProduct}
                />
              </div>
              <div id='reviews'>
                <ReviewsTrack
                  totalReviews={totalReviews}
                  getTotalReviews={getTotalReviews}
                  averageRating={averageRating}
                  getAverageRating={getAverageRating}
                  metaData={metaData}
                  renderStars={renderStars}
                  productName={selectedProduct.name}
                  productId={selectedProduct.id} />
              </div>
            </div>
          </StyledApp>}
        {(!loading && !crashed) && <StyledApp className="spinner"><OrbitSpinner color='teal' /></StyledApp>}
        {crashed && <FourOhFour reset={resetToFirstProduct} />}
      </AppContext.Provider>
    </ThemeProvider>
  )
}

export default App;