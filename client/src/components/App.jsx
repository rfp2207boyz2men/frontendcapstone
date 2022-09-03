import React, { useState, useEffect, useContext } from 'react';
import ReactDOM from 'react-dom';
import Parse from '../parse.js';
import axios from 'axios';
import Related from './RelatedAndComp/Related.jsx';
import Outfits from './RelatedAndComp/Outfits.jsx';
import Overview from './ProductDetail/Overview.jsx';
import Reviews from './Reviews/Reviews.jsx';
import { TiStarFullOutline, TiStarHalfOutline, TiStarOutline } from 'react-icons/ti';
import { GiTriquetra } from 'react-icons/gi'
import { OrbitSpinner } from 'react-epic-spinners';
import { BsSearch, BsBag } from 'react-icons/bs'
import QandA from './QandA/QandA.jsx';
import { GoSearch } from 'react-icons/go';
import ClickTracker from './ClickTracker.jsx';



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
  const [theme, setTheme] = useState(true);

  useEffect(() => {
    Parse.getAll(`products/`)
      .then((products) => {
        let defaultIndex = Math.floor(Math.random() * products.data.length);
        updateSelectedProduct(products.data[defaultIndex].id);
      })
    retrieveStorage();
  }, []);

  const getAverageRating = (ratings) => {
    //Get average rating through gpa style math
    let ratingValues = Object.values(ratings);
    let totalRatings = ratingValues.reduce((prev, cur) => prev + parseInt(cur), 0);
    let ratingStrengths = ratingValues.map((rating, index) => rating * (index + 1));
    let averageRatingTotal = (ratingStrengths.reduce((prev, cur) => prev + cur, 0)) / totalRatings;
    return averageRatingTotal.toFixed(1);
  };

  // put in array of products reviews (*.data.results)
  const getAverage = (reviewsArray) => {
    let ratings = reviewsArray.map(review => review.rating);
    let starRating = (ratings.reduce((total, rating) => total += rating, 0) / (ratings.length));
    return starRating
  }

  const getTotalReviews = (recommended) => {
    //Get total amount of reviews by adding yes + no recommendations
    let recommendValues = Object.values(recommended);
    let totalRecommended = recommendValues.reduce((prev, cur) => prev + parseInt(cur), 0);
    return totalRecommended;
  };

  const unloadComponents = (product_id) => {
    setLoading(false);
    updateSelectedProduct(product_id);
  };
  // IF YOU WANT TO UPDATE SELECTED PRODUCT, USE ^ unloadComponents ^
  // DO NOT CALL updateSelectedProduct DIRECTLY
  //   IT WON'T REFRESH THE WIDGITS
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
      .then(() => {
        //Consider refactoring these two functions to only have to update state once (preferably with the this.setState already here)
        //this.retrieveStorage();
        // retrieveStyles();
      })
      .catch((err) => console.log(err));
  }

  // const retrieveStyles = () => {
  //   let state = {};
  //   let params = `${selectedProduct.id}/styles`;

  //   Parse.getAll(`products/`, params)
  //   .then((styles) => {
  //     setStyles(styles.data.results);
  //   })
  // }

  const handleSelectedProduct = (id) => {
    //unloadComponents(id);
  }

  const retrieveStorage = () => {
    const storage = localStorage
    let storedOutfits = []
    for (let key in storage) {
      if (key.startsWith('o')) {
        storedOutfits.push(JSON.parse(storage.getItem(key)))
      }
    }

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

  // Not tested yet, why are event not firing??
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

  //Modify each component to include a click tracker with the respective widget name
  const OverviewTrack = ClickTracker(Overview, 'Product Detail')
  const RelatedTrack = ClickTracker(Related, 'Related');
  const OutfitsTrack = ClickTracker(Outfits, 'Outfits');
  const ReviewsTrack = ClickTracker(Reviews, 'Reviews');
  const QandATrack = ClickTracker(QandA, 'Questions & Answers');

  return (
    <div>
      {loading ?
        <div>
          <div className="header">
            <div className="logoheader">
              <div className="logotext"><h1>Odin</h1></div>
              <div className="logo"><GiTriquetra /></div>
            </div>
            <div className="toprightHeader">
              <div className="searchbar"><input className="search" placeholder="Search"></input><GoSearch className="searchIcon" /></div>
              <div className="shoppingBag"><BsBag /></div>
            </div>
          </div>
          <div className="main">
            <div>
              <Overview
                selectedProduct={selectedProduct}
                localName={localName}
                handleSelectedProduct={handleSelectedProduct}
                handleLocalClick={handleLocalClick}
                handleLocalSave={handleLocalSave}
                getAverageRating={getAverageRating}
                getTotalReviews={getTotalReviews}
                renderStars={renderStars} />
            </div>
            <div className='relatedSection'>
              <Related
                selectedProduct={selectedProduct}
                addToOutfit={handleOutfitAdds}
                selectStyle={unloadComponents}
                avgRating={getAverageRating}
                starRender={renderStars}/>
            </div>
            <div className='outfitsSection'>
              <Outfits
                outfits={outfits}
                current={selectedProduct}
                outfitAdd={handleOutfitAdds}
                outfitRemove={handleOutfitRemoval}
                avgRating={getAverageRating}
                styleId={localId}
                starRender={renderStars}/>
            </div>
            <div className="questionsSection">
              <QandA
                selectedProduct={selectedProduct}
              />
            </div>
            <div>
              <ReviewsTrack
                totalReviews={totalReviews}
                getTotalReviews={getTotalReviews}
                averageRating={averageRating}
                getAverageRating={getAverageRating}
                metaData={metaData}
                renderStars={renderStars}
                productName={selectedProduct.name}
                productId={selectedProduct.id}
              />
            </div>
          </div>
        </div>
        : <div className="spinner"><OrbitSpinner color='teal' /></div>
      }
    </div>
  )
}

export default App;