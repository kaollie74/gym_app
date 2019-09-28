import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Card, Grid, Icon, Image } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';


class FavArticles extends Component {

  componentDidMount () {
    this.props.dispatch({type: 'FETCH_FAV_ARTICLES'})
  }

  render() {
    return (
      <>
        <h1>Your Favorite Articles</h1>
        <div>
          {this.props.reduxStore.favArticles.map((item,i) => {
            return (
              <Card key={i}>
                <h4>{item.title}</h4>
                <h5>Author: {item.author}</h5>
                <Image
                  src={item.image}
                  alt=''
                  size='medium'
                  rounded
                />

                <Button>Read</Button>

              </Card>
            )// end return in .map
          })}
        </div>
      </>
    ) // end return
  } // end render

} // end FavArticles

const mapToStateProps = (reduxStore) => ({
  reduxStore
})

export default connect(mapToStateProps)(FavArticles);