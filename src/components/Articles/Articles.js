import React, {Component} from 'react';
import {connect} from 'react-redux';

class Articles extends Component {
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