import React, { Component } from 'react';
import { connect } from 'react-redux';

class RoutinePage extends Component {

  componentDidMount(){
    this.props.dispatch({type:'FETCH_ROUTINE_NAME'})
  }

  state = {
    body_part: '',
    exercise: '',
    sets: '',
    reps: '',
    comments: '',
  }


  handleSubmit = (event) => {

    event.preventDefault();
    if (this.state.type !== '' && this.state.exercise_name !== '' && this.state.sets !== '' && this.state.reps !== ''){
    // run dispatch 
    this.props.dispatch({ type: 'POST_ACTIVITY', payload: this.state })

    this.setState({
      type: '',
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
      [propsName]: event.target.value,

    })
  }


  render() {
   console.log('State Is', this.state);
   
    return (
      <>
        <h1>This is your Routine PAGE</h1>

        <form>
          
          <select value={this.state.type} onChange={(event) => this.handleChange(event, 'body_part')} >
            <option value='default'>Select Body Part</option>
            <option value="Chest">Chest</option>
            <option value="Back">Back</option>
            <option value="Biceps">Biceps</option>
            <option value="Triceps">Triceps</option>
            <option value="Shoulders">Shoulders</option>
            <option value="Legs">Legs</option>
          </select>
          <input type='text' placeholder='Exercise Name' value={this.state.exercise_name} onChange={(event) => this.handleChange(event, 'exercise')} />
          <input type='number' placeholder='Sets' value={this.state.sets} onChange={(event) => this.handleChange(event, 'sets')} />
          <input type='number' placeholder='Reps' value={this.state.reps} onChange={(event) => this.handleChange(event, 'reps')} />
          <input type='text' placeholder='Comments' value={this.state.comments} onChange={(event) => this.handleChange(event, 'comments')} />

          <button onClick={this.handleSubmit}>Submit</button>

        </form>

        {JSON.stringify(this.props.reduxStore.RoutineNameReducer)}



      </>
    )
  }
}

const mapReduxStoreToProps = (reduxStore) => ({
  reduxStore
})



export default connect(mapReduxStoreToProps)(RoutinePage);