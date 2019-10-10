import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomePage.css'
import WeeklyPage from '../WeeklyPage/WeeklyPage';

//import Material UI
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
//import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  card: {
    width: 300,
    marginLeft: 10,
    marginBottom: 15,
    height: 300,
    backgroundColor: 'rgb(105, 105, 105)',
  },

  enter: {
    marginTop: 20,
    marginLeft: 100
  },
  gymFit: {
    backgroundColor: 'gray',
    marginTop: 2,

  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  headText: {
    fontSize: 65,
    color: 'rgb(211, 211, 211)',
    textAlign: 'center'
  },
  title: {
    fontSize: 12,
    textAlign: 'center'
  },
  text: {
    color: 'rgb(211, 211, 211)',
    textAlign: 'center',
  },
  cardContent: {
    fontSize: 12
  },
  masterGrid: {
    margin: 20,
  },

  media: {
    height: 160,
    borderRadius: '8px',
  },


})






class HomePage extends Component {

  componentDidtMount() {
    this.props.dispatch({ type: 'FETCH_FAV_ARTICLES' })
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        {/* <Card className={classes.gymFit}>
          <Typography className={classes.text} variant="h1" component="h2" gutterBottom> */}
        {/* Welcome,  {this.props.user.username}!
            <br/> */}
        <h1 className={classes.headText}>GymFit</h1>
        {/* </Typography>
        </Card > */}

        <Grid className={classes.masterGrid} container spacing={24} >

          <Grid item xs={6}>
            <Grid className={classes.cardContainer} container spacing={12}>
              <Grid item xs={6}>
                <Card
                  img src="/images/barbellsolo.jpg"
                  className={classes.card}
                // className = 'buildRoutineCard'
                >
                  <CardContent
                    className={classes.cardContent}
                  >
                    <Typography
                      className={classes.text} variant="h5"
                    >
                      Build Your Routine
                    </Typography>
                    <CardMedia
                      className={classes.media}
                      image="/images/barbellsolo.jpg"
                      title="Weights"
                    />
                    <Button
                      component={Link}
                      to='/name'
                      className={classes.enter}
                      color="primary"
                      onClick={this.BuildARoutineName}
                      variant="contained">
                      Enter
                </Button>

                  </CardContent>
                </Card>
              </Grid>

              <br />
              <Grid item xs={6}>
                <Card className={classes.card}>
                  <CardContent className={classes.cardContent}>
                    <Typography className={classes.text} variant="h5"
                    >
                      Articles
              </Typography>
                    <CardMedia
                      className={classes.media}
                      image="/images/weights.jpg"
                      title="Weights"
                    />
                    <Button
                      component={Link}
                      to='/articles'
                      color="primary"
                      className={classes.enter}
                      onClick={this.weeklyRoutine}
                      variant="contained">
                      Enter
                </Button>
                  </CardContent>
                </Card>
              </Grid>
              <br />
              <Grid item xs={6}>
                <Card className={classes.card}>
                  <CardContent className={classes.cardContent}>
                    <Typography
                      className={classes.text}
                      variant="h5"
                    >
                      Gyms NearBy
            </Typography>
                    <CardMedia
                      className={classes.media}
                      image="/images/google_maps.jpg"
                      title="Weights"
                    />
                    <Button
                      component={Link}
                      to='/gym-near-me'
                      className={classes.enter}
                      color="primary"
                      onClick={this.routineDatabase}
                      variant="contained"
                    >
                      Enter
            </Button>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Grid item xs={10} >
              <WeeklyPage />
            </Grid>
          </Grid>
          {/* <div>
            <LogOutButton className="log-in" />
          </div> */}
          <Button
            color='primary'
            variant='contained'
            component={Link}
            to='/fav-articles'
          >
            Fave Articles
          </Button>
        </Grid>
      </div>

    )
  }


};

// Instead of taking everything from state, we just want the user info.
// if you wanted you could write this code like this:
// const mapStateToProps = ({user}) => ({ user });
const mapStateToProps = state => ({
  user: state.user,
});

// this allows us to use <App /> in index.js
export default withStyles(styles)(connect(mapStateToProps)(HomePage));
