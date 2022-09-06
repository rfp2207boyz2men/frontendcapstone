import { render, fireEvent, screen, cleanup } from "@testing-library/react";
import React, { Component } from 'react';
import ShallowRenderer from 'react-shallow-renderer';
import { shallow } from 'enzyme';
import axios from 'axios';

//Make sure that the API calls within the components are mocked so that we don't spam the API
//  Also makes sure we have consistent results

// jest.mock('axios');


// import App from '../../components/App.jsx';
import Reviews from '../../components/Reviews/Reviews.jsx';
import List from '../../components/Reviews/List.jsx';
import Breakdowns from '../../components/Reviews/Breakdowns.jsx';
import Characteristics from '../../components/Reviews/Characteristics.jsx';
import Search from '../../components/Reviews/Search.jsx';
import Sort from '../../components/Reviews/Sort.jsx';
import { reviews, meta, renderStars } from '../testData.js';
import { reviewsArray, filteredReviews, slicedReviews } from './reviewsTestData.js';

afterEach(() => {
  cleanup();
});

describe("Main Review Component", () => {
  // Ideally, this component should have its API call mocked
  // console.log(reviews);

  test("Main Reviews Component should render", () => {
    // render(<Reviews metaData={meta.data}/>);
    // let mainReviewPage = screen.getByTestId('mainReviewPage');
    // expect(mainReviewPage).toBeTruthy();
  });

  test("Main Review Components should render after initialization", async () => {
    // console.log(reviews);
    // jest.spyOn(axios, 'get').mockImplementation(() =>
    //   Promise.resolve({
    //     json: () => Promise.resolve(reviews)
    //   })
    // );

    // render(<Reviews metaData={meta.data}/>);

    // let reviewMain = screen.getByTestId('reviewMain');
    // expect(reviewMain).toBeTruthy();
  });
});

describe("Review List Component", () => {
  test("Review List Component should render", () => {
    const wrapper = shallow(
    <List
      // reviews={reviewsArray}
      // slicedReviews={slicedReviews}
      // filteredReviews={filteredReviews}
      // renderStars={() => {return []}}
    />);
    // console.log(reviewList);
    // const reviewListTest = reviewList.getByTestId('reviewList');
    // console.log(reviewListTest);
    // expect(reviewList).toBeTruthy();
  });

//   test("Review List should render two reviews", () => {
//     const renderer = new ShallowRenderer();
//     renderer.render(
//     <List
//       reviews={reviewsArray}
//       slicedReviews={slicedReviews}
//       filteredReviews={filteredReviews}
//       // renderStars={() => {return []}}
//     />);
//     const reviewListTiles = renderer.getRenderOutput();
//     // const reviewList = screen.getByTestId('reviewList');
//     expect(reviewList).toBeTruthy();
//   });
});

describe("", () => {

});

describe("", () => {

});


describe("", () => {

});


describe("", () => {

});


describe("", () => {

});


describe("", () => {

});















/*
  test("", () => {
    render(<App />);
    let test = () => {
      const element = screen.getByTestId('reviewMain');
      expect(element).toBeTruthy();
    }
    setTimeout(test, 5000);
  })
*/