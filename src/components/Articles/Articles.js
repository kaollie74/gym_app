import React, {Component} from 'react';
import {connect} from 'react-redux';

class Articles extends Component {

  state = {
    
  }

  componentDidMount(){
    //this.props.dispatch({type: 'FETCH_ARTICLES'})
  }
  render () {
    return (
      <h1>Articles</h1>
    )
  }
}

const mapToStateProps = (reduxStore) => ({
  reduxStore
})

export default connect(mapToStateProps)(Articles);