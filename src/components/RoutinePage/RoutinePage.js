import React, { Component } from 'react';
import { connect } from 'react-redux';
import RoutineActivitiesList from '../RoutineActivitiesList/RoutineActivitiesList';


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

  // editMode = () => {
  //   if (this.state === false) {
  //     this.setState({
  //       ...this.state,
  //       edit: true
  //     })
  //   }
  // }

  whatever = (item) => {
    console.log('In Whatever function', item)

     this.setState({
        routine_id: item.routine_id,
        body_part: item.body_part,
        exercise: item.exercise,
        sets: item.sets,
        reps: item.sets,
        comments: item.comment,
       
      })
  }

  checkEdit = () => {
   
    if (this.props.reduxStore.editMode.edit === true) {
     
      return (<button onClick={this.updateSubmit}>update</button>)
    } else {

      return (
        <button onClick={(item) => this.handleSubmit(item)}>Submit</button>
      )

    }
  }

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
  }

  handleChange = (event, propsName) => {
    this.setState({
      routine_id: this.props.reduxStore.routineSingle.id,
      [propsName]: event.target.value,

    })
  }


  render() {
    console.log('this.state', this.state);

    return (
      <>

        {/* <h1>{this.props.reduxStore.routineName}</h1> */}

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

        <h1>{this.props.reduxStore.routineSingle.routineName} - {this.props.reduxStore.routineSingle.day}</h1>
        <RoutineActivitiesList whatever = {this.whatever} />

      </>
    )

  }
}

const mapReduxStoreToProps = (reduxStore) => ({
  reduxStore
})



export default connect(mapReduxStoreToProps)(RoutinePage);