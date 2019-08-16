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
import { Link } from 'react-router-dom';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import Swal from 'sweetalert2';
import {withRouter} from 'react-router-dom';

const styles = theme => ({
  root: {
    width: '80%',
    margin: 'auto',
    marginTop: theme.spacing.unit,
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
    marginTop: 0,
    marginLeft: 990,
  }
});

class RoutineActivitiesList extends Component {
  // local state on page load
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

  // capture values of current row in activity table place them in a new object.
  // run a dispatch to the edit reducer with new object.
  // pass the current values called 'item' into the updateState function.
  editActivity = (item) => {

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
  } // end editActivity

  // Send dispatch of row to be removed from table
  deleteActivity = (item) => {
    this.props.dispatch({ type: "REMOVE_ACTIVITY", payload: item })
  } // end deleteActivity


  // Function will Remove entire routine from the Database
  // by capture the values and running a dispatch
  handleRoutineDelete = () => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        swalWithBootstrapButtons.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
        let routine = this.props.reduxStore.routineSingle;
        let deleteRoutine = {
          id: routine.id,
          routineName: routine.routineName,
          day: routine.day,
          completed: routine.completed
        }
        
        this.props.dispatch({ type: 'DELETE_ROUTINE', payload: deleteRoutine });
        this.props.history.push('/name');
        
      
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          'Your imaginary file is safe :)',
          'error'
        )
      }
    })

  }// end handleRoutineDelete

  render() {

    const { classes } = this.props;
    if (this.props.reduxStore.activities.length !== 0) {
      return (
        <>
          <Button
            variant="contained"
            color="secondary"
            className={classes.deleteButton}
            onClick={this.handleRoutineDelete}
          >
            Delete Routine
        </Button>
          <Paper className={classes.root}>
            <Table>
              <TableHead className={classes.tableHead}>
                <TableRow>
                  <th>Body Part</th>
                  <th>Exercise</th>
                  <th>Sets</th>
                  <th>Reps</th>
                  <th>Comments</th>
                  <th>Edit</th>
                  <th>Remove</th>
                </TableRow>
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
                      <IconButton
                        arial-label="Edit"
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        onClick={() => this.editActivity(item)}
                      >
                        <EditIcon />
                      </IconButton>
                    </TableCell>
                    <TableCell>
                      <IconButton
                        aria-label="Delete"
                        variant="contained"
                        color="secondary"
                        className={classes.button}
                        onClick={() => this.deleteActivity(item)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </tr>

                ))}
              </TableBody>
            </Table>
          </Paper>


        </>
      )
    } else {
      return (
        <>
          <h1>&nbsp;</h1>
        </>
      )
    }
  }

}

const mapReduxStoreToProps = (reduxStore) => ({
  reduxStore
})



export default withStyles(styles)(withRouter(connect(mapReduxStoreToProps)(RoutineActivitiesList)));