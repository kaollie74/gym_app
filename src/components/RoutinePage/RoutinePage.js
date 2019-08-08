import React, { Component } from 'react';
import { connect } from 'react-redux';
import RoutineActivitiesList from '../RoutineActivitiesList/RoutineActivitiesList';


class RoutinePage extends Component {

  

  state = {
    routine_id: '',
    body_part: '',
    exercise: '',
    sets: '',
    reps: '',
    comments: '',
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
    console.log('State Is', this.state);

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
          <button onClick={this.handleSubmit}>Submit</button>

        </form>

        {/* {JSON.stringify(this.props.reduxStore.routineSingle)} */}
        <h1>{this.props.reduxStore.routineSingle.routineName} - {this.props.reduxStore.routineSingle.day}</h1>
        <RoutineActivitiesList state={this.state}/>

      </>
    )
  }
}

const mapReduxStoreToProps = (reduxStore) => ({
  reduxStore
})



export default connect(mapReduxStoreToProps)(RoutinePage);