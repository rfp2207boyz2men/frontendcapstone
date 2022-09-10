import { createGlobalStyle } from "styled-components";

export const lightTheme = {
  body: "white",
  fontColor: "black",
  mainBColor: 'white',
  headerBColor: 'white',
  borderColor: '1px solid black',
  starColor: 'teal',
  productBgColor: 'rgba(28,28,30, .9)',
  productBorderColor: '1px solid black',
  productImgBorder: '1px solid teal',
  productDescBorder: '1px solid burlywood',
  burlyBorderBlack: '1px solid black',
  starCardColor: 'teal',
  defaultPrice: 'white',
  qandaSearchBg: 'white',
  qandaBorderLeft: '1px solid white',
  qandaBorderTop: '1px solid white',
  qandaBorderBottom: '1px solid white',
  qandaIconBorderLeft: '1px solid white',
  qandaIconBorderTop: '1px solid white',
  qandaIconBorderBottom: '1px solid white',
  qandaPlaceholder: 'gray',
  showMoreBg: 'teal',
  showMoreColor: 'white',
  helpfulColor: 'teal',
  addAnswercolor: 'teal',
  reportColor: 'teal',
  plusCardAreaBg: '#cccccc',
  plusCardAreaColor: 'black',
  burlyAndTeal: 'teal',
  tealAndBurly: 'burlywood',
  gContainerImg: '1px solid teal',
  togglerBg: 'burlywood',
  selectColor: 'black',
  selectBorder: '2px solid burlywood',
  buttonText: 'white',
  linkColor: 'black',
  modalCompareBg: 'white',
  modalCompareText: 'black',
  salePriceColor: 'red',
  caretColor: 'black',
  dropdownShadow: 'rgba(0,0,0,0.2)',
  searchBarBG: 'white',
  styleBorder: '3px solid teal',
  priceColor: 'red',
};

export const darkTheme = {
  body: "#121212",
  fontColor: "white",
  mainBColor: '#2c2c2f',
  headerBColor: '#1c1c1e',
  borderColor: '1px solid white',
  starColor: '#00ADB5',
  productBgColor: 'black',
  productBorderColor: '1px solid gray',
  productImgBorder: 'border-bottom: 1px solid gray',
  productDescBorder: '',
  burlyBorderBlack: '1px solid burlywood',
  starCardColor: 'teal',
  defaultPrice: 'black',
  qandaSearchBg: '#48484a',
  qandaBorderLeft: '',
  qandaBorderTop: '',
  qandaBorderBottom: '',
  qandaIconBorderLeft: '',
  qandaIconBorderTop: '',
  qandaIconBorderBottom: '',
  qandaPlaceholder: 'white',
  showMoreBg: 'burlywood',
  showMoreColor: 'black',
  helpfulColor: 'burlywood',
  addAnswercolor: 'burlywood',
  reportColor: 'burlywood',
  plusCardAreaBg: '#1c1c1e',
  plusCardAreaColor: 'white',
  burlyAndTeal: 'burlywood',
  tealAndBurly: 'teal',
  gContainerImg: '1px solid burlywood',
  togglerBg: '#858585',
  selectColor: 'teal',
  selectBorder: '2px solid #256D85',
  buttonText: 'black',
  linkColor: 'white',
  modalCompareBg: '#121212',
  modalCompareText: 'white',
  salePriceColor: '#FF5C5C',
  caretColor: 'white',
  dropdownShadow: 'rgba(0,0,0,0.3)',
  searchBarBG: '#1c1c1e',
  styleBorder: '3px solid burlywood',
  priceColor: '#FF5C5C',
};

