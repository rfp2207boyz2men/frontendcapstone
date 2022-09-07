import { createGlobalStyle } from "styled-components";

export const lightTheme = {
<<<<<<< HEAD
  body: "white",
=======
  body: "#fff",
>>>>>>> dev
  fontColor: "black",
  mainBColor: 'white',
  headerBColor: 'white',
  borderColor: '1px solid black',
  starColor: 'teal',
  productBgColor: 'rgba(28,28,30, .9)',
  productBorderColor: '1px solid black',
<<<<<<< HEAD
  productImgBorder: '1px solid teal',
  productDescBorder: '1px solid burlywood',
  burlyBorderBlack: '1px solid black',
  starCardColor: 'teal',
=======
  productImgBorder: '',
  productDescBorder: '1px solid burlywood',
  burlyBorderBlack: '',
  starCardColor: '',
>>>>>>> dev
  defaultPrice: 'white',
  qandaSearchBg: 'white',
  qandaBorderLeft: '1px solid black',
  qandaBorderTop: '1px solid black',
  qandaBorderBottom: '1px solid black',
  qandaIconBorderLeft: '1px solid black',
  qandaIconBorderTop: '1px solid black',
  qandaIconBorderBottom: '1px solid black',
  qandaPlaceholder: 'gray',
  showMoreBg: 'teal',
  showMoreColor: 'white',
  helpfulColor: 'teal',
  addAnswercolor: 'teal',
  reportColor: 'teal',
  plusCardAreaBg: '#cccccc',
<<<<<<< HEAD
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
=======
  plusCardAreaColor: 'teal',
  burlyAndTeal: 'teal',
  tealAndBurly: 'burlywood',
  gContainerImg: '',
  togglerBg: 'burlywood',
  selectColor: 'black',
  selectBorder: '2px solid burlywood',
>>>>>>> dev
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
<<<<<<< HEAD
  buttonText: 'black',
  linkColor: 'white',
  modalCompareBg: '#121212',
  modalCompareText: 'white',
=======
>>>>>>> dev
};

