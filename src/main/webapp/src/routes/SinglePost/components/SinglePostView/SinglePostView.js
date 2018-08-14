import React, {Component} from 'react'
import {connect} from 'react-redux'
import './SinglePostView.scss'
import { LEAVE_COMMENT } from "../../../../api/leaveComment/leaveCommentActions";
import { FETCH_GOLOS_SINGLE_POST_POST, FETCH_GOLOS_SINGLE_POST_COMMENTS } from "../../../../api/singlePost/singlePostActions";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextFieldGroup from './textFieldGroup/TextFieldGroup';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Reply from 'material-ui/svg-icons/content/reply'
import Favorite from 'material-ui/svg-icons/action/favorite-border';
import IconButton from 'material-ui/IconButton';
import Avatar from 'material-ui/Avatar';
import {browserHistory} from 'react-router'

import {
  blue300,
  indigo900,
} from 'material-ui/styles/colors';
import {
  ADD_FLASH_MESSAGE,
  DELETE_BY_VALUE_FLASH_MESSAGES,
  MESSAGE_YOU_ASKED_QUESTION_IN_SUCCESSFULY
} from "../../../../api/flash/flashActions";
import {
  EMPTY_STRING,
  MIN_NUMBERS_OF_CHARACTERS_IN_COMMENT,
  POP_UP_MESSAGE_TYPE_PRIMARY,
  TIME_OF_ASKING_QUESTION_POP_UP,
  TIME_OF_SHOWING_UP_ADDED_COMMENTS,
} from "../../../../properties/properties";
import {WARNING_COMMENT_LESS_THEN} from "../../../../properties/warningMessages";
import { EMPTY_PAGE_PATH } from '../../../../properties/properties';

class SinglePostView extends Component {

  constructor(props) {
    super(props)
    this.state = {
      auth: {isAuthenticated: false},
      singlePostPagePost: null,
      singlePostPageComment: null,
      commentValue: EMPTY_STRING,
      commentValueErrMeassage: EMPTY_STRING,
    }
  }

  componentWillMount() {

  }

  componentWillUnmount() {

  }

  shouldComponentUpdate() {
    return true;
  }

  componentWillUpdate() {

  }

  componentDidMount() {
    this.setState({auth: this.props.auth})
  }

  componentDidUpdate() {

  }

  returnToMainPage = (e) => {
    const path =EMPTY_PAGE_PATH;
    browserHistory.push(path);
  };

  componentWillReceiveProps(nextprops) {

    if (nextprops.singlePostData !== this.props.singlePostData) {


      if (nextprops.singlePostData.singlePostPagePost !== this.props.singlePostData.singlePostPagePost) {
        this.setState({singlePostPagePost: nextprops.singlePostData.singlePostPagePost});

        if (nextprops.singlePostData.singlePostPagePost === null) {
          const path = EMPTY_PAGE_PATH
          browserHistory.push(path)
        }
      }

      if (nextprops.singlePostData.singlePostPageComment !== this.props.singlePostData.singlePostPageComment) {
        this.setState({singlePostPageComment: nextprops.singlePostData.singlePostPageComment});
      }
    }

    if (nextprops.auth !== this.props.auth) {
      this.setState({auth: nextprops.auth})
    }

  }

  leaveComment = () => {
    if (this.state.commentValue.length > MIN_NUMBERS_OF_CHARACTERS_IN_COMMENT) {
      this.setState({ commentValue: EMPTY_STRING });
      this.setState({ commentValueErrMeassage: EMPTY_STRING });
      this.props.leaveComment(
        { parentAuthor: this.state.singlePostPagePost.author,
          parentPermLink: this.state.singlePostPagePost.permlink,
          comment: this.state.commentValue }
      );
      this.props.showFlashMessage({ type: POP_UP_MESSAGE_TYPE_PRIMARY,  text: MESSAGE_YOU_ASKED_QUESTION_IN_SUCCESSFULY})
      window.setTimeout(() => {
        this.props.deleteByValueFlashMessages(MESSAGE_YOU_ASKED_QUESTION_IN_SUCCESSFULY);
      }, TIME_OF_ASKING_QUESTION_POP_UP)
      window.setTimeout(() => {
        this.props.getSinglePostGetPost({author: this.state.singlePostPagePost.author, permlink: this.state.singlePostPagePost.permlink});
        this.props.getSinglePostGetComments({parent: this.state.singlePostPagePost.author, parentPermlink: this.state.singlePostPagePost.permlink});
      }, TIME_OF_SHOWING_UP_ADDED_COMMENTS)
    } else {
      this.setState({ commentValueErrMeassage: WARNING_COMMENT_LESS_THEN });
    }
  };

  onChange = (e) => {
    this.setState({ commentValue: e.target.value });
  };

