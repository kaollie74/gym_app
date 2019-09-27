import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Card, Grid, Icon, Image } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import './Articles.css';

class Articles extends Component {

  state = {
    color: false
  }

  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_ARTICLES' })
    this.props.dispatch({ type: 'FETCH_FAV_ARTICLES' })
    this.checkIcon();

  }

  checkIcon = (item) => {
    let array1 = this.props.reduxStore.articles;
    let array2 = this.props.reduxStore.favArticles;

    // for (let blah of array1) {
    //   console.log (blah.title)
    // }

    for (let articleTitle of array1) {
      for (let favArticleTitle of array2) {
        if (articleTitle.title == favArticleTitle.title) {
          return <Icon name='favorite' color='blue' onClick = {() => this.removeFavorite()} />
        } else if (articleTitle.title !== favArticleTitle.title) {
          return <Icon name='favorite' color='black' onClick = {() => this.handleFavorite(item)} />
        }
      }// end of for  
    } // end of for 
  } // end checkIcon

  handleFavorite = (item) => {
    console.log(`this is favorite`, item)
    let array = this.props.reduxStore.favArticles
    // for (let blah of array) {
    //   if (item.title === blah.title) {

    //     return this.props.dispatch({ type: 'ADD_FAV_ARTICLE', payload: item })

    //   } else {
    //     return this.props.dispatch({ type: 'REMOVE_FAV_ARTICLE', payload: blah.id })

    //   }
    // } // end for of

    this.props.dispatch({type: 'ADD_FAV_ARTICLE', payload:item})
  }

  ///Possible run a function that checks if the article already exists in favorite. This may giv
  // render time to load correct data. 


  render() {

    console.log('IM rendering')

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
                  color={this.props.reduxStore.favArticles.map(item2 => {

                    return item2.title === item.title ? "blue" : "black"

                  })}
                  float='right'
                  onClick={() => this.handleFavorite(item)}
                />

                {/* {this.checkIcon(item)} */}
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