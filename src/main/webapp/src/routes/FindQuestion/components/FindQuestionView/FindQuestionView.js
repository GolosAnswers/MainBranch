import React, {Component} from 'react'
import {connect} from 'react-redux'
import './FindQuestionView.scss'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextFieldGroup from './textFieldGroup/TextFieldGroup';
import FlatButton from 'material-ui/FlatButton';
import Reply from 'material-ui/svg-icons/content/reply'
import {Label} from 'reactstrap';
import {browserHistory} from "react-router";
import { EMPTY_PAGE_PATH } from '../../../../properties/properties';

class FindQuestionView extends Component {

  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentWillMount() {
  }

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  shouldComponentUpdate() {
    return true;
  }

  componentWillUpdate() {

  }

  componentDidUpdate() {

  }

  componentWillReceiveProps(nextprops) {

  }

  returnToMainPage = (e) => {
    const path = EMPTY_PAGE_PATH;
    browserHistory.push(path);
  };

  render = () => {

    return (
      <div>
        <MuiThemeProvider>
          <FlatButton
            backgroundColor="#a4c639"
            hoverColor="#8AA62F"
            icon={<Reply color={'#ffffff'}/>}
            style={{marginLeft: '1%', marginTop: '3%'}}
            onClick={this.returnToMainPage}
          />
          <div className='ask-form'>
              <Label for="exampleEmail"><h4>Find Your question!</h4></Label>
              <TextFieldGroup
                field="identifier"
                value={this.state.headValue}
                onChange={this.onChange}
                frontendError={this.state.headValueErrMeassage}
              />
              <div className='button1'>
                <FlatButton label="Find Your question!" primary={true} />
              </div>
          </div>
        </MuiThemeProvider>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {

  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {

  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FindQuestionView);