export const GlobalStyles = createGlobalStyle`

::-webkit-scrollbar {
  width: 8px;
}
::-webkit-scrollbar-track {
  background-color: ${(props) => props.theme.mainBColor};
}

::-webkit-scrollbar-thumb {
  background-color: ${(props) => props.theme.fontColor};
}



/*
  BOTH MODES
*/

img{
  -khtml-user-select: none;
  -o-user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  user-select: none;
}

html {
  scroll-behavior: smooth;
  background-color: ${(props) => props.theme.htmlBackgroundColor};
}

a {
  color: ${(props) => props.theme.linkColor};
}

body {
  font-family: 'Noto Sans', sans-serif;
  font-size: small;
  background-color: ${(props) => props.theme.body};
  color: ${(props) => props.theme.fontColor};
}

.main {
  /* border: 1px dotted blue; */
  display: flex;
  flex-direction: column;
  width: 1400px;
  margin: auto;
  background-color: ${(props) => props.theme.mainBColor};
  color: ${(props) => props.theme.fontColor};
}

.header {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  padding-top: 10px;
  padding-bottom: 10px;
  height: 100px;
  width: 1400px;
  margin: auto;
  background-color: ${(props) => props.theme.headerBColor};
  color: ${(props) => props.theme.fontColor};
  border-bottom: 1px solid burlywood;
}

.theme-toggler {
  cursor: pointer;
  font-size: 18px;
  transition: ease-in-out 0.5s;
  padding: 5px;
  position: absolute;
  top: 5px;
  right: 20px;
  opacity: .75
}

.themeswitch {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  width: 70px;
  height: 10px;
}

.themetext {
  font-size: 14px;
  padding-bottom: 5px;
}

.theme-toggler > svg {
  margin-right: 10px;
  padding-top: 10px;
}

.theme-toggler:hover {
  border-radius: 5px;
  padding: 5px;
  background-color: ${(props) => props.theme.togglerBg};
}

a:visited {
  color: ${(props) => props.theme.fontColor};
}

.spinner {
  margin-left: 50%;
  margin-top: 25%;
  height: 250px;
  width: 250px;
}

::placeholder {
  color: gray;
}

.logoheader {
  width: 160px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 50px;
}

.toprightHeader {
  width: 600px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-right: 50px;
}

.logo {
  margin-top: 10px;
  font-size: 60px;
  color: teal;
}

.logotext {
  font-size: 25px;
  color: ${(props) => props.theme.fontColor};
}

.logo:hover,
.logotext:hover {
  cursor: pointer;
}

.search {
  width: 500px;
  height: 30px;
  border-style: none;
  outline: none;
  background-color: ${(props) => props.theme.searchBarBG};
  border-radius: 15px;
  padding-left: 15px;
}

.search:focus {
  color: ${(props) => props.theme.fontColor};
}

.searchbar {
  display: flex;
  align-items: center;
  border-bottom: ${(props) => props.theme.borderColor};
  background-color: ${(props) => props.theme.searchBarBG};
  padding-top: 5px;
  padding-bottom: 5px;
  margin-top: 20px;
  margin-right: 20px;
}

.searchIcon {
  font-size: 18px;
  padding-right: 15px;
  border-radius: 15px;
  background-color: ${(props) => props.theme.searchBarBG};
}

.shoppingBag {
  margin-top: 15px;
  font-size: 30px;
  padding: 5px;
  padding-right: 13px;
  position: relative;
}

.cart {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  background-color: teal;
  color: #fff;
  text-align: center;
  font-size: 16px;
  margin: 0;
  padding: 0;
  position: absolute;
  top: 0px;
  right: 0px;
  opacity: .95;
}

.star {
  color: ${(props) => props.theme.starColor};
  font-size: 16px;
}

/*
  Related Items
*/

.relatedSection, .outfitsSection {
  height: 500px;
  margin: auto;
  width: 1330px;
  background-color: ${(props) => props.theme.mainBColor};
  padding-left: 70px;
}

.related {
  height: 450px;
  width: 1200px;
  display: grid;
  position: relative;
  overflow: hidden;
  grid: auto / auto-flow max-content;
  z-index: 1;
  padding-left: 20px;
}

.sectionTitle {
  font-weight: lighter;
  padding-left: 30px;
  color: ${(props) => props.theme.fontColor};
}

/*
  Product Cards
*/

.productCard {
  border: ${(props) => props.theme.productBorderColor};
  width: 255px;
  height: 400px;
  margin-left: 10px;
  margin-right: 10px;
  transition: opacity 0.5s;
  opacity: 1;
  background-color: ${(props) => props.theme.productBgColor};
}

.productCardImg {
  width: 255px;
  height: 300px;
  position: relative;
  border-bottom: ${(props) => props.theme.productImgBorder};
}

.productCardImg :hover {
  cursor: pointer;
  opacity: .90;
}

.productImages {
  width: 255px;
  height: 300px;
}

.productCardDesc {
  padding-left: 10px;
  padding-top: 10px;
  width: 245px;
  height: 50px;
  color: white;
  border-top: ${(props) => props.theme.productDescBorder};
}

.productCardRating {
  margin-top: 5px;
  padding-left: 10px;
  padding-top: 10px;
  width: 255px;
}

.starCard, .actionCard {
  position: absolute;
  top: 8px;
  right: 16px;
  font-size: 25px;
  color: ${(props) => props.theme.starCardColor};
}

.starCard :hover {
  opacity: 100%;
}

.cardCat, .cardName, .cardPrice {
  padding: 1px;
}

.cardPrice {
  font-size: small;
  font-weight: lighter;
  display: flex;
  justify-content: flex-start;
  width: 255px;
}

.salePrice {
  color: ${(props) => props.theme.salePriceColor};
}

.defaultPrice {
  text-decoration: line-through;
  color: ${(props) => props.theme.defaultPrice};
}

.cardLoader {
  width: 255px;
  height: 400px;
  position: relative;
}

.cardSpinner {
  position: absolute;
  top: 40%;
  left: 45%;
}

/*
  Q AND A
*/

.questionsSection {
  width: 1300px;
  height: auto;
  margin-left: 50px;
}

.qanda {
  display: flex;
  flex-direction: column;
  width: 1250px;
  height: 900px;
  border-bottom: 1px dashed burlywood;
  border-top: 1px dashed burlywood;
  overflow-y: hidden;
  padding: 20px;
  margin-top: 50px;
  margin-bottom: 50px;
}

.qanda::-webkit-scrollbar {
  width: 0;
  height: 0;
}

.qanda-heading {
  display: flex;
  height: 20px
}

.qanda-search {
  display: inline-flex;
  border: 1px solid ${(props) => props.theme.caretColor};
  width: 1248px;
  height: 50px;
  margin-top: 5px;
  margin-bottom: 5px;
}

.qanda-search-input {
  display: inline-flex;
  border: none;
  outline: none;
  width: 1300px;
  height: 50px;
  background-color: ${(props) => props.theme.qandaSearchBg};
  align-items: center;
  caret-color: ${(props) => props.theme.caretColor};
  padding-left: 10px;
  color: ${(props) => props.theme.qandaPlaceholder};
  font-size: 16px;
  border-left: ${(props) => props.theme.qandaBorderLeft};
  border-top: ${(props) => props.theme.qandaBorderTop};
  border-bottom: ${(props) => props.theme.qandaBorderBottom};
}

.qanda-search-icon {
  display: inline-flex;
  height: auto;
  border: none;
  background-color: ${(props) => props.theme.qandaSearchBg};
  color: ${(props) => props.theme.caretColor};
  font-size: 30px;
  align-items: center;
  border-left: ${(props) => props.theme.qandaIconBorderLeft};
  border-top: ${(props) => props.theme.qandaIconBorderTop};
  border-bottom: ${(props) => props.theme.qandaBorderBottom};
}

.qanda-search-input::placeholder {
  display: flex;
  font-size: 16px;
  color: ${(props) => props.theme.qandaPlaceholder};
  align-items: center;
}

.question-list {
  display: flex;
  flex-direction: column;
  width: 1250px;
  overflow-y: auto;
}

.question-list::-webkit-scrollbar {
  width: 1px;
}

.question-list::-webkit-scrollbar-track {
  background-color: ${(props) => props.theme.mainBColor};
}

.question-list::-webkit-scrollbar-thumb {
  background-color: ${(props) => props.theme.fontColor};
}

.qandaButtons {
  display: flex;
  width: 1250px;
  align-items: center;
  border-top: 1px solid grey;
}

.question-body {
  display: flex;
  width: 1250px;
  height: 800px;
  flex-direction: column;
  justify-content: space-between;
  font-size: 16px;
  overflow-y: auto;
}

.question-set {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 1px solid grey;
  padding: 5px 5px;
}

.question-line {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-top: 10px;
  padding-bottom: 10px;
  margin: 5px;
  font-size: 16px;
}

.answer-list {
  display: flex;
  flex-direction: column;
}

.answer-line {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 5px;
  padding-top: 5px;
  padding-bottom: 5px;
}

.answer-bottom-border {
  width: 50%;
  // border-bottom: 1px dotted burlywood;
}

.no-answer {
  justify-content: center;
  margin: 5px
}

.photoThumbnail {
  display: inline-flex;
  height: auto;
  width: 20%;
}

.answer-photo {
  display: inline-flex;
  height: 100px;
  margin: 5px 10px 5px 0;
  // width: 20%;
}

.answer-photo:hover{
  cursor: pointer;
}

input[type='file'] {
  color: rgba(0,0,0,0)
}

.answerPhotoThumbnail {
  height: 100px;
  max-width: 19%;
  margin: 5px;
  margin-right: 10px;
}

/*
  BUTTONS
*/

.showAnswersButton {
  border-radius: 5px;
  border-style: none;
  height: 30px;
  background-color: ${(props) => props.theme.tealAndBurly};
  color: ${(props) => props.theme.fontColor};
  border-radius: 6px;
  border-style: none;
  padding: 5px 10px;
}

.question-list-button {
  height: 30px;
  width: 150px;
  border-radius: 5px;
  border-style: none;
  display: inline-block;
  margin-right: 10px;
  margin-top: 10px;
  border-radius: 6px;
  border-style: none;
  background-color: ${(props) => props.theme.tealAndBurly};
  color: ${(props) => props.theme.fontColor};
}

.show-more-or-less {
  margin-top: 10px;
  height: 30px;
  width: 180px;
  margin-right: 10px;
  border-radius: 5px;
  background-color: ${(props) => props.theme.showMoreBg};
  color: ${(props) => props.theme.showMoreColor};
  border-style: none;
}

.helpful {
  background-color: transparent;
  border: none;
  font-size: 14px;
  color: ${(props) => props.theme.helpfulColor};
}

.helpful:hover, .add-answer:hover, .report:hover{
  cursor: pointer;
}

.add-answer {
  background-color: transparent;
  border:none;
  color: ${(props) => props.theme.addAnswercolor};
}

.report {
  background-color: transparent;
  border: none;
  color: ${(props) => props.theme.reportColor};
}

/*
  PORTAL OVERLAY
*/

.portal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  justify-content: center;
  align-items: center;
  background-color: black;
  opacity: 30%;
  z-index: 10;
}

/*
  Q&A MODAL
*/

.question-modal,
.answer-modal {
  position: fixed;
  width: 30%;
  height: 50%;
  display: flex;
  flex-direction: column;
  margin: auto;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: 'rgba(0, 0, 0, .3)';
  padding: 25px;
  z-index: 11;
}

.question-form,
.answer-form {
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  margin: auto;
  border: 2px solid burlywood;
  background-color: ${(props) => props.theme.mainBColor};
  padding: 10px;
  z-index: 11;
}

.question-form input,
.answer-form input {
  background-color: ${(props) => props.theme.tealAndBurly};
  color: ${(props) => props.theme.fontColor};
}

.question-form input:hover,
.answer-form input:hover {
  cursor: pointer;
}

.answerInputPhotoSection,
.questionInputPhotoSection {
  display: flex;
  flex-direction: row;
  border: ${(props) => props.theme.burlyBorderBlack};
  background-color: ${(props) => props.theme.mainBColor};
}

/*
  QUESTION MODAL INPUTS
*/

textarea[name='user-question'],
textarea[name='user-answer'] {
  width: auto;
  height: 100px;
}

textarea[name='nickname'],
textarea[name='email'] {
  width: auto;
}

input[type='submit'] {
  height: 30px;
  width: 90px;
  margin-top: 20px;
}

.email-small {
  padding-bottom: 18px;
}

.photoThumbnail {
  display: inline-flex;
  height: auto;
  width: 20%;
}

input[type='file'] {
  color: rgba(0,0,0,0)
}

/*
  QUESTION MODAL HEADINGS
*/

.question-form h4,
.answer-form h4 {
  margin-top: 18px;
  margin-bottom: 18px;
}

/*
  WEB PAGE FUNCTIONS
*/

/*
  Outfits
*/

.plusCardArea {
  background-color: ${(props) => props.theme.plusCardAreaBg};
  color: ${(props) => props.theme.plusCardAreaColor};
  height: 300px;
  width: 255px;
  position: relative;
  border-bottom: 1px solid gray;
}

.plusCardArea:hover {
  background-color: ${(props) => props.theme.burlyAndTeal};
  color: black;
  height: 300px;
  width: 255px;
  cursor: pointer;
  /* position: relative; */
}

.plusSymbol {
  position: absolute;
  top: 42%;
  left: 42%;
  font-size: 50px;
}


.plusSymbolText {
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  height: 100px;
  color: white;
  border-top: ${(props) => props.theme.productDescBorder};
}

.outfits {
  height: 445px;
  width: 1200px;
  display: grid;
  position: relative;
  overflow: hidden;
  grid: auto / auto-flow max-content;
  padding-left: 20px;
}

/*
  MODAL
*/

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width:100%;
  height: 100%;
  background: rgba(0, 0, 0, .15);
  z-index: 99;
}

.modal-main {
  position:fixed;
  background: ${(props) => props.theme.modalCompareBg};
  color: ${(props) => props.theme.modalCompareText};
  width: 770px;
  height: auto;
  top:50%;
  left:50%;
  transform: translate(-50%,-50%);
  border: ${(props) => props.theme.burlyBorderBlack};
  z-index: 99;
}

.modalTable {
  width: 750px;
  height: 300px;
  padding: 10px;
  padding-bottom: 30px;
  z-index: 99;
}

.modalData {
  width: 250px;
  height: 10px;
  text-align: center;
  padding: 3px;
  z-index: 99;
}

.tableHead {
  width: 750px;
  text-align: center;
  z-index: 99;
}

.display-block {
  display: block;
  z-index: 99;
}

.display-none {
  display: none;
  z-index: 99;
}

/*
  CAROUSEL
*/

.carousel {
  overflow: hidden;
  position: relative;
}

.rightArrow {
  position: absolute;
  top:170px;
  left:1125px;
  font-size: 30px;
  z-index: 2;
}

.rightArrow:hover, .leftArrow:hover {
  cursor: pointer;
}

.leftArrow {
  position: absolute;
  top: 170px;
  left: 0px;
  font-size: 30px;
  z-index: 2;
}

/*
  STARS
*/

.single-star-outline {
  height: 36px;
  width: 31px;
}

.single-star-fill {
  position: relative;
  display: inline-block;
  height: 36px;
  background-color: #333333;
}

.single-star-container {
  height: 36px;
  width: 31px;
  display: inline-block;
}

.main-container {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  scroll-behavior: smooth
  padding-top: 50px;
  margin-top: 50px;
}

/* ----------------- Image Gallery ----------------- */


.image-container {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: row;
  background-color: ${(props) => props.theme.mainBColor};
}

.overviewFeature {
  width: 300px;
  display: flex;
  justify-content: space-between;
}

.pv-container {
  display: flex;
  align-items: center;
  justify-content: center;
  transition: ease-in 0.5s ease;
  margin: 0px 10px 0px 10px;
}

.pv-container-active {
  display: flex;
  align-items: center;
  justify-content: end;
  transition: ease-out 0.5s ease;
}

.pv-img {
  cursor: -moz-zoom-in;
  cursor: -webkit-zoom-in;
  cursor: zoom-in;
  width: 500px;
  height: 500px;
  object-fit: cover;
  border: ${(props) => props.theme.burlyBorderBlack};
}

.pv-active {
  cursor: -moz-zoom-out;
  cursor: -webkit-zoom-out;
  align-self: flex-end;
  width: 700px;
  height: 500px;
  cursor: zoom-out;
  object-fit: contain;
}

.g-container {
  display: flex;
  align-items: space-between;
  justify-content: center;
  flex-direction: column;
}

.g-container img {
  border: ${(props) => props.theme.gContainerImg};
}

.g-entry {
  cursor: pointer;
  background-color: #fff;
  width: 40px;
  margin-bottom: 2px;
  height: 50px;
  transition: all .5s ease;
}

.g-line {
  height: 3px;
  left: 10px;
  margin-bottom: 20px;
  background-color: ${(props) => props.theme.tealAndBurly};
}
.g-line-hidden {
  visibility: hidden;
  height: 3px;
  left: 10px;
  margin-bottom: 20px;
  background-color: ${(props) => props.theme.tealAndBurly};
}

.g-entry:hover {
  background: white;
  opacity: .80;
}

.g-border {
  border-bottom: solid 5px burlywood;
}


.arrow {
  color: ${(props) => props.theme.fontColor};
  cursor: pointer;
  font-size: 25px;
  padding: 5px;
  transition: all .5s ease;
}

.arrow-hidden {
  visibility: hidden;
  color: ${(props) => props.theme.fontColor};
  cursor: pointer;
  font-size: 25px;
  padding: 5px;
}

/* ----------------- Expaneded Section ----------------- */

.slider-modal {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 5;
  overflow-y: hidden;
  overflow-x: hidden;
}

.arrow-side {
  display: inline-block;
  color: white;
  cursor: pointer;
  font-size: 25px;
  padding: 20px 10px;
  transform: rotate(270deg);
  transition: all .5s ease;
}

.slider-overlay {
  position: fixed;
  top: 0;
  left: 0;
  background-color: black;
  opacity: 0.5;
  height: 100%;
  width: 100%;
  z-index: 3;
  }

  .sliderImg {
    display: flex;
    align-items: center;
    justify-content: center;
    // width: 700px;
    height: 800px;
    // max-height: 70vh;
    max-width: 700px;
    //padding: 10px;
    // max-width: unset !important;
    background-color: ${(props) => props.theme.headerBColor};
    border-radius: 10px;
    background-position: center;
    object-fit: scale-down;
    border: ${(props) => props.theme.burlyBorderBlack};
  }

  .sliderImg:hover {
    cursor: crosshair;
  }


.g-container-vertical {
  display: flex;
  align-items: space-between;
  justify-content: center;
  flex-direction: row;
  position: fixed;
  top: 90%;
  left: 50%;
  transform: translate(-50%);
  font-size: 25px;
  z-index: 4;
  cursor: pointer;
}

.g-entry-v {
  cursor: pointer;
  width: 60px;
  height: 60px;
  object-fit: cover;
  margin: 2px 10px;
  transition: all .5s ease;
  border-radius: 5px;
  border: 3px solid transparent;
}

.g-entry-v-b {
  cursor: pointer;
  width: 60px;
  height: 60px;
  object-fit: cover;
  margin: 2px 10px;
  border-radius: 5px;
  border: ${(props) => props.theme.styleBorder};
}

.g-line-v {
  width: 60px;
  height: 3px;
  margin: 0 auto;
  border: 3px solid transparent;
}

.left-arrow-v {
  position: fixed;
  top: 50%;
  transform: translate(0, -50%);
  left: 29%;
  font-size: 25px;
  color: white;
  z-index: 4;
  cursor: pointer;
  }

.right-arrow-v {
  position: fixed;
  top: 50%;
  transform: translate(0, -50%);
  left: 70%;
  font-size: 25px;
  color: white;
  z-index: 4;
  cursor: pointer;
  }



.dot-container {
  display: flex;
  justify-content: center;
  position: fixed;
  display: flex;
  top: 92%;
  left: 50%;
  transform: translate(-50%);
  color: gray;
  z-index: 4;
  }

.dot {
  margin: 0 5px;
  cursor: pointer;
  font-size: 20px;
}

.dot-active {
  margin: 0 5px;
  cursor: pointer;
  font-size: 20px;
  color: white;
}

#modalCarousel {
  width: 38%;
  max-height: fit-content;
}

.mainImage {
  margin-left: auto;
  margin-right: auto;
  width: 50%;
}



.mainImage:hover {
  cursor: zoom-in;
}

.modalImage:hover {
  cursor: crosshair;
}

.expand {
  color: ${(props) => props.theme.fontColor};
  cursor: pointer;
  font-size: 30px;
  align-self: flex-start;
}

.expand-container {
  width: 500px;
  height: 280px;
  margin: 0 auto;
}


/* ----------------- Style Section ----------------- */

.info-container {
  margin: 0 30px;
  width: 250px;
  scroll-behavior: smooth;
}

.style-category {
  margin-left: 3px;
}

.star-ratings {
  margin-right: 8px;
}

.reviewsInfo {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.star {
  margin: 0 2px;
}

.reviews {
  margin-left: 10px;
}

.style-title {
  display: inline-flex;
}

.style-text {
  font-size: 14px;
  margin-right: 5px;
  color: ${(props) => props.theme.fontColor};
  font-weight: 400;
}

.price {
  display: inline;
  font-size: 14px;
  font-weight: 400;
}

.price-line {
  font-size: 10px;
  text-decoration: line-through;
}

.price-sale {
  margin-right: 10px;
  color: ${(props) => props.theme.priceColor};
}

.style {
  font-weight: bolder;
}

.style-entry {
  cursor: pointer;
  box-sizing: border-box;
  height: 50px;
  width: 50px;
  margin: 5px;
  border-radius: 30px;
  object-fit: cover;
  border: ${(props) => props.theme.burlyBorderBlack};
  background-color: ${(props) => props.theme.burlyAndTeal};
  border: 1px solid burlywood;
}

.style-container {
  display: flex;
  flex-wrap: wrap;
}
.style-container-active {
  position: relative;
  display: flex;
  flex-wrap: wrap;
}
.style-entry-active {
  position: block;
  cursor: pointer;
  box-sizing: border-box;
  margin: 5px;
  border-radius: 30px;
  height: 50px;
  width: 50px;
  border: ${(props) => props.theme.styleBorder};
  object-fit: cover;
  background-color: ${(props) => props.theme.burlyAndTeal};
}
.check-active {
  color: ${(props) => props.theme.burlyAndTeal};;
  position: absolute;
  bottom: 42px;
  left: 5px;
}

.add-container {
  margin: 30px 0;
}

.out-of-stock {
  font-size: 14px;
  color: ${(props) => props.theme.fontColor};
}
.select-size-please {
  font-size: 14px;
  margin-bottom: 5px;
  margin-left: 5px;
  color: ${(props) => props.theme.fontColor};
}

.select-size-please-hide {
  visibility: hidden;
  font-size: 14px;
  margin-bottom: 5px;
  margin-left: 5px;
  color: ${(props) => props.theme.fontColor};
}

.select {
  background: #cccccc;
  border: burlywood;
  color: black;
  padding: 10px 20px;
  margin: 5px 7px;
}

.select-size {
  background: #cccccc;
  border: burlywood;
  color: black;
  padding: 10px 20px;
  margin-top: 5px;
  margin-bottom: 5px;
  margin-right: 20px;
  margin-left: 7px;
  width: 500px;
}

.select > svg {
  font-size: 14px;
  color: black;
}

.select-star {
  background: burlywood;
  color: black;
}

.select-size {
  width: 70px;
  height: 30px;
}

.add-cart {
  // padding: 10px 30px;
  // margin: 5px 7px;
  height: 30px;
  width: 175px;
  background:  ${(props) => props.theme.tealAndBurly};
  // border-radius: 4px;
  border: none;
  transition: ease-in-out 0.5s;
  color: ${(props) => props.theme.fontColor};
  margin-right: 5px;
}

.add-cart:hover {
  transition: ease-in-out 0.5s;
  background-color: black;
  color: white;
}

.add-cart span {
  margin: 0;
}

.select-size-dropdown {
  padding: 0;
  margin: 0;
  height: 30px;
  width: 150px;
  margin-right: 5px;
  margin-bottom: 5px;
  border: 1px solid ${(props) => props.theme.burlyBorderBlack};
}

.select-quantity {
  padding: 0;
  margin: 0;
  height: 30px;
  width: 55px;
  margin-bottom: 5px;
  border: 1px solid ${(props) => props.theme.burlyBorderBlack};
}

.select-star {
  padding: 0 0 2px 0;
  margin: 0;
  height: 30px;
  width: 30px;
  background: ${(props) => props.theme.tealAndBurly};
}

.select-star svg {
  margin: 0;
  color: ${(props) => props.theme.fontColor};
}


/* ----------------- Product Overview ----------------- */
.prodview-container {
  display: flex;
  width: 700px;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  margin: 40px auto;
}

.prodview-text {
  width: auto;
}

.prodview-line {
  margin: 0 40px;
  background-color: burlywood;
  border-radius: 7px;
  height: 150px;
  width: 4px;
}

.social {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  cursor: pointer;
  font-size: 24px;
  padding-right: 45px;
  color: ${(props) => props.theme.burlyAndTeal};
}

.social > button {
  color: #94B49F;
  margin: 10px 25px;
}

.feature {
  display: inline-block;
  margin: 0 10px;
  width: auto;
}

/*******************
  MAIN DIVS
********************/

.reviewMain {
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 1000px;
  height: auto;
  padding: 50px;
  margin-left: 140px;
}

.reviewSideBar {
  display: flex;
  flex-direction: column;
  height: auto;
  width: 400px;
  margin-right: 30px;
  padding: 0 40px 20px 10px;
  border-right: 1px solid burlywood;
}

.reviewList {
  height: 800px;
  width: 800px;
  border-top: 1px dashed burlywood;
  overflow-y: auto;
}

.reviewList::-webkit-scrollbar {
  width: 1px;
}
.reviewList::-webkit-scrollbar-track {
  background-color: ${(props) => props.theme.mainBColor};
}

.reviewList::-webkit-scrollbar-thumb {
  background-color: ${(props) => props.theme.fontColor};
}

/*******************
  SIDE BAR
********************/

/*
  AVERAGE RATING
*/

.averageRating {
  display: flex;
  flex-direction: column;
}

.averageRating p{
  margin: 0;
}

.averageRatingSection {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.averageRating h1 {
  font-size: 36px;
  margin-top: 0;
  margin-bottom: 0;
  margin-right: 5px;
}

.averageRating svg {
  margin-top: 2px;
  // padding-bottom: 15px;
}

.averageRating h1 {
  font-size: 36px;
}

.averageRating svg {
  margin-top: 2px;
  // padding-bottom: 15px;
}

/*
  RECOMMENDATIONS
*/

/*
  RATING BREAKDOWNS
*/

.ratingBreakdown {
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 420px;
  height: 400px;
}

.reviewBarSectionOff,
.reviewBarSectionOn {
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  width: inherit;
  align-items: center;
  // margin-left: 10px;
}

.reviewBarSectionOn {
  background-color: rgba(012, 012, 012, 0.274);
}

.reviewBarSectionOff:hover {
  cursor: pointer;
}

.reviewBarSectionOn:hover {
  cursor: pointer;
}

.reviewBarLabel {
  width: 50px;
  padding: 5px 5px 5px 0;
  text-align: center;
  margin-right: 7px;
}

.reviewBar {
  height: 10px;
  width: 300px;
  margin-top: 5px;
  margin-right: 5px;
}

.ratingStarIndicator {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 80px;
  padding-left: 5px;
}

.ratingStarIndicator u {
  color: ${(props) => props.theme.burlyAndTeal};
  cursor: pointer;
}

.ratingStarIndicatorStars {
  display: flex;
  flex-direction: row;
  gap: 10px;
}

.ratingStarIndicatorStars p {
  margin: 0;
}

/*
  CHARACTERISTICS
*/

.reviewCharacteristicSection {
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 400px;
}

.reviewSideCharacteristics {
  padding-left: 4px;
}

.reviewCharacteristicLabel {
  height: 10px;
  width: 50px;
  margin-right: 10px;
}

.reviewCharacteristicBarSection {
  display: flex;
  flex-direction: row;
}

.reviewCharacteristicBar {
  height: 10px;
  background-color: gray;
  margin-top: 18px;
  margin-right: 2px;
}

.reviewCharacteristicBarLabels {
  display: flex;
  flex-direction: row;
  width: 300px;
  margin-left: 60px;
  justify-content: space-between;
  height: 30px;
}

.reviewCharacteristicBarLabels p {
  margin-top: 0;
}

.reviewCharacteristicArrow {
  margin-top: 10px;
}





/**********************
  REVIEW LIST
***********************/

.reviewListHeader {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 400px;
}

.reviewSearchSection {
  display: inline-flex;
  border-bottom: 1px solid burlywood;
  width: 780px;
  height: 50px;
  padding: 0 10px;
  align-items: center;
}

.reviewSearchBar {
  display: inline-flex;
  width: 780px;
  height: 50px;
  background-color: transparent;
  border: 0;
  font-size: 16px;
  color: ${(props) => props.theme.qandaPlaceholder};
  caret-color: ${(props) => props.theme.fontColor};
}


.reviewSearchBarIcon {
  float: right;
  border: none;
  background-color: transparent;
  font-size: 30px;
}

.reviewSearchBar::placeholder {
  display: flex;
  font-size: 16px;
  color: ${(props) => props.theme.qandaPlaceholder};
}

.reviewListHeader {
  padding: 0 10px;
}

.reviewSortSection span {
  border-bottom: 1px solid burlywood;
  cursor: pointer;
}

.reviewSortDropDown {
  position: absolute;
  padding: 5px;
  background-color: ${(props) => props.theme.mainBColor};
  width: 80px;
  box-shadow: 0px 8px 16px 0px ${(props) => props.theme.dropdownShadow};
  z-index: 1;
}

.reviewSortDropDown p {
  color: ${(props) => props.theme.fontColor};
  padding: 5px;
  margin: 0;
  margin-bottom: 3px;
}

.reviewSortDropDown p:last-child {
  margin: 0;
}

.reviewSortDropDown p:hover {
  background-color: ${(props) => props.theme.burlyAndTeal};
  color: ${(props) => props.theme.defaultPrice};
  cursor: pointer;
}

.reviewListHeader h3 {
  font-size: 14px;
}

.reviewTile {
  border-bottom: 2px solid burlywood;
  padding: 4px 10px;
}

.reviewUserInfo {
  display: flex;
  flex-direction: row;
}

.reviewBodySection {
  overflow-wrap: break-word;
  border-top: 1px solid black;
  border-bottom: 1px solid black;
}

.reviewTileShowMore {
  cursor: pointer;
  width: 80px;
}

.reviewPhotoThumbnailSection img:hover{
  cursor: pointer;
}

.reviewPhotoThumbnail {
  height: 100px;
  margin-right: 10px;
}

.reviewResponse {
  background-color: rgba(180, 179, 179, 0.938);
  width: 80%;
}

.reviewInteractions {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 20px;
}

.reviewInteractions u {
  color: ${(props) => props.theme.burlyAndTeal};
}

.reviewHelpful {
  display: flex;
  flex-direction: row;
}

.reviewHelpful p {
  margin-right: 5px;
}

.reviewHelpful p u:hover {
  cursor: pointer;
}

.reviewReport u:hover {
  cursor: pointer;
}

.reviewExpandButtonSection {
  margin-top: 20px;
}

.reviewExpandButton {
  height: 60px;
  margin-right: 10px;
  color: ${(props) => props.theme.buttonText};
}

.reviewCheckmark {
  color: ${(props) => props.theme.fontColor};
}

/**********************
  PHOTO OVERLAY
***********************/

.reviewPhotoExpand {
  position: fixed;
  max-height: 90vh;
  max-width: 90vw;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 10px;
  background-color: white;
  border: 2px solid ${(props) => props.theme.burlyAndTeal};
  z-index: 50;
  overflow-y: auto;
}

.reviewPhotoExit {
  position: absolute;
  left: 10px;
  top: 10px;
}

/**********************
  INPUT OVERLAY
***********************/

.reviewOverlayBackground {
  position: fixed;
  top: 0;
  left: 0;
  background-color: black;
  opacity: 30%;
  height: 100vh;
  width: 100vw;
  z-index: 49;
}

/**********************
  REVIEW INPUT
***********************/

.reviewInput {
  position: fixed;
  --height: 92vh;
  --width: 1000px;
  top: calc(50% - (var(--height) / 2));
  left: calc(50% - (var(--width) / 2));
  margin: auto;
  height: var(--height);
  width: var(--width);
  padding: 6px 18px;
  background-color: ${(props) => props.theme.mainBColor};
  border: 2px solid burlywood;
  z-index: 50;
  overflow-y:scroll;
}

.reviewInput h2 {
  margin-top: 6px;
  margin-bottom: 4px;
}

.reviewInput h3 {
  margin-top: 20px;
  margin-bottom: 6px;
}

.reviewInput>h4 {
  margin-top: 0;
  margin-left: 15px;
}

.reviewInput p {
  margin-top: 0;
}

.reviewInput span {
  margin-left: 3px;
}

.reviewInputExit {
  position: absolute;
  left: 96%;
  top: 10px;
}

.reviewInput textarea {
  width: calc(var(--width) - 105px);
  height: 135px;
  resize: none;
}

/* .reviewInput textarea:first-of-type {
  width: 545px;
  height: 15px;
} */

.reviewTextInput {
  width: 550px;
}

.reviewInputExit:hover {
  cursor: pointer;
  color: red;
}

.reviewSubmit {
  height: 60px;
  width: 150px;
  margin-top: 40px;
  color: ${(props) => props.theme.fontColor};
  background-color: ${(props) => props.theme.tealAndBurly};
  border-radius: 5px;
  margin-bottom: 15px;
  border-style: none;
}

.reviewSubmitEnable {
  cursor: pointer;
}

.reviewInputErrors {
  position: absolute;
  left: 700px;
  top: 985px;
  color: red;
}

.reviewInputErrors p {
  margin: 0;
  margin-bottom: 5px;
  margin-left: 6px;
}

/*
  STAR INPUT
*/

.reviewInputStarSection {
  display: flex;
  flex-direction: row;
  width: 300px;
  padding: 1px 5px;
}

.reviewInputStarSection p {
  margin: 0;
  margin-left: 10px;
}

.ratingInputStar {
  margin-right: 7px;
  cursor: pointer;
}

.ratingInputStar:first-child {
  margin-left: 2px;
}

/*
  RECOMMENDATION INPUT
*/

.reviewInputRecommendations {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  height: auto;
  padding: 1px 5px;
}

.reviewInputRecommendations input {
  margin-right: 6px;
  cursor: pointer;
}

.reviewInputRecommendations p {
  margin: 0;
  margin-right: 40px;
}

/*
  CHARACTERISTIC INPUT
*/

.reviewInputCharacteristicsAggregate {
  padding: 1px 5px;
  width: 550px;
}

.reviewInputCharacteristicSection {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  height: auto;
  margin-top: 5px;
  border-bottom: 1px solid white;
}

.reviewInputCharacteristicSection:first-child {
  margin-top: 0;
}


.reviewInputCharacteristicLabel {
  margin: 0;
  margin-bottom: 3px;
}

.reviewInputCharacteristicButtons {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
}

.reviewInputCharacteristicButtons input {
  cursor: pointer;
}

.reviewInputCharacteristicsDescriptors {
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
}

.reviewInputCharacteristicsDescriptors p {
  margin: 5px 0;
}

/*
  IMAGES INPUT
*/

.reviewInputPhotoSection {
  display: flex;
  flex-direction: row;
  height: 110px;
  width: calc(var(--width) - 100px);
  border: ${(props) => props.theme.burlyBorderBlack};
  background-color: ${(props) => props.theme.mainBColor};
}

.reviewInputPhotoThumbnail {
  height: 100px;
  margin: 5px;
  margin-right: 10px;
}

.reviewInputPhotoButton {
  display: flex;
  flex-direction: column;
  background-color: #cccccc;
  height: 110px;
  width: 80px;
  justify-content: center;
  align-items: center;
  color: black;
}

.reviewInputPhotoButton:hover {
  background-color: ${(props) => props.theme.tealAndBurly};
  cursor: pointer;
}

.reviewInputPhotoButtonPlus {
  font-size: 40px;
  margin: auto;
}

button:hover {
  cursor: pointer;
}

.reviewExpandButton {
  border-radius: 5px;
  height: 30px;
  background-color: ${(props) => props.theme.tealAndBurly};
  color: ${(props) => props.theme.fontColor};
  border-style: none;
}

.fourOhFour {
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background-color: #0b1e1c;
  z-index: 10;
}

.fourOhFourImage {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
  z-index: 11;
}

.fourOhFourTimer {
  position: absolute;
  font-size: 40px;
  top: 18%;
  width: 100%;
  z-index: 11;
  text-align: center;
  -webkit-text-stroke: 2px black;
}

`;