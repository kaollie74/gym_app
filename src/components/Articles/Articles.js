import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Button, Card} from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

class Articles extends Component {

  state = {
    
  }

  componentDidMount(){
    this.props.dispatch({type: 'FETCH_ARTICLES'})
  }
  render () {
    return (
      this.props.reduxStore.articles.map(item => { return (
        <Card key={item.id}>
          {item.title}
          {item.author}
          <img src={item.urlToImage} alt=''/>
          <a href={item.url}><Button>Read</Button></a>
   
        </Card>
      )})
    )
  }
}

const mapToStateProps = (reduxStore) => ({
  reduxStore
})

export default connect(mapToStateProps)(Articles);