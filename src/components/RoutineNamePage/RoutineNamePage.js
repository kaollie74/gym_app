import React, { Component } from 'react';
import { connect } from 'react-redux';

class RoutineNamePage extends Component {

  state = {
    routineName: '',
    day: ''
  }

  handleSubmit = (event) => {
    event.preventDefault();
    // run dispatch 
    this.props.dispatch({ type: 'SET_ROUTINE_NAME', payload: this.state })

    this.setState({
      routineName: '',
      day: ''
    })

    this.props.history.push('/routine')

  }



  handleChange = (event, propsName) => {
    this.setState({
      [propsName]: event.target.value,

    })
  }


  render() {
    
    return (
      <>
        <h1>Build Routine Name and Day</h1>

        <form>
          <input type='text' placeholder='Routine Name' onChange={(event) => this.handleChange(event, 'routineName')} />

          <select onChange={(event) => this.handleChange(event, 'day')} >
            <option value='default'>Select Day</option>
            <option value="monday">Monday</option>
            <option value="tuesday">Tuesday</option>
            <option value="wednesday">Wednesday</option>
            <option value="thursday">Thursday</option>
            <option value="friday">Friday</option>
            <option value="saturday">Saturday</option>
            <option value="sunday">Sunday</option>
          </select>
          <br />
          <button onClick={this.handleSubmit}>Submit</button>

        </form>
      </>
    )
  }
}



export default connect()(RoutineNamePage);