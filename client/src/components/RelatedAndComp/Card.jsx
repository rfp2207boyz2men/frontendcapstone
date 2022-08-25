import React, { useState, useEffect, useContext } from 'react';

const Card = ({product}) => {

  //https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/undefined
  //https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews:40348?count=10
  //https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews/?product_id=40344
  //https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews/?product_id=40344&count=10


    return (
      <div>
        {product.name}
      </div>
    )
}

export default Card;