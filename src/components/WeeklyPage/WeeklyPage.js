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



// const CustomTableCell = withStyles(theme => ({
//   head: {
//     backgroundColor: theme.palette.common.black,
//     color: theme.palette.common.white,
//   },
//   body: {
//     fontSize: 14,
//   },
// }))(TableCell);

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
  }
});

class WeeklyPage extends Component {

  state = {
    completed: false,
  }

  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_ROUTINE_NAMES' })
  }

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
    //console.log('this is state', this.state)
    this.props.dispatch({ type: 'UPDATE_ROUTINE_CHECKBOX', payload: checked })
  }// end handleCheck

  handleRoutine = (item) => {
    console.log('In handleRoutine', item);

  }

  render() {
    const { classes } = this.props;
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
                  className={item.completed ? 'backgroundColor' : ''}
                >
                  <Checkbox
                    type="checkbox"
                    checked={item.completed}
                    value={this.state.completed}
                    onChange={(event) => this.handleCheck(event, item)}
                  />
                  <TableCell>{
                    item.day}
                  </TableCell>
                  <TableCell className={classes.name}>
                    {item.routineName}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      className={classes.button}
                      onClick={() => this.handleRoutine(item)}
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
} // end WeeklyPage



const mapReduxStoreToProps = (reduxStore) => ({
  reduxStore
})

export default withStyles(styles)(connect(mapReduxStoreToProps)(WeeklyPage));

