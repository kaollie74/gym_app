import React , {Component} from 'react';
import {connect} from 'react-redux';
import { Button, Card, Grid, Icon, Image } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';


class FavArticles extends Component {

  render() {
    return (
      <h1>Your Favorite Articles</h1>
      <div>
      {this.props.reduxStore.favArticles.map(item => {
          <Card>
            <Image
            
            
            />
          </Card>
      })}
      </div>
    )
  }

}

const mapToStateProps = (reduxStore) => ({
  reduxStore
})

export default connect(mapToStateProps)(FavArticles);