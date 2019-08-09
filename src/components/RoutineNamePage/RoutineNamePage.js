import React, { Component } from 'react';
import { connect } from 'react-redux';

class RoutineNamePage extends Component {

  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_ROUTINE_NAMES' })
  }

  state = {
    routineName: '',
    day: ''
  }

  // Handles setting a new Routine name and running a dispatch to 
  // post it in the DB
  handleSubmit = (event) => {
    event.preventDefault();
    // run dispatch 
    this.props.dispatch({ type: 'SET_ROUTINE_NAME', payload: this.state })

    this.setState({
      routineName: '',
      day: ''
    })
  } // end handleSubmit



  handleChange = (event, propsName) => {
    this.setState({
      [propsName]: event.target.value,

    })
  }

  // retrieves single routine by its 'id' and runs a dispatch
  // which will eventually place it into its own reducer.
  handleRoutine = (item) => {
    console.log('IN handle Routine',item)

    this.props.dispatch({ type: 'RETRIEVE_SINGLE_ROUTINE', payload: item.id });

    this.props.history.push('/routine')


  }


  render() {
    console.log('this.state', this.state);

    return (
      <>
        <h1>Build Routine Name and Day</h1>

        <form>
          <input type='text' placeholder='Routine Name' value={this.state.routineName} onChange={(event) => this.handleChange(event, 'routineName')} />

          <select value={this.state.day} onChange={(event) => this.handleChange(event, 'day')} >
            <option value='default'>Select Day</option>
            <option value="Monday">Monday</option>
            <option value="Tuesday">Tuesday</option>
            <option value="Wednesday">Wednesday</option>
            <option value="Thursday">Thursday</option>
            <option value="Friday">Friday</option>
            <option value="Saturday">Saturday</option>
            <option value="Sunday">Sunday</option>
          </select>
          <button onClick={this.handleSubmit}>Submit</button>
        </form>
       
        {this.props.reduxStore.routineNames.map(item => (
          <div key={item.id}>
            <button onClick={() => this.handleRoutine(item)}>{item.routineName}</button>
          </div>
        ))}
      </>
    )
  }
}

const mapReduxStoreToProps = (reduxStore) => ({
  reduxStore
})



export default connect(mapReduxStoreToProps)(RoutineNamePage);