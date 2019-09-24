import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Card, Grid, Image } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import './Articles.css';

class Articles extends Component {

  state = {

  }

  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_ARTICLES' })
  }
  render() {
    return (
      <Grid 
      stackable container centered columns={3}
      className='gridContainer'
      >
        {this.props.reduxStore.articles.map(item => {
          return (

            <Grid.Column>
              <Card key={item.id}>
                <h4>{item.title}</h4>
                <h5>Author:{item.author}</h5>
                <Image
                  src={item.urlToImage}
                  alt=''
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