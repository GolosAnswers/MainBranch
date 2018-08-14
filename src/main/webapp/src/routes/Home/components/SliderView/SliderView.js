import React, { Component } from 'react'
import { Carousel } from 'react-responsive-carousel'
import './SliderView.scss'
import './carousel.scss'
import pic1 from './logo.png'

export default class SliderView extends Component {

  render = () => {
    return (
      <div>
        <div>
          <Carousel showThumbs={false} showArrows={true} showStatus={false} >
            <div>
              <img src={pic1} />
            </div>
          </Carousel>
        </div>
      </div>
    )
  }

}
