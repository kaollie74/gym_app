import React, { Component } from 'react';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import '../App/App.css'

//import Material UI
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import { createMuiTheme, MuiThemeProvider, withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';



// this could also be written with destructuring parameters as:
// const UserPage = ({ user }) => (
// and then instead of `props.user.username` you could use `user.username`


const styles = theme => ({
  card: {
    display: 'inline-block',
    width: 400,
    margin: 20,
    marginLeft: 300,
    height: 250
  },
  enter: {
    marginTop: 140,
    marginLeft: 140
  },
  title: {
    fontSize: 16,
    textAlign: 'center'
  },
 text: {
    marginLeft: 30
  },
  cardContent: {
    fontSize: 14
  },
  
})


class HomePage extends Component {

  // BuildARoutineName = () => {
  //   this.props.history.push('/name')
  // }

  // weeklyRoutine = () => {
  //   this.props.history.push('/weekly')

  // }

  // routineDatabase = () => {
  //   this.props.history.push('/database')
  // }

  render() {
    const { classes } = this.props;
    return (
      <>
        <MuiThemeProvider>
          <div>
            <Typography className={classes.text} variant="h1" component="h2"  gutterBottom>
              Welcome, {this.props.user.username}!
          </Typography>
            <p>Your ID is: {this.props.user.id}</p>

          </div>
          <Card className={classes.card}>
            <CardContent className={classes.cardContent} >
              <Typography className={classes.text} variant="h4" component="h2">
                Build Your Routine
              </Typography>
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
          <br />
          <Card className={classes.card}>
            <CardContent className={classes.cardContent}>
              <Typography className={classes.text} variant="h4" component="h2">
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
          <br />
          <Card className={classes.card}>
            
            <Typography 
            style={{marginTop: 20, marginLeft: 60}} 
            variant="h4" 
            component="h2">
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

          <div>
            <LogOutButton className="log-in" />
          </div>
        </MuiThemeProvider>
      </>

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
