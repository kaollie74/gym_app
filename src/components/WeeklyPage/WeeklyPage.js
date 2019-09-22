import React, { Component } from 'react';
import { connect } from 'react-redux';
//import '../App/App.css'
import Checkbox from '@material-ui/core/Checkbox';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';



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
    minWidth: 300,
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
  }
});

class WeeklyPage extends Component {

  state = {
    completed: false,
  }

  // fetch all the routines that exist in the DB.
  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_ROUTINE_NAMES' })
  }

  // When the checkbox is clicked, this function is activated.
  // First, a condition is run to toggle the checkbox back and forth.
  // Then a new object is created with the 3 properties used to update
  // the DB. Then a dispatch runs with 'checked' as the payload.
  handleCheck = (event, item) => {

    if (item.completed === false) {
      item.completed = true;
    } else {
      item.completed = false
    }// end conditional

    let checked = {
      completed: item.completed,
      day: item.day,
      id: item.id
    }
    console.log('Checked', checked)
   
    this.props.dispatch({ type: 'UPDATE_ROUTINE_CHECKBOX', payload: checked })
  }// end handleCheck

  // When the user clicks the 'See Routine' button, this function is activated.
  // it will run a dispatch to catch this specific routine by sending a payload
  // with that specific routines 'id'.
  handleRoutine = (item) => {
    console.log('In handleRoutine', item);
    this.props.dispatch({ type: 'RETRIEVE_SINGLE_ROUTINE', payload: item.id });
  }

  render() {
    const { classes } = this.props;
    if (this.props.reduxStore.routineNames.length === 0) {

      return (
        <>
          <h1>&nbsp;</h1>
        </>
      )

    } else {
      return (
        <>

          <Paper className={classes.root}>
            <Table className={classes.table}>
              <TableHead className={classes.tableHead}>
                <th>&nbsp;</th>
                <th>DAY</th>
                <th>Routine Name</th>
                <th>See Routine</th>
              </TableHead>

              <TableBody className={classes.row}>
                {this.props.reduxStore.routineNames.map(item => (
                  <TableRow
                    key={item.id}
                   //className={item.completed ? 'backgroundColor' : ''}
                  >
                    <Checkbox
                      type="checkbox"
                      checked={item.completed}
                      value={this.state.completed}
                      onChange={(event) => this.handleCheck(event, item)}
                    />
                    <TableCell className={item.completed ? 'backgroundColor' : ''}>
                      {item.day}
                    </TableCell>
                    <TableCell className={item.completed ? 'backgroundColor' : ''} >
                      {item.routineName}
                    </TableCell>
                    <TableCell>
                      <Button
                        component={Link}
                        to='/routine'
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        onClick={() => this.handleRoutine(item)}
                        size="small"
                      >
                        See Routine
                    </Button>
                    </TableCell>
                  </TableRow>

                ))}
              </TableBody>
            </Table>
          </Paper>
        </>
      )
    }

  }
} // end WeeklyPage



const mapReduxStoreToProps = (reduxStore) => ({
  reduxStore
})

export default withStyles(styles)(connect(mapReduxStoreToProps)(WeeklyPage));

