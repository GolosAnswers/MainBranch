import React, { Component } from 'react'
import './FooterView.scss'
import GitHub from 'react-icons/lib/fa/github'

export default class FooterView extends Component {

  render = () => {
    return (
      <div>
        <div className='footer'>
          <div>
            <div className='grid-main'>

              <div className='grid1'>
                <h6>MIT Licence, You can donate ETH here:</h6>
                <h6>0xaed8f20f095c71d5715c0c047e982d19a12425c6</h6>
              </div>

              <div className='grid2'>
                <div >
                  <h5>Source code:</h5>
                  <ul>
                    <li><GitHub color='#00ccff'/> https://github.com/TeamStarter/GolosAnswers</li>
                  </ul>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    )
  }

}
