import React, { Component } from 'react';
import { connect } from 'react-redux';

class RoutineActivitiesList extends Component {

  // state = {
  //   body_part: '',
  //   comment: '',
  //   completed: false,
  //   exercise: '',
  //   id: '',
  //   reps: '',
  //   routine_id: '',
  //   sets: '',
  // }
  
  state = {
    body_part: '',
    comment: '',
    completed: '',
    exercise: '',
    id: '',
    reps: '',
    routine_id: '',
    sets: '',
  }

 



  editActivity = (item) => {
    console.log('In edit Activity', item);
    

    let routinePass = {
      body_part: item.body_part,
      comment: item.comment,
      completed: item.completed,
      exercise: item.exercise,
      id: item.id,
      reps: item.reps,
      routine_id: item.routine_id,
      sets: item.sets,
      edit: true,
    }
    
    this.props.dispatch({type: 'EDIT_MODE', payload: routinePass})

    this.props.whatever(item);
  
  }

  deleteActivity = (item) => {

    console.log('in delete Activity', item);
    this.props.dispatch({ type: "REMOVE_ACTIVITY", payload: item })

  }

  render() {

    // console.log('This is State in RoutineActivitiesList', this.state);
    

    return (
      <table>
        <thead>
          <th>Body Part</th>
          <th>Exercise</th>
          <th>Sets</th>
          <th>Reps</th>
          <th>Comments</th>
          <th>Edit</th>
          <th>Remove</th>
        </thead>
        <tbody>
          {this.props.reduxStore.activities.map(item => (
            <tr key={item.id}>
              <td>{item.body_part}</td>
              <td>{item.exercise}</td>
              <td>{item.sets}</td>
              <td>{item.reps}</td>
              <td>{item.comment}</td>
              <td><button onClick={() => this.editActivity(item)}>Edit</button></td>
              <td><button onClick={() => this.deleteActivity(item)}>Delete</button></td>
            </tr>

          ))}
        </tbody>
      </table>
    )
  }

}




const mapReduxStoreToProps = (reduxStore) => ({
  reduxStore
})



export default connect(mapReduxStoreToProps)(RoutineActivitiesList);