import React, { Component } from 'react';
import { connect } from 'react-redux';

//Material UI
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  root: {
    width: '80%',
    margin: 'auto',
    marginTop: theme.spacing.unit * 20,
    overflowX: 'auto',

  },
  name: {
    marginLeft: 0,
  },
  table: {
    minWidth: 400,
  },
  tableHead: {
    backgroundColor: 'black',
    color: 'white',
    fontSize: 24,
    marginRight: 0,
    paddingRight: 100,
  },
  row: {
    maxWidth: 300,
    margin: 'auto',
    fontSize: 18,

  },
  button: {
    padding: 'auto',
  },
  deleteButton: {
    margin: 50,
    marginLeft: 500,
  }
});

class RoutineActivitiesList extends Component {

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

    this.props.dispatch({ type: 'EDIT_MODE', payload: routinePass })

    this.props.updateState(item);
  }

  deleteActivity = (item) => {

    this.props.dispatch({ type: "REMOVE_ACTIVITY", payload: item })
  } // end deleteActivity

  handleRoutineDelete = () => {
    let routine = this.props.reduxStore.routineSingle;
    let deleteRoutine = {
      id: routine.id,
      routineName: routine.routineName,
      day: routine.day,
      completed: routine.completed
    }
    console.log('newObject', deleteRoutine);

    this.props.dispatch({type: 'DELETE_ROUTINE', payload: deleteRoutine})
  }// end handleRoutineDelete

  render() {

    const { classes } = this.props;
    return (
      <>
        <Paper className={classes.root}>
          <Table>
            <TableHead className={classes.tableHead}>
              <tr>
                <th>Body Part</th>
                <th>Exercise</th>
                <th>Sets</th>
                <th>Reps</th>
                <th>Comments</th>
                <th>Edit</th>
                <th>Remove</th>
              </tr>
            </TableHead>
            <TableBody>
              {this.props.reduxStore.activities.map(item => (
                <tr key={item.id}>
                  <TableCell>{item.body_part}</TableCell>
                  <TableCell>{item.exercise}</TableCell>
                  <TableCell>{item.sets}</TableCell>
                  <TableCell>{item.reps}</TableCell>
                  <TableCell>{item.comment}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      className={classes.button}
                      onClick={() => this.editActivity(item)}
                    >
                      Edit
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="secondary"
                      className={classes.button}
                      onClick={() => this.deleteActivity(item)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </tr>

              ))}
            </TableBody>
          </Table>
        </Paper>

        <Button
          variant="contained"
          color="secondary"
          className={classes.deleteButton}
          onClick = {this.handleRoutineDelete}
        >
          Delete Routine
        </Button>
      </>
    )
  }

}




const mapReduxStoreToProps = (reduxStore) => ({
  reduxStore
})



export default withStyles(styles)(connect(mapReduxStoreToProps)(RoutineActivitiesList));