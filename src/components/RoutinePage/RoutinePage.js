import React, { Component } from 'react';
import { connect } from 'react-redux';
import RoutineActivitiesList from '../RoutineActivitiesList/RoutineActivitiesList';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import { Typography } from '@material-ui/core';
import CardContent from '@material-ui/core/CardContent';
import './RoutinePage.css';


const styles = theme => ({
  button: {
    margin: 100
  },
  card: {
    margin: 'auto',
    width: 300
  },
  color: {
    color: 'rgb(220,220, 220)'
  },
  textField: {
    margin: theme.spacing.unit,
    marginLeft: 40,
    marginTop: 40

  },
  text: {
    fontSize: 46,
    marginTop: 50,
    marginLeft: 420,
    color: 'rgb(220, 220, 220)'
  }
})

// Array of objects for the drop down
//menu on the form 
const bodyPart = [
  {
    value: 'Chest',
    label: 'Chest'
  },
  {
    value: 'Back',
    label: 'Back'
  },
  {
    value: 'Biceps',
    label: 'Biceps'
  },
  {
    value: 'Triceps',
    label: 'Triceps'
  },
  {
    value: 'Shoulders',
    label: 'Shoulders'
  },
  {
    value: 'Legs',
    label: 'Legs'
  }
]
class RoutinePage extends Component {

  state = {
    routine_id: this.props.reduxStore.editMode.routine_id,
    body_part: this.props.reduxStore.editMode.body_part,
    exercise: this.props.reduxStore.editMode.exercise,
    sets: this.props.reduxStore.editMode.sets,
    reps: this.props.reduxStore.editMode.reps,
    comments: this.props.reduxStore.editMode.comments,
    edit: false
  }

  // Function will update state based on the row of values that exist
  // in RoutineActivitiesList component
  // This function is passed in as a prop to the component
  // in order for this to happen. 
  updateState = (item) => {
    console.log('In Whatever function', item)

    this.setState({
      id: item.id,
      routine_id: item.routine_id,
      body_part: item.body_part,
      exercise: item.exercise,
      sets: item.sets,
      reps: item.reps,
      comments: item.comment,

    })
  }


  // Function will conditional render buttons depending on whether the
  // edit is set to 'true' or 'false' in the editModeReducer.
  checkEdit = () => {
    if (this.props.reduxStore.editMode.edit === true) {
      return (
        <div className='button'>
          <Button

            variant="contained"
            color="primary"
            onClick={(item) => this.updateSubmit(item)}
            size="small"
          >
            update
          </Button>
          <div className='cancelBtn'>
            <Button
              variant="contained"
              color="secondary"
              onClick={this.handleCancel}
              size="small"
            >
              Cancel
          </Button>
          </div>
        </div>
      )// end return
    } else {
      return (
        <div className='button'>
          <Button
            variant="contained"
            color="primary"
            onClick={(item) => this.handleSubmit(item)}
            size='small'
          >
            Submit
          </Button>
        </div>
      )// end return 
    } // end else
  }// end checkEdit

  // function will fire after the user makes changes to their edit. 
  updateSubmit = () => {
    //console.log('In updateSubmit', this.state)
    this.props.dispatch({ type: "EDIT_ACTIVITY", payload: this.state })
    let routinePass = {
      body_part: '',
      comment: '',
      completed: '',
      exercise: '',
      id: '',
      reps: '',
      routine_id: '',
      sets: '',
      edit: false,
    }
    this.props.dispatch({ type: "EDIT_MODE", payload: routinePass })

    this.setState({
      id: '',
      routine_id: '',
      body_part: '',
      exercise: '',
      sets: '',
      reps: '',
      comments: '',
      edit: false
    })

  }

  // Function will set and pass an object through a dispatch to 
  // the editModeReducer, which will create a toggle effect for the
  // buttons
  handleCancel = () => {
    // create new object
    let routinePass = {
      body_part: '',
      comment: '',
      completed: '',
      exercise: '',
      id: '',
      sets: '',
      reps: '',
      routine_id: '',
      edit: false,
    }
    // send empty values to reducer if cancel button is pressed.
    this.props.dispatch({ type: 'EDIT_MODE', payload: routinePass })

    this.setState({
      id: '',
      routine_id: '',
      body_part: '',
      exercise: '',
      sets: '',
      reps: '',
      comments: '',
      edit: false
    })

  } // end handleCancel

