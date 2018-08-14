import React, { Component } from 'react'
import MyQuestionsView from './MyQuestionsView/MyQuestionsView'
import FooterView from '../../Home/components/FooterView/FooterView'
import './MainView.scss'

export default class MainView extends Component {

  render = () => {
    return (
      <div>
        <div className='main-header'>
          <MyQuestionsView />
          <FooterView />
        </div>
      </div>
    )
  }

}
