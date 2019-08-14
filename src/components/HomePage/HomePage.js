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


// this could also be written with destructuring parameters as:
// const UserPage = ({ user }) => (
// and then instead of `props.user.username` you could use `user.username`


const styles = theme => ({
  root: {
    flexGrow: 1
  },
  card: {
  
    width: 300,
    margin: 15,
    marginLeft: 0,
    height: 300,
    backgroundColor: 'gray',
  },
  enter: {
    marginTop: 20,
    marginLeft: 100
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
  gridList: {
    width: 300,
    height: 350
  },
  media: {
    height: 160,
  }

})




class HomePage extends Component {

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <div>
          <Typography className={classes.text} variant="h1" component="h2" gutterBottom>
            Welcome, GymFit {this.props.user.username}!
            </Typography>


        </div>
        <Grid xs={6} direction='row' >
          <WeeklyPage />
        </Grid>
        <Grid container spacing={12} direction="column">
          <Grid item xs={2}>
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
          <Grid>
            <Card className={classes.card}>
              <CardContent className={classes.cardContent}>
                <Typography className={classes.text} variant="h5"
                >
                  Weekly Routine
              </Typography>
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
          <Grid>
            <Card className={classes.card}>

              <Typography
                style={{ marginTop: 20, marginLeft: 60 }}
                variant="h5"
              >
                Routine Database
            </Typography>
              <Button style={{ marginLeft: 160 }}
                component={Link}
                to='/database'
                className={classes.enter}
                color="primary"
                onClick={this.routineDatabase}
                variant="contained">
                Enter
            </Button>

            </Card>
          </Grid>
          <div>
            <LogOutButton className="log-in" />
          </div>
        
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
