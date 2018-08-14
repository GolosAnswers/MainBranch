import React, { Component } from 'react'
import GridView from './GridView/GridView'
import FooterView from './FooterView/FooterView'
import './MainView.scss'

export default class MainView extends Component {

  render = () => {
    return (
      <div>
        <div className='main-header'>
          <GridView />
          <FooterView />
        </div>
      </div>
    )
  }

}
