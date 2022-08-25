import React from 'react';
import { TiTick } from 'react-icons/ti';

const ProductOverview = () => (
  <div className='prodview-container'>
    <div className='prodview-text'>
      <h2>Lorem Ipsum the printing and typesetting industry.</h2>
      <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.</p>
      <p>If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text.</p>
    </div>
    <div className='prodview-line'></div>
    <div>
      <p><TiTick />GMO</p>
      <p><TiTick />Made with 100% Generic Salt</p>
      <p><TiTick />Can cause itches</p>
      <p><TiTick />Or not</p>
    </div>
  </div>
)

export default ProductOverview;