import React from 'react';
import { render } from 'react-dom';
import Style from './Style.jsx';

class StyleSelector extends React.Component {
  constructor(props) {
    super(props)

    this.state ={
    }



  }

  componentDidCatch() {
  }




  render() {
    return (
      <div>
      <div className='style-title'>
        <h4> STYLE > </h4>
        <h4>{this.props.localName}</h4>
      </div>
      {console.log('ye', this.props.styles)}
      <div className='style-container'>
        {this.props.styles.map(style => {
          return <Style handleClick={this.props.handleLocalClick} key={style.style_id}
           id={style.style_id}
           name={style.name}
           url={style.photos[0].thumbnail_url}
           className='style-entry'/>
        })}
      </div>
    </div>
    )
  }
}

export default StyleSelector;