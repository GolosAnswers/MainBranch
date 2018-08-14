import React, {Component} from 'react'
import {connect} from 'react-redux'
import './GridView.scss'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Card, CardActions, CardHeader, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Favorite from 'material-ui/svg-icons/action/favorite-border';
import IconButton from 'material-ui/IconButton';
import Avatar from 'material-ui/Avatar';
import LastPage from 'material-ui/svg-icons/navigation/last-page'
import FirstPage from 'material-ui/svg-icons/navigation/first-page'
import ChevronLeft from 'material-ui/svg-icons/navigation/chevron-left'
import ChevronRight from 'material-ui/svg-icons/navigation/chevron-right'
import {browserHistory} from 'react-router'
import TextField from 'material-ui/TextField';
import Close from 'material-ui/svg-icons/navigation/close';
import {ASK_GOLOS, MAP_FETCH_GOLOS_BLOG,SAVE_FILTERING_AND_ORDERING_DATA} from '../../../../api/fetchPosts/fetchPostsActions'
import {
  FETCH_GOLOS_SINGLE_POST_POST,
  FETCH_GOLOS_SINGLE_POST_COMMENTS
} from '../../../../api/singlePost/singlePostActions'
import {ASK_QUESTION_PAGE_PATH, POST_PAGE_PATH,DEFAULT_FILTERING_PARAMETERS,EMPTY_STRING} from '../../../../properties/properties';

let filteringAndOrdering = {}
const START_PAGE = 0
const DEFAULT_NUMBER_OF_PAGE = 1

class GridView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      gridDataComponent: null,
      isLoading: true,
      auth: {
        isAuthenticated: false
      },
      titleFilter: EMPTY_STRING,

      currentPage: START_PAGE,
      totalPages: DEFAULT_NUMBER_OF_PAGE,
      httpStatus: null,
      numberOfElements: DEFAULT_FILTERING_PARAMETERS.size,
      filteringAndOrderingData: null,
    }
  }

  componentWillMount() {
    this.props.onGetData({
      'page': this.state.currentPage,
      'size': this.state.numberOfElements,
      'title': this.state.titleFilter,
      'orders':[{'property': 'date', 'priority': 1, 'direction': 'DESC'}]
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
  }

  componentDidMount() {
    this.setState({auth: this.props.auth})
  }

  componentWillReceiveProps(nextprops) {

    if (nextprops.gridDataComponent !== this.props.gridDataComponent && nextprops.gridDataComponent.httpStatus === 200) {
      if (nextprops.gridDataComponent.state !== null) {

        this.setState({gridDataComponent: nextprops.gridDataComponent.content});
        this.setState({totalPages: nextprops.gridDataComponent.totalPages});
        this.setState({httpStatus: nextprops.gridDataComponent.httpStatus});
      }
    }

    if (nextprops.postsFilteringAndOrdering !== this.props.postsFilteringAndOrdering) {
      this.setState({filteringAndOrderingData: nextprops.postsFilteringAndOrdering.filteringAndOrderingData})
      this.setState({currentPage: nextprops.postsFilteringAndOrdering.filteringAndOrderingData.page})
      this.setState({numberOfElements: nextprops.postsFilteringAndOrdering.filteringAndOrderingData.size})
    }

    if (nextprops.gridDataComponent !== null) {
      if (nextprops.gridDataComponent.httpStatus !== 200) {
        this.setState({httpStatus: nextprops.gridDataComponent.httpStatus});
        this.setState({currentPage: 0});
      }
    }

    if (nextprops.auth !== this.props.auth) {
      this.setState({auth: nextprops.auth})
    }

  }

  getPreviousPage = () => {
    if (this.state.currentPage > 0) {
      filteringAndOrdering = {
        'page': this.state.currentPage - 1,
        'size': this.state.numberOfElements,
        'title': this.state.titleFilter,
        'orders':[{'property': 'date', 'priority': 1, 'direction': 'DESC'}]
      }
      this.props.onGetData(filteringAndOrdering);
      this.props.saveFilterigAndOrdering(filteringAndOrdering);
      this.setState({currentPage: this.state.currentPage - 1 })
    }
  }

  getNextPage = () => {
    if (this.state.currentPage < this.state.totalPages - 1) {
      filteringAndOrdering = {
        'page': this.state.currentPage + 1,
        'size': this.state.numberOfElements,
        'title': this.state.titleFilter,
        'orders':[{'property': 'date', 'priority': 1, 'direction': 'DESC'}]
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
      'title': this.state.titleFilter,
      'orders':[{'property': 'date', 'priority': 1, 'direction': 'DESC'}]
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
        'title': this.state.titleFilter,
        'orders':[{'property': 'date', 'priority': 1, 'direction': 'DESC'}]
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

  onChange = (e) => {
    this.setState({[e.target.name]: e.target.value});
  };

  moveToAskQuestionPage = (e) => {
    browserHistory.push(ASK_QUESTION_PAGE_PATH);
  };

  onFind = (event, newValue) => {
    this.setState({titleFilter: newValue });
    this.setState({currentPage: 0})
    filteringAndOrdering = {
      'page': 0,
      'size': this.state.numberOfElements,
      'title': newValue,
      'orders':[{'property': 'date', 'priority': 1, 'direction': 'DESC'}]
    }
    this.props.onGetData(filteringAndOrdering);
    this.props.saveFilterigAndOrdering(filteringAndOrdering);
    console.log(newValue)
  };

  resetAll = () => {
    this.setState({titleFilter: EMPTY_STRING });
    this.setState({currentPage: 0})
    filteringAndOrdering = {
      'page': 0,
      'size': this.state.numberOfElements,
      'title': EMPTY_STRING,
      'orders':[{'property': 'date', 'priority': 1, 'direction': 'DESC'}]
    }
    this.props.onGetData(filteringAndOrdering);
    this.props.saveFilterigAndOrdering(filteringAndOrdering);
    console.log(newValue)
  };

  render = () => {

    return (
      <div>
        <MuiThemeProvider>
          <div>
            <div className='ask-form'>
              <form onSubmit={this.moveToAskQuestionPage}>
                {(this.state.auth.isAuthenticated) && (
                  <button disabled={!this.state.auth.isAuthenticated} className="btn btn-primary btn-lg">Ask your
                    quastion</button>
                )}
              </form>
            </div>

            <div style={{paddingLeft: '20px'}}>
              <TextField
                value={this.state.titleFilter}
                hintText="Найти..."
                hasIcon={false}
                onChange={this.onFind}
              />
              <IconButton onClick={this.resetAll}>
                <Close/>
              </IconButton>
            </div>

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
        </MuiThemeProvider>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    auth: state.auth || {},
    gridDataComponent: state.gridData || null,
    postsFilteringAndOrdering: state.postsFilteringAndOrdering || {},
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    askQuastion: (data) => dispatch({type: ASK_GOLOS, data}),
    onGetData: (data) => dispatch({type: MAP_FETCH_GOLOS_BLOG, data}),
    getSinglePostGetPost: (data) => dispatch({type: FETCH_GOLOS_SINGLE_POST_POST, data}),
    getSinglePostGetComments: (data) => dispatch({type: FETCH_GOLOS_SINGLE_POST_COMMENTS, data}),
    saveFilterigAndOrdering: (data) => dispatch({type: SAVE_FILTERING_AND_ORDERING_DATA, data}),
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GridView);