  render = () => {

    return (
      <div>
        <MuiThemeProvider>
          {this.state.singlePostPagePost !== null && (
            <div>
              <div className='single-post-return-button-main-style1'>
                <FlatButton
                  backgroundColor="#a4c639"
                  hoverColor="#8AA62F"
                  icon={<Reply color={'#ffffff'}/>}
                  style={{marginLeft: '1%', marginTop: '3%'}}
                  onClick={this.returnToMainPage}
                />
              </div>
              <div>

                <div>
                  <Card expanded={false} style={{
                    marginLeft: '1%',
                    marginRight: '1%',
                    marginBottom: '1.5%',
                    marginTop: '1.5%',
                    padding: '10px',
                  }}>
                    <CardHeader
                      title={this.state.singlePostPagePost.title}
                      subtitle={this.state.singlePostPagePost.author}
                      avatar=
                        {<Avatar
                          color={'#' + ((1 * this.state.singlePostPagePost.author.substring(0, 1).charCodeAt(0)).toString() + (1 * this.state.singlePostPagePost.author.substring(1, 2).charCodeAt(0)).toString() + (1 * this.state.singlePostPagePost.author.substring(2, 3).charCodeAt(0)).toString()).substring(0, 6)}
                          backgroundColor={'#' + ((1 * this.state.singlePostPagePost.author.substring(2, 3).charCodeAt(0)).toString() + (1 * this.state.singlePostPagePost.author.substring(1, 2).charCodeAt(0)).toString() + (1 * this.state.singlePostPagePost.author.substring(0, 1).charCodeAt(0)).toString()).substring(0, 6)}
                          size={30}
                        >
                          {this.state.singlePostPagePost.author.substring(0, 2).toUpperCase()}
                        </Avatar>}
                      actAsExpander={true}
                      showExpandableButton={true}
                    />
                    <CardText>
                      {this.state.singlePostPagePost.body}
                    </CardText>
                    <CardActions>
                      <IconButton
                        iconStyle={{
                          paddingTop: '3px',
                          width: 15,
                          height: 15
                        }}
                        style={{}}
                      >
                        <Favorite/>
                      </IconButton>
                      <FlatButton label={this.state.singlePostPagePost.active_votes_count} style={{minWidth: '30px'}}/>
                    </CardActions>
                  </Card>
                </div>

                <div>
                  {this.state.singlePostPageComment !== null && (this.state.singlePostPageComment.map((ob) =>
                    <div className='zoom'>
                      <Card expanded={false} style={{
                        paddingLeft: '2%',
                        paddingRight: '2%',
                        marginLeft: '3%',
                        marginRight: '3%',
                        marginBottom: '1%',
                      }}>
                        <CardHeader
                          title={ob.title}
                          subtitle={ob.author}
                          avatar=
                            {<Avatar
                              color={blue300}
                              backgroundColor={indigo900}
                              size={30}
                            >
                              {ob.author.substring(0, 2).toUpperCase()}
                            </Avatar>}
                          actAsExpander={true}
                          showExpandableButton={true}
                        />
                        <CardText>
                          {ob.body}
                        </CardText>
                        <CardActions>
                          <IconButton
                            iconStyle={{
                              paddingTop: '3px',
                              width: 15,
                              height: 15
                            }}
                            style={{}}
                          >
                            <Favorite/>
                          </IconButton>
                          <FlatButton label={ob.active_votes_count} style={{minWidth: '30px'}}/>
                        </CardActions>
                      </Card>
                    </div>
                  ))}
                </div>

                {(this.state.auth.isAuthenticated) && (
                <div>
                  <div className='single-post-comment-block-main-style1'>
                    <TextFieldGroup
                      field="identifier"
                      value={this.state.commentValue}
                      onChange={this.onChange}
                      frontendError={this.state.commentValueErrMeassage}
                    />
                    <div className='button1'>
                      <FlatButton label="Leave comment" primary={true} onClick={this.leaveComment}/>
                    </div>
                  </div>
                </div>
                )}

              </div>
            </div>
          )}
        </MuiThemeProvider>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    auth: state.auth || {},
    singlePostData: state.singlePostData || {},
    flashMessages: state.flashMessages || {},
    myQuestions: state.myQuestions || {},
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    leaveComment: (data) => dispatch({type: LEAVE_COMMENT, data}),
    showFlashMessage: (data) => dispatch({type: ADD_FLASH_MESSAGE, data}),
    deleteByValueFlashMessages: (data) => dispatch({type: DELETE_BY_VALUE_FLASH_MESSAGES, data}),
    getSinglePostGetPost: (data) => dispatch({type: FETCH_GOLOS_SINGLE_POST_POST, data}),
    getSinglePostGetComments: (data) => dispatch({type: FETCH_GOLOS_SINGLE_POST_COMMENTS, data}),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SinglePostView);

