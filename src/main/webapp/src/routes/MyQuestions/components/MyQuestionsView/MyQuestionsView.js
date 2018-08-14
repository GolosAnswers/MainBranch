import React, {Component} from 'react'
import {connect} from 'react-redux'
import './MyQuestionsView.scss'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import Favorite from 'material-ui/svg-icons/action/favorite-border';
import IconButton from 'material-ui/IconButton';
import Avatar from 'material-ui/Avatar';
import {browserHistory} from 'react-router'
import FlatButton from 'material-ui/FlatButton';
import Reply from 'material-ui/svg-icons/content/reply'
import LastPage from 'material-ui/svg-icons/navigation/last-page'
import FirstPage from 'material-ui/svg-icons/navigation/first-page'
import ChevronLeft from 'material-ui/svg-icons/navigation/chevron-left'
import ChevronRight from 'material-ui/svg-icons/navigation/chevron-right'
import {
  FETCH_MY_QUESTIONS,
  SAVE_FILTERING_AND_ORDERING_DATA_MY_QUESTIONS
} from "../../../../api/myQuestions/myQuestionsActions";
import {
  FETCH_GOLOS_SINGLE_POST_POST,
  FETCH_GOLOS_SINGLE_POST_COMMENTS
} from "../../../../api/singlePost/singlePostActions";
import {POST_PAGE_PATH, EMPTY_PAGE_PATH, DEFAULT_FILTERING_PARAMETERS} from '../../../../properties/properties';
import {MAP_FETCH_GOLOS_BLOG} from "../../../../api/fetchPosts/fetchPostsActions";
import {LEAVE_COMMENT_CURENT_USER} from "../../../../api/leavePost/leavePostProperties";

let filteringAndOrdering = {}
const START_PAGE = 0
const DEFAULT_NUMBER_OF_PAGE = 1

