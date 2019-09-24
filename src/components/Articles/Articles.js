import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Card, Grid, Icon, Image } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import './Articles.css';

class Articles extends Component {

  state = {

  }

  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_ARTICLES' })
    this.props.dispatch({type: 'FETCH_FAV_ARTICLES'})
  }

  handleFavorite = (item) => {
    console.log(`this is favorite`, item)
    this.props.dispatch({ type: 'ADD_FAV_ARTICLE', payload: item })
  }


  render() {
    return (
      <Grid
        stackable container centered columns={3}
        className='gridContainer'
      >
        {this.props.reduxStore.articles.map((item, i) => {
          return (

            <Grid.Column key={i}>
              <Card>
                <Icon
                  name='favorite'
                  color= {this.props.reduxStore.favArticles.map(item2 => {

                    return item2.title === item.title ? 'blue' : ''

                  })}
                  float='right'
                  onClick={() => this.handleFavorite(item)}
                />
                <h4>{item.title}</h4>
                <h5>Author:  {item.author}</h5>
                <Image
                  src={item.urlToImage}
                  alt=''
                  className='image'
                  size='medium'
                  rounded
                />
                <a
                  href={item.url}
                  className='buttonLink'
                >
                  <Button
                    color='blue'
                  >
                    Read
                  </Button>
                </a>

              </Card>
            </Grid.Column>

          )
        })}
      </Grid>
    )
  }
}

const mapToStateProps = (reduxStore) => ({
  reduxStore
})

export default connect(mapToStateProps)(Articles);