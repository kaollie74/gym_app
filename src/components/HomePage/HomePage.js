import React, { Component } from 'react';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import { HashRouter as Router, Route, Redirect, Switch, } from 'react-router-dom';
import '../App/App.css'

// this could also be written with destructuring parameters as:
// const UserPage = ({ user }) => (
// and then instead of `props.user.username` you could use `user.username`
class HomePage extends Component {

  BuildARoutine = () => {
    this.props.history.push('/build')
  }

  weeklyRoutine = () => {
    this.props.history.push('/weekly')

  }

  routineDatabase = () => {
    this.props.history.push('/database')
  }

  render() {
    return (
      <>
        <div>
          <h1 id="welcome">
            Welcome, {this.props.user.username}!
          </h1>
          <p>Your ID is: {this.props.user.id}</p>

        </div>
        <div>
          <button className="buildRoutine" onClick={this.BuildARoutine}>Build A Routine</button>
        </div>
        <div>
          <button className="weeklyRoutine" onClick={this.weeklyRoutine}>Weekly Routine</button>
        </div>
        <div>
          <button className="routineDatabase" onClick={this.routineDatabase}>Routine Database</button>
        </div>
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
export default connect(mapStateToProps)(HomePage);
