//SET UP PRE-DETERMINED TEST-DATA FOR AXIOS TESTING HERE

// GET /products
export const productList =
{data: [
    {
          "id": 1,
          "name": "Camo Onesie",
          "slogan": "Blend in to your crowd",
          "description": "The So Fatigues will wake you up and fit you in. This high energy camo will have you blending in to even the wildest surroundings.",
          "category": "Jackets",
          "default_price": "140"
      },
    {
          "id": 2,
          "name": "Bright Future Sunglasses",
          "slogan": "You've got to wear shades",
          "description": "Where you're going you might not need roads, but you definitely need some shades. Give those baby blues a rest and let the future shine bright on these timeless lenses.",
          "category": "Accessories",
          "default_price": "69"
      },
    {
          "id": 3,
          "name": "Morning Joggers",
          "slogan": "Make yourself a morning person",
          "description": "Whether you're a morning person or not. Whether you're gym bound or not. Everyone looks good in joggers.",
          "category": "Pants",
          "default_price": "40"
      }
]};

// GET /products/:product_id
export const product =
{data: {
  "id": 11,
  "name": "Air Minis 250",
  "slogan": "Full court support",
  "description": "This optimized air cushion pocket reduces impact but keeps a perfect balance underfoot.",
  "category": "Basketball Shoes",
  "default_price": "0",
  "features": [
  {
          "feature": "Sole",
          "value": "Rubber"
      },
  {
          "feature": "Material",
          "value": "FullControlSkin"
      },
  ]
}};

// GET /products/:product_id/styles
export const productStyles =
{data: {
  "product_id": "1",
  "results": [
  {
          "style_id": 1,
          "name": "Forest Green & Black",
          "original_price": "140",
          "sale_price": "0",
          "default?": true,
          "photos": [
      {
                  "thumbnail_url": "urlplaceholder/style_1_photo_number_thumbnail.jpg",
                  "url": "urlplaceholder/style_1_photo_number.jpg"
              },
      {
                  "thumbnail_url": "urlplaceholder/style_1_photo_number_thumbnail.jpg",
                  "url": "urlplaceholder/style_1_photo_number.jpg"
              }
          ],
      "skus": {
                "37": {
                      "quantity": 8,
                      "size": "XS"
                },
                "38": {
                      "quantity": 16,
                      "size": "S"
                },
                "39": {
                      "quantity": 17,
                      "size": "M"
                },
            }
  },
  {
        "style_id": 2,
        "name": "Desert Brown & Tan",
        "original_price": "140",
        "sale_price": "0",
        "default?": false,
        "photos": [
        {
                    "thumbnail_url": "urlplaceholder/style_2_photo_number_thumbnail.jpg",
                    "url": "urlplaceholder/style_2_photo_number.jpg"
        }
            ],
        "skus": {
                  "37": {
                        "quantity": 8,
                        "size": "XS"
                  },
                  "38": {
                        "quantity": 16,
                        "size": "S"
                  },
                  "39": {
                        "quantity": 17,
                        "size": "M"
                  },
              }
    }]
  }
};

// GET /products/:product_id/related
export const related =
{data: [2, 3, 8, 7]};

/////////////////////////////////////

////////////////////////////////////

// GET /reviews/
export const reviews =
{data: {
  "product": "2",
  "page": 0,
  "count": 5,
  "results": [
    {
      "review_id": 5,
      "rating": 3,
      "summary": "I'm enjoying wearing these shades",
      "recommend": false,
      "response": null,
      "body": "Comfortable and practical.",
      "date": "2019-04-14T00:00:00.000Z",
      "reviewer_name": "shortandsweeet",
      "helpfulness": 5,
      "photos": [{
          "id": 1,
          "url": "urlplaceholder/review_5_photo_number_1.jpg"
        },
        {
          "id": 2,
          "url": "urlplaceholder/review_5_photo_number_2.jpg"
        },
      ]
    },
    {
      "review_id": 3,
      "rating": 4,
      "summary": "I am liking these glasses",
      "recommend": false,
      "response": "Glad you're enjoying the product!",
      "body": "They are very dark. But that's good because I'm in very sunny spots",
      "date": "2019-06-23T00:00:00.000Z",
      "reviewer_name": "bigbrotherbenjamin",
      "helpfulness": 5,
      "photos": [],
    },
  ]
}};

// GET /reviews/meta
export const meta =
{data: {
  "product_id": "2",
  "ratings": {
    2: 1,
    3: 1,
    4: 2,
  },
  "recommended": {
    0: 5
  },
  "characteristics": {
    "Size": {
      "id": 14,
      "value": "4.0000"
    },
    "Width": {
      "id": 15,
      "value": "3.5000"
    },
    "Comfort": {
      "id": 16,
      "value": "4.0000"
    },
  }
}};

//////////////////////////////

//////////////////////////////

// GET /qa/questions

export const questions =
{data: {
  "product_id": "5",
  "results": [{
        "question_id": 37,
        "question_body": "Why is this product cheaper here than other sites?",
        "question_date": "2018-10-18T00:00:00.000Z",
        "asker_name": "williamsmith",
        "question_helpfulness": 4,
        "reported": false,
        "answers": {
          68: {
            "id": 68,
            "body": "We are selling it here without any markup from the middleman!",
            "date": "2018-08-18T00:00:00.000Z",
            "answerer_name": "Seller",
            "helpfulness": 4,
            "photos": []
          }
        }
      },
      {
        "question_id": 38,
        "question_body": "How long does it last?",
        "question_date": "2019-06-28T00:00:00.000Z",
        "asker_name": "funnygirl",
        "question_helpfulness": 2,
        "reported": false,
        "answers": {
          70: {
            "id": 70,
            "body": "Some of the seams started splitting the first time I wore it!",
            "date": "2019-11-28T00:00:00.000Z",
            "answerer_name": "sillyguy",
            "helpfulness": 6,
            "photos": [],
          },
          78: {
            "id": 78,
            "body": "9 lives",
            "date": "2019-11-12T00:00:00.000Z",
            "answerer_name": "iluvdogz",
            "helpfulness": 31,
            "photos": [],
          }
        }
      },
  ]
}};

// GET /qa/questions/:question_id/answers
export const answers =
{data: {
  "question": "1",
  "page": 0,
  "count": 5,
  "results": [
    {
      "answer_id": 8,
      "body": "What a great question!",
      "date": "2018-01-04T00:00:00.000Z",
      "answerer_name": "metslover",
      "helpfulness": 8,
      "photos": [],
    },
    {
      "answer_id": 5,
      "body": "Something pretty durable but I can't be sure",
      "date": "2018-01-04T00:00:00.000Z",
      "answerer_name": "metslover",
      "helpfulness": 5,
      "photos": [{
          "id": 1,
          "url": "urlplaceholder/answer_5_photo_number_1.jpg"
        },
        {
          "id": 2,
          "url": "urlplaceholder/answer_5_photo_number_2.jpg"
        },
      ]
    },
  ]
}};

//////////////////////////////

//////////////////////////////

// GET /cart
export const cart =
{data: [
  {
      "sku_id": 1,
      "count": 2
  },
  {
      "sku_id": 3,
      "count": 1
  },
  {
      "sku_id": 5,
      "count": 33
  },
]};

///////////////////////////////

//////////////////////////////

// FUNCTIONS THAT MIGHT BE BEING PASSED DOWN

export const renderStars = (rating) => {
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