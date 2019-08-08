import React, { Component } from 'react';
import { connect } from 'react-redux';

class RoutineActivitiesList extends Component {
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
              <td><button>Edit</button></td>
              <td><button>Delete</button></td>
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