  // Condition to check if the necessary input fields are filled
  // run dispatch to POST new Activity.
  // setState to empty values. 
  handleSubmit = (event) => {

    event.preventDefault();
    if (this.state.body_part !== '' && this.state.exercise_name !== '' && this.state.sets !== '' && this.state.reps !== '') {
      // run dispatch 
      this.props.dispatch({ type: 'POST_ACTIVITY', payload: this.state })

      this.setState({
        routine_id: '',
        body_part: '',
        exercise: '',
        sets: '',
        reps: '',
        comments: '',
      })

    } else {
      alert('Fill in all inputs except comments to proceed')
    }
  } // end  handleSubmit

  // captures the values of the inputs, and setsState off of them.
  handleChange = (event, propsName) => {
    this.setState({
      routine_id: this.props.reduxStore.routineSingle.id,
      [propsName]: event.target.value,

    })
  } // end handleChange

  
  populateActivity = () => {
    if(this.props.reduxStore.activities.length === 0){
    this.setState({
      routine_id: this.props.reduxStore.routineSingle.id,
      body_part: 'Legs',
      exercise: 'BB Squat',
      sets: '3',
      reps: '10',
      comments: '315 lbs'

    })
    } else if (this.props.reduxStore.activities.length === 1){
      this.setState({
        routine_id: this.props.reduxStore.routineSingle.id,
        body_part: 'Legs',
        exercise: 'DeadLift',
        sets: '4',
        reps: '8',
        comments: '415 lbs'

      })
    } else if (this.props.reduxStore.activities.length === 2){
      this.setState({
        routine_id: this.props.reduxStore.routineSingle.id,
        body_part: 'Legs',
        exercise: 'Pistol Squats',
        sets: '2',
        reps: '10',
        comments: 'Bodyweight'
    })
  } else if (this.props.reduxStore.activities.length === 3){
      this.setState({
        routine_id: this.props.reduxStore.routineSingle.id,
        body_part: 'Legs',
        exercise: 'Bodyweight Squats',
        sets: '2',
        reps: '30',
        comments: 'Bodyweight'
      })
  }
    else if (this.props.reduxStore.activities.length === 4) {
      this.setState({
        routine_id: this.props.reduxStore.routineSingle.id,
        body_part: 'Legs',
        exercise: 'Wall sits',
        sets: '2',
        reps: '1',
        comments: 'Hold for 1 minute'
      })
    }

} // end populateActivity




  render() {
    console.log('this is state', this.state)

    const { classes } = this.props;
    return (
      <>
        <form className='activityForm'>
          <TextField
            className={classes.textField}
            id='default'
            select label='select'
            value={this.state.body_part}
            onChange={(event) => this.handleChange(event, 'body_part')}
            margin='normal'
            InputProps={{ classes: { input: classes.color } }}
          >
            {bodyPart.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </TextField>
          <TextField
            className={classes.textField}
            id='text'
            label='Exercise Name'
            margin='normal'
            value={this.state.exercise}
            onChange={(event) => this.handleChange(event, 'exercise')}
            InputProps={{ classes: { input: classes.color } }}
          />
          <TextField
            className={classes.textField}
            id='number'
            label='Sets'
            margin='normal'
            value={this.state.sets}
            onChange={(event) => this.handleChange(event, 'sets')}
            InputProps={{ classes: { input: classes.color } }}
          />
          <TextField
            className={classes.textField}
            id='number'
            label='Reps'
            margin='normal'
            value={this.state.reps}
            onChange={(event) => this.handleChange(event, 'reps')}
            InputProps={{ classes: { input: classes.color } }}
          />
          <TextField
            className={classes.textField}
            id='text'
            label='Comments'
            margin='normal'
            value={this.state.comments}
            onChange={(event) => this.handleChange(event, 'comments')}
            InputProps={{ classes: { input: classes.color } }}
          />
          {this.checkEdit()}
          {/* <button onClick={(item)=>this.handleSubmit(item)}>Submit</button> */}
        </form>

        <div>
          <Typography className={classes.text} onClick={this.populateActivity}>
            {this.props.reduxStore.routineSingle.routineName}
          
          </Typography>
        </div>

        <RoutineActivitiesList updateState={this.updateState} />

      </>
    )

  }
}

const mapReduxStoreToProps = (reduxStore) => ({
  reduxStore
})



export default withStyles(styles)(connect(mapReduxStoreToProps)(RoutinePage));