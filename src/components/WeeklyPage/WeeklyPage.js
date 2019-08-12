import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../App/App.css'
import Checkbox from '@material-ui/core/Checkbox';


class WeeklyPage extends Component {

  state = {
    completed: false,
  }

  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_ROUTINE_NAMES' })
  }

  // createCheckbox = (option) => {
  //   <Checkbox 
  //   label = {option}
  //   isSelected={this.state.checkbox[option]}
  //   onCheckboxChange={this.handleCheckboxChange}
  //   key={option}/>
  // }

  handleCheck = (event, item) => {

    if(item.completed === false){
      item.completed = true;
    } else{
      item.completed = false
    }

    // this.setState({
    //   completed: !this.state.completed
    // })

    let checked = {
      completed: item.completed,
      day: item.day,
      id: item.id
    }
    console.log('Checked', checked)
    //console.log('this is state', this.state)
   
    //this.props.dispatch({type: 'UPDATE_ROUTINE_CHECKBOX', payload: checked})
    
  }


  render() {
    //console.log('This.state', this.state);
    
      return (
        <>
          <h3></h3>
          <table>
            <tr>
              <th>DAY</th>
              <th>Routine Name</th>
              <th>Completed</th>
              <th>See Routine</th>
            </tr>

            <tbody>
              {this.props.reduxStore.routineNames.map(item => (
                <tr key={item.id}>
                  <td>{item.day}</td>
                  <td>{item.routineName}</td>
                  <input type="checkbox" value={this.state.completed} onChange= {(event) => this.handleCheck(event, item)} />
                  <td><button>See Routine</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )
  }
} // end WeeklyPage



const mapReduxStoreToProps = (reduxStore) => ({
  reduxStore
})

export default connect(mapReduxStoreToProps)(WeeklyPage);

