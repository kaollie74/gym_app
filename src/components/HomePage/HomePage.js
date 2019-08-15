import React, { Component } from 'react';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
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
    backgroundColor: 'gray',
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
  title: {
    fontSize: 12,
    textAlign: 'center'
  },
  text: {
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
  },
 

})




class HomePage extends Component {

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Card className={classes.gymFit}>
          <Typography className={classes.text} variant="h1" component="h2" gutterBottom>
            {/* Welcome,  {this.props.user.username}!
            <br/> */}
            GymFit
            </Typography>
        </Card >

        <Grid className={classes.masterGrid} container spacing={24} >
 
          <Grid item xs={6}>
            <Grid className={classes.cardContainer} container spacing={12}>
              <Grid item xs={6}>
                <Card className={classes.card} >
                  <CardContent className={classes.cardContent} >
                    <Typography
                      className={classes.text} variant="h5"
                    >
                      Build Your Routine
              </Typography>
                    <CardMedia
                      className={classes.media}
                      image="/images/weights.jpg"
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
                      Weekly Routine
              </Typography>
                    <CardMedia
                      className={classes.media}
                      image="/images/weights.jpg"
                      title="Weights"
                    />
                    <Button
                      component={Link}
                      to='/weekly'
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
                      style={{ marginTop: 20, marginLeft: 60 }}
                      variant="h5"
                    >
                      Gyms NearBy
            </Typography>
                    <CardMedia
                      className={classes.media}
                      image="/images/weights.jpg"
                      title="Weights"
                    />
                    <Button
                      component={Link}
                      to='/database'
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
          <Grid>
            <Grid item xs={12}>
            <WeeklyPage />
            </Grid>
          </Grid>
          {/* <div>
            <LogOutButton className="log-in" />
          </div> */}

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