class MyQuestionsView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      gridDataComponent: null,

      currentPage: START_PAGE,
      totalPages: DEFAULT_NUMBER_OF_PAGE,
      httpStatus: null,
      numberOfElements: DEFAULT_FILTERING_PARAMETERS.size,
      filteringAndOrderingData: null,
    }
  }

  componentDidMount() {
    this.props.onGetData({
      'page': this.state.currentPage,
      'size': this.state.numberOfElements,
      'author': localStorage.getItem(LEAVE_COMMENT_CURENT_USER),
      'orders': [{'property': 'date', 'priority': 1, 'direction': 'DESC'}]
    });
  }

  componentWillUnmount() {

  }

  shouldComponentUpdate() {
    return true;
  }

  componentWillUpdate() {

  }

  componentDidUpdate() {
    if (this.state.myQuestions === null) {
      const path = EMPTY_PAGE_PATH
      browserHistory.push(path)
    }
  }

  componentWillReceiveProps(nextprops) {

    if (nextprops.myQuestions === null) {
      const path = EMPTY_PAGE_PATH
      browserHistory.push(path)
    }

    if (nextprops.gridDataComponent !== this.props.gridDataComponent && nextprops.gridDataComponent.httpStatus === 200) {
      if (nextprops.gridDataComponent.state !== null) {

        this.setState({gridDataComponent: nextprops.gridDataComponent.content});
        this.setState({totalPages: nextprops.gridDataComponent.totalPages});
        this.setState({httpStatus: nextprops.gridDataComponent.httpStatus});
      }
    }

    if (nextprops.myQuestionsFilteringAndOrdering !== this.props.myQuestionsFilteringAndOrdering) {
      this.setState({filteringAndOrderingData: nextprops.myQuestionsFilteringAndOrdering.filteringAndOrderingData})
      this.setState({currentPage: nextprops.myQuestionsFilteringAndOrdering.filteringAndOrderingData.page})
      this.setState({numberOfElements: nextprops.myQuestionsFilteringAndOrdering.filteringAndOrderingData.size})
    }

    if (nextprops.gridDataComponent !== null) {
      if (nextprops.gridDataComponent.httpStatus !== 200) {
        this.setState({httpStatus: nextprops.gridDataComponent.httpStatus});
        this.setState({currentPage: 0});
      }
    }

  }

  returnToMainPage = (e) => {
    const path = EMPTY_PAGE_PATH;
    browserHistory.push(path);
  };

  getPreviousPage = () => {
    if (this.state.currentPage > 0) {
      filteringAndOrdering = {
        'page': this.state.currentPage - 1,
        'size': this.state.numberOfElements,
        'orders': [{'property': 'date', 'priority': 1, 'direction': 'DESC'}]
      }
      this.props.onGetData(filteringAndOrdering);
      this.props.saveFilterigAndOrdering(filteringAndOrdering);
      this.setState({currentPage: this.state.currentPage - 1})
    }
  }

  getNextPage = () => {
    if (this.state.currentPage < this.state.totalPages - 1) {
      filteringAndOrdering = {
        'page': this.state.currentPage + 1,
        'size': this.state.numberOfElements,
        'orders': [{'property': 'date', 'priority': 1, 'direction': 'DESC'}]
      }
      this.props.onGetData(filteringAndOrdering);
      this.props.saveFilterigAndOrdering(filteringAndOrdering);
      this.setState({currentPage: this.state.currentPage + 1})
    }
  }

  getFirstPage = () => {
    filteringAndOrdering = {
      'page': 0,
      'size': this.state.numberOfElements,
      'orders': [{'property': 'date', 'priority': 1, 'direction': 'DESC'}]
    }
    this.props.onGetData(filteringAndOrdering);
    this.props.saveFilterigAndOrdering(filteringAndOrdering);
    this.setState({currentPage: 0})
  }

  getLastPage = () => {
    if (this.state.currentPage >= 0) {
      filteringAndOrdering = {
        'page': this.state.totalPages - 1,
        'size': this.state.numberOfElements,
        'orders': [{'property': 'date', 'priority': 1, 'direction': 'DESC'}]
      }
      this.props.onGetData(filteringAndOrdering);
      this.props.saveFilterigAndOrdering(filteringAndOrdering);
      if (this.state.totalPages === 1) {
        this.setState({currentPage: this.state.totalPages})
      } else {
        this.setState({currentPage: this.state.totalPages - 1})
      }
    }
  }

  render = () => {

    return (
      <div>
        <MuiThemeProvider>
          <div>

            <FlatButton
              backgroundColor="#a4c639"
              hoverColor="#8AA62F"
              icon={<Reply color={'#ffffff'}/>}
              style={{marginLeft: '1%', marginTop: '3%'}}
              onClick={this.returnToMainPage}
            />

            <div>
              <div className='my-questions-header-main-style1'>
                <h4>My questions:</h4>
              </div>

              <div>
                <div className='card-style1'>
                  {this.state.gridDataComponent !== null && (this.state.gridDataComponent.map((ob) =>
                    <div className='zoom' key={ob.title}>
                      <Card expanded={this.state.expanded} onExpandChange={this.handleExpandChange} style={{
                        padding: '10px',
                        margin: '10px',
                      }}>
                        <CardHeader
                          title={ob.title}
                          subtitle={ob.author}
                          avatar=
                            {<Avatar
                              color={'#' + ((1 * ob.author.substring(0, 1).charCodeAt(0)).toString() + (1 * ob.author.substring(1, 2).charCodeAt(0)).toString() + (1 * ob.author.substring(2, 3).charCodeAt(0)).toString()).substring(0, 6)}
                              backgroundColor={'#' + ((1 * ob.author.substring(2, 3).charCodeAt(0)).toString() + (1 * ob.author.substring(1, 2).charCodeAt(0)).toString() + (1 * ob.author.substring(0, 1).charCodeAt(0)).toString()).substring(0, 6)}
                              size={30}
                            >
                              {ob.author.substring(0, 2).toUpperCase()}
                            </Avatar>}
                          actAsExpander={true}
                          showExpandableButton={true}
                        />
                        <CardText>
                          {ob.body.substring(0, 255)}
                        </CardText>
                        <CardTitle
                          subtitle={ob.body.substring(0, 2255) + "..."}
                          expandable={true}
                        />
                        <CardText expandable={true}>

                        </CardText>
                        <CardActions>
                          <FlatButton label="View answers"
                                      onClick={
                                        () => {
                                          browserHistory.push(POST_PAGE_PATH);
                                          this.props.getSinglePostGetPost({author: ob.author, permlink: ob.permlink});
                                          this.props.getSinglePostGetComments({
                                            parent: ob.author,
                                            parentPermlink: ob.permlink
                                          })
                                        }
                                      }
                          />
                          <IconButton
                            iconStyle={{
                              paddingTop: '3px',
                              width: 15,
                              height: 15
                            }}
                          >
                            <Favorite/>
                          </IconButton>
                          {/*<FlatButton label={ob.active_votes_count} style={{minWidth: '30px'}}/>*/}
                        </CardActions>
                      </Card>
                    </div>
                  ))}
                </div>

                <div className="pagination-main-style-1">
                  <div></div>
                  <div></div>
                  <div>
                    <div className="pagination-main-style-2">
                      <div>
                        <IconButton onClick={this.getFirstPage}>
                          <FirstPage/>
                        </IconButton>
                      </div>

                      <div>
                        <IconButton onClick={this.getPreviousPage}>
                          <ChevronLeft/>
                        </IconButton>
                      </div>

                      <div className="current-page-main-style-1">
                        <div>
                          <a>{this.state.currentPage + 1}</a>
                        </div>
                        {/*<div>{this.state.currentPage}</div>*/}
                      </div>

                      <div>
                        <IconButton onClick={this.getNextPage}>
                          <ChevronRight/>
                        </IconButton>
                      </div>

                      <div>
                        <IconButton onClick={this.getLastPage}>
                          <LastPage/>
                        </IconButton>
                      </div>
                    </div>
                  </div>
                  <div></div>
                  <div></div>
                </div>
              </div>
            </div>
          </div>
        </MuiThemeProvider>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    gridDataComponent: state.gridData || null,
    myQuestionsFilteringAndOrdering: state.myQuestionsFilteringAndOrdering || {},
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getMyQuastions: (data) => dispatch({type: FETCH_MY_QUESTIONS, data}),
    onGetData: (data) => dispatch({type: MAP_FETCH_GOLOS_BLOG, data}),
    getSinglePostGetPost: (data) => dispatch({type: FETCH_GOLOS_SINGLE_POST_POST, data}),
    getSinglePostGetComments: (data) => dispatch({type: FETCH_GOLOS_SINGLE_POST_COMMENTS, data}),
    saveFilterigAndOrdering: (data) => dispatch({type: SAVE_FILTERING_AND_ORDERING_DATA_MY_QUESTIONS, data}),
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyQuestionsView);

