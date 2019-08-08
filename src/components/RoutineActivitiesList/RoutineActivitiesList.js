import React, { Component } from 'react';
import { connect } from 'react-redux';

class RoutineActivitiesList extends Component {

  // componentDidMount() {
  //   this.props.dispatch({ type: 'GET_ROUTINES_ACTIVITIES', payload: this.props.reduxStore.routineSingle })
  // }


editActivity = (item) => {
  console.log('In edit Activity', item);
  // this.props.setState({

  // })
  
}

deleteActivity = (item) => {
  console.log('in delete Activity', item.id);
  this.props.dispatch({type: "REMOVE_ACTIVITY", payload: item.id})
  
}

  render () {
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
              <td><button onClick={() => this.editActivity (item)}>Edit</button></td>
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