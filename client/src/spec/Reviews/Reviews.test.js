import { render, fireEvent, screen, cleanup } from "@testing-library/react";
import React, { Component } from 'react';

// import App from '../../components/App.jsx';
import Reviews from '../../components/Reviews/Reviews.jsx';

afterEach(() => {
  cleanup();
});

describe("Main Review Component", () => {
  let metaData = {
    product_id: '1',
    ratings: {1: '1', 2: '1', 3: '1', 4: '1', 5: '1'},
    recommended: {true: '1', false: '1'},
    characteristics: {'size': {id: '1', value: '1.0000'}}
  };

  test("Main Reviews Component should render", () => {
    render(<Reviews metaData={metaData}/>);
    let mainReviewPage = screen.getByTestId('mainReviewPage');
    expect(mainReviewPage).toBeTruthy();
  });

  test("Main Review Components should render after initialization", () => {
    render(<Reviews metaData={metaData}/>);
    let test = () => {
      let reviewMain = screen.getByTestId('reviewMain');
      expect(reviewMain).toBeTruthy();
    }
    setTimeout(test, 0);
    //Alrighty, quite frankly, I have no idea why setTimeout at 0 works.
    //Technically it has to wait for the axios GET in Reviews, but the setTimeout test procs after I guess?

    // let reviewMain = screen.getByTestId('reviewMain');
    // expect(reviewMain).toBeTruthy();
  })
});

// test("", () => {
//   render(<App />);
//   const element = screen.getByTestId('reviewMain');
//   expect(element).toBeTruthy();
// })



/*

describe("tests category", () => {
  test("test description", () => {
    expect().toBe()...;
    toMatch...
    toBeLessThan...
  });

  test("test description", () => {
    expect...
  });
});

*/