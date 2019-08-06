import React, { Component } from 'react';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import '../App/App.css'

//import Material UI
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

// this could also be written with destructuring parameters as:
// const UserPage = ({ user }) => (
// and then instead of `props.user.username` you could use `user.username`


const styles = theme => ({
  card: {
    display: 'inline-block',
    width: 350,
    margin: '20px',
    height: 400
  },
  title: {
    fontSize: 16,
    textAlign: 'center'
  },
  cardContent: {
    fontSize: 14
  },
  submit: {
    margin: 'auto',

  }
})


class HomePage extends Component {

  BuildARoutineName = () => {
    this.props.history.push('/name')
  }

  weeklyRoutine = () => {
    this.props.history.push('/weekly')

  }

  routineDatabase = () => {
    this.props.history.push('/database')
  }

  render() {
    const {classes} = this.props;
    return (
      <>
        <div>
          <h1 id="welcome">
            Welcome, {this.props.user.username}!
          </h1>
          <p>Your ID is: {this.props.user.id}</p>

        </div>
        <Card className={classes.card}>
          <CardContent className={classes.cardContent} >
            <Button className={classes.submit} onClick={this.BuildARoutineName}>Build A Routine</Button>
          </CardContent>
          <CardContent className={classes.cardContent}>
            <Button className={classes.submit} onClick={this.weeklyRoutine}>Weekly Routine</Button>
          </CardContent>
          <CardActions>
            <Button className={classes.submit} onClick={this.routineDatabase}>Routine Database</Button>
          </CardActions>
        </Card>

        <div>
          <LogOutButton className="log-in" />
        </div>
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
