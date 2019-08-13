import React, { Component } from 'react';
import { connect } from 'react-redux';
import RoutineActivitiesList from '../RoutineActivitiesList/RoutineActivitiesList';
import Button from '@material-ui/core/Button';


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
      <>  
      <button onClick={(item) => this.updateSubmit(item)}>update</button>
      <button onClick={this.handleCancel}>Cancel</button>
      </>
        )// end return
    } else {
      return (
          <button onClick={(item) => this.handleSubmit(item)}>Submit</button>     
      )// end return 
    } // end else
  }// end checkEdit

  // function will fire after the user makes changes to their edit. 
  updateSubmit = () => {
    //console.log('In updateSubmit', this.state)
    this.props.dispatch({type: "EDIT_ACTIVITY", payload: this.state})
    let routinePass ={
      body_part:'',
      comment:'',
      completed:'',
      exercise:'',
      id: '',
      reps:'',
      routine_id: '',
      sets: '',
      edit: false,
    }
    this.props.dispatch({type:"EDIT_MODE", payload: routinePass})
    
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
      body_part:'',
      comment:'',
      completed:'',
      exercise:'',
      id: '',
      sets: '',
      reps:'',
      routine_id: '',
    
      edit: false,
    }

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

  handleChange = (event, propsName) => {
    this.setState({
      routine_id: this.props.reduxStore.routineSingle.id,
      [propsName]: event.target.value,

    })
  } // end handleChange

  


  render() {
    console.log('this.state', this.state);
      
    return (
      <>
        <form>
          <select value={this.state.body_part} onChange={(event) => this.handleChange(event, 'body_part')} >
            <option value='default'>Select Body Part</option>
            <option value="Chest">Chest</option>
            <option value="Back">Back</option>
            <option value="Biceps">Biceps</option>
            <option value="Triceps">Triceps</option>
            <option value="Shoulders">Shoulders</option>
            <option value="Legs">Legs</option>
          </select>
          <input type='text' placeholder='Exercise Name' value={this.state.exercise} onChange={(event) => this.handleChange(event, 'exercise')} />
          <input type='number' placeholder='Sets' value={this.state.sets} onChange={(event) => this.handleChange(event, 'sets')} />
          <input type='number' placeholder='Reps' value={this.state.reps} onChange={(event) => this.handleChange(event, 'reps')} />
          <input type='text' placeholder='Comments' value={this.state.comments} onChange={(event) => this.handleChange(event, 'comments')} />
          {this.checkEdit()}
          {/* <button onClick={(item)=>this.handleSubmit(item)}>Submit</button> */}
        </form>

        <h1>
        {this.props.reduxStore.routineSingle.routineName} 
        - 
        {this.props.reduxStore.routineSingle.day}
        </h1>
        <Button>Edit</Button>
        <RoutineActivitiesList updateState={this.updateState} />

      </>
    )

  }
}

const mapReduxStoreToProps = (reduxStore) => ({
  reduxStore
})



export default connect(mapReduxStoreToProps)(RoutinePage);