export const GlobalStyles = createGlobalStyle`

<<<<<<< HEAD
=======
.aClass {
  animation: slideIn 0.3s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translate3d(-20rem, 0, 500rem);
  }
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

>>>>>>> dev

/*
  BOTH MODES
*/

html {
  scroll-behavior: smooth;
<<<<<<< HEAD
  background-color: ${(props) => props.theme.htmlBackgroundColor};
}

a {
  color: ${(props) => props.theme.linkColor};
}
=======
}

>>>>>>> dev

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
<<<<<<< HEAD
  width: 1400px;
  margin: auto;
=======
>>>>>>> dev
  background-color: ${(props) => props.theme.mainBColor};
  color: ${(props) => props.theme.fontColor};
}

.header {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
<<<<<<< HEAD
  padding-top: 10px;
  padding-bottom: 10px;
  height: 100px;
  width: 1400px;
  margin: auto;
=======
  padding: 10px;
  height: 100px;
>>>>>>> dev
  background-color: ${(props) => props.theme.headerBColor};
  color: ${(props) => props.theme.fontColor};
  border-bottom: 1px solid burlywood;
}

.theme-toggler {
  cursor: pointer;
<<<<<<< HEAD
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
=======
  font-size: 20px;
  margin-left: 20px;
  transition: ease-in-out 0.5s;
}
.theme-toggler > svg {
  margin-right: 10px;
>>>>>>> dev
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

.search {
  width: 500px;
  margin-top: 5px;
  height: 30px;
  border-style: none;
  padding-top: 5px;
  outline:none;
  background-color: ${(props) => props.theme.headerBColor};
}

.search:focus {
<<<<<<< HEAD
=======
  border: 1px solid teal;
  border-radius: 10px;
>>>>>>> dev
  color: ${(props) => props.theme.fontColor};
}

.searchbar {
  border-bottom: ${(props) => props.theme.borderColor};
  padding: 1px;
}

.searchIcon {
  font-size: 20px;
}

.shoppingBag {
  margin-top: 15px;
<<<<<<< HEAD
  font-size: 30px;
  padding: 5px;
  padding-right: 13px;
  position: relative;
=======
  font-size: 25px;
  padding: 5px;
>>>>>>> dev
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
<<<<<<< HEAD
  font-size: 16px;
  margin: 0;
  padding: 0;
  position: absolute;
  top: 0px;
  right: 0px;
  opacity: .95;
=======
  font-size: 18px;
  margin: 0;
  padding: 0;
>>>>>>> dev
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
<<<<<<< HEAD
  width: 1330px;
=======
  width: 1340px;
>>>>>>> dev
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
  border: ${(props) => props.theme.productBorderColor};;
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
<<<<<<< HEAD
  width: 245px;
=======
  width: 255px;
>>>>>>> dev
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
  color: red;
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
<<<<<<< HEAD
  width: 1300px;
=======
  width: 100px;
>>>>>>> dev
  height: auto;
  margin-left: 50px;
}

.qanda {
  display: flex;
  flex-direction: column;
<<<<<<< HEAD
  width: 1250px;
  height: 500px;
  border-bottom: 1px dashed burlywood;
  border-top: 1px dashed burlywood;
=======
  width: 1300px;
  height: auto;
  /* border: 2px solid black; */
  border-bottom: 1px dashed white;
>>>>>>> dev
  overflow-y: auto;
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
  border: 1px solid white;
<<<<<<< HEAD
  width: 1248px;
=======
  width: 1298px;
>>>>>>> dev
  height: 50px;
  margin-top: 5px;
}

.qanda-search-input {
  display: inline-flex;
  border: none;
  outline: none;
  width: 1300px;
  height: 50px;
  background-color: ${(props) => props.theme.qandaSearchBg};
  align-items: center;
  caret-color: white;
  padding-left: 10px;
<<<<<<< HEAD
  color: ${(props) => props.theme.qandaPlaceholder};
=======
  color: white;
>>>>>>> dev
  font-size: 16px;
  border-left: ${(props) => props.theme.qandaBorderLeft};
  border-top: ${(props) => props.theme.qandaBorderTop};
  border-bottom: ${(props) => props.theme.qandaBorderBottom};
}

.qanda-search-icon {
  display: inline-flex;
  border: none;
  background-color: #48484a;
  color: white;
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
<<<<<<< HEAD
  width: 1250px;
=======
  width: 1300px;
>>>>>>> dev
  overflow-y: auto;
}

.question-list::-webkit-scrollbar {
  width: 0;
  height: 0;
}

<<<<<<< HEAD
.qandaButtons {
  display: flex;
  width: 355px;
  align-items: center;
}

.question-body {
  display: flex;
  width: 1250px;
=======
.question-body {
  display: flex;
  width: 1400px;
>>>>>>> dev
  height: auto;
  flex-direction: column;
  justify-content: space-between;
  font-size: 16px;
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
}

.no-answer {
  justify-content: center;
  margin: 5px
}

<<<<<<< HEAD
.photoThumbnail {
  display: inline-flex;
  height: auto;
  width: 20%;
}

input[type='file'] {
  color: rgba(0,0,0,0)
}

/*
  BUTTONS
*/

.question-list-button {
  height: 60px;
  width: 150px;
  display: inline-block;
  margin-right: 10px;
}

=======
/*
  BUTTONS
*/
>>>>>>> dev
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

<<<<<<< HEAD
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
  background-color: white;
  padding: 10px;
  z-index: 11;
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
=======
>>>>>>> dev

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
  z-index: 1;
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
  z-index: 2;
}

.modal-main {
  position:fixed;
<<<<<<< HEAD
  background: ${(props) => props.theme.modalCompareBg};
  color: ${(props) => props.theme.modalCompareText};
=======
  background: #1c1c1e;
  color: white;
>>>>>>> dev
  width: 770px;
  height: auto;
  top:50%;
  left:50%;
  transform: translate(-50%,-50%);
  border: 1px solid black;
}

.modalTable {
  width: 750px;
  height: 300px;
  padding: 10px;
  padding-bottom: 30px;
}

.modalData {
  width: 250px;
  height: 10px;
  text-align: center;
  padding: 3px;
}

.tableHead {
  width: 750px;
  text-align: center;
}

.display-block {
  display: block;
}

.display-none {
  display: none;
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
  z-index: 14;
}

.rightArrow:hover, .leftArrow:hover {
  cursor: pointer;
}

.leftArrow {
  position: absolute;
  top: 170px;
  left: 0px;
  font-size: 30px;
  z-index: 14;
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
<<<<<<< HEAD
  align-items: flex-start;
  justify-content: center;
  scroll-behavior: smooth
  padding-top: 50px;
  margin-top: 50px;
=======
  align-items: center;
  justify-content: center;
  scroll-behavior: smooth
>>>>>>> dev
}

/* ----------------- Image Gallery ----------------- */


.image-container {
  display: flex;
<<<<<<< HEAD
  align-items: flex-start;
  justify-content: center;
  flex-direction: row;
  background-color: ${(props) => props.theme.mainBColor};
=======
  align-items: center;
  justify-content: center;
  flex-direction: row;
  background-color: ${(props) => props.theme.mainBColor};
  margin-top: 50px;
>>>>>>> dev
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
<<<<<<< HEAD
  margin: 0px 10px 0px 10px;
=======
  margin: 10px;
>>>>>>> dev
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
<<<<<<< HEAD
=======
  animation: fadeIn 0.3s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
>>>>>>> dev
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
<<<<<<< HEAD
  align-items: space-between;
=======
  align-items: center;
>>>>>>> dev
  justify-content: center;
  flex-direction: column;
}

.g-container img {
  border: ${(props) => props.theme.gContainerImg};
}

.g-entry {
  cursor: pointer;
  background-color: #fff;
  width: 50px;
<<<<<<< HEAD
  margin-bottom: 20px;
=======
  margin: 20px;
>>>>>>> dev
  height: 50px;
  transition: all .5s ease;
}

<<<<<<< HEAD
.g-entry:hover {
  background: white;
  opacity: .80;
}

.g-border {
  border-bottom: solid 5px burlywood;
=======
/* .g-border {
  border-bottom: solid 5px burlywood;
} */

.g-line {
  width: 50px;
  height: 3px;
  background-color: ${(props) => props.theme.tealAndBurly};
>>>>>>> dev
}

.arrow {
  color: ${(props) => props.theme.fontColor};
  cursor: pointer;
  font-size: 25px;
  padding: 5px;
  transition: all .5s ease;
<<<<<<< HEAD
=======
  animation: slideIn 0.3s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
>>>>>>> dev
}

.expand {
  color: ${(props) => props.theme.fontColor};
  cursor: pointer;
  font-size: 30px;
  align-self: flex-start;
}

/* ----------------- Style Section ----------------- */

.info-container {
<<<<<<< HEAD
  margin: 0 30px;
=======
  margin: 30px 30px;
>>>>>>> dev
  width: 250px;
  scroll-behavior: smooth;
}

<<<<<<< HEAD
.reviewsInfo {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

=======
>>>>>>> dev
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
<<<<<<< HEAD
  color: ${(props) => props.theme.fontColor};;
  font-weight: 400;
}

=======
  color: ${(props) => props.theme.fontColor};
  font-weight: 400;
}

.style-category {
  line-height: 14px;
  text-decoration: underline;
  margin-top: 20px;
  padding: 0;
  font-size: 15px;
  color: ${(props) => props.theme.fontColor};
}

>>>>>>> dev
.price {
  font-size: 14px;
  font-weight: 400;
}

.price-line {
  text-decoration: line-through;
}

.price-sale {
  color: red;
}

.style {
  font-weight: bolder;
}

.style-entry {
  cursor: pointer;
<<<<<<< HEAD
  border-radius: 30px;
=======
  border-radius: 20%;
>>>>>>> dev
  border: solid 0.5px #333;
  object-fit: cover;
  height: 50px;
  width: 50px;
  margin: 5px;
  background-color: ${(props) => props.theme.burlyAndTeal};
}

.style-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}

<<<<<<< HEAD
.style-container img {
=======
.style-container-active {
>>>>>>> dev
  border: ${(props) => props.theme.burlyBorderBlack};
}

.add-container {
  margin: 30px 0;
}

.add-cart {
  padding: 10px 30px;
  margin: 5px 7px;
<<<<<<< HEAD
  width: 150px;
=======
>>>>>>> dev
  background:  ${(props) => props.theme.tealAndBurly};
  border-radius: 4px;
  border: none;
  transition: ease-in-out 0.5s;
  color: ${(props) => props.theme.fontColor};
}

.add-cart:hover {
  transition: ease-in-out 0.5s;
  background-color: black;
  color: white;
}

.select {
<<<<<<< HEAD
  background: #cccccc;
  border: burlywood;
  color: black;
=======
  background: transparent;
  border-radius: 3px;
  border: ${(props) => props.theme.selectBorder};
  color: ${(props) => props.theme.selectColor};
>>>>>>> dev
  padding: 10px 20px;
  margin: 5px 7px;
}

.select > svg {
  font-size: 14px;
<<<<<<< HEAD
  color: black;
}

.select select-star {
  background: burlywood;
  color: black;
=======
  color: ${(props) => props.theme.tealAndBurly};
>>>>>>> dev
}


/* ----------------- Product Overview ----------------- */
.prodview-container {
  display: flex;
<<<<<<< HEAD
  width: 700px;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  margin: 40px auto;
}

.prodview-text {
  width: auto;
=======
  justify-content: center;
  align-items: center;
  flex-direction: row;
  margin: 40px 400px;
}

.prodview-text {
  width: 100%;
>>>>>>> dev
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
  color: ${(props) => props.theme.burlyAndTeal};
}

.social > button {
  color: #94B49F;
  margin: 10px 25px;
}

.feature {
  display: inline-block;
  margin: 0 10px;
<<<<<<< HEAD
  width: auto;
=======
>>>>>>> dev
}

/*******************
  MAIN DIVS
********************/

.reviewMain {
  display: flex;
  flex-direction: row;
<<<<<<< HEAD
  justify-content: center;
  width: 1400px;
  height: auto;
=======
  /* flex-wrap: wrap; */
  justify-content: space-between;
  width: 1400px;
  height: auto;
  padding: 50px;
  /* background-color: pink; */
  /* border: 2px solid black; */
  /* overflow-y: auto; */
>>>>>>> dev
}

.reviewSideBar {
  display: flex;
  flex-direction: column;
  height: auto;
  width: 400px;
  margin-right: 30px;
  padding: 0 10px 20px 10px;
<<<<<<< HEAD
  border-right: 1px solid teal;
=======
  border-right: 1px solid white;
>>>>>>> dev
  /* background-color: gray; */
  /* border: 2px solid rgb(8, 88, 8); */
}

.reviewList {
  height: auto;
<<<<<<< HEAD
  width: 800px;
=======
  width: 900px;
>>>>>>> dev
  /* border: 2px solid black; */
  overflow-y: auto;
}

.reviewList::-webkit-scrollbar {
  width: 0;
  height: 0;
  /* background: transparent; */
}

/*******************
  SIDE BAR
********************/

/*
  AVERAGE RATING
*/

.averageRating {
  display: flex;
<<<<<<< HEAD
  align-items: center;
  /* border: 1px solid gray; */
}

.averageRating h1 {
  font-size: 36px;
}

.averageRating svg {
  padding-bottom: 15px;
}

=======
  /* border: 1px solid gray; */
}

>>>>>>> dev
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
  width: 400px;
  height: 400px;
  /* border: 1px solid gray; */
}

.reviewBarSectionOff,
.reviewBarSectionOn {
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  width: inherit;
  align-items: center;
  /* border: 1px solid rgb(65, 65, 65); */
}

.reviewBarSectionOn {
  background-color: rgba(012, 012, 012, 0.274);
  /* border: 5px solid teal; */
}

.reviewBarSectionOff:hover {
  cursor: pointer;
  /* background-color: teal; */
  /* transition: 0.3s; */
}

.reviewBarSectionOn:hover {
  cursor: pointer;
  /* background-color: transparent; */
  /* transition: 0.3s; */
}

.reviewBarLabel {
  width: 50px;
  padding:5px;
  text-align: center;
}

.reviewBar {
  height: 10px;
  width: 300px;
  margin-top: 5px;
  margin-right: 5px;
  /* background-color: pink; */
  /* border: 2px solid red; */
}

.ratingStarIndicator {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 80px;
}

.ratingStarIndicator u {
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
  /* border: 2px solid black; */
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
  /* width: 300px; */
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
  /* text-align: center; */
  height: 30px;
  /* font-size: 30px; */
}




/**********************
  REVIEW LIST
***********************/

<<<<<<< HEAD

.reviewListHeader {
  display: flex;
  flex-direction: row;
  width: 800px;
  justify-content: space-between;

.reviewSearchSection {
  display: inline-flex;
  border-bottom: 1px solid ${(props) => props.theme.burlyAndTeal};
  width: 900px;
  height: 50px;
  padding: 0 10px;
  align-items: center;
}

.reviewSearchBar {
  display: inline-flex;
  width: 900px;
  height: 50px;
  background-color: transparent;
  border: 0;
  font-size: 16px;
  color: ${(props) => props.theme.qandaPlaceholder};
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
  border-bottom: 1px solid black;
  cursor: pointer;
}

.reviewSortDropDown {
  position: absolute;
  background-color: ${(props) => props.theme.tealAndBurly};
  width: 80px;
}

.reviewSortDropDown p {
  color: ${(props) => props.theme.fontColor};
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

// .reviewListHeader {
//   display: flex;
//   flex-direction: row;
//   width: 900px;
//   justify-content: space-between;
//   align-items: center;
//   margin-right: 50px;
// }

=======
.reviewListHeader {
  display: flex;
  flex-direction: row;
  width: 900px;
  justify-content: space-between;
  align-items: center;
  margin-right: 50px;
}

>>>>>>> dev
.reviewListHeader h3 {
  font-size: 14px;
}

.reviewTile {
  /* background-color: red; */
  /* height: 200px; */
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

<<<<<<< HEAD
.reviewTileShowMore {
  cursor: pointer;
  width: 80px;
}

// .reviewCheckmark {
//   color: red;
// }

=======
>>>>>>> dev
.reviewPhotoThumbnailSection {
  /* height: 150px; */
  /* background-color: pink; */
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
<<<<<<< HEAD
  color: ${(props) => props.theme.buttonText};;
=======
>>>>>>> dev
}

/**********************
  PHOTO OVERLAY
***********************/

.reviewPhotoExpand {
  position: fixed;
<<<<<<< HEAD
  max-height: 90vh;
  max-width: 90vw;
=======
  max-height: 70vh;
  max-width: 70vw;
>>>>>>> dev
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 10px;
  background-color: white;
<<<<<<< HEAD
  border: 2px solid ${(props) => props.theme.burlyAndTeal};
=======
  border: 2px solid teal;
>>>>>>> dev
  z-index: 3;
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

.reviewOverlay {

  /* height: 100vh;
  width: 100vh; */
}

.reviewOverlayBackground {
  position: fixed;
  top: 0;
  left: 0;
  background-color: black;
  opacity: 30%;
  height: 100vh;
  width: 100vw;
}

/**********************
  REVIEW INPUT
***********************/

.reviewInput {
  position: fixed;
  --height: 900px;
  --width: 1000px;
  top: calc(50% - (var(--height) / 2));
  left: calc(50% - (var(--width) / 2));
  margin: auto;
  height: var(--height);
  width: var(--width);
  padding: 6px 18px;
  background-color: ${(props) => props.theme.mainBColor};
  border: 2px solid burlywood;
  z-index: 1;
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
  background-color: ${(props) => props.theme.burlyAndTeal};
  border-radius: 5px;
  margin-bottom: 15px;
}

.reviewSubmitEnable {
  cursor: pointer;
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
  /* background-color: red; */
}

/* .reviewInputRecommendations h3 {
  width: 100%;
  margin: 0;
} */

.reviewInputRecommendations input {
  margin-right: 6px;
  cursor: pointer;
}

.reviewInputRecommendations p {
  margin: 0;
  /* margin-top: 14px; */
  margin-right: 40px;
}

/*
  CHARACTERISTIC INPUT
*/

.reviewInputCharacteristicsAggregate {
  /* border: 1px solid black;
  border-left: 0;
  border-right: 0; */
  padding: 1px 5px;
  width: 550px;
}

.reviewInputCharacteristicSection {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  height: auto;
  margin-top: 5px;
  /* padding-left: 5px; */
  border-bottom: 1px solid white;
  /* border: 1px solid red; */
}

.reviewInputCharacteristicSection:first-child {
  margin-top: 0;
}

.reviewInputCharacteristicSection:last-child {
  /* border-bottom: 0; */
  /* border: 1px solid red; */
}

.reviewInputCharacteristicLabel {
  margin: 0;
  margin-bottom: 3px;
  /* width: 100%; */
  /* background-color: red; */
}

.reviewInputCharacteristicButtons {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  /* border: 1px solid blue; */
}

.reviewInputCharacteristicButtons input {
  cursor: pointer;
}

.reviewInputCharacteristicsDescriptors {
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  /* border: 2px solid green; */
}

.reviewInputCharacteristicsDescriptors p {
  margin: 5px 0;
}

/*
  IMAGES INPUT
*/

.reviewInputPhotoSection {
  /* box-sizing: border-box; */
  display: flex;
  flex-direction: row;
  height: 110px;
  /* max-height: 120px; */
  width: calc(var(--width) - 100px);
  /* padding: 5px; */
  /* background-color: red; */
  border: 1px solid black;
  background-color: white;
}

.reviewInputPhotoThumbnail {
  height: 100px;
  margin: 5px;
  margin-right: 10px;
  /* width: 80px; */
}

.reviewInputPhotoButton {
  /* box-sizing: border-box; */
  display: flex;
  flex-direction: column;
  /* grid-template-rows: 50% 30px; */
  /* grid-template-columns: 50%; */
  background-color: #cccccc;
  height: 110px;
  width: 80px;
  justify-content: center;
  align-items: center;
  color: black;
  /* align-content: center; */
}

.reviewInputPhotoButton:hover {
  background-color: burlywood;
  cursor: pointer;
}

.reviewInputPhotoButtonPlus {
  /* display: flex;
  justify-content: center;
  align-content: center; */
  /* grid-row: 2; */
  /* grid-column: 2; */
  font-size: 40px;
  margin: auto;
}

.reviewInputPhotoButtonText {
  /* display: flex;
  justify-content: center;
  align-content: center; */
  /* grid-row: 3; */
}

button:hover {
  cursor: pointer;
}

.reviewExpandButton {
  border-radius: 5px;
  height: 30px;
<<<<<<< HEAD
  background-color: ${(props) => props.theme.tealAndBurly};
  color: ${(props) => props.theme.fontColor};
=======
  background-color: ${(props) => props.theme.burlyAndTeal};
>>>>>>> dev
  border-style: none;
}


`;