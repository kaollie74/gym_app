import React, {Component} from 'react';
import {connect} from 'react-redux';

class Articles extends Component {

  state = {
    
  }

  componentDidMount(){
    this.props.dispatch({type: 'FETCH_ARTICLES'})
  }
  render () {
    return (
      this.props.reduxStore.articles.map(item => { return (
        <div key={item.id}>
          {item.title}
          {item.author}
          <img src={item.urlToImage} alt=''/>
        </div>
      )})
    )
  }
}

const mapToStateProps = (reduxStore) => ({
  reduxStore
})

export default connect(mapToStateProps)(Articles);