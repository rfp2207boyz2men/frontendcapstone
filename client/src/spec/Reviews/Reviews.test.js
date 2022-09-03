import { render, fireEvent, screen, cleanup } from "@testing-library/react";
import React, { Component } from 'react';
import axios from 'axios';

//Make sure that the API calls within the components are mocked so that we don't spam the API
//  Also makes sure we have consistent results

// jest.mock('axios');


// import App from '../../components/App.jsx';
import Reviews from '../../components/Reviews/Reviews.jsx';
import { reviews, meta } from '../testData.js';

afterEach(() => {
  cleanup();
});

describe("Main Review Component", () => {
  console.log(reviews);

  test("Main Reviews Component should render", () => {
    render(<Reviews metaData={meta.data}/>);
    let mainReviewPage = screen.getByTestId('mainReviewPage');
    expect(mainReviewPage).toBeTruthy();
  });

  test("Main Review Components should render after initialization", async () => {
    // console.log(reviews);
    // jest.spyOn(axios, 'get').mockImplementation(() =>
    //   Promise.resolve({
    //     json: () => Promise.resolve(reviews)
    //   })
    // );

    render(<Reviews metaData={meta.data}/>);

    let reviewMain = screen.getByTestId('reviewMain');
    expect(reviewMain).toBeTruthy();
    // let test = () => {
    //   let reviewMain = screen.getByTestId('reviewMain');
    //   expect(reviewMain).toBeTruthy();
    // }
    // setTimeout(test, 0);
    //Alrighty, quite frankly, I have no idea why setTimeout at 0 works.
    //Technically it has to wait for the axios GET in Reviews, but the setTimeout test procs after I guess?
  });
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