import React, { useState, useEffect, useContext } from 'react';
import ReactDOM from 'react-dom';
import Parse from '../parse.js';
import axios from 'axios';
import Related from './RelatedAndComp/Related.jsx';
import Outfits from './RelatedAndComp/Outfits.jsx';
import Overview from './ProductDetail/Overview.jsx';
import Reviews from './Reviews/Reviews.jsx';
import QandA from './QandA/QandA.jsx';
import { TiStarFullOutline, TiStarHalfOutline, TiStarOutline } from 'react-icons/ti';
import { GiTriquetra } from 'react-icons/gi'
import { OrbitSpinner } from 'react-epic-spinners';
import { BsSearch, BsBag } from 'react-icons/bs'
import { GoSearch } from 'react-icons/go';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // products: [],
      outfits: [],
      styles: [],
      localName: 'No style selected',
      localId: 0,
      selectedStyle: [],
      reviewsData: [],
      metaData: {},
      averageRating: 0,
      totalReviews: 0,
      cart: [],
      qanda: [],
      interactions: [],
      selectedProduct: {},
      loading: false
    };

    this.handleLocalClick = this.handleLocalClick.bind(this);
    this.handleLocalSave = this.handleLocalSave.bind(this);
    this.handleOutfitAdds = this.handleOutfitAdds.bind(this);
    this.handleOutfitRemoval = this.handleOutfitRemoval.bind(this);
    this.getAverageRating = this.getAverageRating.bind(this);
  }

  componentDidMount() {
    //Default to a random product
    Parse.getAll(`products/`)
    .then((products) => {
      let defaultIndex = Math.floor(Math.random() * products.data.length);
      return this.updateSelectedProduct(products.data[defaultIndex].id);
    })

    this.retrieveStorage();
  }

  getAverageRating = (ratings) => {
    //Get average rating through gpa style math
    let ratingValues = Object.values(ratings);
    let totalRatings = ratingValues.reduce((prev, cur) => prev + parseInt(cur), 0);
    let ratingStrengths = ratingValues.map((rating, index) => rating * (index + 1));
    let averageRatingTotal = (ratingStrengths.reduce((prev, cur) => prev + cur, 0)) / totalRatings;
    return averageRatingTotal.toFixed(1);
  };

  // put in array of products reviews (*.data.results)
  getAverage(reviewsArray) {
    let ratings = reviewsArray.map(review => review.rating);
    let starRating = (ratings.reduce((total, rating) => total += rating, 0)/(ratings.length));
    return starRating
  }

  getTotalReviews = (recommended) => {
    //Get total amount of reviews by adding yes + no recommendations
    let recommendValues = Object.values(recommended);
    let totalRecommended = recommendValues.reduce((prev, cur) => prev + parseInt(cur), 0);
    return totalRecommended;
  };

  unloadComponents = (product_id) => {
    this.setState({ loading: false }, () => this.updateSelectedProduct(product_id))
  };
  // IF YOU WANT TO UPDATE SELECTED PRODUCT, USE ^ unloadComponents ^
  // DO NOT CALL updateSelectedProduct DIRECTLY
  //   IT WON'T REFRESH THE WIDGITS
  updateSelectedProduct = (product_id) => {
    let state = {};
    let params = `?product_id=${product_id}`;

    Parse.getAll(`products/`, product_id)
      .then((product) => {
        state.selectedProduct = product.data;
        return Parse.getAll(`reviews/meta/`, params);
      })
      .then((meta) => {
        state.metaData = meta.data;
        state.averageRating = this.getAverageRating(meta.data.ratings)
        state.totalReviews = this.getTotalReviews(meta.data.recommended)
        state.loading = true;
        return this.setState(state);
      })
      .then(() => {
        //Consider refactoring these two functions to only have to update state once (preferably with the this.setState already here)
        //this.retrieveStorage();
        this.retrieveStyles();
      })
      .catch((err) => console.log(err));
  }

  retrieveStyles() {
    let state = {};
    let params = `${this.state.selectedProduct.id}/styles`;

    Parse.getAll(`products/`, params)
    .then((styles) => {
      state.styles = styles.data.results;
      return this.setState(state);
    })
  }

  retrieveStorage() {
    const storage = localStorage
    let storedOutfits = []
    for (let key in storage) {
      if (key.startsWith('o')) {
        storedOutfits.push(JSON.parse(storage.getItem(key)))
      }
    }

    this.setState({outfits: storedOutfits})
  }

  handleLocalClick(e) {
    e.preventDefault();

    this.setState({
      localName: e.target.name,
      localId: parseInt(e.target.id),
    })

  }



  handleLocalSave(e) {
    e.preventDefault();

    let styleObj = this.getStyleObj(this.state.localId);

      if (!localStorage.getItem(this.state.localName)) {
        const jsonObj = JSON.stringify(styleObj);
        localStorage.setItem(this.state.localId, jsonObj);
        console.log('item saved in localStorage');
      }
   }



   getStyleObj(id) {
    return this.state.styles.filter((style => {
      return style.style_id === id;
    }));
  }



  // Not tested yet, why are event not firing??
  removeStorage (e) {
    localStorage.removeItem(e.target.id);
  };


  renderStars = (rating) => {
    let ratingCopy = rating;
    let stars = [];
    for (let i = 0; i < 5; i++) {
      if (ratingCopy >= 0 && ratingCopy < 0.33 || ratingCopy < 0) {
        stars.push(<TiStarOutline className='star' key = {i}/>);
      } else if (ratingCopy >= 0.33 && ratingCopy <= 0.67) {
        stars.push(<TiStarHalfOutline className='star' key = {i}/>);
      } else {
        stars.push(<TiStarFullOutline className='star' key = {i}/>);
      }
      ratingCopy--;
    }
    return stars;
  };

  handleOutfitAdds(outfitData) {
    if (this.state.outfits.filter(outfit => outfit.id === outfitData.id).length === 0) {
      this.setState({outfits: [...this.state.outfits, outfitData]})
      if (!localStorage.getItem('o' + JSON.stringify(outfitData.id))) {
        let outfitObj = JSON.stringify(outfitData)
        localStorage.setItem('o' + JSON.stringify(outfitData.id), outfitObj)
      }
    }
  }

  handleOutfitRemoval(outfitId) {
    localStorage.removeItem('o' + JSON.stringify(outfitId));
    let updatedList = [...this.state.outfits]
    updatedList.splice(updatedList.map(outfit => outfit.id).indexOf(outfitId), 1)
    this.setState({outfits: [...updatedList]})
  }

  render() {
    return (
      <div>
        {this.state.loading
         ? <div>
         <div className="header">
         <div className="logoheader">
           <div className="logotext">
             <h1>Odin</h1>
           </div>
           <div className="logo"><GiTriquetra /></div>
         </div>
         <div className="toprightHeader">
           <div className="searchbar"><input className="search" placeholder="Search"></input><GoSearch  className="searchIcon"/></div>
           <div className="shoppingBag"><BsBag /></div>
         </div>
       </div>
            <div className="main">
              <div>
                <Overview
                  selectedProduct={this.state.selectedProduct}
                  localName={this.state.localName}
                  renderStars={this.renderStars.bind(this)}
                  getAverageRating={this.getAverageRating.bind(this)}
                  getTotalReviews={this.getTotalReviews.bind(this)}
                  handleLocalClick={this.handleLocalClick}
                  handleLocalSave={this.handleLocalSave}/>
              </div>
              <div id='related' className='relatedSection'>
                <Related
                  selectedProduct={this.state.selectedProduct}
                  addToOutfit={this.handleOutfitAdds}
                  selectStyle={this.unloadComponents}
                  avgRating={this.getAverageRating}
                  />
              </div>
            <div>
              <Outfits
                outfits={this.state.outfits}
                current={this.state.selectedProduct}
                outfitAdd={this.handleOutfitAdds}
                outfitRemove={this.handleOutfitRemoval}
                avgRating={this.getAverageRating}
                styleId={this.state.localId}
                />
            </div>
            <div className="questionsSection">
              <QandA
                  selectedProduct={this.state.selectedProduct}
                />
            </div>
            <div>
              {/* <Reviews
                totalReviews={this.state.totalReviews}
                averageRating={this.state.averageRating}
                metaData={this.state.metaData}
                renderStars={this.renderStars.bind(this)}
                productName={this.state.selectedProduct.name}
                productId={this.state.selectedProduct.id}
              /> */}
            </div>
            </div>
          </div>
          :<div className="spinner"><OrbitSpinner color='teal'/></div>
          }
      </div>
    )
  }
}


export default App;